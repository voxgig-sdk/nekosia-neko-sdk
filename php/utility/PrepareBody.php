<?php
declare(strict_types=1);

// NekosiaNeko SDK utility: prepare_body

class NekosiaNekoPrepareBody
{
    public static function call(NekosiaNekoContext $ctx): mixed
    {
        if ($ctx->op->input === 'data') {
            return ($ctx->utility->transform_request)($ctx);
        }
        return null;
    }
}
