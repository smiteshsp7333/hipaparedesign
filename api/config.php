<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Authorization');
header('Content-Type: application/json; charset=utf-8');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

$dataFile = __DIR__ . '/../data/site-config.json';
$defaultPassword = 'Whitehorse@2026';

// ── GET: Read Site Config ──
if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    if (file_exists($dataFile)) {
        $content = file_get_contents($dataFile);
        echo $content;
    } else {
        http_response_code(404);
        echo json_encode(['error' => 'Config not found']);
    }
    exit;
}

// ── POST: Save Site Config ──
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $rawInput = file_get_contents('php://input');
    $data = json_decode($rawInput, true);

    if (!$data) {
        http_response_code(400);
        echo json_encode(['success' => false, 'message' => 'Invalid JSON payload']);
        exit;
    }

    $providedPassword = isset($data['adminPassword']) ? trim($data['adminPassword']) : '';

    // Verify Password
    if ($providedPassword !== $defaultPassword && $providedPassword !== 'whitehorse2026' && $providedPassword !== 'Nurtureinme$$') {
        http_response_code(401);
        echo json_encode(['success' => false, 'message' => 'Incorrect Admin Password. Please try again.']);
        exit;
    }

    // Prepare clean config without raw password
    $cleanConfig = [
        'siteSettings' => isset($data['siteSettings']) ? $data['siteSettings'] : [],
        'jobs' => isset($data['jobs']) ? $data['jobs'] : []
    ];

    // Ensure data directory exists
    $dataDir = dirname($dataFile);
    if (!is_dir($dataDir)) {
        mkdir($dataDir, 0755, true);
    }

    // Save JSON safely
    $saved = file_put_contents($dataFile, json_encode($cleanConfig, JSON_PRETTY_PRINT | JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE));

    if ($saved !== false) {
        echo json_encode([
            'success' => true,
            'message' => '🎉 Website configuration and job postings published live to www.whitehorsemanpower.in!',
            'updatedAt' => date('Y-m-d H:i:s')
        ]);
    } else {
        http_response_code(500);
        echo json_encode(['success' => false, 'message' => 'Failed to save configuration. Please check file permissions.']);
    }
    exit;
}

http_response_code(405);
echo json_encode(['error' => 'Method not allowed']);
