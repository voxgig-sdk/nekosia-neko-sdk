package core

var UtilityRegistrar func(u *Utility)

var NewBaseFeatureFunc func() Feature

var NewTestFeatureFunc func() Feature

var NewBooruEntityFunc func(client *NekosiaNekoSDK, entopts map[string]any) NekosiaNekoEntity

var NewImageEntityFunc func(client *NekosiaNekoSDK, entopts map[string]any) NekosiaNekoEntity

