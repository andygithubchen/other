/**
 * 根据项目需求对localStorage进行封装
 * Author: andychen(bootoo@sina.cn)
 * Date  : Fri Apr  8 09:02:42 CST 2016
*/

window.user = 'ms18702032386';

function localData(key,value){
  var data = {},
      v = localStorage.getItem(user);

  data = JSON.parse(v);
  data = data ? data : {};

  if(value || value === ''){
    data[key] = value;
    data = JSON.stringify(data);
    localStorage.setItem(user,data);
  }else{
    return data[key];
  }
}

function localDataDel(key){
  var data = {},
      v = localStorage.getItem(user);

  data = JSON.parse(v);

  if(data)
    delete data[key];

  data = JSON.stringify(data);
  localStorage.setItem(user,data);
}

function localDataClear(user){
  if(user)
    localStorage.removeItem(user);
  else
    localStorage.clear();
}


// test ---------------------------------------------+
//localData('kkkk','23233'); //set
//localData('tuua','dnfsd'); //set
//localData('andy','chen-'); //set
//localData('tuua','');      //clear empty
//localDataDel('time');      //delete
//var get = localData('som');//get
//console.log(get);
//
////localDataClear();        //clear store
//
//console.log(localStorage);
// test ---------------------------------------------+

