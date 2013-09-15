<?php

require_once '../app/config/config.php';

//echo "ok";
//exit;
use Rds\Flickr;

$flickr = new Flickr;

$searchInput = isset($_POST['search']) ? $_POST['search'] : '';

$flickr->setTag($searchInput);

$search = $flickr->search();

echo $search;