# frozen_string_literal: true

# Typed models for the NekosiaNeko SDK.
#
# GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
# params (op.<name>.points[].args.params[]). Member types come from the
# canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
# @voxgig/apidef VALID_CANON). Ruby types are unenforced; these YARD
# annotations document the shapes. Do not edit by hand.

# Booru entity data model.
#
# @!attribute [rw] artist
#   @return [String, nil]
#
# @!attribute [rw] created_at
#   @return [String, nil]
#
# @!attribute [rw] id
#   @return [String, nil]
#
# @!attribute [rw] source
#   @return [String, nil]
#
# @!attribute [rw] tags
#   @return [Array, nil]
#
# @!attribute [rw] url
#   @return [String, nil]
Booru = Struct.new(
  :artist,
  :created_at,
  :id,
  :source,
  :tags,
  :url,
  keyword_init: true
)

# Request payload for Booru#load.
#
# @!attribute [rw] id
#   @return [String]
BooruLoadMatch = Struct.new(
  :id,
  keyword_init: true
)

# Request payload for Booru#list.
#
# @!attribute [rw] artist
#   @return [String, nil]
#
# @!attribute [rw] created_at
#   @return [String, nil]
#
# @!attribute [rw] id
#   @return [String, nil]
#
# @!attribute [rw] source
#   @return [String, nil]
#
# @!attribute [rw] tags
#   @return [Array, nil]
#
# @!attribute [rw] url
#   @return [String, nil]
BooruListMatch = Struct.new(
  :artist,
  :created_at,
  :id,
  :source,
  :tags,
  :url,
  keyword_init: true
)

# Request payload for Booru#create.
#
# @!attribute [rw] artist
#   @return [String, nil]
#
# @!attribute [rw] created_at
#   @return [String, nil]
#
# @!attribute [rw] id
#   @return [String, nil]
#
# @!attribute [rw] source
#   @return [String, nil]
#
# @!attribute [rw] tags
#   @return [Array, nil]
#
# @!attribute [rw] url
#   @return [String, nil]
BooruCreateData = Struct.new(
  :artist,
  :created_at,
  :id,
  :source,
  :tags,
  :url,
  keyword_init: true
)

# Image entity data model.
#
# @!attribute [rw] artist
#   @return [String, nil]
#
# @!attribute [rw] id
#   @return [String, nil]
#
# @!attribute [rw] source
#   @return [String, nil]
#
# @!attribute [rw] tags
#   @return [Array, nil]
#
# @!attribute [rw] url
#   @return [String, nil]
Image = Struct.new(
  :artist,
  :id,
  :source,
  :tags,
  :url,
  keyword_init: true
)

# Request payload for Image#load.
#
# @!attribute [rw] artist
#   @return [String, nil]
#
# @!attribute [rw] id
#   @return [String]
#
# @!attribute [rw] source
#   @return [String, nil]
#
# @!attribute [rw] tags
#   @return [Array, nil]
#
# @!attribute [rw] url
#   @return [String, nil]
ImageLoadMatch = Struct.new(
  :artist,
  :id,
  :source,
  :tags,
  :url,
  keyword_init: true
)

