<?php
declare(strict_types=1);

// NekosiaNeko SDK utility: feature_hook

class NekosiaNekoFeatureHook
{
    public static function call(NekosiaNekoContext $ctx, string $name): void
    {
        if (!$ctx->client) {
            return;
        }
        $features = $ctx->client->features ?? null;
        if (!$features) {
            return;
        }
        foreach ($features as $f) {
            if (method_exists($f, $name)) {
                $f->$name($ctx);
            }
        }
    }
}
