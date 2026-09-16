# NekosiaNeko SDK feature factory

from nekosianeko_sdk.feature.base_feature import NekosiaNekoBaseFeature
from nekosianeko_sdk.feature.ratelimit_feature import NekosiaNekoRatelimitFeature
from nekosianeko_sdk.feature.retry_feature import NekosiaNekoRetryFeature
from nekosianeko_sdk.feature.test_feature import NekosiaNekoTestFeature
from nekosianeko_sdk.feature.timeout_feature import NekosiaNekoTimeoutFeature


_FEATURES = {
    "base": lambda: NekosiaNekoBaseFeature(),
    "ratelimit": lambda: NekosiaNekoRatelimitFeature(),
    "retry": lambda: NekosiaNekoRetryFeature(),
    "test": lambda: NekosiaNekoTestFeature(),
    "timeout": lambda: NekosiaNekoTimeoutFeature(),
}


def _make_feature(name):
    factory = _FEATURES.get(name)
    if factory is not None:
        return factory()
    return _FEATURES["base"]()


# True when this SDK was generated with the named feature class - the
# constructor's tolerance for extend-carried features reads this (an
# active name with no generated class must not become a BaseFeature
# stray when an extend instance carries it).
def _has_feature(name):
    return name in _FEATURES
