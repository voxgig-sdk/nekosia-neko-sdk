package core

var UtilityRegistrar func(u *Utility)

var NewBaseFeatureFunc func() Feature

var NewRatelimitFeatureFunc func() Feature

var NewRetryFeatureFunc func() Feature

var NewTestFeatureFunc func() Feature

var NewTimeoutFeatureFunc func() Feature

var NewBooruEntityFunc func(client *NekosiaNekoSDK, entopts map[string]any) NekosiaNekoEntity

var NewImageEntityFunc func(client *NekosiaNekoSDK, entopts map[string]any) NekosiaNekoEntity

