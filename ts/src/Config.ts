
import { BaseFeature } from './feature/base/BaseFeature'
import { TestFeature } from './feature/test/TestFeature'



const FEATURE_CLASS: Record<string, typeof BaseFeature> = {
   test: TestFeature,

}


class Config {

  makeFeature(this: any, fn: string) {
    const fc = FEATURE_CLASS[fn]
    const fi = new fc()
    // TODO: errors etc
    return fi
  }

  // False for a feature added at runtime via options.extend (station's
  // adopt path) - the constructor uses this to skip makeFeature for names
  // no generated class backs.
  hasFeature(this: any, fn: string) {
    return null != FEATURE_CLASS[fn]
  }


  main = {
    name: 'NekosiaNeko',
        slug: "nekosia-neko",
    version: "0.0.1",
    target: "ts",

  }


  feature = {
     test:     {
      "options": {
        "active": false
      }
    },

  }


  options = {
    base: "https://api.nekosia.cat/api/v1",

    headers: {
      "content-type": "application/json"
    },

    entity: {
      
      booru: {
      },

      image: {
      },

    }
  }


  entity = {
    "booru": {
      "fields": [
        {
          "name": "artist",
          "short": "Name of the artist",
          "type": "`$STRING`"
        },
        {
          "name": "created_at",
          "type": "`$STRING`"
        },
        {
          "name": "id",
          "type": "`$STRING`"
        },
        {
          "name": "source",
          "short": "Original source URL",
          "type": "`$STRING`"
        },
        {
          "name": "tags",
          "short": "Tags associated with the image",
          "type": "`$ARRAY`"
        },
        {
          "name": "url",
          "op": {
            "create": {
              "req": true,
              "type": "`$STRING`"
            }
          },
          "short": "URL of the image to add",
          "type": "`$STRING`"
        }
      ],
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
              "parts": [
                "booru",
                "images"
              ],
              "select": {
                "$action": "image"
              },
              "transform": {
                "req": "`reqdata`",
                "res": "`body.data`"
              }
            }
          ]
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
                    "type": "`$INTEGER`"
                  },
                  {
                    "example": 1,
                    "kind": "query",
                    "name": "page",
                    "orig": "page",
                    "type": "`$INTEGER`"
                  },
                  {
                    "kind": "query",
                    "name": "tag",
                    "orig": "tag",
                    "type": "`$STRING`"
                  }
                ]
              },
              "kind": "http",
              "method": "GET",
              "orig": "/booru/images",
              "parts": [
                "booru",
                "images"
              ],
              "select": {
                "$action": "image",
                "exist": [
                  "limit",
                  "page",
                  "tag"
                ]
              },
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              }
            }
          ]
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
                    "reqd": true,
                    "type": "`$STRING`"
                  }
                ]
              },
              "kind": "http",
              "method": "GET",
              "orig": "/booru/images/{id}",
              "parts": [
                "booru",
                "images",
                "{id}"
              ],
              "select": {
                "exist": [
                  "id"
                ]
              },
              "transform": {
                "req": "`reqdata`",
                "res": "`body.data`"
              }
            }
          ]
        }
      },
      "relations": {
        "ancestors": []
      }
    },
    "image": {
      "fields": [
        {
          "name": "artist",
          "type": "`$STRING`"
        },
        {
          "name": "id",
          "type": "`$STRING`"
        },
        {
          "name": "source",
          "type": "`$STRING`"
        },
        {
          "name": "tags",
          "type": "`$ARRAY`"
        },
        {
          "name": "url",
          "type": "`$STRING`"
        }
      ],
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
                    "type": "`$INTEGER`"
                  }
                ]
              },
              "kind": "http",
              "method": "GET",
              "orig": "/images/husbando",
              "parts": [
                "images",
                "husbando"
              ],
              "select": {
                "$action": "husbando",
                "exist": [
                  "count"
                ]
              },
              "transform": {
                "req": "`reqdata`",
                "res": "`body.data`"
              }
            },
            {
              "args": {
                "query": [
                  {
                    "example": 1,
                    "kind": "query",
                    "name": "count",
                    "orig": "count",
                    "type": "`$INTEGER`"
                  }
                ]
              },
              "kind": "http",
              "method": "GET",
              "orig": "/images/kitsune",
              "parts": [
                "images",
                "kitsune"
              ],
              "select": {
                "$action": "kitsune",
                "exist": [
                  "count"
                ]
              },
              "transform": {
                "req": "`reqdata`",
                "res": "`body.data`"
              }
            },
            {
              "args": {
                "query": [
                  {
                    "example": 1,
                    "kind": "query",
                    "name": "count",
                    "orig": "count",
                    "type": "`$INTEGER`"
                  }
                ]
              },
              "kind": "http",
              "method": "GET",
              "orig": "/images/neko",
              "parts": [
                "images",
                "neko"
              ],
              "select": {
                "$action": "neko",
                "exist": [
                  "count"
                ]
              },
              "transform": {
                "req": "`reqdata`",
                "res": "`body.data`"
              }
            },
            {
              "args": {
                "query": [
                  {
                    "example": 1,
                    "kind": "query",
                    "name": "count",
                    "orig": "count",
                    "type": "`$INTEGER`"
                  }
                ]
              },
              "kind": "http",
              "method": "GET",
              "orig": "/images/waifu",
              "parts": [
                "images",
                "waifu"
              ],
              "select": {
                "$action": "waifu",
                "exist": [
                  "count"
                ]
              },
              "transform": {
                "req": "`reqdata`",
                "res": "`body.data`"
              }
            }
          ]
        }
      },
      "relations": {
        "ancestors": []
      }
    }
  }
}


const config = new Config()

export {
  config
}

