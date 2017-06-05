/**
 * Created by 朱圆基 on 2017/5/24.
 */
window.onload=function () {
    var category_main= document.getElementById('category_main');
    var category_left=document.getElementById('category_left');
    var category_right=document.getElementById('category_right');
    strouctDisplay();
    setMainHeight();
    scorllBox(category_main,category_left);
    scorllBox(category_main,category_right);
    lisTap();
}
window.onresize=function () {
    setTimeout(function () {
        setMainHeight();
    },100);
}

// 设置主要内容的宽度(header+主内容宽度=屏幕宽度)
function setMainHeight() {
    var mjd_header= document.getElementById('mjd_header');
    var category_main= document.getElementById('category_main');
    var screenHeight=window.screen.height;
    var mainH=screenHeight-mjd_header.offsetHeight;
    category_main.style.height=mainH+'px';
}

//li标签的tap事件
function lisTap() {
    var category_main= document.getElementById('category_main');
    var category_left=document.getElementById('category_left');
    var lis=category_left.getElementsByTagName('li');
    var liHeight=lis[0].offsetHeight;
    var maxHeight=category_left.offsetHeight-category_main.offsetHeight;
    mjd.tap(category_left,function (e) {
        var liEle=e.target.parentNode;
        for (var i = 0; i < lis.length; i++) {
            lis[i].className='';
            lis[i].index=i;
        }
        liEle.className='current';
        if(liEle.index*liHeight>maxHeight){
            category_left.style.transform='translateY('+ -maxHeight+'px)';
        }else {
            category_left.style.transform='translateY('+ -liEle.index*liHeight+'px)';
        }
    });
}

//盒子模块滚动函数封装
function scorllBox(outerBox,innerBox) {
    // var ulHeight=category_left.getElementsByTagName('ul')[0];
    var maxGodowmH=outerBox.offsetHeight-innerBox.offsetHeight;
    var startPoint=0,endPoint=0,movedY=0,currentY=0;
    var bufferY=160; //最大缓冲距离
    innerBox.addEventListener('touchstart',function (e) {
        startPoint=e.touches[0].clientY;
    });
    innerBox.addEventListener('touchmove',function (e) {
        e.preventDefault();
        endPoint=e.touches[0].clientY;
        movedY=endPoint-startPoint+currentY;
        removeTransition(this);
        if(movedY>bufferY){
            this.style.transform='translateY('+bufferY+'px)';
        }else if(movedY<maxGodowmH-bufferY){
            this.style.transform='translateY('+maxGodowmH-bufferY+'px)';
        }else {
            this.style.transform='translateY('+movedY+'px)';
        }
    });
    innerBox.addEventListener('touchend',function (e) {
        //当ul向上移动的距离大于向上移动的最大距离时,将ul向上移动向上移动的最大距离
        if(movedY>0){
            setTransition(this);
            this.style.transform='translateY(0px)';
            //将此时ul的translateY的偏移量设置为0,防止在touchmove事件中计算movedY时产生偏移
            currentY=0;
            //当ul向下移动的距离大于向下最大移动距离时,将ul向下移动向下移动的最大距离

        }else if(movedY<maxGodowmH){ //因为向下移动translatey为负值所以是小于号
            setTransition(this);
            this.style.transform='translateY('+ maxGodowmH+'px)';
            //将此时的ul translateY的偏移量设置为向上偏移的最大值,防止在touchmove事件中计算moveY时产生偏移
            currentY=maxGodowmH;
        }else {
            //没次滑动都对ul translateY的值进行更新,确保在计算moveY的时候不会产生偏移
            removeTransition(this);
            currentY=movedY;
        }
        // console.log(currentY);
    });
}
