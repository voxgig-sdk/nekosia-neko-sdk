-- Typed models for the NekosiaNeko SDK (LuaLS annotations).
--
-- GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
-- params (op.<name>.points[].args.params[]). Field/param types come from the
-- canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
-- @voxgig/apidef VALID_CANON). Annotations only — no runtime effect. Do not
-- edit by hand.

---@class Booru
---@field artist? string
---@field created_at? string
---@field data? table
---@field id? string
---@field source? string
---@field status? string
---@field tag? table
---@field url string

---@class BooruLoadMatch
---@field id string

---@class BooruListMatch
---@field artist? string
---@field created_at? string
---@field data? table
---@field id? string
---@field source? string
---@field status? string
---@field tag? table
---@field url? string

---@class BooruCreateData
---@field artist? string
---@field created_at? string
---@field data? table
---@field id? string
---@field source? string
---@field status? string
---@field tag? table
---@field url string

---@class Image
---@field data? table
---@field status? string

---@class ImageLoadMatch
---@field data? table
---@field status? string

local M = {}

return M
