# Typed models for the NekosiaNeko SDK.
#
# GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
# params (op.<name>.points[].args.params[]). Field/param types come from the
# canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
# @voxgig/apidef VALID_CANON). Do not edit by hand.

from __future__ import annotations

from dataclasses import dataclass
from typing import Optional, Any


@dataclass
class Booru:
    url: str
    artist: Optional[str] = None
    created_at: Optional[str] = None
    data: Optional[dict] = None
    id: Optional[str] = None
    source: Optional[str] = None
    status: Optional[str] = None
    tag: Optional[list] = None


@dataclass
class BooruLoadMatch:
    id: str


@dataclass
class BooruListMatch:
    artist: Optional[str] = None
    created_at: Optional[str] = None
    data: Optional[dict] = None
    id: Optional[str] = None
    source: Optional[str] = None
    status: Optional[str] = None
    tag: Optional[list] = None
    url: Optional[str] = None


@dataclass
class BooruCreateData:
    artist: Optional[str] = None
    created_at: Optional[str] = None
    data: Optional[dict] = None
    id: Optional[str] = None
    source: Optional[str] = None
    status: Optional[str] = None
    tag: Optional[list] = None
    url: Optional[str] = None


@dataclass
class Image:
    data: Optional[dict] = None
    status: Optional[str] = None


@dataclass
class ImageLoadMatch:
    data: Optional[dict] = None
    status: Optional[str] = None

