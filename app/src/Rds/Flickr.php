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

namespace Rds;

/**
 * Flickr Search
 *
 * @category Pet_Projects
 * @package  Rds
 * @author   Rodrigo dos Santos <email@rodrigodossantos.ws>
 * @license  http://www.opensource.org/licenses/bsd-license.php  BSD License
 * @link     https://github.com/rosantoz
 */
class Flickr
{
    protected $api = "http://api.flickr.com/services/rest/";
    protected $apiKey = "b88d6f91952505a72c4eabac4950c072";
    protected $tag = array();
    protected $perPage = 5;
    protected $page = 1;
    protected $format = 'rest';
    protected $method;
    protected $photoId;

    /**
     * Defines the Flickr API Key to use in the application
     *
     * @param string $apiKey API Key
     *
     * @return $this
     */
    public function setApiKey($apiKey)
    {
        $this->apiKey = $apiKey;

        return $this;
    }

    /**
     * Returns the API Key
     *
     * @return string
     */
    public function getApiKey()
    {
        return $this->apiKey;
    }

    /**
     * Defines the format response (json, xml, etc)
     *
     * @param string $format Response Format
     *
     * @return $this
     */
    public function setFormat($format)
    {
        $this->format = $format;

        return $this;
    }

    /**
     * Returns the selected response format
     *
     * @return string
     */
    public function getFormat()
    {
        return $this->format;
    }

    /**
     * Defines what Flickr API method will be used
     *
     * @param string $method API method
     *
     * @return $this
     */
    public function setMethod($method)
    {
        $this->method = $method;

        return $this;
    }

    /**
     * Returns the Flickr API method
     *
     * @return mixed
     */
    public function getMethod()
    {
        return $this->method;
    }

    /**
     * Defines what page number to search
     *
     * @param int $page Page number
     *
     * @return $this
     */
    public function setPage($page)
    {
        $this->page = $page;

        return $this;
    }

    /**
     * Returns the current page number
     *
     * @return int
     */
    public function getPage()
    {
        return $this->page;
    }

    /**
     * Defines how many results per page will be returned
     *
     * @param int $perPage Results per page
     *
     * @return $this
     */
    public function setPerPage($perPage)
    {
        $this->perPage = $perPage;

        return $this;
    }

    /**
     * Returns how many results per page is being used
     *
     * @return int
     */
    public function getPerPage()
    {
        return $this->perPage;
    }

    /**
     * Adds a tag to the search
     *
     * @param string $tag Word or phrase to search
     *
     * @return $this
     */
    public function setTag($tag)
    {
        $tags = explode(" ", $tag);

        foreach ($tags as $tag) {
            $this->tag[] = $tag;
        }

        return $this;
    }

    /**
     * Returns the searched words separated by comma
     *
     * @return string
     */
    public function getTag()
    {
        return implode(',', $this->tag);
    }

    /**
     * Defines the Flickr photo id to be searched
     *
     * @param int $photoId Flickr Photo Id
     *
     * @return $this
     */
    public function setPhotoId($photoId)
    {
        $this->photoId = $photoId;

        return $this;
    }

    /**
     * Returns the Photo Id
     *
     * @return mixed
     */
    public function getPhotoId()
    {
        return $this->photoId;
    }

    /**
     * Formats the URL before call the API
     *
     * @return string
     */
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
        . $this->getFormat()
        . '&photo_id='
        . $this->getPhotoId();
    }

    /**
     * Call the API and return the response
     *
     * @return string
     */
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