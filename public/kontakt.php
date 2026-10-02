<?php
// Empfängt das Kontaktformular und verschickt es per E-Mail.
// Läuft nur auf dem Webserver (All-Inkl), nicht mit `nuxt dev`.

declare(strict_types=1);

const RECIPIENT = 'anfrage@luiseriegelfotografie.de';
// Absender muss eine Adresse der eigenen Domain sein, sonst landet die Mail im Spam
const SENDER = 'anfrage@luiseriegelfotografie.de';
const SENDER_NAME = 'Website Luise Riegel Fotografie';
// Menschen brauchen länger als ein paar Sekunden zum Ausfüllen, Bots nicht
const MIN_FILL_SECONDS = 3;

const SHOOTING_TYPES = [
    'Babybauch-Shooting',
    'Neugeborenen-Shooting',
    'Familien-Shooting',
    'Noch unsicher',
];

date_default_timezone_set('Europe/Berlin');

header('Content-Type: application/json; charset=utf-8');
header('X-Content-Type-Options: nosniff');

function respond(int $status, array $data): void
{
    http_response_code($status);
    echo json_encode($data, JSON_UNESCAPED_UNICODE);
    exit;
}

function field(string $key, int $maxLength): string
{
    $value = isset($_POST[$key]) && is_string($_POST[$key]) ? trim($_POST[$key]) : '';
    return mb_substr($value, 0, $maxLength, 'UTF-8');
}

// Zeilenumbrüche entfernen, damit niemand zusätzliche Mail-Header einschleusen kann
function singleLine(string $value): string
{
    return trim(preg_replace('/[\r\n\t]+/', ' ', $value) ?? '');
}

if (($_SERVER['REQUEST_METHOD'] ?? '') !== 'POST') {
    header('Allow: POST');
    respond(405, ['ok' => false, 'error' => 'method']);
}

// Spam-Schutz: Honeypot-Feld ist für Menschen unsichtbar und bleibt leer.
// Bots bekommen trotzdem eine Erfolgsmeldung, damit sie es nicht weiter versuchen.
$startedAt = (int) field('t', 20);
if (field('website', 200) !== '' || ($startedAt > 0 && time() - intdiv($startedAt, 1000) < MIN_FILL_SECONDS)) {
    respond(200, ['ok' => true]);
}

$name = singleLine(field('name', 120));
$email = singleLine(field('email', 200));
$type = singleLine(field('type', 60));
$period = singleLine(field('period', 200));
$message = field('message', 5000);

if (
    $name === ''
    || $message === ''
    || !filter_var($email, FILTER_VALIDATE_EMAIL)
    || !in_array($type, SHOOTING_TYPES, true)
) {
    respond(422, ['ok' => false, 'error' => 'validation']);
}

$subject = "Anfrage {$type} von {$name}";

$body = "Neue Anfrage über das Kontaktformular\n\n"
    . "Name: {$name}\n"
    . "E-Mail: {$email}\n"
    . "Art des Shootings: {$type}\n"
    . 'Wunschzeitraum: ' . ($period !== '' ? $period : 'keine Angabe') . "\n\n"
    . "Nachricht:\n{$message}\n\n"
    . "--\nGesendet am " . date('d.m.Y \u\m H:i') . " Uhr.\n"
    . "Auf diese E-Mail antworten geht direkt an {$email}.\n";

$headers = [
    'From' => mb_encode_mimeheader(SENDER_NAME, 'UTF-8') . ' <' . SENDER . '>',
    'Reply-To' => mb_encode_mimeheader($name, 'UTF-8') . " <{$email}>",
    'MIME-Version' => '1.0',
    'Content-Type' => 'text/plain; charset=UTF-8',
    'Content-Transfer-Encoding' => '8bit',
];

$sent = mail(
    RECIPIENT,
    mb_encode_mimeheader($subject, 'UTF-8'),
    $body,
    $headers,
    '-f' . SENDER
);

if (!$sent) {
    respond(500, ['ok' => false, 'error' => 'send']);
}

respond(200, ['ok' => true]);
