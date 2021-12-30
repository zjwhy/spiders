const { time } = require("console");
const { randomInt } = require("crypto");
const { float } = require("webidl-conversions");

//图片还原的js代码 已经转换为python了
function hk_hy(){
    
    var H4z = [39, 38, 48, 49, 41, 40, 46, 47, 35, 34, 50, 51, 33, 32, 28, 29, 27, 26, 36, 37, 31, 30, 44, 45, 43, 42, 12, 13, 23, 22, 14, 15, 21, 20, 8, 9, 25, 24, 6, 7, 3, 2, 0, 1, 11, 10, 4, 5, 19, 18, 16, 17];
    for (var P4z =0;P4z < H4z.length;P4z ++ ){
        h4z = "-" + (H4z[P4z] % 26 * 12 + 1) + "px " + (H4z[P4z] > 25 ? -116/ 2 : 0) + "px"
        //console.log(h4z)

    }

    
    
    // h4z = "-" + (H4z[P4z] % 26 * 12 + 1) + "px " + (H4z[P4z] > 25 ? -W4z["d"]["height"] / 2 : 0) + "px"
}

// hk_hy()

//轨迹生成

function make_gj(x){
    //arr 第一个值 应该是滑块初始位置[x - startX y - startY 0]  x应该是580 固定 y应该是缺口左上角
    // arr 第二个值是 [0,0,0]
    //e7B["o"]([Math["round"](b7z["left"] - U7z), Math["round"](b7z["top"] - G7z), 0], y7z["b"]), e7B["p"]([0, 0, 0], y7z["b"])
    //startX  590-610   startY 455-465 ??495???左右
    var arr = [[-21, -22, 0],[0,0,0]];
    var x_len = parseInt(x*2.5);
    // var step = Math.ceil(x_len / x);
    var f = parseInt(x_len / 5);
    var total_x = 0;
    var total_y = 0;
    var start_time = randomInt(200,300);

    // console.log(start_time)


    for (let index = 0; index < f; index++) {

        for (let f_index =0;f_index < 5;f_index ++){
            const tmp_y  =  index % 2 == 0 ? randomInt(0,2) :randomInt(0,1)

            const tmp_x = randomInt(0,2);
            const tmp_time = randomInt(10,30);
            start_time += tmp_time;
            total_x += tmp_x
            total_y += tmp_y
            var tmp_yy = total_y >15 ?15:total_y
            if (total_x >= x ){
                for (var b=0;b < 5 ;b++){
                    arr.push([x,tmp_yy,start_time])
                }
                break
                // var c = x_len - (index *  5);
                // if (c <= 5){
                //     arr.push([x,tmp_y]);
                // }else{
                //     arr.push([arr[arr.length-1][0]-randomInt(0,2),tmp_y ])
                // }
                
            }else{
                arr.push([total_x,tmp_yy,start_time])

            }
            
        }
        if (total_x >= x){
            break
        }
        
    }
    return arr
    //console.log(arr)
}


//轨迹转换和加密


//转换
function traver_gj(F6z){
    //F6z 原始的滑块数组
    var N5r = 9;

    var Y6z,
                  g6z,
                  a6z,
                  E6z = [],
                  D6z = 0,
                  P6z = [],
                  J6z = 0,
                  l6z = F6z["length"] - 1;
            for(J6z; J6z < l6z;J6z++){
                Y6z = Math["round"](F6z[J6z + 1][0] - F6z[J6z][0]), 
                g6z = Math["round"](F6z[J6z + 1][1] - F6z[J6z][1]), 
                a6z = Math["round"](F6z[J6z + 1][2] - F6z[J6z][2]), 
                P6z["push"]([Y6z, g6z, a6z]), 
                0 == Y6z && 0 == g6z && 0 == a6z || (0 == Y6z && 0 == g6z ? D6z += a6z : (E6z["push"]([Y6z, g6z, a6z + D6z]), D6z = 0));
                N5r = N5r > 34958 ? N5r / 6 : N5r * 6;

            }
            return 0 !== D6z && E6z["push"]([Y6z, g6z, D6z]), E6z;

              
    // s6z = function (F6z) {
    //     var R1r = M9r.k9r()[2][7][21];

    //     while (R1r !== M9r.k9r()[4][27][45]) {
    //       switch (R1r) {
    //         case M9r.L9r()[31][29][21]:
    //           var N5r = 9;
    //           R1r = M9r.k9r()[15][42][24];
    //           break;

    //         case M9r.k9r()[29][35][3]:
    //           R1r = J6z < l6z && N5r * (N5r + 1) % 2 + 7 ? M9r.L9r()[36][26][30] : M9r.k9r()[5][42][12];
    //           break;

    //         case M9r.L9r()[17][0][30]:
    //           Y6z = Math["round"](F6z[J6z + 1][0] - F6z[J6z][0]), g6z = Math["round"](F6z[J6z + 1][1] - F6z[J6z][1]), a6z = Math["round"](F6z[J6z + 1][2] - F6z[J6z][2]), P6z["push"]([Y6z, g6z, a6z]), 0 == Y6z && 0 == g6z && 0 == a6z || (0 == Y6z && 0 == g6z ? D6z += a6z : (E6z["push"]([Y6z, g6z, a6z + D6z]), D6z = 0));
    //           N5r = N5r > 34958 ? N5r / 6 : N5r * 6;
    //           R1r = M9r.L9r()[2][8][36];
    //           break;

    //         case M9r.k9r()[37][14][24]:
    //           var Y6z,
    //               g6z,
    //               a6z,
    //               E6z = [],
    //               D6z = 0,
    //               P6z = [],
    //               J6z = 0,
    //               l6z = F6z["length"] - 1;
    //           R1r = M9r.k9r()[23][47][3];
    //           break;

    //         case M9r.L9r()[4][36][36]:
    //           J6z++;
    //           R1r = M9r.L9r()[1][27][3];
    //           break;

    //         case M9r.k9r()[21][26][12]:
    //           return 0 !== D6z && E6z["push"]([Y6z, g6z, D6z]), E6z;
    //           R1r = M9r.k9r()[6][7][45];
    //           break;
    //       }
    //     }
    //   }
}
//加密

