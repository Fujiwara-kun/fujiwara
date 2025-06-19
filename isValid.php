<?php
function isValid($s) {
// ここにコードを書いてください
    $array=str_split($s);
    $stack=[];
    $pair=[
        ")"=>"(",
        "}"=>"{",
        "]"=>"["
        ];
    foreach ($array as $word ){
        if($word=="("||$word=="{"||$word=="["){
            array_push($stack,$word);
        }
        else{
            if(empty($stack)){
                return false;
            }
            elseif($pair[$word]!=end($stack)){
                return false;
            }
            array_pop($stack);
            
        }
    }
    
    return empty($stack);
}
$s = '()';
var_dump(isValid($s)); // true
$s = '({)}';
var_dump(isValid($s)); // false
?>