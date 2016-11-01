<?php

class api extends control{

    private $table = '`mingshiedu.com`.vv9_teacher';  //这个专题的表名 @fixme

    public function index(){
        $list  = DB()->selectList($this->table, 'teacherid,introduction,curriculum,description', '', '0,30', 'teacherid desc');
        include VIEW_DIR .'index.php';
    }

    public function import(){
        include_once (INCLUDE_DIR . '/phpexcel/Classes/PHPExcel.php');

        $inputFileName = VIEW_DIR.'/tmp.xls';
        $arr = $this->_format_excel2array($inputFileName);
    }

    /**
     * 将数据导出到execl表
    */
    public function execl(){
        $list  = DB()->query('SELECT teacherid,introduction,curriculum,description FROM '.$this->table.' order by teacherid desc limit 0,30')->fetch();
        exportFile($list);
    }

    private function _format_excel2array($filePath='',$sheet=0){
        if(empty($filePath) or !file_exists($filePath)){die('file not exists');}
        $PHPReader = new PHPExcel_Reader_Excel2007();        //建立reader对象
        if(!$PHPReader->canRead($filePath)){
            $PHPReader = new PHPExcel_Reader_Excel5();
            if(!$PHPReader->canRead($filePath)){
                echo 'no Excel';
                return ;
            }
        }
        $PHPExcel = $PHPReader->load($filePath);        //建立excel对象
        $currentSheet = $PHPExcel->getSheet($sheet);        //**读取excel文件中的指定工作表*/
        $allColumn = $currentSheet->getHighestColumn();        //**取得最大的列号*/
        $allRow = $currentSheet->getHighestRow();        //**取得一共有多少行*/
        $data = array();
        for($rowIndex=1;$rowIndex<=$allRow;$rowIndex++){        //循环读取每个单元格的内容。注意行从1开始，列从A开始
            for($colIndex='A';$colIndex<=$allColumn;$colIndex++){
                $addr = $colIndex.$rowIndex;
                $cell = $currentSheet->getCell($addr)->getValue();
                if($cell instanceof PHPExcel_RichText){ //富文本转换字符串
                    $cell = $cell->__toString();
                }
                $data[$rowIndex][$colIndex] = $cell;
            }
        }
        return $data;
    }


}
