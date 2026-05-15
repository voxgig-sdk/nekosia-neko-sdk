<?php
declare(strict_types=1);

// NekosiaNeko SDK utility: feature_add

class NekosiaNekoFeatureAdd
{
    public static function call(NekosiaNekoContext $ctx, mixed $f): void
    {
        $ctx->client->features[] = $f;
    }
}
