// Typed models for the NekosiaNeko SDK.
//
// GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
// params (op.<name>.points[].args.params[]). Field/param types come from the
// canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
// @voxgig/apidef VALID_CANON). Do not edit by hand.

export interface Booru {
  artist?: string
  created_at?: string
  id?: string
  source?: string
  tags?: any[]
  url?: string
}

export interface BooruLoadMatch {
  id: string
}

export interface BooruListMatch {
  limit?: number
  page?: number
  tag?: string

  // Selects a custom action instead of the plain list:
  //   'image'
  // The remaining keys are that action's own payload.
  $action?: string
  [action: string]: any
}

export interface BooruCreateData {
  artist?: string
  created_at?: string
  id?: string
  source?: string
  tags?: any[]
  url?: string

  // Selects a custom action instead of the plain create:
  //   'image'
  // The remaining keys are that action's own payload.
  $action?: string
  [action: string]: any
}

export interface Image {
  artist?: string
  id?: string
  source?: string
  tags?: any[]
  url?: string
}

export interface ImageLoadMatch {
  count?: number

  // Selects a custom action instead of the plain load:
  //   'husbando' | 'kitsune' | 'neko' | 'waifu'
  // The remaining keys are that action's own payload.
  $action?: string
  [action: string]: any
}

