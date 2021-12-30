
var c = 1587102734000;
var token = 'aiding_win' + String(c);  //"aiding_win1587102734"

var md = hex_md5( window['btoa'](Stirng(Math.round(c/  0x3e8)))) //ece16404dff016d183b453cd4694f611


var sign = "sign=" +Math.round(c/ 0x3e8)+'~'+token+"|"+md +'; path=/'  //ece16404dff016d183b453cd4694f611

"1587102734~aiding_win1587102734|ece16404dff016d183b453cd4694f611; path=/"