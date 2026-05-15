# NekosiaNeko Ruby SDK Reference

Complete API reference for the NekosiaNeko Ruby SDK.


## NekosiaNekoSDK

### Constructor

```ruby
require_relative 'nekosia-neko_sdk'

client = NekosiaNekoSDK.new(options)
```

Create a new SDK client instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `options` | `Hash` | SDK configuration options. |
| `options["apikey"]` | `String` | API key for authentication. |
| `options["base"]` | `String` | Base URL for API requests. |
| `options["prefix"]` | `String` | URL prefix appended after base. |
| `options["suffix"]` | `String` | URL suffix appended after path. |
| `options["headers"]` | `Hash` | Custom headers for all requests. |
| `options["feature"]` | `Hash` | Feature configuration. |
| `options["system"]` | `Hash` | System overrides (e.g. custom fetch). |


### Static Methods

#### `NekosiaNekoSDK.test(testopts = nil, sdkopts = nil)`

Create a test client with mock features active. Both arguments may be `nil`.

```ruby
client = NekosiaNekoSDK.test
```


### Instance Methods

#### `Booru(data = nil)`

Create a new `Booru` entity instance. Pass `nil` for no initial data.

#### `Image(data = nil)`

Create a new `Image` entity instance. Pass `nil` for no initial data.

#### `options_map -> Hash`

Return a deep copy of the current SDK options.

#### `get_utility -> Utility`

Return a copy of the SDK utility object.

#### `direct(fetchargs = {}) -> Hash, err`

Make a direct HTTP request to any API endpoint.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `fetchargs["path"]` | `String` | URL path with optional `{param}` placeholders. |
| `fetchargs["method"]` | `String` | HTTP method (default: `"GET"`). |
| `fetchargs["params"]` | `Hash` | Path parameter values for `{param}` substitution. |
| `fetchargs["query"]` | `Hash` | Query string parameters. |
| `fetchargs["headers"]` | `Hash` | Request headers (merged with defaults). |
| `fetchargs["body"]` | `any` | Request body (hashes are JSON-serialized). |
| `fetchargs["ctrl"]` | `Hash` | Control options (e.g. `{ "explain" => true }`). |

**Returns:** `Hash, err`

#### `prepare(fetchargs = {}) -> Hash, err`

Prepare a fetch definition without sending the request. Accepts the
same parameters as `direct()`.

**Returns:** `Hash, err`


---

## BooruEntity

```ruby
booru = client.Booru
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `artist` | ``$STRING`` | No |  |
| `created_at` | ``$STRING`` | No |  |
| `data` | ``$OBJECT`` | No |  |
| `id` | ``$STRING`` | No |  |
| `source` | ``$STRING`` | No |  |
| `status` | ``$STRING`` | No |  |
| `tag` | ``$ARRAY`` | No |  |
| `url` | ``$STRING`` | Yes |  |

### Field Usage by Operation

| Field | load | list | create | update | remove |
| --- | --- | --- | --- | --- | --- |
| `artist` | - | - | - | - | - |
| `created_at` | - | - | - | - | - |
| `data` | - | - | - | - | - |
| `id` | - | - | - | - | - |
| `source` | - | - | - | - | - |
| `status` | - | - | - | - | - |
| `tag` | - | - | - | - | - |
| `url` | - | Yes | - | - | - |

### Operations

#### `create(reqdata, ctrl = nil) -> result, err`

Create a new entity with the given data.

```ruby
result, err = client.Booru.create({
  "url" => # `$STRING`,
})
```

#### `list(reqmatch, ctrl = nil) -> result, err`

List entities matching the given criteria. Returns an array.

```ruby
results, err = client.Booru.list(nil)
```

#### `load(reqmatch, ctrl = nil) -> result, err`

Load a single entity matching the given criteria.

```ruby
result, err = client.Booru.load({ "id" => "booru_id" })
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `BooruEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## ImageEntity

```ruby
image = client.Image
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `data` | ``$OBJECT`` | No |  |
| `status` | ``$STRING`` | No |  |

### Operations

#### `load(reqmatch, ctrl = nil) -> result, err`

Load a single entity matching the given criteria.

```ruby
result, err = client.Image.load({ "id" => "image_id" })
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `ImageEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## Features

| Feature | Version | Description |
| --- | --- | --- |
| `test` | 0.0.1 | In-memory mock transport for testing without a live server |


Features are activated via the `feature` option:

```ruby
client = NekosiaNekoSDK.new({
  "feature" => {
    "test" => { "active" => true },
  },
})
```

