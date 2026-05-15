# NekosiaNeko SDK utility registration
require_relative '../core/utility_type'
require_relative 'clean'
require_relative 'done'
require_relative 'make_error'
require_relative 'feature_add'
require_relative 'feature_hook'
require_relative 'feature_init'
require_relative 'fetcher'
require_relative 'make_fetch_def'
require_relative 'make_context'
require_relative 'make_options'
require_relative 'make_request'
require_relative 'make_response'
require_relative 'make_result'
require_relative 'make_point'
require_relative 'make_spec'
require_relative 'make_url'
require_relative 'param'
require_relative 'prepare_auth'
require_relative 'prepare_body'
require_relative 'prepare_headers'
require_relative 'prepare_method'
require_relative 'prepare_params'
require_relative 'prepare_path'
require_relative 'prepare_query'
require_relative 'result_basic'
require_relative 'result_body'
require_relative 'result_headers'
require_relative 'transform_request'
require_relative 'transform_response'

NekosiaNekoUtility.registrar = ->(u) {
  u.clean = NekosiaNekoUtilities::Clean
  u.done = NekosiaNekoUtilities::Done
  u.make_error = NekosiaNekoUtilities::MakeError
  u.feature_add = NekosiaNekoUtilities::FeatureAdd
  u.feature_hook = NekosiaNekoUtilities::FeatureHook
  u.feature_init = NekosiaNekoUtilities::FeatureInit
  u.fetcher = NekosiaNekoUtilities::Fetcher
  u.make_fetch_def = NekosiaNekoUtilities::MakeFetchDef
  u.make_context = NekosiaNekoUtilities::MakeContext
  u.make_options = NekosiaNekoUtilities::MakeOptions
  u.make_request = NekosiaNekoUtilities::MakeRequest
  u.make_response = NekosiaNekoUtilities::MakeResponse
  u.make_result = NekosiaNekoUtilities::MakeResult
  u.make_point = NekosiaNekoUtilities::MakePoint
  u.make_spec = NekosiaNekoUtilities::MakeSpec
  u.make_url = NekosiaNekoUtilities::MakeUrl
  u.param = NekosiaNekoUtilities::Param
  u.prepare_auth = NekosiaNekoUtilities::PrepareAuth
  u.prepare_body = NekosiaNekoUtilities::PrepareBody
  u.prepare_headers = NekosiaNekoUtilities::PrepareHeaders
  u.prepare_method = NekosiaNekoUtilities::PrepareMethod
  u.prepare_params = NekosiaNekoUtilities::PrepareParams
  u.prepare_path = NekosiaNekoUtilities::PreparePath
  u.prepare_query = NekosiaNekoUtilities::PrepareQuery
  u.result_basic = NekosiaNekoUtilities::ResultBasic
  u.result_body = NekosiaNekoUtilities::ResultBody
  u.result_headers = NekosiaNekoUtilities::ResultHeaders
  u.transform_request = NekosiaNekoUtilities::TransformRequest
  u.transform_response = NekosiaNekoUtilities::TransformResponse
}
