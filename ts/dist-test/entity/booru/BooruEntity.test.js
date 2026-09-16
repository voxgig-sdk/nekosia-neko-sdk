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
// AFTER the imports on purpose: TypeScript hoists `import` above any
// statement in the emitted CommonJS, so a loader placed above them would
// run only after every imported module had already been evaluated - and
// anything reading process.env at module scope would miss these values.
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
            return (0, live_entity_1.runLiveEntity)(setup, { "active": true, "alias": { "field": {} }, "fields": [{ "active": true, "name": "artist", "req": false, "short": "Name of the artist", "type": "`$STRING`", "index$": 0 }, { "active": true, "format": "date-time", "name": "created_at", "req": false, "type": "`$STRING`", "index$": 1 }, { "active": true, "name": "id", "req": false, "type": "`$STRING`", "index$": 2 }, { "active": true, "name": "source", "req": false, "short": "Original source URL", "type": "`$STRING`", "index$": 3 }, { "active": true, "name": "tags", "req": false, "short": "Tags associated with the image", "type": "`$ARRAY`", "index$": 4 }, { "active": true, "format": "uri", "name": "url", "op": { "create": { "req": true, "type": "`$STRING`" } }, "req": false, "short": "URL of the image to add", "type": "`$STRING`", "index$": 5 }], "id": { "field": "id", "name": "id" }, "name": "booru", "op": { "create": { "input": "data", "name": "create", "points": [{ "active": true, "args": {}, "contract": { "id": "POST /booru/images", "json": "{\"operationId\":\"addBooruImage\",\"parameters\":[],\"protocol\":\"http\",\"requestBody\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"artist\":{\"description\":\"Name of the artist\",\"type\":\"string\"},\"source\":{\"description\":\"Original source URL\",\"type\":\"string\"},\"tags\":{\"description\":\"Tags associated with the image\",\"items\":{\"type\":\"string\"},\"type\":\"array\"},\"url\":{\"description\":\"URL of the image to add\",\"format\":\"uri\",\"type\":\"string\"}},\"required\":[\"url\"],\"type\":\"object\"}}},\"required\":true},\"responses\":{\"201\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"data\":{\"properties\":{\"artist\":{\"type\":\"string\"},\"created_at\":{\"format\":\"date-time\",\"type\":\"string\"},\"id\":{\"type\":\"string\"},\"source\":{\"type\":\"string\"},\"tags\":{\"items\":{\"type\":\"string\"},\"type\":\"array\"},\"url\":{\"format\":\"uri\",\"type\":\"string\"}},\"type\":\"object\"},\"status\":{\"example\":\"success\",\"type\":\"string\"}},\"type\":\"object\"}}},\"description\":\"Image successfully added\"},\"400\":{\"description\":\"Bad request - Invalid data\"},\"401\":{\"description\":\"Unauthorized - Authentication required\"},\"500\":{\"description\":\"Internal server error\"}},\"securitySource\":\"unspecified\"}", "source": "openapi3", "version": 1 }, "kind": "http", "method": "POST", "orig": "/booru/images", "segments": [{ "lit": "booru" }, { "lit": "images" }], "select": { "$action": "image" }, "transform": { "req": "`reqdata`", "res": "`body.data`" }, "index$": 0 }], "key$": "create" }, "list": { "input": "data", "name": "list", "points": [{ "active": true, "args": { "query": [{ "active": true, "example": 20, "kind": "query", "name": "limit", "orig": "limit", "reqd": false, "type": "`$INTEGER`", "index$": 0 }, { "active": true, "example": 1, "kind": "query", "name": "page", "orig": "page", "reqd": false, "type": "`$INTEGER`", "index$": 1 }, { "active": true, "kind": "query", "name": "tag", "orig": "tag", "reqd": false, "type": "`$STRING`", "index$": 2 }] }, "contract": { "id": "GET /booru/images", "json": "{\"operationId\":\"getBooruImages\",\"parameters\":[{\"description\":\"Page number for pagination\",\"in\":\"query\",\"name\":\"page\",\"required\":false,\"schema\":{\"default\":1,\"minimum\":1,\"type\":\"integer\"}},{\"description\":\"Number of images per page\",\"in\":\"query\",\"name\":\"limit\",\"required\":false,\"schema\":{\"default\":20,\"maximum\":100,\"minimum\":1,\"type\":\"integer\"}},{\"description\":\"Filter images by tags (comma-separated)\",\"in\":\"query\",\"name\":\"tags\",\"required\":false,\"schema\":{\"type\":\"string\"}}],\"protocol\":\"http\",\"responses\":{\"200\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"data\":{\"items\":{\"properties\":{\"artist\":{\"type\":\"string\"},\"created_at\":{\"format\":\"date-time\",\"type\":\"string\"},\"id\":{\"type\":\"string\"},\"source\":{\"type\":\"string\"},\"tags\":{\"items\":{\"type\":\"string\"},\"type\":\"array\"},\"url\":{\"format\":\"uri\",\"type\":\"string\"}},\"type\":\"object\"},\"type\":\"array\"},\"pagination\":{\"properties\":{\"limit\":{\"type\":\"integer\"},\"page\":{\"type\":\"integer\"},\"total\":{\"type\":\"integer\"}},\"type\":\"object\"},\"status\":{\"example\":\"success\",\"type\":\"string\"}},\"type\":\"object\"}}},\"description\":\"Successful response\"},\"400\":{\"description\":\"Bad request\"},\"500\":{\"description\":\"Internal server error\"}},\"securitySource\":\"unspecified\"}", "source": "openapi3", "version": 1 }, "kind": "http", "method": "GET", "orig": "/booru/images", "segments": [{ "lit": "booru" }, { "lit": "images" }], "select": { "$action": "image", "exist": ["limit", "page", "tag"] }, "transform": { "req": "`reqdata`", "res": "`body`" }, "index$": 0 }], "key$": "list" }, "load": { "input": "data", "name": "load", "points": [{ "active": true, "args": { "params": [{ "active": true, "kind": "param", "name": "id", "orig": "id", "reqd": true, "type": "`$STRING`", "index$": 0 }] }, "contract": { "id": "GET /booru/images/{id}", "json": "{\"operationId\":\"getBooruImageById\",\"parameters\":[{\"description\":\"ID of the image to retrieve\",\"in\":\"path\",\"name\":\"id\",\"required\":true,\"schema\":{\"type\":\"string\"}}],\"protocol\":\"http\",\"responses\":{\"200\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"data\":{\"properties\":{\"artist\":{\"type\":\"string\"},\"created_at\":{\"format\":\"date-time\",\"type\":\"string\"},\"id\":{\"type\":\"string\"},\"source\":{\"type\":\"string\"},\"tags\":{\"items\":{\"type\":\"string\"},\"type\":\"array\"},\"url\":{\"format\":\"uri\",\"type\":\"string\"}},\"type\":\"object\"},\"status\":{\"example\":\"success\",\"type\":\"string\"}},\"type\":\"object\"}}},\"description\":\"Successful response\"},\"404\":{\"description\":\"Image not found\"},\"500\":{\"description\":\"Internal server error\"}},\"securitySource\":\"unspecified\"}", "source": "openapi3", "version": 1 }, "kind": "http", "method": "GET", "orig": "/booru/images/{id}", "segments": [{ "lit": "booru" }, { "lit": "images" }, { "var": "id" }], "select": { "exist": ["id"] }, "transform": { "req": "`reqdata`", "res": "`body.data`" }, "index$": 0 }], "key$": "load" } }, "relations": { "ancestors": [] }, "key$": "booru", "name__orig": "booru", "Name": "Booru", "name_": "booru", "name-": "booru", "NAME": "BOORU", "index$": 0 }, { "active": true, "entity": "booru", "key$": "BasicBooruFlow", "kind": "basic", "name": "BasicBooruFlow", "param": {}, "step": [{ "active": true, "data": {}, "input": { "ref": "booru_ref01" }, "match": {}, "op": "create", "spec": [], "valid": [], "index$": 0 }, { "active": true, "data": {}, "input": {}, "match": {}, "op": "list", "spec": [], "valid": [{ "apply": "ItemExists", "def": { "ref": "booru_ref01" } }], "index$": 1 }, { "active": true, "data": {}, "input": { "ref": "booru_ref01", "srcdatavar": "booru_ref01_data", "suffix": "_dt0" }, "match": { "id": "booru01" }, "op": "load", "spec": [], "valid": [{ "apply": "TextFieldMark", "def": { "mark": "Mark01-booru_ref01" } }], "index$": 2 }] }, 'Booru');
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