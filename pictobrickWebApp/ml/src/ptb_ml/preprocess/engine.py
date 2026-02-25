from __future__ import annotations

from dataclasses import dataclass, field
from pathlib import Path
from typing import Union

from .io import JobWorkSpace
from .settings import PreprocessSettings
from . import ingest
from .video import extract_frames_ffmpeg
from .quality import score_and_filter
from .dedupe import dedupe_keep_best
from .models import FrameRecord, DroppedRec
from .manifest import build_min_manifest, write_manifest


@dataclass(frozen=True)
class PreprocessReq:
    base_dir: str | Path
    job_id: str
    input_paths: list [str | Path]
    clean: bool = False
    settings: PreprocessSettings = field(default_factory=PreprocessSettings)


@dataclass(frozen=True)
class PreprocessResult:
    job_root:Path
    manifest_path:Path
    total_frames:int
    kept_frames:int
    dropped_frames:int
    deduped_frames:int


def _frame_dims(path:Path) -> tuple[int, int]:
    from PIL import Image
    with Image.open(path) as im:
        return im.size[0], im.size[1]


def run_preprocess(req:PreprocessReq) -> PreprocessResult:
    s = req.settings
    ws = JobWorkSpace.create(req.base_dir, req.job_id, clean=req.clean)

    #stage raw uploads
    staged = ingest.stage_raw_inputs(ws, req.input_paths)

    #split inputs by type
    img_paths, vid_paths = ingest.split_inputs(staged)

    #normalize image inputs into frames
    next_idx = 0
    if img_paths:
        _, next_idx = ingest.normalize_images_to_frames(ws, img_paths, start_idx=next_idx)

    #extract video frames
    for vp in vid_paths:
        next_idx= extract_frames_ffmpeg(ws, vp, start_idx=next_idx, settings=s)

        # Soft cap: stop if we hit max frames
        frames_now = ws.list_frames()
        if len(frames_now) >= s.max_video_frames:
            print(f"Reached max frames limit of {s.max_video_frames} after processing {vp.name}, stopping further video processing.")
            break
    all_frames = ws.list_frames()

    kept_scored, dropped_scored = score_and_filter(all_frames, s)

    deduped_kept, deduped_removed = dedupe_keep_best(kept_scored, s)

    frame_records:list[FrameRecord] = []
    for p,m in sorted(deduped_kept, key=lambda t: t[0].name):
        w,h = _frame_dims(p)
        frame_records.append(
            FrameRecord(
                id=p.stem,
                path=str(p.relative_to(ws.root)),
                width=w,
                height=h,
                sharpness=m.sharpness,
                brightness=m.brightness
            )
        )

    dropped_records: list[DroppedRec] = []
    for p, reason, m in dropped_records:
        dropped_records.append(
            DroppedRec(
                path=str(p.relative_to(ws.root)),
                reason=reason,
            )
        )

    for p in deduped_removed:
        dropped_records.append(
                DroppedRec(
                    path=str(p.relative_to(ws.root)),
                    reason="deduped",
            )
    )
        
    manifest = build_min_manifest(ws.job_id,frame_records, dropped_records)
    manifest_path = write_manifest(ws, manifest)

    #Qualit report
    report = {
        "job_id": ws.job_id,
        "settings": {
            "fps": s.fps,
            "max_video_frames": s.max_video_frames,
            "min_sharpness": s.min_sharpness,
            "min_brightness": s.min_brightness,
            "max_brightness": s.max_brightness,
            "max_clip_high": s.max_clip_high,
            "max_clip_low": s.max_clip_low,
            "dedupe_phash_size": s.dedupe_phash_size,
            "dedupe_hamming_threshold": s.dedupe_hamming_threshold,
        },
        "counts": {
            "total_frames_found": len(all_frames),
            "kept_after_quality": len(kept_scored),
            "dropped_after_quality": len(dropped_scored),
            "removed_by_dedupe": len(deduped_removed),
            "final_kept": len(frame_records),
        },
    }
    ws.write_quality_report(report)

    return PreprocessResult(
        job_root=ws.root,
        manifest_path=manifest_path,
        total_frames=len(all_frames),
        kept_frames=len(frame_records),
        dropped_frames=len(dropped_records),
        deduped_frames=len(deduped_removed),
    )

        
    

    