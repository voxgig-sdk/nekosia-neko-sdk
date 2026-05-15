# NekosiaNeko Python SDK Reference

Complete API reference for the NekosiaNeko Python SDK.


## NekosiaNekoSDK

### Constructor

```python
from nekosia-neko_sdk import NekosiaNekoSDK

client = NekosiaNekoSDK(options)
```

Create a new SDK client instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `options` | `dict` | SDK configuration options. |
| `options["apikey"]` | `str` | API key for authentication. |
| `options["base"]` | `str` | Base URL for API requests. |
| `options["prefix"]` | `str` | URL prefix appended after base. |
| `options["suffix"]` | `str` | URL suffix appended after path. |
| `options["headers"]` | `dict` | Custom headers for all requests. |
| `options["feature"]` | `dict` | Feature configuration. |
| `options["system"]` | `dict` | System overrides (e.g. custom fetch). |


### Static Methods

#### `NekosiaNekoSDK.test(testopts=None, sdkopts=None)`

Create a test client with mock features active. Both arguments may be `None`.

```python
client = NekosiaNekoSDK.test()
```


### Instance Methods

#### `Booru(data=None)`

Create a new `BooruEntity` instance. Pass `None` for no initial data.

#### `Image(data=None)`

Create a new `ImageEntity` instance. Pass `None` for no initial data.

#### `options_map() -> dict`

Return a deep copy of the current SDK options.

#### `get_utility() -> Utility`

Return a copy of the SDK utility object.

#### `direct(fetchargs=None) -> tuple`

Make a direct HTTP request to any API endpoint. Returns `(result, err)`.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `fetchargs["path"]` | `str` | URL path with optional `{param}` placeholders. |
| `fetchargs["method"]` | `str` | HTTP method (default: `"GET"`). |
| `fetchargs["params"]` | `dict` | Path parameter values. |
| `fetchargs["query"]` | `dict` | Query string parameters. |
| `fetchargs["headers"]` | `dict` | Request headers (merged with defaults). |
| `fetchargs["body"]` | `any` | Request body (dicts are JSON-serialized). |

**Returns:** `(result_dict, err)`

#### `prepare(fetchargs=None) -> tuple`

Prepare a fetch definition without sending. Returns `(fetchdef, err)`.


---

## BooruEntity

```python
booru = client.Booru()
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

#### `create(reqdata, ctrl=None) -> tuple`

Create a new entity with the given data.

```python
result, err = client.Booru().create({
    "url": # `$STRING`,
})
```

#### `list(reqmatch, ctrl=None) -> tuple`

List entities matching the given criteria. Returns an array.

```python
results, err = client.Booru().list({})
```

#### `load(reqmatch, ctrl=None) -> tuple`

Load a single entity matching the given criteria.

```python
result, err = client.Booru().load({"id": "booru_id"})
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `BooruEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## ImageEntity

```python
image = client.Image()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `data` | ``$OBJECT`` | No |  |
| `status` | ``$STRING`` | No |  |

### Operations

#### `load(reqmatch, ctrl=None) -> tuple`

Load a single entity matching the given criteria.

```python
result, err = client.Image().load({"id": "image_id"})
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `ImageEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## Features

| Feature | Version | Description |
| --- | --- | --- |
| `test` | 0.0.1 | In-memory mock transport for testing without a live server |


Features are activated via the `feature` option:

```python
client = NekosiaNekoSDK({
    "feature": {
        "test": {"active": True},
    },
})
```

