from __future__ import annotations

import argparse
from pathlib import Path

from ptb_ml.preprocess.engine import PreprocessReq, run_preprocess
from ptb_ml.preprocess.settings import PreprocessSettings


def parse_args() -> argparse.Namespace:
    p = argparse.ArgumentParser(description="PTB preprocessing (ingest -> frames -> quality -> dedupe -> manifest)")
    p.add_argument("--job-id", required=True)
    p.add_argument("--out", dest="base_dir", default="tmp/ptb_jobs", help="Base output directory")
    p.add_argument("--clean", action="store_true", help="Delete existing job folder before running")
    p.add_argument("--fps", type=float, default=2.0, help="Video sampling FPS")
    p.add_argument("--max-frames", type=int, default=400, help="Soft cap for extracted frames")
    p.add_argument("inputs", nargs="+", help="Input files: images/videos")
    return p.parse_args()


def main() -> None:
    args = parse_args()

    settings = PreprocessSettings(
        fps=args.fps,
        max_video_frames=args.max_frames,
    )

    req = PreprocessReq(
        base_dir=Path(args.base_dir),
        job_id=args.job_id,
        input_paths=[Path(x) for x in args.inputs],
        clean=args.clean,
        settings=settings,
    )

    res = run_preprocess(req)
    print(f"job_root: {res.job_root}")
    print(f"manifest:  {res.manifest_path}")
    print(res)


if __name__ == "__main__":
    main()