<?php
declare(strict_types=1);

// NekosiaNeko SDK utility: result_headers

class NekosiaNekoResultHeaders
{
    public static function call(NekosiaNekoContext $ctx): ?NekosiaNekoResult
    {
        $response = $ctx->response;
        $result = $ctx->result;
        if ($result) {
            if ($response && is_array($response->headers)) {
                $result->headers = $response->headers;
            } else {
                $result->headers = [];
            }
        }
        return $result;
    }
}
