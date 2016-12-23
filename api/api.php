<?php
namespace CrossDomain;
/**
* @param
*/
class CrossDomain
{
    const url='https://dev.zhinenglicai.com/';
    
    function __construct()
    {
        # code...
    }

    public function test()
    {
        echo 'test';
    }

    public function server()
    {
        
        $method = getenv('REQUEST_METHOD');
        $c = $_GET['c'];
        if($method == 'GET') {
            $json = self::http($c);
        } else {
            $json = self::http($c,$method,$_POST);
        }
        echo $json; die;
    }

    public static function http($c, $method = 'GET',$param=false) 
    {
        $url = self::url.$c;

        $ch = curl_init();   

        if(stripos($url,"https://")!==FALSE){
            curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, FALSE);
            curl_setopt($ch, CURLOPT_SSL_VERIFYHOST, FALSE);
            curl_setopt($ch, CURLOPT_SSLVERSION, 1); //CURL_SSLVERSION_TLSv1
        }

        curl_setopt($ch, CURLOPT_URL, $url);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1 );

        if($method == 'POST') {
            curl_setopt($ch, CURLOPT_POST,true);
            curl_setopt($ch, CURLOPT_POSTFIELDS,$param);            
        }
        $content = curl_exec($ch);
        $status = curl_getinfo($ch);
        curl_close($ch);
        
        if(intval($status["http_code"])==200){
            return $content;
        }else{
            return false;
        }        

    }
}


$test = new namespace\CrossDomain;
$test->server();

?>



























































