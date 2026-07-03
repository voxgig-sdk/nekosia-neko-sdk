package = "voxgig-sdk-nekosia-neko"
version = "0.0.1-1"
source = {
  -- git+https (GitHub dropped git:// in 2022); pin the install to the release
  -- tag pushed by `make publish`, and point at the lua/ subdir of the monorepo.
  url = "git+https://github.com/voxgig-sdk/nekosia-neko-sdk.git",
  tag = "lua/v0.0.1",
  dir = "nekosia-neko-sdk/lua"
}
description = {
  summary = "NekosiaNeko SDK for Lua",
  license = "MIT"
}
dependencies = {
  "lua >= 5.3",
  "dkjson >= 2.5",
  "dkjson >= 2.5",
}
build = {
  type = "builtin",
  modules = {
    ["nekosia-neko_sdk"] = "nekosia-neko_sdk.lua",
    ["config"] = "config.lua",
    ["features"] = "features.lua",
  }
}
