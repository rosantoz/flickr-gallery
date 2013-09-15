<?php

require_once '../app/config/config.php';

//echo "ok";
//exit;
use Rds\Flickr;

$flickr = new Flickr;

$searchInput = isset($_POST['search']) ? $_POST['search'] : '';
$page = isset($_POST['page']) ? $_POST['page'] : 1;

$flickr->setTag($searchInput);
$flickr->setPage($page);

$search = $flickr->search();

echo $search;