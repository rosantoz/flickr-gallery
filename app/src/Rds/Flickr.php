<?php

/**
 * Flickr Search
 *
 * PHP version 5.5.3
 *
 * @category App
 * @package  Rds
 * @author   Rodrigo dos Santos <email@rodrigodossantos.ws>
 * @license  http://www.opensource.org/licenses/bsd-license.php  BSD License
 * @link     https://github.com/rosantoz
 */

namespace Rds;

/**
 * Flickr Search
 *
 * @category App
 * @package  Rds
 * @author   Rodrigo dos Santos <email@rodrigodossantos.ws>
 * @license  http://www.opensource.org/licenses/bsd-license.php  BSD License
 * @link     https://github.com/rosantoz
 */
class Flickr
{
    protected $api = "http://api.flickr.com/services/rest/";
    protected $method = "flickr.photos.search";
    protected $apiKey = "b88d6f91952505a72c4eabac4950c072";
    protected $tag = array();
    protected $perPage = 5;
    protected $page = 1;
    protected $format = 'rest';

    public function setApiKey($apiKey)
    {
        $this->apiKey = $apiKey;

        return $this;
    }

    public function getApiKey()
    {
        return $this->apiKey;
    }

    public function setFormat($format)
    {
        $this->format = $format;

        return $this;
    }

    public function getFormat()
    {
        return $this->format;
    }

    public function setMethod($method)
    {
        $this->method = $method;

        return $this;
    }

    public function getMethod()
    {
        return $this->method;
    }

    public function setPage($page)
    {
        $this->page = $page;

        return $this;
    }

    public function getPage()
    {
        return $this->page;
    }

    public function setPerPage($perPage)
    {
        $this->perPage = $perPage;

        return $this;
    }

    public function getPerPage()
    {
        return $this->perPage;
    }

    public function setTag($tag)
    {
        $tags = explode(" ", $tag);

        foreach ($tags as $tag) {
            $this->tag[] = $tag;
        }

        return $this;
    }

    public function getTag()
    {
        return implode(',', $this->tag);
    }

    public function getUrl()
    {
        return $this->api
        . '?method='
        . $this->getMethod()
        . '&api_key='
        . $this->getApiKey()
        . '&tags='
        . $this->getTag()
        . '&per_page='
        . $this->getPerPage()
        . '&page='
        . $this->getPage()
        . '&format='
        . $this->getFormat();
    }

    public function search()
    {
        $ch = curl_init();
        curl_setopt($ch, CURLOPT_URL, $this->getUrl());
        curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, 0);
        curl_setopt($ch, CURLOPT_FOLLOWLOCATION, true);
        curl_setopt($ch, CURLOPT_CONNECTTIMEOUT, 5);
        ob_start();
        curl_exec($ch);
        $response = ob_get_contents();
        ob_end_clean();

        curl_close($ch);

        return $response;
    }

}