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
    protected $tag;
    protected $perPage = 5;
    protected $page = 1;
    protected $format = 'rest';

    /**
     * @param string $apiKey
     */
    public function setApiKey($apiKey)
    {
        $this->apiKey = $apiKey;
    }

    /**
     * @return string
     */
    public function getApiKey()
    {
        return $this->apiKey;
    }

    /**
     * @param string $format
     */
    public function setFormat($format)
    {
        $this->format = $format;
    }

    /**
     * @return string
     */
    public function getFormat()
    {
        return $this->format;
    }

    /**
     * @param string $method
     */
    public function setMethod($method)
    {
        $this->method = $method;
    }

    /**
     * @return string
     */
    public function getMethod()
    {
        return $this->method;
    }

    /**
     * @param mixed $page
     */
    public function setPage($page)
    {
        $this->page = $page;
    }

    /**
     * @return mixed
     */
    public function getPage()
    {
        return $this->page;
    }

    /**
     * @param int $perPage
     */
    public function setPerPage($perPage)
    {
        $this->perPage = $perPage;
    }

    /**
     * @return int
     */
    public function getPerPage()
    {
        return $this->perPage;
    }

    /**
     * @param mixed $tag
     */
    public function setTag($tag)
    {
        $this->tag = $tag;
    }

    /**
     * @return mixed
     */
    public function getTag()
    {
        return $this->tag;
    }

    public function getUrl()
    {
        return $this->api
            . '?method='
            . $this->method
            . '&api_key='
            . $this->apiKey
            . '&tags='
            . $this->tag
            . '&per_page='
            . $this->perPage
            . '&page='
            . $this->page
            . '&format='
            . $this->format;
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

//        $httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);

        curl_close($ch);

//        return array($httpCode, $response);
        return $response;
    }

}