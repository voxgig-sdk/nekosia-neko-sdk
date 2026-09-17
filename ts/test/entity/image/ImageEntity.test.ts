

import Path from 'node:path'
import * as Fs from 'node:fs'

import { test, describe, afterEach } from 'node:test'
import assert from 'node:assert'
import { createLiveTransport } from '../../live-runner'
import { runLiveEntity } from '../../live-entity'


import { NekosiaNekoSDK, BaseFeature, stdutil } from '../../..'

import {
  envOverride,
  liveClientOptions,
  liveDelay,
  loadEnvLocal,
  makeCtrl,
  makeMatch,
  makeReqdata,
  makeStepData,
  makeValid,
  maybeSkipControl,
} from '../../utility'


// AFTER the imports on purpose: TypeScript hoists `import` above any
// statement in the emitted CommonJS, so a loader placed above them would
// run only after every imported module had already been evaluated - and
// anything reading process.env at module scope would miss these values.
loadEnvLocal(__dirname + '/../../../.env.local')


describe('ImageEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when NEKOSIA_NEKO_TEST_LIVE=TRUE.
  afterEach(liveDelay('NEKOSIA_NEKO_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = NekosiaNekoSDK.test()
    const ent = testsdk.Image()
    assert(null != ent)
  })


  test('basic', async (t) => {

    const live = 'TRUE' === process.env.NEKOSIA_NEKO_TEST_LIVE
    for (const op of ['load']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'image.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":[],"name":"image","op":{"load":{"input":"data","name":"load","points":[{"active":true,"args":{"query":[{"active":true,"example":1,"kind":"query","name":"count","orig":"count","reqd":false,"type":"`$INTEGER`","index$":0}]},"contract":{"id":"GET /images/husbando","json":"{\"operationId\":\"getRandomHusbando\",\"parameters\":[{\"description\":\"Number of images to return\",\"in\":\"query\",\"name\":\"count\",\"required\":false,\"schema\":{\"default\":1,\"maximum\":20,\"minimum\":1,\"type\":\"integer\"}}],\"protocol\":\"http\",\"responses\":{\"200\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"data\":{\"properties\":{\"artist\":{\"type\":\"string\"},\"id\":{\"type\":\"string\"},\"source\":{\"type\":\"string\"},\"tags\":{\"items\":{\"type\":\"string\"},\"type\":\"array\"},\"url\":{\"format\":\"uri\",\"type\":\"string\"}},\"type\":\"object\"},\"status\":{\"example\":\"success\",\"type\":\"string\"}},\"type\":\"object\"}}},\"description\":\"Successful response\"},\"400\":{\"description\":\"Bad request\"},\"500\":{\"description\":\"Internal server error\"}},\"securitySource\":\"unspecified\"}","source":"openapi3","version":1},"kind":"http","method":"GET","orig":"/images/husbando","segments":[{"lit":"images"},{"lit":"husbando"}],"select":{"$action":"husbando","exist":["count"]},"transform":{"req":"`reqdata`","res":"`body.data`"},"index$":0},{"active":true,"args":{"query":[{"active":true,"example":1,"kind":"query","name":"count","orig":"count","reqd":false,"type":"`$INTEGER`","index$":0}]},"contract":{"id":"GET /images/kitsune","json":"{\"operationId\":\"getRandomKitsune\",\"parameters\":[{\"description\":\"Number of images to return\",\"in\":\"query\",\"name\":\"count\",\"required\":false,\"schema\":{\"default\":1,\"maximum\":20,\"minimum\":1,\"type\":\"integer\"}}],\"protocol\":\"http\",\"responses\":{\"200\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"data\":{\"properties\":{\"artist\":{\"type\":\"string\"},\"id\":{\"type\":\"string\"},\"source\":{\"type\":\"string\"},\"tags\":{\"items\":{\"type\":\"string\"},\"type\":\"array\"},\"url\":{\"format\":\"uri\",\"type\":\"string\"}},\"type\":\"object\"},\"status\":{\"example\":\"success\",\"type\":\"string\"}},\"type\":\"object\"}}},\"description\":\"Successful response\"},\"400\":{\"description\":\"Bad request\"},\"500\":{\"description\":\"Internal server error\"}},\"securitySource\":\"unspecified\"}","source":"openapi3","version":1},"kind":"http","method":"GET","orig":"/images/kitsune","segments":[{"lit":"images"},{"lit":"kitsune"}],"select":{"$action":"kitsune","exist":["count"]},"transform":{"req":"`reqdata`","res":"`body.data`"},"index$":1},{"active":true,"args":{"query":[{"active":true,"example":1,"kind":"query","name":"count","orig":"count","reqd":false,"type":"`$INTEGER`","index$":0}]},"contract":{"id":"GET /images/neko","json":"{\"operationId\":\"getRandomNeko\",\"parameters\":[{\"description\":\"Number of images to return\",\"in\":\"query\",\"name\":\"count\",\"required\":false,\"schema\":{\"default\":1,\"maximum\":20,\"minimum\":1,\"type\":\"integer\"}}],\"protocol\":\"http\",\"responses\":{\"200\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"data\":{\"properties\":{\"artist\":{\"type\":\"string\"},\"id\":{\"type\":\"string\"},\"source\":{\"type\":\"string\"},\"tags\":{\"items\":{\"type\":\"string\"},\"type\":\"array\"},\"url\":{\"format\":\"uri\",\"type\":\"string\"}},\"type\":\"object\"},\"status\":{\"example\":\"success\",\"type\":\"string\"}},\"type\":\"object\"}}},\"description\":\"Successful response\"},\"400\":{\"description\":\"Bad request\"},\"500\":{\"description\":\"Internal server error\"}},\"securitySource\":\"unspecified\"}","source":"openapi3","version":1},"kind":"http","method":"GET","orig":"/images/neko","segments":[{"lit":"images"},{"lit":"neko"}],"select":{"$action":"neko","exist":["count"]},"transform":{"req":"`reqdata`","res":"`body.data`"},"index$":2},{"active":true,"args":{"query":[{"active":true,"example":1,"kind":"query","name":"count","orig":"count","reqd":false,"type":"`$INTEGER`","index$":0}]},"contract":{"id":"GET /images/waifu","json":"{\"operationId\":\"getRandomWaifu\",\"parameters\":[{\"description\":\"Number of images to return\",\"in\":\"query\",\"name\":\"count\",\"required\":false,\"schema\":{\"default\":1,\"maximum\":20,\"minimum\":1,\"type\":\"integer\"}}],\"protocol\":\"http\",\"responses\":{\"200\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"data\":{\"properties\":{\"artist\":{\"type\":\"string\"},\"id\":{\"type\":\"string\"},\"source\":{\"type\":\"string\"},\"tags\":{\"items\":{\"type\":\"string\"},\"type\":\"array\"},\"url\":{\"format\":\"uri\",\"type\":\"string\"}},\"type\":\"object\"},\"status\":{\"example\":\"success\",\"type\":\"string\"}},\"type\":\"object\"}}},\"description\":\"Successful response\"},\"400\":{\"description\":\"Bad request\"},\"500\":{\"description\":\"Internal server error\"}},\"securitySource\":\"unspecified\"}","source":"openapi3","version":1},"kind":"http","method":"GET","orig":"/images/waifu","segments":[{"lit":"images"},{"lit":"waifu"}],"select":{"$action":"waifu","exist":["count"]},"transform":{"req":"`reqdata`","res":"`body.data`"},"index$":3}],"key$":"load"}},"relations":{"ancestors":[]},"key$":"image","name__orig":"image","Name":"Image","name_":"image","name-":"image","NAME":"IMAGE","index$":1}, {"active":true,"entity":"image","key$":"BasicImageFlow","kind":"basic","name":"BasicImageFlow","param":{},"step":[{"active":true,"data":{},"input":{"ref":"image_ref01","srcdatavar":"image_ref01_data","suffix":"_dt0"},"match":{},"op":"load","spec":[],"valid":[{"apply":"TextFieldMark","def":{"mark":"Mark01-image_ref01"}}],"index$":0}]}, 'Image')
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select

    let image_ref01_data = Object.values(setup.data.existing.image)[0] as any

    // LOAD
    const image_ref01_ent = client.Image()
    const image_ref01_match_dt0: any = {}
    const image_ref01_data_dt0 = (await image_ref01_ent.load(image_ref01_match_dt0)).data()
    assert(null != image_ref01_data_dt0)


  })
})



