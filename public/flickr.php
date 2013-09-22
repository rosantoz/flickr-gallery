<?php

require_once '../app/config/config.php';

use Rds\Flickr;

$flickr = new Flickr;

switch ($_POST['request']) {

case 'search':
    $searchInput = isset($_POST['search']) ? $_POST['search'] : '';
    $page        = isset($_POST['page']) ? $_POST['page'] : 1;
    $flickr->setTag($searchInput)
        ->setMethod('flickr.photos.search')
        ->setPage($page);
    $search = $flickr->search();
    echo $search;
    break;

case 'details':
    $photoId = isset($_POST['photo']) ? $_POST['photo'] : '';
    $flickr->setMethod('flickr.photos.getInfo')
        ->setPhotoId($photoId);
    $details = $flickr->search();
    echo $details;
    break;

default:
    break;
}




