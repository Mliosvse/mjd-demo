/**
 * Created by 朱圆基 on 2017/5/24.
 */
/*window.onload=function () {
    console.log(1);
    var header_strouct=document.getElementById('header_strouct');
    var header_main=document.getElementById('header_main');
    mjd.tap(header_strouct,function (e) {
        var temp=header_main.style.display;
        if(temp =='none'){
            header_main.style.display='block';
            console.log(temp);
        }else if(temp=='block') {
            header_main.style.display='none';
            console.log(temp);
        }
    });
}*/

// 为元素添加过渡效果
function setTransition(obj) {
    obj.style.transition='all .5s ease';
    obj.style.webkitTransition='all .5s ease';
}

// 移除元素的过渡效果
function removeTransition(obj) {
    obj.style.transition='none';
    obj.style.webkitTransition='none';
}


var mjd={};
mjd.tap=function(obj,callback){
    if(typeof(obj) != 'object'){
        console.log(obj + 'is not a object');
        return;
    }

    var duration=500;
    var ismoving=false;
    var startTime=Date.now();
    obj.addEventListener('touchstart',function (e) {
        startTime=Date.now();
    });
    obj.addEventListener('touchmove',function (e) {
        e.preventDefault();
        ismoving=true;
    });
    obj.addEventListener('touchend',function (e) {
        var endTime=Date.now();
        if(ismoving==false&&endTime-startTime<duration){
            if(callback){
                callback(e);
            }
        }
        ismoving=false;
    })
};

function strouctDisplay() {
    var header_strouct=document.getElementById('header_strouct');
    var header_main=document.getElementById('header_main');
    mjd.tap(header_strouct,function (e) {
        var temp=header_main.style.display;
        if(temp =='none'){
            header_main.style.display='block';
        }else if(temp=='block') {
            header_main.style.display='none';
        }
    });
}

