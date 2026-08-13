# NekosiaNeko SDK exists test

import pytest
from nekosianeko_sdk import NekosiaNekoSDK


class TestExists:

    def test_should_create_test_sdk(self):
        testsdk = NekosiaNekoSDK.test(None, None)
        assert testsdk is not None
