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
            "type": "`$STRING`",
          },
          {
            "format": "date-time",
            "name": "created_at",
            "type": "`$STRING`",
          },
          {
            "name": "id",
            "type": "`$STRING`",
          },
          {
            "name": "source",
            "type": "`$STRING`",
          },
          {
            "name": "tags",
            "type": "`$ARRAY`",
          },
          {
            "format": "uri",
            "name": "url",
            "type": "`$STRING`",
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
                "args": {},
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
                "select": {
                  "$action": "image",
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body.data`",
                },
                "parts": [
                  "booru",
                  "images",
                ],
              },
            ],
          },
          "list": {
            "input": "data",
            "name": "list",
            "points": [
              {
                "args": {
                  "query": [
                    {
                      "example": 20,
                      "kind": "query",
                      "name": "limit",
                      "orig": "limit",
                      "type": "`$INTEGER`",
                    },
                    {
                      "example": 1,
                      "kind": "query",
                      "name": "page",
                      "orig": "page",
                      "type": "`$INTEGER`",
                    },
                    {
                      "kind": "query",
                      "name": "tag",
                      "orig": "tag",
                      "type": "`$STRING`",
                    },
                  ],
                },
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
                "select": {
                  "$action": "image",
                  "exist": [
                    "limit",
                    "page",
                    "tag",
                  ],
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "parts": [
                  "booru",
                  "images",
                ],
              },
            ],
          },
          "load": {
            "input": "data",
            "name": "load",
            "points": [
              {
                "args": {
                  "params": [
                    {
                      "kind": "param",
                      "name": "id",
                      "orig": "id",
                      "reqd": True,
                      "type": "`$STRING`",
                    },
                  ],
                },
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
                "select": {
                  "exist": [
                    "id",
                  ],
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body.data`",
                },
                "parts": [
                  "booru",
                  "images",
                  "{id}",
                ],
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
                "args": {
                  "query": [
                    {
                      "example": 1,
                      "kind": "query",
                      "name": "count",
                      "orig": "count",
                      "type": "`$INTEGER`",
                    },
                  ],
                },
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
                "select": {
                  "$action": "husbando",
                  "exist": [
                    "count",
                  ],
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body.data`",
                },
                "parts": [
                  "images",
                  "husbando",
                ],
              },
              {
                "args": {
                  "query": [
                    {
                      "example": 1,
                      "kind": "query",
                      "name": "count",
                      "orig": "count",
                      "type": "`$INTEGER`",
                    },
                  ],
                },
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
                "select": {
                  "$action": "kitsune",
                  "exist": [
                    "count",
                  ],
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body.data`",
                },
                "parts": [
                  "images",
                  "kitsune",
                ],
              },
              {
                "args": {
                  "query": [
                    {
                      "example": 1,
                      "kind": "query",
                      "name": "count",
                      "orig": "count",
                      "type": "`$INTEGER`",
                    },
                  ],
                },
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
                "select": {
                  "$action": "neko",
                  "exist": [
                    "count",
                  ],
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body.data`",
                },
                "parts": [
                  "images",
                  "neko",
                ],
              },
              {
                "args": {
                  "query": [
                    {
                      "example": 1,
                      "kind": "query",
                      "name": "count",
                      "orig": "count",
                      "type": "`$INTEGER`",
                    },
                  ],
                },
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
                "select": {
                  "$action": "waifu",
                  "exist": [
                    "count",
                  ],
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body.data`",
                },
                "parts": [
                  "images",
                  "waifu",
                ],
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
