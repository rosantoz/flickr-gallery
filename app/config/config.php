<?php

function __autoload($class)
{
    $class = "../app/src/" . str_replace('\\', '/', $class) . ".php";
    require_once "$class";
}