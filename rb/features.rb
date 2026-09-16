# NekosiaNeko SDK feature factory

require_relative 'feature/base_feature'
require_relative 'feature/ratelimit_feature'
require_relative 'feature/retry_feature'
require_relative 'feature/test_feature'
require_relative 'feature/timeout_feature'


module NekosiaNekoFeatures
  def self.make_feature(name)
    case name
    when "base"
      NekosiaNekoBaseFeature.new
    when "ratelimit"
      NekosiaNekoRatelimitFeature.new
    when "retry"
      NekosiaNekoRetryFeature.new
    when "test"
      NekosiaNekoTestFeature.new
    when "timeout"
      NekosiaNekoTimeoutFeature.new
    else
      NekosiaNekoBaseFeature.new
    end
  end
end
