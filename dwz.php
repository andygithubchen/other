<?php

/**
 * 生成短网址(用百度短网址)
 * @param   str   $url       要生成短网址的URL
 * @param   arr   $filter    在生成的短网址中不希望出现的字符(例如：短网址中有3p出现时，在短信内容里是敏感词)
 * @param   int   $len       随机生成的别名的长度(不计前缀的长度)
 * @param   str   $prefix    别名的前缀(降低生成的别名被使用的概率)
 * @return  str|void         短网址
 *
 *
*/
function createShortUrl($url, $filter = array('p'), $len = 6, $prefix = 'msedu'){
    $alias = $prefix;
    $str   = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
    foreach($filter as $k=>$v){
        $str = str_replace($v, '', $str);
    }
    $strLen = mb_strlen($str);
    if($strLen < $len)
        return '';

    for($i = 0 ; $i < $len; $i++){
        $r = rand(0, $strLen-1);
        $alias .= $str[$r];
    }

    /* 闭包 return arr */
    $curl = function(&$_url, &$_data){
        $ch = curl_init();
        curl_setopt($ch, CURLOPT_URL, $_url);
        curl_setopt($ch, CURLOPT_POST, true);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
        curl_setopt($ch, CURLOPT_POSTFIELDS, $_data);
        $strRes = curl_exec($ch);
        curl_close($ch);
        return json_decode($strRes,true);
    };

    //step1.检查是否已经被使用过
    $_data = array('access_type'=>'web','tinyurl'=>$alias);
    $_url  = 'http://dwz.cn/query.php';
    $check = $curl($_url, $_data);
    if($check['status'] == 0)
        createShortUrl();

    //step2.可以去生成短网址了
    $_data  = array('url'=>$url,'alias'=>$alias);
    $_url   = 'http://dwz.cn/create.php';
    $create = $curl($_url, $_data);

    //step3.返回短网址
    if($create['status'] == 0 && $create['tinyurl'] != ''){
        return $create['tinyurl'];
    }else{
        //特殊情况：当$url已经被生成网址了就把已经生成的短网址返回回去
        $_data  = array('url'=>$url,'alias'=>'','access_type'=>'web');
        $create = $curl($_url, $_data);
        return $create['tinyurl'];
    }
    return '';

}


echo createShortUrl('http://www.mingshiedu.com/member/order/detail?orderid=201608021651052425');



echo "\n";
?>
