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
---@field id? string
---@field source? string
---@field tags? table
---@field url? string

---@class BooruLoadMatch
---@field id string

---@class BooruListMatch
---@field limit? number
---@field page? number
---@field tag? string

---@class BooruCreateData
---@field artist? string
---@field created_at? string
---@field id? string
---@field source? string
---@field tags? table
---@field url? string

---@class Image
---@field artist? string
---@field id? string
---@field source? string
---@field tags? table
---@field url? string

---@class ImageLoadMatch
---@field count? number

local M = {}

return M
