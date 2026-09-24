"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const node_path_1 = __importDefault(require("node:path"));
const Fs = __importStar(require("node:fs"));
const node_test_1 = require("node:test");
const node_assert_1 = __importDefault(require("node:assert"));
const live_runner_1 = require("../../live-runner");
const live_entity_1 = require("../../live-entity");
const __1 = require("../../..");
const utility_1 = require("../../utility");
(0, utility_1.loadEnvLocal)(__dirname + '/../../../.env.local');
(0, node_test_1.describe)('BooruEntity', async () => {
    // Per-test live pacing. Delay is read from sdk-test-control.json's
    // `test.live.delayMs`; only sleeps when NEKOSIA_NEKO_TEST_LIVE=TRUE.
    (0, node_test_1.afterEach)((0, utility_1.liveDelay)('NEKOSIA_NEKO_TEST_LIVE'));
    (0, node_test_1.test)('instance', async () => {
        const testsdk = __1.NekosiaNekoSDK.test();
        const ent = testsdk.Booru();
        (0, node_assert_1.default)(null != ent);
    });
    (0, node_test_1.test)('basic', async (t) => {
        const live = 'TRUE' === process.env.NEKOSIA_NEKO_TEST_LIVE;
        for (const op of ['create', 'list', 'load']) {
            if (!live && (0, utility_1.maybeSkipControl)(t, 'entityOp', 'booru.' + op, live))
                return;
        }
        const setup = basicSetup();
        if (setup.live) {
            return (0, live_entity_1.runLiveEntity)(setup, { "active": true, "alias": { "field": {} }, "fields": { "artist": { "a": true, "h": "Artist", "n": "artist", "r": false, "t": "`$STRING`", "key$": "artist", "index$": 0 }, "created_at": { "a": true, "fo": "date-time", "h": "Created At", "n": "created_at", "r": false, "t": "`$STRING`", "key$": "created_at", "index$": 1 }, "id": { "a": true, "h": "Id", "n": "id", "r": false, "t": "`$STRING`", "key$": "id", "index$": 2 }, "source": { "a": true, "h": "Source", "n": "source", "r": false, "t": "`$STRING`", "key$": "source", "index$": 3 }, "tags": { "a": true, "h": "Tags", "n": "tags", "r": false, "t": "`$ARRAY`", "key$": "tags", "index$": 4 }, "url": { "a": true, "fo": "uri", "h": "Url", "n": "url", "r": false, "t": "`$STRING`", "key$": "url", "index$": 5 } }, "id": { "field": "id", "name": "id" }, "name": "booru", "op": { "create": { "input": "data", "name": "create", "points": [{ "a": true, "co": { "id": "POST /booru/images", "source": "openapi3", "version": 2 }, "g": {}, "k": "http", "m": "POST", "o": "/booru/images", "q": { "$action": "image" }, "r": {}, "s": [{ "lit": "booru" }, { "lit": "images" }], "t": { "req": "`reqdata`", "res": "`body.data`" }, "index$": 0 }], "key$": "create" }, "list": { "input": "data", "name": "list", "points": [{ "a": true, "co": { "id": "GET /booru/images", "source": "openapi3", "version": 2 }, "g": { "query": [{ "a": true, "ex": 20, "k": "query", "n": "limit", "or": "limit", "r": false, "t": "`$INTEGER`", "index$": 0 }, { "a": true, "ex": 1, "k": "query", "n": "page", "or": "page", "r": false, "t": "`$INTEGER`", "index$": 1 }, { "a": true, "k": "query", "n": "tag", "or": "tag", "r": false, "t": "`$STRING`", "index$": 2 }] }, "k": "http", "m": "GET", "o": "/booru/images", "q": { "$action": "image", "exist": ["limit", "page", "tag"] }, "r": {}, "s": [{ "lit": "booru" }, { "lit": "images" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 0 }], "key$": "list" }, "load": { "input": "data", "name": "load", "points": [{ "a": true, "co": { "id": "GET /booru/images/{id}", "source": "openapi3", "version": 2 }, "g": { "params": [{ "a": true, "k": "param", "n": "id", "or": "id", "r": true, "t": "`$STRING`", "index$": 0 }] }, "k": "http", "m": "GET", "o": "/booru/images/{id}", "q": { "exist": ["id"] }, "r": {}, "s": [{ "lit": "booru" }, { "lit": "images" }, { "var": "id" }], "t": { "req": "`reqdata`", "res": "`body.data`" }, "index$": 0 }], "key$": "load" } }, "relations": { "ancestors": [] }, "key$": "booru", "name__orig": "booru", "Name": "Booru", "name_": "booru", "name-": "booru", "NAME": "BOORU", "index$": 0 }, { "active": true, "entity": "booru", "key$": "BasicBooruFlow", "kind": "basic", "name": "BasicBooruFlow", "param": {}, "step": [{ "a": true, "d": {}, "i": { "ref": "booru_ref01" }, "m": {}, "o": "create", "s": [], "v": [], "index$": 0 }, { "a": true, "d": {}, "i": {}, "m": {}, "o": "list", "s": [], "v": [{ "apply": "ItemExists", "def": { "ref": "booru_ref01" } }], "index$": 1 }, { "a": true, "d": {}, "i": { "ref": "booru_ref01", "srcdatavar": "booru_ref01_data", "suffix": "_dt0" }, "m": { "id": "booru01" }, "o": "load", "s": [], "v": [{ "apply": "TextFieldMark", "def": { "mark": "Mark01-booru_ref01" } }], "index$": 2 }] }, 'Booru', { "POST /booru/images": { "protocol": "http", "operationId": "addBooruImage", "requestBody": { "required": true, "content": { "application/json": { "schema": { "type": "object", "required": ["url"], "properties": { "url": { "type": "string", "format": "uri", "description": "URL of the image to add" }, "artist": { "type": "string", "description": "Name of the artist" }, "source": { "type": "string", "description": "Original source URL" }, "tags": { "type": "array", "items": { "type": "string" }, "description": "Tags associated with the image" } } } } } }, "responses": { "201": { "description": "Image successfully added", "content": { "application/json": { "schema": { "type": "object", "properties": { "status": { "type": "string", "example": "success" }, "data": { "type": "object", "properties": { "id": { "type": "string" }, "url": { "type": "string", "format": "uri" }, "artist": { "type": "string" }, "source": { "type": "string" }, "tags": { "type": "array", "items": { "type": "string" } }, "created_at": { "type": "string", "format": "date-time" } } } } } } } }, "400": { "description": "Bad request - Invalid data" }, "401": { "description": "Unauthorized - Authentication required" }, "500": { "description": "Internal server error" } }, "parameters": [], "securitySource": "unspecified" }, "GET /booru/images": { "protocol": "http", "operationId": "getBooruImages", "responses": { "200": { "description": "Successful response", "content": { "application/json": { "schema": { "type": "object", "properties": { "status": { "example": "success", "key$": "status", "type": "string" }, "data": { "items": { "properties": { "artist": { "type": "string" }, "created_at": { "format": "date-time", "type": "string" }, "id": { "type": "string" }, "source": { "type": "string" }, "tags": { "items": { "type": "string" }, "type": "array" }, "url": { "format": "uri", "type": "string" } }, "type": "object" }, "key$": "data", "type": "array" }, "pagination": { "key$": "pagination", "properties": { "limit": { "type": "integer" }, "page": { "type": "integer" }, "total": { "type": "integer" } }, "type": "object" } } } } } }, "400": { "description": "Bad request" }, "500": { "description": "Internal server error" } }, "parameters": [{ "name": "page", "in": "query", "description": "Page number for pagination", "required": false, "schema": { "type": "integer", "default": 1, "minimum": 1 }, "index$": 0 }, { "name": "limit", "in": "query", "description": "Number of images per page", "required": false, "schema": { "type": "integer", "default": 20, "minimum": 1, "maximum": 100 }, "index$": 1 }, { "name": "tags", "in": "query", "description": "Filter images by tags (comma-separated)", "required": false, "schema": { "type": "string" }, "index$": 2 }], "securitySource": "unspecified" }, "GET /booru/images/{id}": { "protocol": "http", "operationId": "getBooruImageById", "responses": { "200": { "description": "Successful response", "content": { "application/json": { "schema": { "type": "object", "properties": { "status": { "type": "string", "example": "success" }, "data": { "type": "object", "properties": { "id": { "type": "string", "key$": "id" }, "url": { "type": "string", "format": "uri", "key$": "url" }, "artist": { "type": "string", "key$": "artist" }, "source": { "type": "string", "key$": "source" }, "tags": { "type": "array", "items": { "type": "string" }, "key$": "tags" }, "created_at": { "type": "string", "format": "date-time", "key$": "created_at" } }, "index$": 0 } } } } } }, "404": { "description": "Image not found" }, "500": { "description": "Internal server error" } }, "parameters": [{ "name": "id", "in": "path", "description": "ID of the image to retrieve", "required": true, "schema": { "type": "string" }, "index$": 0 }], "securitySource": "unspecified" } });
        }
        const client = setup.client;
        const struct = setup.struct;
        const isempty = struct.isempty;
        const select = struct.select;
        // CREATE
        const booru_ref01_ent = client.Booru();
        let booru_ref01_data = setup.data.new.booru['booru_ref01'];
        booru_ref01_data = (await booru_ref01_ent.create(booru_ref01_data)).data();
        (0, node_assert_1.default)(null != booru_ref01_data.id);
        // LIST
        const booru_ref01_match = {};
        const booru_ref01_list = (await booru_ref01_ent.list(booru_ref01_match)).map((e) => e.data());
        (0, node_assert_1.default)(!isempty(select(booru_ref01_list, { id: booru_ref01_data.id })));
        // LOAD
        const booru_ref01_match_dt0 = {};
        booru_ref01_match_dt0.id = booru_ref01_data.id;
        const booru_ref01_data_dt0 = (await booru_ref01_ent.load(booru_ref01_match_dt0)).data();
        (0, node_assert_1.default)(booru_ref01_data_dt0.id === booru_ref01_data.id);
    });
});
function basicSetup(extra) {
    // TODO: fix test def options
    const options = {}; // null
    // TODO: needs test utility to resolve path
    const entityDataFile = node_path_1.default.resolve(__dirname, '../../../../.sdk/test/entity/booru/BooruTestData.json');
    // TODO: file ready util needed?
    const entityDataSource = Fs.readFileSync(entityDataFile).toString('utf8');
    // TODO: need a xlang JSON parse utility in voxgig/struct with better error msgs
    const entityData = JSON.parse(entityDataSource);
    options.entity = entityData.existing;
    let client = __1.NekosiaNekoSDK.test(options, extra);
    const struct = client.utility().struct;
    const merge = struct.merge;
    const transform = struct.transform;
    let idmap = transform(['booru01', 'booru02', 'booru03'], {
        '`$PACK`': ['', {
                '`$KEY`': '`$COPY`',
                '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
            }]
    });
    const env = (0, utility_1.envOverride)({
        'NEKOSIA_NEKO_TEST_BOORU_ENTID': idmap,
        'NEKOSIA_NEKO_TEST_LIVE': 'FALSE',
        'NEKOSIA_NEKO_TEST_EXPLAIN': 'FALSE',
    });
    idmap = env['NEKOSIA_NEKO_TEST_BOORU_ENTID'];
    const live = 'TRUE' === env.NEKOSIA_NEKO_TEST_LIVE;
    const transport = (0, live_runner_1.createLiveTransport)();
    if (live) {
        const rawIds = process.env['NEKOSIA_NEKO_TEST_BOORU_ENTID'];
        idmap = rawIds && rawIds.trim() ? JSON.parse(rawIds) : {};
        if (!idmap || Array.isArray(idmap) || typeof idmap !== 'object') {
            throw new Error('Live ENTID must be a JSON object');
        }
        client = new __1.NekosiaNekoSDK(merge([
            // FIRST, so the generated fields below win: sdk-test-control.json's
            // test.client.options adds to the live client, it does not redirect it.
            (0, utility_1.liveClientOptions)(),
            {},
            // 'extra || {}', not a bare 'extra': struct.merge returns UNDEFINED when the
            // last entry is undefined, and basicSetup is normally called with no
            // argument at all - so a bare 'extra' silently discarded the apikey
            // and server values above and handed the SDK undefined. Harmless
            // while there was nothing in that object; not harmless now.
            extra || {},
            { system: { fetch: transport.fetch } }
        ]));
    }
    const setup = {
        idmap,
        env,
        options,
        client,
        struct,
        data: entityData,
        explain: 'TRUE' === env.NEKOSIA_NEKO_TEST_EXPLAIN,
        live,
        transport,
        now: Date.now(),
    };
    return setup;
}
//# sourceMappingURL=BooruEntity.test.js.map