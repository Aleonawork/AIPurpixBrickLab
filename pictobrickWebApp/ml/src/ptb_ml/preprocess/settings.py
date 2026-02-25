# Settings for preprocessing 

from __future__ import annotations
from dataclasses import dataclass

@dataclass(frozen=True)
class PreprocessSettings:
    #Video frame extraction
    fps:float= 2.0
    max_video_frames:int= 500

    #Quality filtering
    min_sharpness:float= 80.0
    min_brightness:float= 0.12
    max_brightness:float= 0.88
    max_clip_high:float= 0.02
    max_clip_low:float= 0.02

    #Dedupe
    dedupe_phash_size:int= 16
    dedupe_hamming_threshold:int= 6