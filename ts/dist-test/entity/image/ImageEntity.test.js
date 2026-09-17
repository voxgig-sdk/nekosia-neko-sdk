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
(0, node_test_1.describe)('ImageEntity', async () => {
    // Per-test live pacing. Delay is read from sdk-test-control.json's
    // `test.live.delayMs`; only sleeps when NEKOSIA_NEKO_TEST_LIVE=TRUE.
    (0, node_test_1.afterEach)((0, utility_1.liveDelay)('NEKOSIA_NEKO_TEST_LIVE'));
    (0, node_test_1.test)('instance', async () => {
        const testsdk = __1.NekosiaNekoSDK.test();
        const ent = testsdk.Image();
        (0, node_assert_1.default)(null != ent);
    });
    (0, node_test_1.test)('basic', async (t) => {
        const live = 'TRUE' === process.env.NEKOSIA_NEKO_TEST_LIVE;
        for (const op of ['load']) {
            if (!live && (0, utility_1.maybeSkipControl)(t, 'entityOp', 'image.' + op, live))
                return;
        }
        const setup = basicSetup();
        if (setup.live) {
            return (0, live_entity_1.runLiveEntity)(setup, { "active": true, "alias": { "field": {} }, "fields": [], "name": "image", "op": { "load": { "input": "data", "name": "load", "points": [{ "active": true, "args": { "query": [{ "active": true, "example": 1, "kind": "query", "name": "count", "orig": "count", "reqd": false, "type": "`$INTEGER`", "index$": 0 }] }, "contract": { "id": "GET /images/husbando", "json": "{\"operationId\":\"getRandomHusbando\",\"parameters\":[{\"description\":\"Number of images to return\",\"in\":\"query\",\"name\":\"count\",\"required\":false,\"schema\":{\"default\":1,\"maximum\":20,\"minimum\":1,\"type\":\"integer\"}}],\"protocol\":\"http\",\"responses\":{\"200\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"data\":{\"properties\":{\"artist\":{\"type\":\"string\"},\"id\":{\"type\":\"string\"},\"source\":{\"type\":\"string\"},\"tags\":{\"items\":{\"type\":\"string\"},\"type\":\"array\"},\"url\":{\"format\":\"uri\",\"type\":\"string\"}},\"type\":\"object\"},\"status\":{\"example\":\"success\",\"type\":\"string\"}},\"type\":\"object\"}}},\"description\":\"Successful response\"},\"400\":{\"description\":\"Bad request\"},\"500\":{\"description\":\"Internal server error\"}},\"securitySource\":\"unspecified\"}", "source": "openapi3", "version": 1 }, "kind": "http", "method": "GET", "orig": "/images/husbando", "segments": [{ "lit": "images" }, { "lit": "husbando" }], "select": { "$action": "husbando", "exist": ["count"] }, "transform": { "req": "`reqdata`", "res": "`body.data`" }, "index$": 0 }, { "active": true, "args": { "query": [{ "active": true, "example": 1, "kind": "query", "name": "count", "orig": "count", "reqd": false, "type": "`$INTEGER`", "index$": 0 }] }, "contract": { "id": "GET /images/kitsune", "json": "{\"operationId\":\"getRandomKitsune\",\"parameters\":[{\"description\":\"Number of images to return\",\"in\":\"query\",\"name\":\"count\",\"required\":false,\"schema\":{\"default\":1,\"maximum\":20,\"minimum\":1,\"type\":\"integer\"}}],\"protocol\":\"http\",\"responses\":{\"200\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"data\":{\"properties\":{\"artist\":{\"type\":\"string\"},\"id\":{\"type\":\"string\"},\"source\":{\"type\":\"string\"},\"tags\":{\"items\":{\"type\":\"string\"},\"type\":\"array\"},\"url\":{\"format\":\"uri\",\"type\":\"string\"}},\"type\":\"object\"},\"status\":{\"example\":\"success\",\"type\":\"string\"}},\"type\":\"object\"}}},\"description\":\"Successful response\"},\"400\":{\"description\":\"Bad request\"},\"500\":{\"description\":\"Internal server error\"}},\"securitySource\":\"unspecified\"}", "source": "openapi3", "version": 1 }, "kind": "http", "method": "GET", "orig": "/images/kitsune", "segments": [{ "lit": "images" }, { "lit": "kitsune" }], "select": { "$action": "kitsune", "exist": ["count"] }, "transform": { "req": "`reqdata`", "res": "`body.data`" }, "index$": 1 }, { "active": true, "args": { "query": [{ "active": true, "example": 1, "kind": "query", "name": "count", "orig": "count", "reqd": false, "type": "`$INTEGER`", "index$": 0 }] }, "contract": { "id": "GET /images/neko", "json": "{\"operationId\":\"getRandomNeko\",\"parameters\":[{\"description\":\"Number of images to return\",\"in\":\"query\",\"name\":\"count\",\"required\":false,\"schema\":{\"default\":1,\"maximum\":20,\"minimum\":1,\"type\":\"integer\"}}],\"protocol\":\"http\",\"responses\":{\"200\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"data\":{\"properties\":{\"artist\":{\"type\":\"string\"},\"id\":{\"type\":\"string\"},\"source\":{\"type\":\"string\"},\"tags\":{\"items\":{\"type\":\"string\"},\"type\":\"array\"},\"url\":{\"format\":\"uri\",\"type\":\"string\"}},\"type\":\"object\"},\"status\":{\"example\":\"success\",\"type\":\"string\"}},\"type\":\"object\"}}},\"description\":\"Successful response\"},\"400\":{\"description\":\"Bad request\"},\"500\":{\"description\":\"Internal server error\"}},\"securitySource\":\"unspecified\"}", "source": "openapi3", "version": 1 }, "kind": "http", "method": "GET", "orig": "/images/neko", "segments": [{ "lit": "images" }, { "lit": "neko" }], "select": { "$action": "neko", "exist": ["count"] }, "transform": { "req": "`reqdata`", "res": "`body.data`" }, "index$": 2 }, { "active": true, "args": { "query": [{ "active": true, "example": 1, "kind": "query", "name": "count", "orig": "count", "reqd": false, "type": "`$INTEGER`", "index$": 0 }] }, "contract": { "id": "GET /images/waifu", "json": "{\"operationId\":\"getRandomWaifu\",\"parameters\":[{\"description\":\"Number of images to return\",\"in\":\"query\",\"name\":\"count\",\"required\":false,\"schema\":{\"default\":1,\"maximum\":20,\"minimum\":1,\"type\":\"integer\"}}],\"protocol\":\"http\",\"responses\":{\"200\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"data\":{\"properties\":{\"artist\":{\"type\":\"string\"},\"id\":{\"type\":\"string\"},\"source\":{\"type\":\"string\"},\"tags\":{\"items\":{\"type\":\"string\"},\"type\":\"array\"},\"url\":{\"format\":\"uri\",\"type\":\"string\"}},\"type\":\"object\"},\"status\":{\"example\":\"success\",\"type\":\"string\"}},\"type\":\"object\"}}},\"description\":\"Successful response\"},\"400\":{\"description\":\"Bad request\"},\"500\":{\"description\":\"Internal server error\"}},\"securitySource\":\"unspecified\"}", "source": "openapi3", "version": 1 }, "kind": "http", "method": "GET", "orig": "/images/waifu", "segments": [{ "lit": "images" }, { "lit": "waifu" }], "select": { "$action": "waifu", "exist": ["count"] }, "transform": { "req": "`reqdata`", "res": "`body.data`" }, "index$": 3 }], "key$": "load" } }, "relations": { "ancestors": [] }, "key$": "image", "name__orig": "image", "Name": "Image", "name_": "image", "name-": "image", "NAME": "IMAGE", "index$": 1 }, { "active": true, "entity": "image", "key$": "BasicImageFlow", "kind": "basic", "name": "BasicImageFlow", "param": {}, "step": [{ "active": true, "data": {}, "input": { "ref": "image_ref01", "srcdatavar": "image_ref01_data", "suffix": "_dt0" }, "match": {}, "op": "load", "spec": [], "valid": [{ "apply": "TextFieldMark", "def": { "mark": "Mark01-image_ref01" } }], "index$": 0 }] }, 'Image');
        }
        const client = setup.client;
        const struct = setup.struct;
        const isempty = struct.isempty;
        const select = struct.select;
        let image_ref01_data = Object.values(setup.data.existing.image)[0];
        // LOAD
        const image_ref01_ent = client.Image();
        const image_ref01_match_dt0 = {};
        const image_ref01_data_dt0 = (await image_ref01_ent.load(image_ref01_match_dt0)).data();
        (0, node_assert_1.default)(null != image_ref01_data_dt0);
    });
});
function basicSetup(extra) {
    // TODO: fix test def options
    const options = {}; // null
    // TODO: needs test utility to resolve path
    const entityDataFile = node_path_1.default.resolve(__dirname, '../../../../.sdk/test/entity/image/ImageTestData.json');
    // TODO: file ready util needed?
    const entityDataSource = Fs.readFileSync(entityDataFile).toString('utf8');
    // TODO: need a xlang JSON parse utility in voxgig/struct with better error msgs
    const entityData = JSON.parse(entityDataSource);
    options.entity = entityData.existing;
    let client = __1.NekosiaNekoSDK.test(options, extra);
    const struct = client.utility().struct;
    const merge = struct.merge;
    const transform = struct.transform;
    let idmap = transform(['image01', 'image02', 'image03'], {
        '`$PACK`': ['', {
                '`$KEY`': '`$COPY`',
                '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
            }]
    });
    const env = (0, utility_1.envOverride)({
        'NEKOSIA_NEKO_TEST_IMAGE_ENTID': idmap,
        'NEKOSIA_NEKO_TEST_LIVE': 'FALSE',
        'NEKOSIA_NEKO_TEST_EXPLAIN': 'FALSE',
    });
    idmap = env['NEKOSIA_NEKO_TEST_IMAGE_ENTID'];
    const live = 'TRUE' === env.NEKOSIA_NEKO_TEST_LIVE;
    const transport = (0, live_runner_1.createLiveTransport)();
    if (live) {
        const rawIds = process.env['NEKOSIA_NEKO_TEST_IMAGE_ENTID'];
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
//# sourceMappingURL=ImageEntity.test.js.map