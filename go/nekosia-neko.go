package voxgignekosianekosdk

import (
	"github.com/voxgig-sdk/nekosia-neko-sdk/go/core"
	"github.com/voxgig-sdk/nekosia-neko-sdk/go/entity"
	"github.com/voxgig-sdk/nekosia-neko-sdk/go/feature"
	_ "github.com/voxgig-sdk/nekosia-neko-sdk/go/utility"
)

// Type aliases preserve external API.
type NekosiaNekoSDK = core.NekosiaNekoSDK
type Context = core.Context
type Utility = core.Utility
type Feature = core.Feature
type Entity = core.Entity
type NekosiaNekoEntity = core.NekosiaNekoEntity
type FetcherFunc = core.FetcherFunc
type Spec = core.Spec
type Result = core.Result
type Response = core.Response
type Operation = core.Operation
type Control = core.Control
type NekosiaNekoError = core.NekosiaNekoError

// BaseFeature from feature package.
type BaseFeature = feature.BaseFeature

func init() {
	core.NewBaseFeatureFunc = func() core.Feature {
		return feature.NewBaseFeature()
	}
	core.NewTestFeatureFunc = func() core.Feature {
		return feature.NewTestFeature()
	}
	core.NewBooruEntityFunc = func(client *core.NekosiaNekoSDK, entopts map[string]any) core.NekosiaNekoEntity {
		return entity.NewBooruEntity(client, entopts)
	}
	core.NewImageEntityFunc = func(client *core.NekosiaNekoSDK, entopts map[string]any) core.NekosiaNekoEntity {
		return entity.NewImageEntity(client, entopts)
	}
}

// Constructor re-exports.
var NewNekosiaNekoSDK = core.NewNekosiaNekoSDK
var TestSDK = core.TestSDK
var NewContext = core.NewContext
var NewSpec = core.NewSpec
var NewResult = core.NewResult
var NewResponse = core.NewResponse
var NewOperation = core.NewOperation
var MakeConfig = core.MakeConfig
var NewBaseFeature = feature.NewBaseFeature
var NewTestFeature = feature.NewTestFeature
