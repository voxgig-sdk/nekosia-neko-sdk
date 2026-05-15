# NekosiaNeko SDK feature factory

require_relative 'feature/base_feature'
require_relative 'feature/test_feature'


module NekosiaNekoFeatures
  def self.make_feature(name)
    case name
    when "base"
      NekosiaNekoBaseFeature.new
    when "test"
      NekosiaNekoTestFeature.new
    else
      NekosiaNekoBaseFeature.new
    end
  end
end