var u6z = function (R6z) {
    var t8r;
    var f5r = 9;
    var z6z = [[1, 0], [2, 0], [1, -1], [1, 1], [0, 1], [0, -1], [3, 0], [2, -1], [2, 1]],
              h6z = 0,
              C6z = z6z["length"];
              for (h6z;h6z < C6z;h6z ++){

                t8r = h6z < C6z && f5r * (f5r + 1) % 2 + 7 ;

                // if (t8r){
                t8r = R6z[0] == z6z[h6z][0] && R6z[1] == z6z[h6z][1]

                if (t8r){
                    return "stuvwxyz~"[h6z]
                }
                
                f5r = f5r >= 62252 ? f5r - 6 : f5r + 6

              }
              return 0
              
             

  }
var O6z = function (r6z) {
    
          var d6z = "()*,-./0123456789:?@ABCDEFGHIJKLMNOPQRSTUVWXYZ_abcdefghijklmnopqr",
              m6z = d6z["length"],
              Z6z = "",
              H6z = Math["abs"](r6z),
              W6z = parseInt(H6z / m6z);
          W6z >= m6z && (W6z = m6z - 1), W6z && (Z6z = d6z["charAt"](W6z)), H6z %= m6z;
          var q6z = "";
          return r6z < 0 && (q6z += "!"), Z6z && (q6z += "$"), q6z + Z6z + d6z["charAt"](H6z);
   
  }

//加密 轨迹转换后的结果
function encode_gj(arr){
    var o5r = 6;
    var N1z,
                  X1z = arr
                  f1z = [],
                  B1z = [],
                  o1z = [],
                  t1z = 0,
                  j1z = X1z["length"];
                for (t1z;t1z <j1z;t1z ++){
                    N1z = u6z(X1z[t1z]), N1z ? B1z["push"](N1z) : (f1z["push"](O6z(X1z[t1z][0])), B1z["push"](O6z(X1z[t1z][1]))), o1z["push"](O6z(X1z[t1z][2]));
                    o5r = o5r >= 17705 ? o5r / 3 : o5r * 3;
                }
                return f1z["join"]("") + "!!" + B1z["join"]("") + "!!" + o1z["join"]("");

  
}

//轨迹二次加密

function encode_two(Q1z, v1z, T1z) {

    var K5r = 2;
    var j5r = 4;
    var i1z,
        x1z = 0,
        c1z = Q1z,
        y1z = v1z[0],
        k1z = v1z[2],
        L1z = v1z[4];
    while((i1z = T1z["substr"](x1z, 2)) && K5r * (K5r + 1) * K5r % 2 == 0 ){
        // i1z = T1z["substr"](x1z, 2)

        x1z += 2;

        var n1z = parseInt(i1z, 16),
            M1z = String["fromCharCode"](n1z),
            I1z = (y1z * n1z * n1z + k1z * n1z + L1z) % Q1z["length"];
        c1z = c1z["substr"](0, I1z) + M1z + c1z["substr"](I1z);

        K5r = K5r > 10375 ? K5r / 8 : K5r * 8;

    }
    return c1z

  
  }


// 轨迹生成
function get_track(x){

    var arr=[]

  
    var tmp_x=randomInt(1,3)
    var total_y = 0;
    var total_x = 0;
    var total_time = randomInt(200,300);
    while( x-tmp_x>=5){
        const tmp_y  =  x % 2 == 0 ? randomInt(0,2) :randomInt(0,1)
        total_y += tmp_y
        total_x += tmp_x
        var tmp_yy = total_y >15 ?15:total_y
        var tmp_time = randomInt(10,30);
        total_time += tmp_time;
        arr.push([total_x,tmp_yy,total_time])
        x=x - tmp_x
        tmp_x = randomInt(1,3)
        

    }
       

    for(var  i=0; i<x;i++ ){
        var tmp_time = randomInt(10,50);
        total_time += tmp_time
        total_x +=1
        arr.push([total_x,15,total_time])
    }
    return arr
}

function main_gj(x,c_arr,s_str){
    // var arr =   make_gj(x);
        var arr = get_track(x);


        var new_arr = traver_gj(arr);

        // console.log()


// console.log(new_arr.length,arr.length,ii)



        var encode_str = encode_gj(new_arr);

        encode_str = encode_two(encode_str,c_arr,s_str)

        return {encode_str:encode_str,passtime:arr[arr.length-1][2]};
}



// console.log(get_track(144))
console.log(main_gj(144))

var a = [
    12,
    58,
    98,
    36,
    43,
    95,
    62,
    15,
    12
]

var b = "32763134";

var c = "?...!)!)!)(!!Assssyt(y((tytyystttsssssssstssstsssssssssssssss()((!!($,334255878655846466131L$)RZ91221124:88F99MMGCL$).c$)/$)8$,h:2$Zh";

var s = encode_two(c,a,b)

console.log(s)


