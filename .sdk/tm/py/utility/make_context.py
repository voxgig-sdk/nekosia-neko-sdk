# NekosiaNeko SDK utility: make_context

from core.context import NekosiaNekoContext


def make_context_util(ctxmap, basectx):
    return NekosiaNekoContext(ctxmap, basectx)
