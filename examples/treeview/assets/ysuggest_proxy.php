<?php
// Yahoo! Search proxy

// Hard-code hostname and path:
define ('PATH', 'http://search.yahooapis.com/WebSearchService/V1/relatedSuggestion?appid=YahooDemo&output=json&query=');

$query = urlencode($_GET["query"]);
$url = PATH.$query;

// Open the Curl session
$session = curl_init($url);

// Don't return HTTP headers. Do return the contents of the call
curl_setopt($session, CURLOPT_HEADER, false);
curl_setopt($session, CURLOPT_RETURNTRANSFER, true);

// Make the call
$response = curl_exec($session);

echo $response;
curl_close($session);

?>
