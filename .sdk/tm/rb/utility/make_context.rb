# NekosiaNeko SDK utility: make_context
require_relative '../core/context'
module NekosiaNekoUtilities
  MakeContext = ->(ctxmap, basectx) {
    NekosiaNekoContext.new(ctxmap, basectx)
  }
end
