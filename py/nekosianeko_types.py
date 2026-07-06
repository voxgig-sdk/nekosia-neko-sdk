# Typed models for the NekosiaNeko SDK.
#
# GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
# params (op.<name>.points[].args.params[]). Field/param types come from the
# canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
# @voxgig/apidef VALID_CANON). Do not edit by hand.
#
# These are TypedDicts, not dataclasses: the SDK ops return/accept plain dicts
# at runtime, and a TypedDict IS a dict shape, so the types match the runtime.
# Optional (req:false) keys are modelled as TypedDict key-optionality
# (total=False), split into a required base + total=False subclass when a type
# has both required and optional keys.

from __future__ import annotations

from typing import TypedDict, Any


class BooruRequired(TypedDict):
    url: str


class Booru(BooruRequired, total=False):
    artist: str
    created_at: str
    data: dict
    id: str
    source: str
    status: str
    tag: list


class BooruLoadMatch(TypedDict):
    id: str


class BooruListMatch(TypedDict, total=False):
    artist: str
    created_at: str
    data: dict
    id: str
    source: str
    status: str
    tag: list
    url: str


class BooruCreateDataRequired(TypedDict):
    url: str


class BooruCreateData(BooruCreateDataRequired, total=False):
    artist: str
    created_at: str
    data: dict
    id: str
    source: str
    status: str
    tag: list


class Image(TypedDict, total=False):
    data: dict
    status: str


class ImageLoadMatch(TypedDict, total=False):
    data: dict
    status: str
