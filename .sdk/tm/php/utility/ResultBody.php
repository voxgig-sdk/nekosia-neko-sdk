<?php
declare(strict_types=1);

// NekosiaNeko SDK utility: result_body

class NekosiaNekoResultBody
{
    public static function call(NekosiaNekoContext $ctx): ?NekosiaNekoResult
    {
        $response = $ctx->response;
        $result = $ctx->result;
        if ($result && $response && $response->json_func && $response->body) {
            $result->body = ($response->json_func)();
        }
        return $result;
    }
}
