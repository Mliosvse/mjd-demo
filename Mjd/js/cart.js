/**
 * Created by 朱圆基 on 2017/5/24.
 */
window.onload=function () {
    strouctDisplay();
    rubbishTap();
    checkTap();
}

// 垃圾篓tap事件
function rubbishTap() {
    var cart_modal=document.getElementById('cart_modal');
    var ensure=document.getElementById('ensure');
    var cancel=document.getElementById('cancel');
    var deleteLis=document.getElementsByClassName('delete');
    var up=null;
    for (var i = 0; i < deleteLis.length; i++) {
        (function (index) {
            mjd.tap(deleteLis[index],function (e) {
                // var up=e.target.parentNode.getElementsByClassName('delete-up')[0];
                up=deleteLis[index].getElementsByClassName('delete-up')[0];
                setTransition(up);
                up.style.transformOrigin='left center';
                up.style.transform='rotate(-30deg)';
                cart_modal.style.display='block';
            })
        })(i);
    }

    // 模态框tap事件
    mjd.tap(cancel,function (e) {
        modalDisplay();
    });

    mjd.tap(ensure,function (e) {
        modalDisplay();
        //通过循环一直向上获取夫标签,直到取到li元素后删除
        for (up; up.className!='cart-main'; up=up.parentNode) {
            if(up.className=='clearfloat'){
               up.parentNode.removeChild(up);
               break;
           }
        }
    });

    //模态框消失事件
    function modalDisplay() {
        cart_modal.style.display='none';
        var up=document.getElementsByClassName('delete-up');
        for (var i = 0; i < up.length; i++) {
            up[i].style.transform='rotate(0deg)';
        }
    }
}

//选择框tap事件
function checkTap() {
    var checkes=document.getElementsByClassName('checkbox');
    // checkbox tap事件的实现
    for (var i = 0; i < checkes.length; i++) {
        (function (index) {
            mjd.tap(checkes[index],function (e) {
                if(checkes[index].className=='checkbox'){
                    checkes[index].className='checkbox checked';
                }else {
                    checkes[index].className='checkbox';
                }
                selectAll();
            })
        })(i);
    };
}

// 全选的实现
function selectAll() {
    var sections=document.getElementsByClassName('cart-section');
    for (var i = 0; i < sections.length; i++) {
        var cart_st=sections[i].getElementsByClassName('cart-section-title')[0];
        var cart_m=sections[i].getElementsByClassName('cart-main')[0];
        var titleChecke=cart_st.getElementsByClassName('checkbox')[0];
        var mainCheckes=cart_m.getElementsByClassName('checkbox');
        var flag=true;
        for (var j = 0; j < mainCheckes.length; j++) {
            if(mainCheckes[j].className!='checkbox checked'){
                flag=false;
            }
            titleChecke.className=flag==true?'checkbox checked':'checkbox';
        }

        //因为此处有tap事件,tap会在点击后执行,所以要把通过循环变化的值通过闭包的方式传入tap 事件中
        (function (titleChecke,i) {
            mjd.tap(titleChecke,function (e) {
                var cart_m=sections[i].getElementsByClassName('cart-main')[0];
                var mainCheckes=cart_m.getElementsByClassName('checkbox');
                if(titleChecke.className=='checkbox checked'){
                    titleChecke.className='checkbox';
                    for (var j = 0; j < mainCheckes.length; j++) {
                        mainCheckes[j].className='checkbox';
                    }
                }else if(titleChecke.className=='checkbox'){
                    titleChecke.className='checkbox checked';
                    for (var j = 0; j < mainCheckes.length; j++) {
                        mainCheckes[j].className='checkbox checked';
                    }
                }
            })
        })(titleChecke,i);
    }
}