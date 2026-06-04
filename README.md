# NekosiaNeko SDK

Free image API serving cute anime neko (catgirl) artwork and related booru categories

> TypeScript, Python, PHP, Golang, Ruby, Lua SDKs, a CLI, an interactive REPL, and an MCP server for AI agents — all generated from one OpenAPI spec by [@voxgig/sdkgen](https://github.com/voxgig/sdkgen).

## About Nekosia Neko API

[Nekosia](https://nekosia.cat) is a free, community-oriented anime image API focused on cute neko (catgirl) artwork. It exposes a small booru-style image repository through a simple HTTP interface at `https://api.nekosia.cat/api/v1`, intended for embedding anime imagery into bots, websites, and small apps.

What you get from the API:

- Random cute anime images
- Anime catgirl (neko) images
- Foxgirl images
- Themed categories such as thigh-high socks, anime maids, tails with ribbons
- Random VTuber images

The public endpoints are documented as healthy and fast (typical response times in the low hundreds of milliseconds). CORS is enabled on most endpoints. Authentication and explicit rate limits are not documented on the public catalogue; use the API politely and check the official documentation for any updates.

## Try it

**TypeScript**
```bash
npm install nekosia-neko
```

**Python**
```bash
pip install nekosia-neko-sdk
```

**PHP**
```bash
composer require voxgig/nekosia-neko-sdk
```

**Golang**
```bash
go get github.com/voxgig-sdk/nekosia-neko-sdk/go
```

**Ruby**
```bash
gem install nekosia-neko-sdk
```

**Lua**
```bash
luarocks install nekosia-neko-sdk
```

## 30-second quickstart

### TypeScript

```ts
import { NekosiaNekoSDK } from 'nekosia-neko'

const client = new NekosiaNekoSDK({})

// List all boorus
const boorus = await client.Booru().list()
```

See the [TypeScript README](ts/README.md) for the
full guide, or scroll down for the same example in other languages.

## What's in the box

| Surface | Use it for | Path |
| --- | --- | --- |
| **SDK** (TypeScript, Python, PHP, Golang, Ruby, Lua) | App integration | `ts/` `py/` `php/` `go/` `rb/` `lua/` |
| **CLI** | Scripts, CI, ops, one-off API calls | `go-cli/` |
| **MCP server** | AI agents (Claude, Cursor, Cline) | `go-mcp/` |

## Use it from an AI agent (MCP)

The generated MCP server exposes every operation in this SDK as an
[MCP](https://modelcontextprotocol.io) tool that Claude, Cursor or Cline
can call directly. Build and register it:

```bash
cd go-mcp && go build -o nekosia-neko-mcp .
```

Then add it to your agent's MCP config (Claude Desktop, Cursor, etc.):

```json
{
  "mcpServers": {
    "nekosia-neko": {
      "command": "/abs/path/to/nekosia-neko-mcp"
    }
  }
}
```

## Entities

The API exposes 2 entities:

| Entity | Description | API path |
| --- | --- | --- |
| **Booru** | The booru-style image repository that backs the API, organising anime artwork into browsable categories and tags. | `/booru/images` |
| **Image** | A single anime image record returned by the random/category endpoints under `https://api.nekosia.cat/api/v1`. | `/images/husbando` |

Each entity supports the following operations where available: **load**,
**list**, **create**, **update**, and **remove**.

## Quickstart in other languages

### Python

```python
from nekosianeko_sdk import NekosiaNekoSDK

client = NekosiaNekoSDK({})

# List all boorus
boorus, err = client.Booru(None).list(None, None)

# Load a specific booru
booru, err = client.Booru(None).load(
    {"id": "example_id"}, None
)
```

### PHP

```php
<?php
require_once 'nekosianeko_sdk.php';

$client = new NekosiaNekoSDK([]);

// List all boorus
[$boorus, $err] = $client->Booru(null)->list(null, null);

// Load a specific booru
[$booru, $err] = $client->Booru(null)->load(
    ["id" => "example_id"], null
);
```

### Golang

```go
import sdk "github.com/voxgig-sdk/nekosia-neko-sdk/go"

client := sdk.NewNekosiaNekoSDK(map[string]any{})

// List all boorus
boorus, err := client.Booru(nil).List(nil, nil)
```

### Ruby

```ruby
require_relative "NekosiaNeko_sdk"

client = NekosiaNekoSDK.new({})

# List all boorus
boorus, err = client.Booru(nil).list(nil, nil)

# Load a specific booru
booru, err = client.Booru(nil).load(
  { "id" => "example_id" }, nil
)
```

### Lua

```lua
local sdk = require("nekosia-neko_sdk")

local client = sdk.new({})

-- List all boorus
local boorus, err = client:Booru(nil):list(nil, nil)

-- Load a specific booru
local booru, err = client:Booru(nil):load(
  { id = "example_id" }, nil
)
```

## Unit testing in offline mode

Every SDK ships a test mode that swaps the HTTP transport for an
in-memory mock, so unit tests run offline.

### TypeScript

```ts
const client = NekosiaNekoSDK.test()
const result = await client.Booru().load({ id: 'test01' })
// result.ok === true, result.data contains mock data
```

### Python

```python
client = NekosiaNekoSDK.test(None, None)
result, err = client.Booru(None).load(
    {"id": "test01"}, None
)
```

### PHP

```php
$client = NekosiaNekoSDK::test(null, null);
[$result, $err] = $client->Booru(null)->load(
    ["id" => "test01"], null
);
```

### Golang

```go
client := sdk.TestSDK(nil, nil)
result, err := client.Booru(nil).Load(
    map[string]any{"id": "test01"}, nil,
)
```

### Ruby

```ruby
client = NekosiaNekoSDK.test(nil, nil)
result, err = client.Booru(nil).load(
  { "id" => "test01" }, nil
)
```

### Lua

```lua
local client = sdk.test(nil, nil)
local result, err = client:Booru(nil):load(
  { id = "test01" }, nil
)
```

## How it works

Every SDK call runs the same five-stage pipeline:

1. **Point** — resolve the API endpoint from the operation definition.
2. **Spec** — build the HTTP specification (URL, method, headers, body).
3. **Request** — send the HTTP request.
4. **Response** — receive and parse the response.
5. **Result** — extract the result data for the caller.

A feature hook fires at each stage (e.g. `PrePoint`, `PreSpec`,
`PreRequest`), so features can inspect or modify the pipeline without
forking the SDK.

### Features

| Feature | Purpose |
| --- | --- |
| **TestFeature** | In-memory mock transport for testing without a live server |

Pass custom features via the `extend` option at construction time.

### Direct and Prepare

For endpoints the entity model doesn't cover, use the low-level methods:

- **`direct(fetchargs)`** — build and send an HTTP request in one step.
- **`prepare(fetchargs)`** — build the request without sending it.

Both accept a map with `path`, `method`, `params`, `query`,
`headers`, and `body`. See the [How-to guides](#how-to-guides) below.

## How-to guides

### Make a direct API call

When the entity interface does not cover an endpoint, use `direct`:

**TypeScript:**
```ts
const result = await client.direct({
  path: '/api/resource/{id}',
  method: 'GET',
  params: { id: 'example' },
})
console.log(result.data)
```

**Python:**
```python
result, err = client.direct({
    "path": "/api/resource/{id}",
    "method": "GET",
    "params": {"id": "example"},
})
```

**PHP:**
```php
[$result, $err] = $client->direct([
    "path" => "/api/resource/{id}",
    "method" => "GET",
    "params" => ["id" => "example"],
]);
```

**Go:**
```go
result, err := client.Direct(map[string]any{
    "path":   "/api/resource/{id}",
    "method": "GET",
    "params": map[string]any{"id": "example"},
})
```

**Ruby:**
```ruby
result, err = client.direct({
  "path" => "/api/resource/{id}",
  "method" => "GET",
  "params" => { "id" => "example" },
})
```

**Lua:**
```lua
local result, err = client:direct({
  path = "/api/resource/{id}",
  method = "GET",
  params = { id = "example" },
})
```

## Per-language documentation

- [TypeScript](ts/README.md)
- [Python](py/README.md)
- [PHP](php/README.md)
- [Golang](go/README.md)
- [Ruby](rb/README.md)
- [Lua](lua/README.md)

## Using the Nekosia Neko API

- Upstream: [https://nekosia.cat](https://nekosia.cat)
- API docs: [https://nekosia.cat/documentation](https://nekosia.cat/documentation)

---

Generated from the Nekosia Neko API OpenAPI spec by [@voxgig/sdkgen](https://github.com/voxgig/sdkgen).
