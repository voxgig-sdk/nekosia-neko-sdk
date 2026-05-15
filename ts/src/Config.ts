
import { BaseFeature } from './feature/base/BaseFeature'
import { TestFeature } from './feature/test/TestFeature'



const FEATURE_CLASS: Record<string, typeof BaseFeature> = {
   test: TestFeature

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
    }

  }


  options = {
    base: 'https://nekosia.cat/api/v1',

    auth: {
      prefix: 'Bearer',
    },

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
          "req": false,
          "type": "`$STRING`",
          "active": true,
          "index$": 0
        },
        {
          "name": "created_at",
          "req": false,
          "type": "`$STRING`",
          "active": true,
          "index$": 1
        },
        {
          "name": "data",
          "req": false,
          "type": "`$OBJECT`",
          "active": true,
          "index$": 2
        },
        {
          "name": "id",
          "req": false,
          "type": "`$STRING`",
          "active": true,
          "index$": 3
        },
        {
          "name": "source",
          "req": false,
          "type": "`$STRING`",
          "active": true,
          "index$": 4
        },
        {
          "name": "status",
          "req": false,
          "type": "`$STRING`",
          "active": true,
          "index$": 5
        },
        {
          "name": "tag",
          "req": false,
          "type": "`$ARRAY`",
          "active": true,
          "index$": 6
        },
        {
          "name": "url",
          "op": {
            "list": {
              "req": false,
              "type": "`$STRING`"
            }
          },
          "req": true,
          "type": "`$STRING`",
          "active": true,
          "index$": 7
        }
      ],
      "name": "booru",
      "op": {
        "create": {
          "name": "create",
          "points": [
            {
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
              "active": true,
              "args": {},
              "index$": 0
            }
          ],
          "input": "data",
          "key$": "create"
        },
        "list": {
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
                    "reqd": false,
                    "type": "`$INTEGER`",
                    "active": true
                  },
                  {
                    "example": 1,
                    "kind": "query",
                    "name": "page",
                    "orig": "page",
                    "reqd": false,
                    "type": "`$INTEGER`",
                    "active": true
                  },
                  {
                    "kind": "query",
                    "name": "tag",
                    "orig": "tag",
                    "reqd": false,
                    "type": "`$STRING`",
                    "active": true
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
              "active": true,
              "index$": 0
            }
          ],
          "input": "data",
          "key$": "list"
        },
        "load": {
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
                    "type": "`$STRING`",
                    "active": true
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
              "active": true,
              "index$": 0
            }
          ],
          "input": "data",
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
          "name": "data",
          "req": false,
          "type": "`$OBJECT`",
          "active": true,
          "index$": 0
        },
        {
          "name": "status",
          "req": false,
          "type": "`$STRING`",
          "active": true,
          "index$": 1
        }
      ],
      "name": "image",
      "op": {
        "load": {
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
                    "reqd": false,
                    "type": "`$INTEGER`",
                    "active": true
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
              "active": true,
              "index$": 0
            },
            {
              "args": {
                "query": [
                  {
                    "example": 1,
                    "kind": "query",
                    "name": "count",
                    "orig": "count",
                    "reqd": false,
                    "type": "`$INTEGER`",
                    "active": true
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
              "active": true,
              "index$": 1
            },
            {
              "args": {
                "query": [
                  {
                    "example": 1,
                    "kind": "query",
                    "name": "count",
                    "orig": "count",
                    "reqd": false,
                    "type": "`$INTEGER`",
                    "active": true
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
              "active": true,
              "index$": 2
            },
            {
              "args": {
                "query": [
                  {
                    "example": 1,
                    "kind": "query",
                    "name": "count",
                    "orig": "count",
                    "reqd": false,
                    "type": "`$INTEGER`",
                    "active": true
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
              "active": true,
              "index$": 3
            }
          ],
          "input": "data",
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

