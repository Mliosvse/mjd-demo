/**
 * Created by 朱圆基 on 2017/5/21.
 */
window.onload=function () {
    changeAlpha();
    bannerActive();
    secondKill();
}

// 滚动改变头部的透明度
function changeAlpha() {
    var headerbar=document.getElementById('mjd_header_bar');
    var banner=document.getElementById('mjd_banner');
    var bannerH=banner.offsetHeight;
    var alpha=0.85;
    window.onscroll=function () {
        var scrollH=document.body.scrollTop;
        if(scrollH<bannerH){
            headerbar.style.backgroundColor='rgba(201,21,35,'+scrollH/bannerH*alpha+')';
        }else {
            headerbar.style.backgroundColor='rgba(201,21,35,'+alpha+')';
        }
    }
}

// 焦点图部分
function bannerActive() {
    var bannerbox=document.getElementById('banner');
    var ol=document.getElementById('bannerIndex');
    var lis=ol.getElementsByTagName('li');
    var imgW=bannerbox.getElementsByTagName('li')[0].offsetWidth;
    var index=1;
    var timer=null;
    timer=setInterval(autoplay,1000);

    bannerbox.addEventListener('transitionend',keepIndexSafe);
    bannerbox.addEventListener('webkitTransitionend',keepIndexSafe);

    // 自动轮播
    function autoplay() {
        index++;
        setTransition(bannerbox);
        changeTranslatex(-imgW*index);
    }

    // 改变图片
    function changeTranslatex(x) {
        bannerbox.style.transform='translateX('+ x +'px)';
        bannerbox.style.webkitTransform = 'translateX('+ x +'px)';
    }

    //还原图片位置,和index
    function keepIndexSafe() {
        if(index>lis.length){
            index=1
        }else if(index<=0){
            index=lis.length;
        }
        removeTransition(bannerbox);
        changeTranslatex(-imgW*index);
        changeLisStyle();
    }

    //改变圆点样式
    function changeLisStyle() {
        for (var i = 0; i < lis.length; i++) {
            lis[i].className='';
        }
        lis[index-1].className='current';
    }

    //触屏滑动切换图片
    var stratx=0,currentx=0,movex=0;
    bannerbox.addEventListener('touchstart',function (e) {
        stratx=e.touches[0].clientX;
        clearInterval(timer);
    });
    bannerbox.addEventListener('touchmove',function (e) {
        e.preventDefault();
        currentx=e.touches[0].clientX;
        movex=currentx-stratx;
        removeTransition(bannerbox);
        changeTranslatex(-index*imgW+movex);
    });
    bannerbox.addEventListener('touchend',function (e) {
        timer=setInterval(autoplay,1000);
        var dx=Math.abs(movex);
        if(movex<0&&dx>0.4*imgW){
            index++;
            if(index>8) index=1;
        }else if(movex>0.4*imgW){
            index--;
            if(index<1) index=8;
        }
        removeTransition(bannerbox);
        changeTranslatex(-index*imgW);
        changeLisStyle();
    });
}

//秒杀倒计时
function secondKill() {
    var golaTime=document.getElementById('golaTime');
    var surplusTime=document.getElementById('surplusTime');
    var spans=surplusTime.getElementsByTagName('span');
    setInterval(countDown,1000);
    function countDown() {
        var nowTime=new Date();
        var nowH=nowTime.getHours();
        var nowMinute=nowTime.getMinutes();
        var nowSecond=nowTime.getSeconds();
        var golaHour=Math.floor(nowH/8)*8;
        var temphour=golaHour>10?golaHour:'0'+golaHour;
        golaTime.innerHTML=temphour+'点场';
        var surplusH=(nowMinute==60&&nowSecond==60)?golaHour+8-nowH:golaHour+7-nowH;
        var surplusM=(nowSecond==60)?60-nowMinute:59-nowMinute;
        var surplusS=60-nowSecond;
        surplusH=surplusH>9?surplusH:'0'+surplusH;
        surplusM=surplusM>9?surplusM:'0'+surplusM;
        surplusS=surplusS>9?surplusS:'0'+surplusS;
        spans[0].innerHTML=surplusH;
        spans[2].innerHTML=surplusM;
        spans[4].innerHTML=surplusS;
    }
}

