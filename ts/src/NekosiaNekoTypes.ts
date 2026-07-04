// Typed models for the NekosiaNeko SDK.
//
// GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
// params (op.<name>.points[].args.params[]). Field/param types come from the
// canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
// @voxgig/apidef VALID_CANON). Do not edit by hand.

export interface Booru {
  artist?: string
  created_at?: string
  data?: Record<string, any>
  id?: string
  source?: string
  status?: string
  tag?: any[]
  url: string
}

export interface BooruLoadMatch {
  id: string
}

export type BooruListMatch = Partial<Booru>

export type BooruCreateData = Partial<Booru>

export interface Image {
  data?: Record<string, any>
  status?: string
}

export type ImageLoadMatch = Partial<Image>

