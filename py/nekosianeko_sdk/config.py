# NekosiaNeko SDK configuration


# The sekreto plugin DEFINITIONS the model selected per feature, imported
# above by name from the modules the catalogue's active `plugin.def`
# entries declare. Handed to each feature (secrets builds its Sekreto
# with them): a provider kind not listed here is unknown to that SDK.
FEATURE_PLUGINS = {
}


_shared_config = None


def shared_config():
    """Return the process-wide config, built once on first use.

    The SDK reads the config on every request and never writes to it, so one
    instance is shared by every client rather than rebuilt per client.

    The returned dict is shared: treat it as read-only. Callers that need to
    mutate should use make_config, which always returns a fresh copy.
    """
    global _shared_config
    if _shared_config is None:
        _shared_config = make_config()
    return _shared_config


def make_config():
    """Build a fresh, fully materialised config dict.

    Every call rebuilds the whole structure, so prefer shared_config unless
    you need a private copy you intend to mutate.
    """
    return {
        "main": {
            "name": "NekosiaNeko",
            "slug": "nekosia-neko",
            "version": "0.0.1",
            "target": "py",
        },
        "feature": {
            "ratelimit": {
        "options": {
          "active": False,
          "burst": 5,
          "rate": 5,
        },
        "optspec": {
          "now": "`$FUNCTION`",
          "sleep": "`$FUNCTION`",
        },
        "strict": False,
        "transport": "wrap",
      },
            "retry": {
        "options": {
          "active": False,
          "factor": 2,
          "maxDelay": 2000,
          "minDelay": 50,
          "retries": 2,
          "statuses": [
            408,
            425,
            429,
            500,
            502,
            503,
            504,
          ],
        },
        "optspec": {
          "jitter": "`$BOOLEAN`",
          "sleep": "`$FUNCTION`",
        },
        "strict": False,
        "transport": "wrap",
      },
            "test": {
        "options": {
          "active": False,
        },
        "optspec": {
          "entity": "`$MAP`",
          "net": "`$MAP`",
        },
        "strict": False,
        "transport": "base",
      },
            "timeout": {
        "options": {
          "active": False,
          "ms": 30000,
        },
        "optspec": {
          "clearTimer": "`$FUNCTION`",
          "setTimer": "`$FUNCTION`",
        },
        "strict": False,
        "transport": "wrap",
      },
        },
        "options": {
            "base": "https://api.nekosia.cat/api/v1",
            "headers": {
        "content-type": "application/json",
      },
            "entity": {
                "booru": {},
                "image": {},
            },
        },
        "entity": {
      "booru": {
        "fields": [
          {
            "name": "artist",
            "title": "Artist",
            "type": "`$STRING`",
          },
          {
            "name": "created_at",
            "title": "Created At",
            "type": "`$STRING`",
            "format": "date-time",
          },
          {
            "name": "id",
            "title": "Id",
            "type": "`$STRING`",
          },
          {
            "name": "source",
            "title": "Source",
            "type": "`$STRING`",
          },
          {
            "name": "tags",
            "title": "Tags",
            "type": "`$ARRAY`",
          },
          {
            "name": "url",
            "title": "Url",
            "type": "`$STRING`",
            "format": "uri",
          },
        ],
        "id": {
          "field": "id",
          "name": "id",
        },
        "name": "booru",
        "op": {
          "create": {
            "input": "data",
            "name": "create",
            "points": [
              {
                "kind": "http",
                "method": "POST",
                "orig": "/booru/images",
                "segments": [
                  {
                    "lit": "booru",
                  },
                  {
                    "lit": "images",
                  },
                ],
                "parts": [
                  "booru",
                  "images",
                ],
                "rename": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body.data`",
                },
                "args": {},
                "select": {
                  "$action": "image",
                },
              },
            ],
          },
          "list": {
            "input": "data",
            "name": "list",
            "points": [
              {
                "kind": "http",
                "method": "GET",
                "orig": "/booru/images",
                "segments": [
                  {
                    "lit": "booru",
                  },
                  {
                    "lit": "images",
                  },
                ],
                "parts": [
                  "booru",
                  "images",
                ],
                "rename": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "args": {
                  "query": [
                    {
                      "name": "limit",
                      "orig": "limit",
                      "type": "`$INTEGER`",
                      "kind": "query",
                      "example": 20,
                    },
                    {
                      "name": "page",
                      "orig": "page",
                      "type": "`$INTEGER`",
                      "kind": "query",
                      "example": 1,
                    },
                    {
                      "name": "tag",
                      "orig": "tag",
                      "type": "`$STRING`",
                      "kind": "query",
                    },
                  ],
                },
                "select": {
                  "$action": "image",
                  "exist": [
                    "limit",
                    "page",
                    "tag",
                  ],
                },
              },
            ],
          },
          "load": {
            "input": "data",
            "name": "load",
            "points": [
              {
                "kind": "http",
                "method": "GET",
                "orig": "/booru/images/{id}",
                "segments": [
                  {
                    "lit": "booru",
                  },
                  {
                    "lit": "images",
                  },
                  {
                    "var": "id",
                  },
                ],
                "parts": [
                  "booru",
                  "images",
                  "{id}",
                ],
                "rename": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body.data`",
                },
                "args": {
                  "params": [
                    {
                      "name": "id",
                      "orig": "id",
                      "type": "`$STRING`",
                      "kind": "param",
                      "reqd": True,
                    },
                  ],
                },
                "select": {
                  "exist": [
                    "id",
                  ],
                },
              },
            ],
          },
        },
        "relations": {
          "ancestors": [],
        },
      },
      "image": {
        "fields": [],
        "name": "image",
        "op": {
          "load": {
            "input": "data",
            "name": "load",
            "points": [
              {
                "kind": "http",
                "method": "GET",
                "orig": "/images/husbando",
                "segments": [
                  {
                    "lit": "images",
                  },
                  {
                    "lit": "husbando",
                  },
                ],
                "parts": [
                  "images",
                  "husbando",
                ],
                "rename": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body.data`",
                },
                "args": {
                  "query": [
                    {
                      "name": "count",
                      "orig": "count",
                      "type": "`$INTEGER`",
                      "kind": "query",
                      "example": 1,
                    },
                  ],
                },
                "select": {
                  "$action": "husbando",
                  "exist": [
                    "count",
                  ],
                },
              },
              {
                "kind": "http",
                "method": "GET",
                "orig": "/images/kitsune",
                "segments": [
                  {
                    "lit": "images",
                  },
                  {
                    "lit": "kitsune",
                  },
                ],
                "parts": [
                  "images",
                  "kitsune",
                ],
                "rename": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body.data`",
                },
                "args": {
                  "query": [
                    {
                      "name": "count",
                      "orig": "count",
                      "type": "`$INTEGER`",
                      "kind": "query",
                      "example": 1,
                    },
                  ],
                },
                "select": {
                  "$action": "kitsune",
                  "exist": [
                    "count",
                  ],
                },
              },
              {
                "kind": "http",
                "method": "GET",
                "orig": "/images/neko",
                "segments": [
                  {
                    "lit": "images",
                  },
                  {
                    "lit": "neko",
                  },
                ],
                "parts": [
                  "images",
                  "neko",
                ],
                "rename": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body.data`",
                },
                "args": {
                  "query": [
                    {
                      "name": "count",
                      "orig": "count",
                      "type": "`$INTEGER`",
                      "kind": "query",
                      "example": 1,
                    },
                  ],
                },
                "select": {
                  "$action": "neko",
                  "exist": [
                    "count",
                  ],
                },
              },
              {
                "kind": "http",
                "method": "GET",
                "orig": "/images/waifu",
                "segments": [
                  {
                    "lit": "images",
                  },
                  {
                    "lit": "waifu",
                  },
                ],
                "parts": [
                  "images",
                  "waifu",
                ],
                "rename": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body.data`",
                },
                "args": {
                  "query": [
                    {
                      "name": "count",
                      "orig": "count",
                      "type": "`$INTEGER`",
                      "kind": "query",
                      "example": 1,
                    },
                  ],
                },
                "select": {
                  "$action": "waifu",
                  "exist": [
                    "count",
                  ],
                },
              },
            ],
          },
        },
        "relations": {
          "ancestors": [],
        },
      },
    },
    }
