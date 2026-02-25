from __future__ import annotations

from pathlib import Path
from typing import Iterable

from .io import JobWorkSpace
from .models import DroppedRec, FrameRecord, Manifest

def build_min_manifest(job_id:str, frames:Iterable[FrameRecord], dropped:Iterable[DroppedRec]) -> Manifest:
    return Manifest(
        job_id=job_id,
        frames=list(frames),
        dropped_frames=list(dropped)
    )

def write_manifest(ws: JobWorkSpace, manifest: Manifest) -> Path:
    ws.write_manifest(manifest.model_dump())
    return ws.manifest_path