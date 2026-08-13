# NekosiaNeko SDK utility: make_context

from nekosianeko_sdk.core.context import NekosiaNekoContext


def make_context_util(ctxmap, basectx):
    return NekosiaNekoContext(ctxmap, basectx)
