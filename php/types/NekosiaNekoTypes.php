<?php
declare(strict_types=1);

// Typed models for the NekosiaNeko SDK.
//
// GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
// params (op.<name>.points[].args.params[]). Field/param types come from the
// canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
// @voxgig/apidef VALID_CANON). Do not edit by hand.
//
// These are documentation-grade value objects (PHP 8 typed properties),
// registered on the composer classmap autoload. The SDK boundary exchanges
// assoc-arrays; these classes name the shapes for tooling and typed callers.

/** Booru entity data model. */
class Booru
{
    public ?string $artist = null;
    public ?string $created_at = null;
    public ?array $data = null;
    public ?string $id = null;
    public ?string $source = null;
    public ?string $status = null;
    public ?array $tag = null;
    public string $url;
}

/** Request payload for Booru#load. */
class BooruLoadMatch
{
    public string $id;
}

/** Request payload for Booru#list. */
class BooruListMatch
{
    public ?string $artist = null;
    public ?string $created_at = null;
    public ?array $data = null;
    public ?string $id = null;
    public ?string $source = null;
    public ?string $status = null;
    public ?array $tag = null;
    public ?string $url = null;
}

/** Request payload for Booru#create. */
class BooruCreateData
{
    public ?string $artist = null;
    public ?string $created_at = null;
    public ?array $data = null;
    public ?string $id = null;
    public ?string $source = null;
    public ?string $status = null;
    public ?array $tag = null;
    public string $url;
}

/** Image entity data model. */
class Image
{
    public ?array $data = null;
    public ?string $status = null;
}

/** Request payload for Image#load. */
class ImageLoadMatch
{
    public ?array $data = null;
    public ?string $status = null;
}

