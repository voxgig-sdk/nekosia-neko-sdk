<?php
declare(strict_types=1);

// NekosiaNeko SDK utility: make_context

require_once __DIR__ . '/../core/Context.php';

class NekosiaNekoMakeContext
{
    public static function call(array $ctxmap, ?NekosiaNekoContext $basectx): NekosiaNekoContext
    {
        return new NekosiaNekoContext($ctxmap, $basectx);
    }
}
