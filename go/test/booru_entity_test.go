package sdktest

import (
	"encoding/json"
	"os"
	"path/filepath"
	"runtime"
	"strings"
	"testing"
	"time"

	sdk "github.com/voxgig-sdk/nekosia-neko-sdk"
	"github.com/voxgig-sdk/nekosia-neko-sdk/core"

	vs "github.com/voxgig/struct"
)

func TestBooruEntity(t *testing.T) {
	t.Run("instance", func(t *testing.T) {
		testsdk := sdk.TestSDK(nil, nil)
		ent := testsdk.Booru(nil)
		if ent == nil {
			t.Fatal("expected non-nil BooruEntity")
		}
	})

	t.Run("basic", func(t *testing.T) {
		setup := booruBasicSetup(nil)
		// Per-op sdk-test-control.json skip — basic test exercises a flow
		// with multiple ops; skipping any op skips the whole flow.
		_mode := "unit"
		if setup.live {
			_mode = "live"
		}
		for _, _op := range []string{"create", "list", "load"} {
			if _shouldSkip, _reason := isControlSkipped("entityOp", "booru." + _op, _mode); _shouldSkip {
				if _reason == "" {
					_reason = "skipped via sdk-test-control.json"
				}
				t.Skip(_reason)
				return
			}
		}
		// The basic flow consumes synthetic IDs from the fixture. In live mode
		// without an *_ENTID env override, those IDs hit the live API and 4xx.
		if setup.syntheticOnly {
			t.Skip("live entity test uses synthetic IDs from fixture — set NEKOSIANEKO_TEST_BOORU_ENTID JSON to run live")
			return
		}
		client := setup.client

		// CREATE
		booruRef01Ent := client.Booru(nil)
		booruRef01Data := core.ToMapAny(vs.GetProp(
			vs.GetPath([]any{"new", "booru"}, setup.data), "booru_ref01"))

		booruRef01DataResult, err := booruRef01Ent.Create(booruRef01Data, nil)
		if err != nil {
			t.Fatalf("create failed: %v", err)
		}
		booruRef01Data = core.ToMapAny(booruRef01DataResult)
		if booruRef01Data == nil {
			t.Fatal("expected create result to be a map")
		}
		if booruRef01Data["id"] == nil {
			t.Fatal("expected created entity to have an id")
		}

		// LIST
		booruRef01Match := map[string]any{}

		booruRef01ListResult, err := booruRef01Ent.List(booruRef01Match, nil)
		if err != nil {
			t.Fatalf("list failed: %v", err)
		}
		booruRef01List, booruRef01ListOk := booruRef01ListResult.([]any)
		if !booruRef01ListOk {
			t.Fatalf("expected list result to be an array, got %T", booruRef01ListResult)
		}

		foundItem := vs.Select(entityListToData(booruRef01List), map[string]any{"id": booruRef01Data["id"]})
		if vs.IsEmpty(foundItem) {
			t.Fatal("expected to find created entity in list")
		}

		// LOAD
		booruRef01MatchDt0 := map[string]any{
			"id": booruRef01Data["id"],
		}
		booruRef01DataDt0Loaded, err := booruRef01Ent.Load(booruRef01MatchDt0, nil)
		if err != nil {
			t.Fatalf("load failed: %v", err)
		}
		booruRef01DataDt0LoadResult := core.ToMapAny(booruRef01DataDt0Loaded)
		if booruRef01DataDt0LoadResult == nil {
			t.Fatal("expected load result to be a map")
		}
		if booruRef01DataDt0LoadResult["id"] != booruRef01Data["id"] {
			t.Fatal("expected load result id to match")
		}

	})
}

func booruBasicSetup(extra map[string]any) *entityTestSetup {
	loadEnvLocal()

	_, filename, _, _ := runtime.Caller(0)
	dir := filepath.Dir(filename)

	entityDataFile := filepath.Join(dir, "..", "..", ".sdk", "test", "entity", "booru", "BooruTestData.json")

	entityDataSource, err := os.ReadFile(entityDataFile)
	if err != nil {
		panic("failed to read booru test data: " + err.Error())
	}

	var entityData map[string]any
	if err := json.Unmarshal(entityDataSource, &entityData); err != nil {
		panic("failed to parse booru test data: " + err.Error())
	}

	options := map[string]any{}
	options["entity"] = entityData["existing"]

	client := sdk.TestSDK(options, extra)

	// Generate idmap via transform, matching TS pattern.
	idmap := vs.Transform(
		[]any{"booru01", "booru02", "booru03"},
		map[string]any{
			"`$PACK`": []any{"", map[string]any{
				"`$KEY`": "`$COPY`",
				"`$VAL`": []any{"`$FORMAT`", "upper", "`$COPY`"},
			}},
		},
	)

	// Detect ENTID env override before envOverride consumes it. When live
	// mode is on without a real override, the basic test runs against synthetic
	// IDs from the fixture and 4xx's. Surface this so the test can skip.
	entidEnvRaw := os.Getenv("NEKOSIANEKO_TEST_BOORU_ENTID")
	idmapOverridden := entidEnvRaw != "" && strings.HasPrefix(strings.TrimSpace(entidEnvRaw), "{")

	env := envOverride(map[string]any{
		"NEKOSIANEKO_TEST_BOORU_ENTID": idmap,
		"NEKOSIANEKO_TEST_LIVE":      "FALSE",
		"NEKOSIANEKO_TEST_EXPLAIN":   "FALSE",
		"NEKOSIANEKO_APIKEY":         "NONE",
	})

	idmapResolved := core.ToMapAny(env["NEKOSIANEKO_TEST_BOORU_ENTID"])
	if idmapResolved == nil {
		idmapResolved = core.ToMapAny(idmap)
	}

	if env["NEKOSIANEKO_TEST_LIVE"] == "TRUE" {
		mergedOpts := vs.Merge([]any{
			map[string]any{
				"apikey": env["NEKOSIANEKO_APIKEY"],
			},
			extra,
		})
		client = sdk.NewNekosiaNekoSDK(core.ToMapAny(mergedOpts))
	}

	live := env["NEKOSIANEKO_TEST_LIVE"] == "TRUE"
	return &entityTestSetup{
		client:        client,
		data:          entityData,
		idmap:         idmapResolved,
		env:           env,
		explain:       env["NEKOSIANEKO_TEST_EXPLAIN"] == "TRUE",
		live:          live,
		syntheticOnly: live && !idmapOverridden,
		now:           time.Now().UnixMilli(),
	}
}