function basicSetup(extra?: any) {
  // TODO: fix test def options
  const options: any = {} // null

  // TODO: needs test utility to resolve path
  const entityDataFile =
    Path.resolve(__dirname, 
      '../../../../.sdk/test/entity/image/ImageTestData.json')

  // TODO: file ready util needed?
  const entityDataSource = Fs.readFileSync(entityDataFile).toString('utf8')

  // TODO: need a xlang JSON parse utility in voxgig/struct with better error msgs
  const entityData = JSON.parse(entityDataSource)

  options.entity = entityData.existing

  let client = NekosiaNekoSDK.test(options, extra)
  const struct = client.utility().struct
  const merge = struct.merge
  const transform = struct.transform

  let idmap = transform(
    ['image01','image02','image03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'NEKOSIA_NEKO_TEST_IMAGE_ENTID': idmap,
    'NEKOSIA_NEKO_TEST_LIVE': 'FALSE',
    'NEKOSIA_NEKO_TEST_EXPLAIN': 'FALSE',
  })

  idmap = env['NEKOSIA_NEKO_TEST_IMAGE_ENTID']

  const live = 'TRUE' === env.NEKOSIA_NEKO_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['NEKOSIA_NEKO_TEST_IMAGE_ENTID']
    idmap = rawIds && rawIds.trim() ? JSON.parse(rawIds) : {}
    if (!idmap || Array.isArray(idmap) || typeof idmap !== 'object') {
      throw new Error('Live ENTID must be a JSON object')
    }
    client = new NekosiaNekoSDK(merge([
      // FIRST, so the generated fields below win: sdk-test-control.json's
      // test.client.options adds to the live client, it does not redirect it.
      liveClientOptions(),
      {
      },
      // 'extra || {}', not a bare 'extra': struct.merge returns UNDEFINED when the
      // last entry is undefined, and basicSetup is normally called with no
      // argument at all - so a bare 'extra' silently discarded the apikey
      // and server values above and handed the SDK undefined. Harmless
      // while there was nothing in that object; not harmless now.
      extra || {},
      { system: { fetch: transport.fetch } }
    ]))
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
  }

  return setup
}
  
