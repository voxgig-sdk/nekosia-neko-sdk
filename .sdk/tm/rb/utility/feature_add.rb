# NekosiaNeko SDK utility: feature_add
module NekosiaNekoUtilities
  FeatureAdd = ->(ctx, f) {
    ctx.client.features << f
  }
end
