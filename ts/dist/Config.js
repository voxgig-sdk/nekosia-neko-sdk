"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FEATURE_PLUGINS = exports.config = void 0;
const RatelimitFeature_1 = require("./feature/ratelimit/RatelimitFeature");
const RetryFeature_1 = require("./feature/retry/RetryFeature");
const TestFeature_1 = require("./feature/test/TestFeature");
const TimeoutFeature_1 = require("./feature/timeout/TimeoutFeature");
const FEATURE_CLASS = {
    ratelimit: RatelimitFeature_1.RatelimitFeature,
    retry: RetryFeature_1.RetryFeature,
    test: TestFeature_1.TestFeature,
    timeout: TimeoutFeature_1.TimeoutFeature,
};
const FEATURE_PLUGINS = {};
exports.FEATURE_PLUGINS = FEATURE_PLUGINS;
class Config {
    makeFeature(fn) {
        const fc = FEATURE_CLASS[fn];
        const fi = new fc();
        return fi;
    }
    // False for a feature added at runtime via options.extend (station's
    // adopt path) - the constructor uses this to skip makeFeature for names
    // no generated class backs.
    hasFeature(fn) {
        return null != FEATURE_CLASS[fn];
    }
    main = {
        name: 'NekosiaNeko',
        slug: "nekosia-neko",
        version: "0.0.1",
        target: "ts",
    };
    feature = {
        ratelimit: {
            "options": {
                "active": false,
                "burst": 5,
                "rate": 5
            },
            "optspec": {
                "now": "`$FUNCTION`",
                "sleep": "`$FUNCTION`"
            },
            "strict": false,
            "transport": "wrap"
        },
        retry: {
            "options": {
                "active": false,
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
                    504
                ]
            },
            "optspec": {
                "jitter": "`$BOOLEAN`",
                "sleep": "`$FUNCTION`"
            },
            "strict": false,
            "transport": "wrap"
        },
        test: {
            "options": {
                "active": false
            },
            "optspec": {
                "entity": "`$MAP`",
                "net": "`$MAP`"
            },
            "strict": false,
            "transport": "base"
        },
        timeout: {
            "options": {
                "active": false,
                "ms": 30000
            },
            "optspec": {
                "clearTimer": "`$FUNCTION`",
                "setTimer": "`$FUNCTION`"
            },
            "strict": false,
            "transport": "wrap"
        },
    };
    options = {
        base: "https://api.nekosia.cat/api/v1",
        headers: {
            "content-type": "application/json"
        },
        entity: {
            booru: {},
            image: {},
        }
    };
    entity = {
        "booru": {
            "fields": [
                {
                    "name": "artist",
                    "title": "Artist",
                    "type": "`$STRING`"
                },
                {
                    "name": "created_at",
                    "title": "Created At",
                    "type": "`$STRING`",
                    "format": "date-time"
                },
                {
                    "name": "id",
                    "title": "Id",
                    "type": "`$STRING`"
                },
                {
                    "name": "source",
                    "title": "Source",
                    "type": "`$STRING`"
                },
                {
                    "name": "tags",
                    "title": "Tags",
                    "type": "`$ARRAY`"
                },
                {
                    "name": "url",
                    "title": "Url",
                    "type": "`$STRING`",
                    "format": "uri"
                }
            ],
            "id": {
                "field": "id",
                "name": "id"
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
                                    "lit": "booru"
                                },
                                {
                                    "lit": "images"
                                }
                            ],
                            "parts": [
                                "booru",
                                "images"
                            ],
                            "rename": {},
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body.data`"
                            },
                            "args": {},
                            "select": {
                                "$action": "image"
                            }
                        }
                    ]
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
                                    "lit": "booru"
                                },
                                {
                                    "lit": "images"
                                }
                            ],
                            "parts": [
                                "booru",
                                "images"
                            ],
                            "rename": {},
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body`"
                            },
                            "args": {
                                "query": [
                                    {
                                        "name": "limit",
                                        "orig": "limit",
                                        "type": "`$INTEGER`",
                                        "kind": "query",
                                        "example": 20
                                    },
                                    {
                                        "name": "page",
                                        "orig": "page",
                                        "type": "`$INTEGER`",
                                        "kind": "query",
                                        "example": 1
                                    },
                                    {
                                        "name": "tag",
                                        "orig": "tag",
                                        "type": "`$STRING`",
                                        "kind": "query"
                                    }
                                ]
                            },
                            "select": {
                                "$action": "image",
                                "exist": [
                                    "limit",
                                    "page",
                                    "tag"
                                ]
                            }
                        }
                    ]
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
                                    "lit": "booru"
                                },
                                {
                                    "lit": "images"
                                },
                                {
                                    "var": "id"
                                }
                            ],
                            "parts": [
                                "booru",
                                "images",
                                "{id}"
                            ],
                            "rename": {},
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body.data`"
                            },
                            "args": {
                                "params": [
                                    {
                                        "name": "id",
                                        "orig": "id",
                                        "type": "`$STRING`",
                                        "kind": "param",
                                        "reqd": true
                                    }
                                ]
                            },
                            "select": {
                                "exist": [
                                    "id"
                                ]
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
                                    "lit": "images"
                                },
                                {
                                    "lit": "husbando"
                                }
                            ],
                            "parts": [
                                "images",
                                "husbando"
                            ],
                            "rename": {},
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body.data`"
                            },
                            "args": {
                                "query": [
                                    {
                                        "name": "count",
                                        "orig": "count",
                                        "type": "`$INTEGER`",
                                        "kind": "query",
                                        "example": 1
                                    }
                                ]
                            },
                            "select": {
                                "$action": "husbando",
                                "exist": [
                                    "count"
                                ]
                            }
                        },
                        {
                            "kind": "http",
                            "method": "GET",
                            "orig": "/images/kitsune",
                            "segments": [
                                {
                                    "lit": "images"
                                },
                                {
                                    "lit": "kitsune"
                                }
                            ],
                            "parts": [
                                "images",
                                "kitsune"
                            ],
                            "rename": {},
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body.data`"
                            },
                            "args": {
                                "query": [
                                    {
                                        "name": "count",
                                        "orig": "count",
                                        "type": "`$INTEGER`",
                                        "kind": "query",
                                        "example": 1
                                    }
                                ]
                            },
                            "select": {
                                "$action": "kitsune",
                                "exist": [
                                    "count"
                                ]
                            }
                        },
                        {
                            "kind": "http",
                            "method": "GET",
                            "orig": "/images/neko",
                            "segments": [
                                {
                                    "lit": "images"
                                },
                                {
                                    "lit": "neko"
                                }
                            ],
                            "parts": [
                                "images",
                                "neko"
                            ],
                            "rename": {},
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body.data`"
                            },
                            "args": {
                                "query": [
                                    {
                                        "name": "count",
                                        "orig": "count",
                                        "type": "`$INTEGER`",
                                        "kind": "query",
                                        "example": 1
                                    }
                                ]
                            },
                            "select": {
                                "$action": "neko",
                                "exist": [
                                    "count"
                                ]
                            }
                        },
                        {
                            "kind": "http",
                            "method": "GET",
                            "orig": "/images/waifu",
                            "segments": [
                                {
                                    "lit": "images"
                                },
                                {
                                    "lit": "waifu"
                                }
                            ],
                            "parts": [
                                "images",
                                "waifu"
                            ],
                            "rename": {},
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body.data`"
                            },
                            "args": {
                                "query": [
                                    {
                                        "name": "count",
                                        "orig": "count",
                                        "type": "`$INTEGER`",
                                        "kind": "query",
                                        "example": 1
                                    }
                                ]
                            },
                            "select": {
                                "$action": "waifu",
                                "exist": [
                                    "count"
                                ]
                            }
                        }
                    ]
                }
            },
            "relations": {
                "ancestors": []
            }
        }
    };
}
const config = new Config();
exports.config = config;
//# sourceMappingURL=Config.js.map