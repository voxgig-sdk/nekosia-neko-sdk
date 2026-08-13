# NekosiaNeko SDK feature factory

from nekosianeko_sdk.feature.base_feature import NekosiaNekoBaseFeature
from nekosianeko_sdk.feature.test_feature import NekosiaNekoTestFeature


def _make_feature(name):
    features = {
        "base": lambda: NekosiaNekoBaseFeature(),
        "test": lambda: NekosiaNekoTestFeature(),
    }
    factory = features.get(name)
    if factory is not None:
        return factory()
    return features["base"]()
