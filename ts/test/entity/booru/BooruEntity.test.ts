
const envlocal = __dirname + '/../../../.env.local'
require('dotenv').config({ quiet: true, path: [envlocal] })

import Path from 'node:path'
import * as Fs from 'node:fs'

import { test, describe, afterEach } from 'node:test'
import assert from 'node:assert'


import { NekosiaNekoSDK, BaseFeature, stdutil } from '../../..'

import {
  envOverride,
  liveDelay,
  makeCtrl,
  makeMatch,
  makeReqdata,
  makeStepData,
  makeValid,
  maybeSkipControl,
} from '../../utility'


describe('BooruEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when NEKOSIANEKO_TEST_LIVE=TRUE.
  afterEach(liveDelay('NEKOSIANEKO_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = NekosiaNekoSDK.test()
    const ent = testsdk.Booru()
    assert(null != ent)
  })


  test('basic', async (t) => {

    const live = 'TRUE' === process.env.NEKOSIA_NEKO_TEST_LIVE
    for (const op of ['create', 'list', 'load']) {
      if (maybeSkipControl(t, 'entityOp', 'booru.' + op, live)) return
    }

    const setup = basicSetup()
    // The basic flow consumes synthetic IDs and field values from the
    // fixture (entity TestData.json). Those don't exist on the live API.
    // Skip live runs unless the user provided a real ENTID env override.
    if (setup.syntheticOnly) {
      t.skip('live entity test uses synthetic IDs from fixture — set NEKOSIA_NEKO_TEST_BOORU_ENTID JSON to run live')
      return
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select


    // CREATE
    const booru_ref01_ent = client.Booru()
    let booru_ref01_data = setup.data.new.booru['booru_ref01']

    booru_ref01_data = await booru_ref01_ent.create(booru_ref01_data)
    assert(null != booru_ref01_data.id)


    // LIST
    const booru_ref01_match: any = {}

    const booru_ref01_list = await booru_ref01_ent.list(booru_ref01_match)

    assert(!isempty(select(booru_ref01_list, { id: booru_ref01_data.id })))


    // LOAD
    const booru_ref01_match_dt0: any = {}
    booru_ref01_match_dt0.id = booru_ref01_data.id
    const booru_ref01_data_dt0 = await booru_ref01_ent.load(booru_ref01_match_dt0)
    assert(booru_ref01_data_dt0.id === booru_ref01_data.id)


  })
})



function basicSetup(extra?: any) {
  // TODO: fix test def options
  const options: any = {} // null

  // TODO: needs test utility to resolve path
  const entityDataFile =
    Path.resolve(__dirname, 
      '../../../../.sdk/test/entity/booru/BooruTestData.json')

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
    ['booru01','booru02','booru03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  // Detect whether the user provided a real ENTID JSON via env var. The
  // basic flow consumes synthetic IDs from the fixture file; without an
  // override those synthetic IDs reach the live API and 4xx. Surface this
  // to the test so it can skip rather than fail.
  const idmapEnvVal = process.env['NEKOSIA_NEKO_TEST_BOORU_ENTID']
  const idmapOverridden = null != idmapEnvVal && idmapEnvVal.trim().startsWith('{')

  const env = envOverride({
    'NEKOSIA_NEKO_TEST_BOORU_ENTID': idmap,
    'NEKOSIA_NEKO_TEST_LIVE': 'FALSE',
    'NEKOSIA_NEKO_TEST_EXPLAIN': 'FALSE',
    'NEKOSIA_NEKO_APIKEY': 'NONE',
  })

  idmap = env['NEKOSIA_NEKO_TEST_BOORU_ENTID']

  const live = 'TRUE' === env.NEKOSIA_NEKO_TEST_LIVE

  if (live) {
    client = new NekosiaNekoSDK(merge([
      {
        apikey: env.NEKOSIA_NEKO_APIKEY,
      },
      extra
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
    syntheticOnly: live && !idmapOverridden,
    now: Date.now(),
  }

  return setup
}
  
