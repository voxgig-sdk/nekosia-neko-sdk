-- NekosiaNeko SDK error

local NekosiaNekoError = {}
NekosiaNekoError.__index = NekosiaNekoError


function NekosiaNekoError.new(code, msg, ctx)
  local self = setmetatable({}, NekosiaNekoError)
  self.is_sdk_error = true
  self.sdk = "NekosiaNeko"
  self.code = code or ""
  self.msg = msg or ""
  self.ctx = ctx
  self.result = nil
  self.spec = nil
  return self
end


function NekosiaNekoError:error()
  return self.msg
end


function NekosiaNekoError:__tostring()
  return self.msg
end


return NekosiaNekoError
