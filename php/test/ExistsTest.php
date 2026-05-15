<?php
declare(strict_types=1);

// NekosiaNeko SDK exists test

require_once __DIR__ . '/../nekosianeko_sdk.php';

use PHPUnit\Framework\TestCase;

class ExistsTest extends TestCase
{
    public function test_create_test_sdk(): void
    {
        $testsdk = NekosiaNekoSDK::test(null, null);
        $this->assertNotNull($testsdk);
    }
}
