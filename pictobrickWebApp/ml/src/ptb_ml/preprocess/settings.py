# Settings for preprocessing 

from __future__ import annotations
from dataclasses import dataclass, field



@dataclass(frozen=True)
class MaskingSettings:
    enabled: bool = True
    backend: str = "sky_hsv"   # "sky_hsv" or "sky_hsv+deeplabv3" or "none"
    dilation_px: int = 6
    min_unmasked_ratio: float = 0.15

    # sky heuristic knobs
    sky_top_fraction: float = 0.55
    sky_blue_strength: float = 0.12
    sky_low_sat: float = 0.25
    sky_high_val: float = 0.78

    # semantic (only if backend includes deeplabv3)
    semantic_classes_to_mask: tuple[str, ...] = (
        "person", "car", "bus", "truck", "motorcycle", "bicycle"
    )
    device: str = "auto"  # auto|cpu|cuda


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

    #Masking
    masking:MaskingSettings= field(default_factory=MaskingSettings)
