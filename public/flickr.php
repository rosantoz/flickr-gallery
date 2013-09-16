<?php

require_once '../app/config/config.php';

use Rds\Flickr;

$flickr = new Flickr;

$searchInput = isset($_POST['search']) ? $_POST['search'] : '';
$page        = isset($_POST['page']) ? $_POST['page'] : 1;

$flickr->setTag($searchInput)
    ->setPage($page);

$search = $flickr->search();

echo $search;