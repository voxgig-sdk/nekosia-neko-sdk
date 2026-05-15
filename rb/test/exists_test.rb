# NekosiaNeko SDK exists test

require "minitest/autorun"
require_relative "../NekosiaNeko_sdk"

class ExistsTest < Minitest::Test
  def test_create_test_sdk
    testsdk = NekosiaNekoSDK.test(nil, nil)
    assert !testsdk.nil?
  end
end
