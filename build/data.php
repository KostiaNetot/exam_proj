<?php

$requestPayload = file_get_contents("php://input");
$object = json_decode($requestPayload);

var_dump($object);

