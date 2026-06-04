# Booru entity test

require "minitest/autorun"
require "json"
require_relative "../NekosiaNeko_sdk"
require_relative "runner"

class BooruEntityTest < Minitest::Test
  def test_create_instance
    testsdk = NekosiaNekoSDK.test(nil, nil)
    ent = testsdk.Booru(nil)
    assert !ent.nil?
  end

  def test_basic_flow
    setup = booru_basic_setup(nil)
    # Per-op sdk-test-control.json skip.
    _live = setup[:live] || false
    ["create", "list", "load"].each do |_op|
      _should_skip, _reason = Runner.is_control_skipped("entityOp", "booru." + _op, _live ? "live" : "unit")
      if _should_skip
        skip(_reason || "skipped via sdk-test-control.json")
        return
      end
    end
    # The basic flow consumes synthetic IDs from the fixture. In live mode
    # without an *_ENTID env override, those IDs hit the live API and 4xx.
    if setup[:synthetic_only]
      skip "live entity test uses synthetic IDs from fixture — set NEKOSIANEKO_TEST_BOORU_ENTID JSON to run live"
      return
    end
    client = setup[:client]

    # CREATE
    booru_ref01_ent = client.Booru(nil)
    booru_ref01_data = Helpers.to_map(Vs.getprop(
      Vs.getpath(setup[:data], "new.booru"), "booru_ref01"))

    booru_ref01_data_result, err = booru_ref01_ent.create(booru_ref01_data, nil)
    assert_nil err
    booru_ref01_data = Helpers.to_map(booru_ref01_data_result)
    assert !booru_ref01_data.nil?
    assert !booru_ref01_data["id"].nil?

    # LIST
    booru_ref01_match = {}

    booru_ref01_list_result, err = booru_ref01_ent.list(booru_ref01_match, nil)
    assert_nil err
    assert booru_ref01_list_result.is_a?(Array)

    found_item = Vs.select(
      Runner.entity_list_to_data(booru_ref01_list_result),
      { "id" => booru_ref01_data["id"] })
    assert !Vs.isempty(found_item)

    # LOAD
    booru_ref01_match_dt0 = {
      "id" => booru_ref01_data["id"],
    }
    booru_ref01_data_dt0_loaded, err = booru_ref01_ent.load(booru_ref01_match_dt0, nil)
    assert_nil err
    booru_ref01_data_dt0_load_result = Helpers.to_map(booru_ref01_data_dt0_loaded)
    assert !booru_ref01_data_dt0_load_result.nil?
    assert_equal booru_ref01_data_dt0_load_result["id"], booru_ref01_data["id"]

  end
end

def booru_basic_setup(extra)
  Runner.load_env_local

  entity_data_file = File.join(__dir__, "..", "..", ".sdk", "test", "entity", "booru", "BooruTestData.json")
  entity_data_source = File.read(entity_data_file)
  entity_data = JSON.parse(entity_data_source)

  options = {}
  options["entity"] = entity_data["existing"]

  client = NekosiaNekoSDK.test(options, extra)

  # Generate idmap via transform.
  idmap = Vs.transform(
    ["booru01", "booru02", "booru03"],
    {
      "`$PACK`" => ["", {
        "`$KEY`" => "`$COPY`",
        "`$VAL`" => ["`$FORMAT`", "upper", "`$COPY`"],
      }],
    }
  )

  # Detect ENTID env override before envOverride consumes it. When live
  # mode is on without a real override, the basic test runs against synthetic
  # IDs from the fixture and 4xx's. Surface this so the test can skip.
  entid_env_raw = ENV["NEKOSIANEKO_TEST_BOORU_ENTID"]
  idmap_overridden = !entid_env_raw.nil? && entid_env_raw.strip.start_with?("{")

  env = Runner.env_override({
    "NEKOSIANEKO_TEST_BOORU_ENTID" => idmap,
    "NEKOSIANEKO_TEST_LIVE" => "FALSE",
    "NEKOSIANEKO_TEST_EXPLAIN" => "FALSE",
  })

  idmap_resolved = Helpers.to_map(
    env["NEKOSIANEKO_TEST_BOORU_ENTID"])
  if idmap_resolved.nil?
    idmap_resolved = Helpers.to_map(idmap)
  end

  if env["NEKOSIANEKO_TEST_LIVE"] == "TRUE"
    merged_opts = Vs.merge([
      {
      },
      extra || {},
    ])
    client = NekosiaNekoSDK.new(Helpers.to_map(merged_opts))
  end

  live = env["NEKOSIANEKO_TEST_LIVE"] == "TRUE"
  {
    client: client,
    data: entity_data,
    idmap: idmap_resolved,
    env: env,
    explain: env["NEKOSIANEKO_TEST_EXPLAIN"] == "TRUE",
    live: live,
    synthetic_only: live && !idmap_overridden,
    now: (Time.now.to_f * 1000).to_i,
  }
end
