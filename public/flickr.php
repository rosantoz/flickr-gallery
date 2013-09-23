<?php
/**
 * Flickr Search
 *
 * PHP version 5.5.3
 *
 * @category Pet_Projects
 * @package  Rds
 * @author   Rodrigo dos Santos <email@rodrigodossantos.ws>
 * @license  http://www.opensource.org/licenses/bsd-license.php  BSD License
 * @link     https://github.com/rosantoz
 */

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




