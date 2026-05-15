<?php
declare(strict_types=1);

// NekosiaNeko SDK feature factory

require_once __DIR__ . '/feature/BaseFeature.php';
require_once __DIR__ . '/feature/TestFeature.php';


class NekosiaNekoFeatures
{
    public static function make_feature(string $name)
    {
        switch ($name) {
            case "base":
                return new NekosiaNekoBaseFeature();
            case "test":
                return new NekosiaNekoTestFeature();
            default:
                return new NekosiaNekoBaseFeature();
        }
    }
}
