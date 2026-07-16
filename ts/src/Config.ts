
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


  main = {
    name: 'ProjectName',
  }


  feature = {
     test:     {
      "options": {
        "active": false
      }
    },

  }


  options = {
    base: 'https://api.nekosia.cat/api/v1',

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
          "active": true,
          "name": "artist",
          "req": false,
          "type": "`$STRING`",
          "index$": 0
        },
        {
          "active": true,
          "name": "created_at",
          "req": false,
          "type": "`$STRING`",
          "index$": 1
        },
        {
          "active": true,
          "name": "data",
          "req": false,
          "type": "`$OBJECT`",
          "index$": 2
        },
        {
          "active": true,
          "name": "id",
          "req": false,
          "type": "`$STRING`",
          "index$": 3
        },
        {
          "active": true,
          "name": "source",
          "req": false,
          "type": "`$STRING`",
          "index$": 4
        },
        {
          "active": true,
          "name": "status",
          "req": false,
          "type": "`$STRING`",
          "index$": 5
        },
        {
          "active": true,
          "name": "tag",
          "req": false,
          "type": "`$ARRAY`",
          "index$": 6
        },
        {
          "active": true,
          "name": "url",
          "op": {
            "list": {
              "req": false,
              "type": "`$STRING`"
            }
          },
          "req": true,
          "type": "`$STRING`",
          "index$": 7
        }
      ],
      "name": "booru",
      "op": {
        "create": {
          "input": "data",
          "name": "create",
          "points": [
            {
              "active": true,
              "args": {},
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
                "res": "`body`"
              },
              "index$": 0
            }
          ],
          "key$": "create"
        },
        "list": {
          "input": "data",
          "name": "list",
          "points": [
            {
              "active": true,
              "args": {
                "query": [
                  {
                    "active": true,
                    "example": 20,
                    "kind": "query",
                    "name": "limit",
                    "orig": "limit",
                    "reqd": false,
                    "type": "`$INTEGER`"
                  },
                  {
                    "active": true,
                    "example": 1,
                    "kind": "query",
                    "name": "page",
                    "orig": "page",
                    "reqd": false,
                    "type": "`$INTEGER`"
                  },
                  {
                    "active": true,
                    "kind": "query",
                    "name": "tag",
                    "orig": "tag",
                    "reqd": false,
                    "type": "`$STRING`"
                  }
                ]
              },
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
              },
              "index$": 0
            }
          ],
          "key$": "list"
        },
        "load": {
          "input": "data",
          "name": "load",
          "points": [
            {
              "active": true,
              "args": {
                "params": [
                  {
                    "active": true,
                    "kind": "param",
                    "name": "id",
                    "orig": "id",
                    "reqd": true,
                    "type": "`$STRING`",
                    "index$": 0
                  }
                ]
              },
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
                "res": "`body`"
              },
              "index$": 0
            }
          ],
          "key$": "load"
        }
      },
      "relations": {
        "ancestors": []
      }
    },
    "image": {
      "fields": [
        {
          "active": true,
          "name": "data",
          "req": false,
          "type": "`$OBJECT`",
          "index$": 0
        },
        {
          "active": true,
          "name": "status",
          "req": false,
          "type": "`$STRING`",
          "index$": 1
        }
      ],
      "name": "image",
      "op": {
        "load": {
          "input": "data",
          "name": "load",
          "points": [
            {
              "active": true,
              "args": {
                "query": [
                  {
                    "active": true,
                    "example": 1,
                    "kind": "query",
                    "name": "count",
                    "orig": "count",
                    "reqd": false,
                    "type": "`$INTEGER`"
                  }
                ]
              },
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
                "res": "`body`"
              },
              "index$": 0
            },
            {
              "active": true,
              "args": {
                "query": [
                  {
                    "active": true,
                    "example": 1,
                    "kind": "query",
                    "name": "count",
                    "orig": "count",
                    "reqd": false,
                    "type": "`$INTEGER`"
                  }
                ]
              },
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
                "res": "`body`"
              },
              "index$": 1
            },
            {
              "active": true,
              "args": {
                "query": [
                  {
                    "active": true,
                    "example": 1,
                    "kind": "query",
                    "name": "count",
                    "orig": "count",
                    "reqd": false,
                    "type": "`$INTEGER`"
                  }
                ]
              },
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
                "res": "`body`"
              },
              "index$": 2
            },
            {
              "active": true,
              "args": {
                "query": [
                  {
                    "active": true,
                    "example": 1,
                    "kind": "query",
                    "name": "count",
                    "orig": "count",
                    "reqd": false,
                    "type": "`$INTEGER`"
                  }
                ]
              },
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
                "res": "`body`"
              },
              "index$": 3
            }
          ],
          "key$": "load"
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

