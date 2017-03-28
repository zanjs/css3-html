/**
 * Created by Anla-E on 2017/3/28.
 */
var isdown = 0;	//鼠标是否已按下
var startx = 0;	//起始X
var starty = 0;	//起始Y
var degx = 0;	//起始x角度
var degy = 0;	//起始y角度
var tdegx = 0;	//变动的x
var tdegy = 0;	//变动的y
var timer = null;	//旋转timer
var d3per = 0;		//Z轴距离
var isstop = 0;		//是否停止旋转

window.onload = function(){
    "use strict";

    //判断是否是IE，是ie6~11,就不用加载了
    if(isIe()){
        $(".dontserver").fadeIn(300);
        $(".loading_1").fadeOut(300);
        return;
    }
    /* ----- 鼠标控制 ----- */
    $(".box3d").on("mousedown",function(e){	/* -- 鼠标按下 -- */
        isdown = 1;
        startx = e.pageX;
        starty = e.pageY;
        clearInterval(timer);
    }).on("mousemove",function(e){	/* -- 鼠标拖动 -- */
        if(!isdown){return;}
        var x = startx - e.pageX;	//x方向移动距离
        var y = starty - e.pageY;	//y方向移动距离
        tdegx = degx+x;
        tdegy = degy+y;

        if(tdegy>180){tdegy=180;}
        if(tdegy<-180){tdegy=-180;}
        $(".box3d_2").css({"transform":"rotateX("+(tdegy/2)+"deg)","-webkit-transform":"rotateX("+(tdegy/2)+"deg)"});
        $(".my3dbox").removeClass("all_trans").css({"transform":"rotateZ(-10deg) rotateY("+(-tdegx/2)+"deg)","-webkit-transform":"rotateZ(-10deg)) rotateY("+(-tdegx/2)+"deg)"});

    }).on("mouseup",function(){	//鼠标抬起
        isdown = 0;
        degx = tdegx;
        degy = tdegy;
        if(!isstop){
            clearInterval(timer);
            timer = setInterval(function(){start();},30);
        }
    }).bind('mousewheel', function(event, delta) {	//滚轮滚动
        if (window.console && console.log) {
            d3per+=delta*20;
            if(d3per>400){
                d3per = 400;
                return;
            }else if(d3per<-200){
                d3per = -200;
            }
            $(".box3d_z").css({"transform":"translateZ("+d3per+"px)","-webkit-transform":"translateZ("+d3per+"px)"});
        }
    });

    //在3D空间外抬起鼠标
    $("html,body").on("mouseup",function(){
        if(isdown){
            isdown = 0;
            degx = tdegx;
            degy = tdegy;
            if(!isstop){
                clearInterval(timer);
                timer = setInterval(function(){start();},30);
            }
        }
        condown = 0;
    });

    //用户控制面板相关,在body上移动鼠标
    $("body").on("mousemove",function(e){
        if(condown){
            //alert("s");
            var $u = $("#usercontrol");
            $u.css({"top":cont+(e.pageY-cony)+"px","left":conl+(e.pageX-conx)+"px"});
        }
    });

    //点击选择效果的按钮
    $(".photo_effectbox>span").on("click",function(){
        var $t = $(this);
        var effect = $t.data("effect");
        var $mubu = $(".theimgbox_mubu");
        var $mubuimg = $mubu.children("img");
        $(".photo_effectbox>span").removeClass("effect_check");
        $t.addClass("effect_check");
        if(effect == "0"){
            //无效果
            $mubuimg.attr("src","img/nothing.png");
        }else if(effect == "1"){
            //边框效果
            $mubuimg.attr("src","img/e_01.png");
        }else if(effect == "2"){
            //羽化效果
            $mubuimg.attr("src","img/e_02.png");
        }
    });

    //用户操作面板移动相关
    var condown = 0;
    var conx = 0;
    var cony = 0;
    var conl = 0;
    var cont = 0;

    $(".usercontrol .conhead").on("mousedown",function(e){
        condown = 1;
        conx = e.pageX;
        cony = e.pageY;
        conl = parseInt($(".usercontrol").css("left"));
        cont = parseInt($(".usercontrol").css("top"));
    });
    //点击用户操作按钮的事件
    //停止旋转
    $(".usercontrol_btn1").on("click",function(){
        isstop = 1;
        clearInterval(timer);
    });
    //开始旋转
    $(".usercontrol_btn2").on("click",function(){
        isstop = 0;
        $(".my3dbox").removeClass("all_trans");
        clearInterval(timer);
        timer = setInterval(function(){start();},30);
    });
    //正面(停止旋转，转到正面，不倾斜)
    $(".usercontrol_btn3").on("click",function(){
        isstop = 1;
        clearInterval(timer);
        degx = 0;
        degy = 0;
        tdegx = 0;
        tdegy = 0;
        $(".my3dbox").addClass("all_trans").css({"transform":"rotateZ(0deg) rotateY(0deg) rotateX(0deg)","-webkit-transform":"rotateZ(0deg)) rotateY(0deg) rotateX(0deg)"});
    });
    //背面(停止旋转，转到正面，不倾斜)
    $(".usercontrol_btn4").on("click",function(){
        isstop = 1;
        clearInterval(timer);
        degx = 360;
        degy =  0;
        tdegx = 0;
        tdegy = 0;
        $(".my3dbox").addClass("all_trans").css({"transform":"rotateZ(0deg) rotateY(180deg) rotateX(0deg)","-webkit-transform":"rotateZ(0deg)) rotateY(180deg) rotateX(0deg)"});
    });
    //左面(停止旋转，转到正面，不倾斜)
    $(".usercontrol_btn5").on("click",function(){
        isstop = 1;
        clearInterval(timer);
        degx = -180;
        degy = 0;
        tdegx = 0;
        tdegy = 0;
        $(".my3dbox").addClass("all_trans").css({"transform":"rotateZ(0deg) rotateY(90deg) rotateX(0deg)","-webkit-transform":"rotateZ(0deg)) rotateY(90deg) rotateX(0deg)"});
    });
    //右面(停止旋转，转到正面，不倾斜)
    $(".usercontrol_btn6").on("click",function(){
        isstop = 1;
        clearInterval(timer);
        degx = 180;
        degy = 0;
        tdegx = 0;
        tdegy = 0;
        $(".my3dbox").addClass("all_trans").css({"transform":"rotateZ(0deg) rotateY(-90deg) rotateX(0deg)","-webkit-transform":"rotateZ(0deg)) rotateY(-90deg) rotateX(0deg)"});
    });

    //点击清空照片按钮，清楚所有图片
    $(".removephoto").on("click",function(){
        $(".mybox_photo,.mybox_photo2").html("");

    });
    //点击文字确定按钮，加上文字
    $("#thewordsarea").on("change keyup",function(){
        var words = $("#thewordsarea").val();
        words = words.replace(/\n/g,"<br>");
        $(".mybox_words").html(words);
    });

    //点击查看最终效果按钮，生成最后的图片
    $("#thelastbtn").on("click",function(){
        modelShow("生成中，稍等...",1);
        //底图
        var $theimg = $("#thetrueimg");
        //canvas
        var c = document.createElement('canvas');
        c.width = $theimg.width();
        c.height = $theimg.height();
        c.style.width = $theimg.width();
        c.style.height = $theimg.height();
        //两张图片，可能不存在
        var $img1 = $(".mybox_photo>img");
        var $img2 = $(".mybox_photo2>img");
        //文字，可能有换行<br/>
        var thewords = $(".mybox_words").html();

        /* --------开始组合------- */

        var cxt=c.getContext("2d");	//2D画笔
        //画底图
        cxt.drawImage($theimg.get(0),0,0,$theimg.width(),$theimg.height());
        //将两张图片叠加上去
        if($img1.length>0){
            cxt.drawImage($img1.get(0),50,400,$img1.width(),$img1.height());
        }
        if($img2.length>0){
            cxt.drawImage($img2.get(0),650,400,$img1.width(),$img1.height());
        }
        //生成文字
        if(thewords){
            var ws = thewords.split("<br>");

            cxt.font = "Bold 14px Microsoft Yahei";
            cxt.textAlign = "center";
            cxt.fillStyle = "#F7DE6C";

            for(var i=0;i<ws.length;i++){
                cxt.fillText(ws[i],150,700+i*20);
            }

        }
        $(".luo_lastmodel>div").html("").append($(c));
        $(".luo_lastmodel").fadeIn(200);
        modelShow("生成成功");
    });

    //第1步选择主题选项被选择
    var chose1 = "1";
    $(".userbox1_1 .info ul>li").on("click",function(){
        $(".userbox1_1 .info ul>li").removeClass("check");
        $(this).addClass("check");
        chose1 = $(this).data("chose");
    });
    //btn1被点击
    $("#userbtn_1").on("click",function(){
        $(".userbox1_1").css({"margin-left":"0px","display":"block"}).animate({"margin-left":"-50px","opacity":"hide"},300);
        $(".userbox1_2").css({"margin-left":"50px","display":"none"}).animate({"margin-left":"0px","opacity":"show"},300);
        var $ul = $(".goin_slide ul");
        $ul.html("");
        if(chose1 == "1"){
            //生日
            $ul.append($('<li onClick="bzcheck(this)" class="check" data-chose="1"><div class="goin_slide_imgbox"><img src="img/muban/sr/1.jpg"></div></li>'));
            $ul.append($('<li onClick="bzcheck(this)" data-chose="2"><div class="goin_slide_imgbox"><img src="img/muban/sr/2.jpg"></div></li>'));
            $ul.append($('<li onClick="bzcheck(this)" data-chose="3"><div class="goin_slide_imgbox"><img src="img/muban/sr/3.jpg"></div></li>'));
            $ul.append($('<li onClick="bzcheck(this)" data-chose="4"><div class="goin_slide_imgbox"><img src="img/muban/sr/4.jpg"></div></li>'));
            $ul.append($('<li onClick="bzcheck(this)" data-chose="5"><div class="goin_slide_imgbox"><img src="img/muban/sr/5.jpg"></div></li>'));
            $ul.append($('<li onClick="bzcheck(this)" data-chose="6"><div class="goin_slide_imgbox"><img src="img/muban/sr/6.jpg"></div></li>'));
        }else if(chose1 == "2"){
            //升学
            $ul.append($('<li onClick="bzcheck(this)" class="check" data-chose="7"><div class="goin_slide_imgbox"><img src="img/muban/sx/1.jpg"></div></li>'));
            $ul.append($('<li onClick="bzcheck(this)" data-chose="8"><div class="goin_slide_imgbox"><img src="img/muban/sx/2.jpg"></div></li>'));
            $ul.append($('<li onClick="bzcheck(this)" data-chose="9"><div class="goin_slide_imgbox"><img src="img/muban/sx/3.jpg"></div></li>'));
        }else if(chose1 == "3"){
            //商务
            $ul.append($('<li onClick="bzcheck(this)" class="check" data-chose="10"><div class="goin_slide_imgbox"><img src="img/muban/sw/1.jpg"></div></li>'));
            $ul.append($('<li onClick="bzcheck(this)" data-chose="11"><div class="goin_slide_imgbox"><img src="img/muban/sw/2.jpg"></div></li>'));
            $ul.append($('<li onClick="bzcheck(this)" data-chose="12"><div class="goin_slide_imgbox"><img src="img/muban/sw/3.jpg"></div></li>'));
            $ul.append($('<li onClick="bzcheck(this)" data-chose="13"><div class="goin_slide_imgbox"><img src="img/muban/sw/4.jpg"></div></li>'));
        }else if(chose1 == "4"){
            //乔迁
            $ul.append($('<li onClick="bzcheck(this)" class="check" data-chose="14"><div class="goin_slide_imgbox"><img src="img/muban/qq/1.jpg"></div></li>'));
            $ul.append($('<li onClick="bzcheck(this)" data-chose="15"><div class="goin_slide_imgbox"><img src="img/muban/qq/2.jpg"></div></li>'));
            $ul.append($('<li onClick="bzcheck(this)" data-chose="15"><div class="goin_slide_imgbox"><img src="img/muban/qq/2.jpg"></div></li>'));
        }else if(chose1 == "5"){
            //聚会
            $ul.append($('<li onClick="bzcheck(this)" class="check" data-chose="16"><div class="goin_slide_imgbox"><img src="img/muban/jh/1.jpg"></div></li>'));
            $ul.append($('<li onClick="bzcheck(this)" data-chose="17"><div class="goin_slide_imgbox"><img src="img/muban/jh/2.jpg"></div></li>'));
            $ul.append($('<li onClick="bzcheck(this)" data-chose="18"><div class="goin_slide_imgbox"><img src="img/muban/jh/3.jpg"></div></li>'));
            $ul.append($('<li onClick="bzcheck(this)" data-chose="19"><div class="goin_slide_imgbox"><img src="img/muban/jh/4.jpg"></div></li>'));
            $ul.append($('<li onClick="bzcheck(this)" data-chose="20"><div class="goin_slide_imgbox"><img src="img/muban/jh/5.jpg"></div></li>'));
            $ul.append($('<li onClick="bzcheck(this)" data-chose="21"><div class="goin_slide_imgbox"><img src="img/muban/jh/6.jpg"></div></li>'));
            $ul.append($('<li onClick="bzcheck(this)" data-chose="22"><div class="goin_slide_imgbox"><img src="img/muban/jh/7.jpg"></div></li>'));
            $ul.append($('<li onClick="bzcheck(this)" data-chose="23"><div class="goin_slide_imgbox"><img src="img/muban/jh/8.jpg"></div></li>'));
        }else if(chose1 == "6"){
            //节日
            $ul.append($('<li onClick="bzcheck(this)" class="check" data-chose="24"><div class="goin_slide_imgbox"><img src="img/muban/jr/1.jpg"></div></li>'));
            $ul.append($('<li onClick="bzcheck(this)" data-chose="25"><div class="goin_slide_imgbox"><img src="img/muban/jr/2.jpg"></div></li>'));
            $ul.append($('<li onClick="bzcheck(this)" data-chose="26"><div class="goin_slide_imgbox"><img src="img/muban/jr/3.jpg"></div></li>'));
            $ul.append($('<li onClick="bzcheck(this)" data-chose="27"><div class="goin_slide_imgbox"><img src="img/muban/jr/4.jpg"></div></li>'));
        }else if(chose1 == "7"){
            //婚宴
            $ul.append($('<li onClick="bzcheck(this)" class="check" data-chose="28"><div class="goin_slide_imgbox"><img src="img/muban/hy/1.jpg"></div></li>'));
            $ul.append($('<li onClick="bzcheck(this)" data-chose="29"><div class="goin_slide_imgbox"><img src="img/muban/hy/2.jpg"></div></li>'));
            $ul.append($('<li onClick="bzcheck(this)" data-chose="30"><div class="goin_slide_imgbox"><img src="img/muban/hy/3.jpg"></div></li>'));
            $ul.append($('<li onClick="bzcheck(this)" data-chose="31"><div class="goin_slide_imgbox"><img src="img/muban/hy/4.jpg"></div></li>'));
            $ul.append($('<li onClick="bzcheck(this)" data-chose="32"><div class="goin_slide_imgbox"><img src="img/muban/hy/5.jpg"></div></li>'));
            $ul.append($('<li onClick="bzcheck(this)" data-chose="33"><div class="goin_slide_imgbox"><img src="img/muban/hy/6.jpg"></div></li>'));
        }else if(chose1 == "8"){
            //毕业
            $ul.append($('<li onClick="bzcheck(this)" class="check" data-chose="34"><div class="goin_slide_imgbox"><img src="img/muban/by/1.jpg"></div></li>'));
            $ul.append($('<li onClick="bzcheck(this)" data-chose="35"><div class="goin_slide_imgbox"><img src="img/muban/by/2.jpg"></div></li>'));
            $ul.append($('<li onClick="bzcheck(this)" data-chose="36"><div class="goin_slide_imgbox"><img src="img/muban/by/3.jpg"></div></li>'));
        }
        initLunBo();
    });

    //userbtn2被点击，返回第1步
    $("#userbtn_2").on("click",function(){
        $(".userbox1_1").css({"margin-left":"-50px","display":"none"}).animate({"margin-left":"0px","opacity":"show"},200);
        $(".userbox1_2").css({"margin-left":"0px","display":"none"}).animate({"margin-left":"-50px","opacity":"hide"},200);
    });

    //userbtn3被点击，进入下一步
    $("#userbtn_3").on("click",function(){
        $(".removephoto").click();
        //共36种模板，有的有图片，有的没有图片，基本都有文字，有的有多张图片
        //每一种模板需要调整：
        //1、立方体的贴图，真实img地址
        //2、立方体上面照片框的坐标、大小
        //3、立方体上面文字框的坐标
        //4、编辑栏中是否有图片编辑、是否可以编辑2张图片、拆减插件的图片的长宽比例
        //5、每种模板替换对应的照片边框图
        if(chose2=="1"){

        }else if(chose2=="2"){

        }else if(chose2=="3"){

        }else if(chose2=="4"){

        }else if(chose2=="5"){

        }else if(chose2=="6"){

        }else if(chose2=="7"){

        }else if(chose2=="8"){

        }else if(chose2=="9"){

        }else if(chose2=="10"){

        }else if(chose2=="11"){

        }else if(chose2=="12"){

        }else if(chose2=="13"){

        }else if(chose2=="14"){

        }else if(chose2=="15"){

        }else if(chose2=="16"){

        }else if(chose2=="17"){

        }else if(chose2=="18"){

        }else if(chose2=="19"){

        }else if(chose2=="20"){

        }else if(chose2=="21"){

        }else if(chose2=="22"){

        }else if(chose2=="23"){

        }else if(chose2=="24"){

        }else if(chose2=="25"){

        }else if(chose2=="26"){

        }else if(chose2=="27"){

        }else if(chose2=="28"){

        }else if(chose2=="29"){

        }else if(chose2=="30"){

        }else if(chose2=="31"){

        }else if(chose2=="32"){

        }else if(chose2=="33"){

        }else if(chose2=="34"){

        }else if(chose2=="35"){

        }else if(chose2=="36"){

        }

        $(".userbox1_2").css({"margin-left":"0px","display":"block"}).animate({"margin-left":"-50px","opacity":"hide"},200);
        $(".userbox1_3").css({"margin-left":"50px","display":"none"}).animate({"margin-left":"0px","opacity":"show"},200);

    });

    //userbtn4被点击(第3步返回上一步)
    $("#userbtn_4").on("click",function(){
        $(".userbox1_2").css({"margin-left":"-50px","display":"none"}).animate({"margin-left":"0px","opacity":"show"},200);
        $(".userbox1_3").css({"margin-left":"0px","display":"block"}).animate({"margin-left":"50px","opacity":"hide"},200);
    });

    //userbtn5被点击(第3步进入下一步)
    $("#userbtn_5").on("click",function(){
        $(".userbox1_3").css({"margin-left":"0px","display":"block"}).animate({"margin-left":"-50px","opacity":"hide"},200);
        $(".userbox1_4").css({"margin-left":"50px","display":"none"}).animate({"margin-left":"0px","opacity":"show"},200);
    });

    //userbtn6被点击（第4步返回第3步）
    $("#userbtn_6").on("click",function(){
        $(".userbox1_3").css({"margin-left":"-50px","display":"none"}).animate({"margin-left":"0px","opacity":"show"},200);
        $(".userbox1_4").css({"margin-left":"0px","display":"block"}).animate({"margin-left":"50px","opacity":"hide"},200);
    });

    //最后的确定按钮被点击
    $("#ok").on("click",function(){
        $(".luo_lastmodel").fadeOut(200);
    });

    //用户控制面板打开与收起
    $("#upordown").on("click",function(){
        var $t = $(this);
        var $mb = $(".userbox");

        $t.find("span").toggleClass("all_none");
        if(parseInt($mb.css("bottom")) == 0){
            $mb.css("bottom","-360px");
        }else{
            $mb.css("bottom","0");
        }
    });
    /* 全部初始化完毕后 页面出现 开始旋转 */
    /* ----- loading消失 ----- */
    $(".loading").fadeOut(300);
    /* ----- 自动旋转..
     ----- */
    timer = setInterval(function(){start();},30);
};


//旋转的方法
function start(){
    "use strict";
    if(degx>=720){degx=0;}

    if(degy>0){degy--;}
    else if(degy<0){degy++;}

    //$(".my3dbox").css({"transform":"rotateZ(-10deg) rotateY("+(-degx/2)+"deg) rotateX(0deg)","-webkit-transform":"rotateZ(-10deg) rotateY("+(-degx/2)+"deg) rotateX(0deg)"});
    $(".box3d_2").css({"transform":"rotateX("+(degy/2)+"deg)","-webkit-transform":"rotateX("+(degy/2)+")deg"});
    $(".my3dbox").removeClass("all_trans").css({"transform":"rotateZ(-10deg) rotateY("+(-degx/2)+"deg)","-webkit-transform":"rotateZ(-10deg)) rotateY("+(-degx/2)+"deg)"});
    degx+=2;
}
//模态提示框(提示的文字，是否自动消失，不填为自动消失)
function modelShow(msg,dont){
    "use strict";
    if(msg){
        $(".mubu .luo_model").text(msg);
    }
    $(".mubu").stop().fadeIn(300);
    $(".mubu .luo_model").css("top","52%").stop().animate({"top":"50%"},300);
    if(dont){return;}
    setTimeout(function(){
        $(".mubu").stop().fadeOut(300);
        $(".mubu .luo_model").css("top","50%").stop().animate({"top":"48%"},300);
    },1000);
}

//模态提示框隐藏
function modelHide(){
    "use strict";
    $(".mubu").stop().fadeOut(300);
    $(".mubu .luo_model").css("top","50%").stop().animate({"top":"48%"},300);
}
//从插件中拷过来的
(function () {
    "use strict";
    var $image = $('.img-container > canvas'),
        options = {
            aspectRatio: 3 / 4,
            preview: '.img-preview',
            crop: function (data) {}
        };

    //回调函数们
    $image.on({
        'build.cropper': function (e) {
            console.log(e.type);
        },
        'built.cropper': function (e) {
            console.log(e.type);
        },
        'dragstart.cropper': function (e) {
            console.log(e.type, e.dragType);
        },
        'dragmove.cropper': function (e) {
            console.log(e.type, e.dragType);
        },
        'dragend.cropper': function (e) {
            console.log(e.type, e.dragType);
        },
        'zoomin.cropper': function (e) {
            console.log(e.type);
        },
        'zoomout.cropper': function (e) {
            console.log(e.type);
        }
    }).cropper(options);

    // Methods
    $(document.body).on('click', '[data-method]', function () {
        var data = $(this).data(),
            $target,
            result;
        var tid = $(this).attr("id");

        if (data.method) {
            data = $.extend({}, data); // Clone a new one

            if (typeof data.target !== 'undefined') {
                $target = $(data.target);

                if (typeof data.option == 'undefined') {
                    try {
                        data.option = JSON.parse($target.val());
                    } catch (e) {
                        console.log(e.message);
                    }
                }
            }

            result = $image.cropper(data.method, data.option);

            //生成图片方法
            if (data.method == 'getCroppedCanvas') {
                //modelShow();
                //result是canvas对象
                result.style.width = "300px";		//设置canvas的显示大小，并非实际像素
                result.style.height="400px";		//设置canvas的显示大小，并非实际像素

                var $pbox = null;
                if(tid == "whichphoto_f"){
                    $pbox = $(".mybox_photo");
                }else{
                    $pbox = $(".mybox_photo2");
                }
                var cxt=result.getContext("2d");	//2D画笔
                var effect = $(".effect_check").data("effect");
                if(effect == "0"){
                    //无效果
                    var img2 = new Image();
                    var b64 = result.toDataURL("image/png");
                    img2.src=b64;
                    img2.style.width="100%";
                    img2.draggable= false;
                    $pbox.html("").append($(img2));
                    modelShow("生成成功！");
                }else if(effect == "1"){
                    //边框效果
                    var img=new Image();
                    img.onload = function() {
                        cxt.drawImage(img,0,0,result.width,result.height);
                        var imgdata = cxt.getImageData(0,0,result.width,result.height);	//得到画布中所有数据
                        //抹去所有的白色
                        for(var i=3;i<imgdata.data.length;i+=4){
                            if(imgdata.data[i]==255 && imgdata.data[i-1]==255 && imgdata.data[i-2]==255 && imgdata.data[i-3]==255){
                                imgdata.data[i] = 0;
                            }
                        }
                        cxt.putImageData(imgdata,0,0);

                        var img2 = new Image();
                        var b64 = result.toDataURL("image/png");
                        img2.src=b64;
                        img2.style.width="100%";
                        img2.draggable= false;
                        $pbox.html("").append($(img2));
                        modelShow("生成成功！");
                    };
                    img.src="img/e_01.png";
                }else if(effect == "2"){
                    //羽化效果
                    var img=new Image();
                    img.onload = function(){
                        var canvas2 = document.createElement('canvas');
                        canvas2.width = result.width;
                        canvas2.height = result.height;
                        canvas2.style.width = result.style.width;
                        canvas2.style.height = result.style.height;
                        var cxt2 = canvas2.getContext("2d");
                        cxt2.drawImage(img,0,0,canvas2.width,canvas2.height);

                        var imgdata = cxt.getImageData(0,0,result.width,result.height);	//得到画布中所有数据
                        var imgdata2 = cxt2.getImageData(0,0,canvas2.width,canvas2.height);	//得到临时画布中所有数据

                        //根据透明度抹去所有的白色
                        for(var i=3;i<imgdata.data.length;i+=4){
                            imgdata.data[i] = 255 - imgdata2.data[i];
                        }
                        cxt.putImageData(imgdata,0,0);
                        var img2 = new Image();
                        var b64 = result.toDataURL("image/png");
                        img2.src=b64;
                        img2.style.width="100%";
                        img2.draggable= false;
                        $pbox.html("").append($(img2));
                        modelShow("生成成功！");
                    };
                    img.src="img/e_02.png";
                }
            }


            if ($.isPlainObject(result) && $target) {
                try {
                    $target.val(JSON.stringify(result));
                } catch (e) {
                    console.log(e.message);
                }
            }

        }
    }).on('keydown', function (e) {
        switch (e.which) {
            case 37:
                e.preventDefault();
                $image.cropper('move', -1, 0);
                break;

            case 38:
                e.preventDefault();
                $image.cropper('move', 0, -1);
                break;

            case 39:
                e.preventDefault();
                $image.cropper('move', 1, 0);
                break;

            case 40:
                e.preventDefault();
                $image.cropper('move', 0, 1);
                break;
        }
    });

    // 导入图片相关
    var $inputImage = $('#inputImage');
    var URL = window.URL || window.webkitURL;
    var blobURL;

    if (URL) {
        $inputImage.change(function () {
            var files = this.files,
                file;

            if (files && files.length) {
                file = files[0];

                if (/^image\/\w+$/.test(file.type)) {
                    blobURL = URL.createObjectURL(file);
                    $image.one('built.cropper', function () {
                        URL.revokeObjectURL(blobURL); // Revoke when load complete
                    }).cropper('reset', true).cropper('replace', blobURL);
                    $inputImage.val('');
                }
            }
        });
    } else {
        $inputImage.parent().remove();
    }
}());

// ===========
//判断是否是IE
function isIe(){
    "use strict";
    return ("ActiveXObject" in window);
}

//左右轮播
function initLunBo(){
    "use strict";
    var ing = 0;
    var $t = $(".goin_slide").eq(0);
    var $ul = $t.find(".goin_slide_box2>ul").eq(0);
    var $box2 = $t.find(".goin_slide_box2");
    var liwidth = $ul.children("li:first").width()+92;//90为margin 2为border
    var linum = $ul.children("li").length;
    var box1width = $t.find(".goin_slide_box1").width();
    $box2.width(liwidth*linum).css("margin-left","0px");
    var box2width = liwidth*linum;
    $t.find(".goin_slide_lbtn").off("click").on("click",function(){

        if(ing){return;}

        var ml = parseInt($box2.css("margin-left"));
        ing = 1;
        if(ml>=0){
            //$box2.stop().animate({"margin-left":"25px"},150).animate({"margin-left":"0"},100,function(){
            //ing = 0;
            //});
            $box2.css({"margin-left":"25px"}).delay(150).show(0,function(){
                $box2.css({"margin-left":"0"});
                ing = 0;
            });
        }else{

            if(ml<-box1width){
                //$box2.animate({"margin-left":"+="+box1width+"px"},150,function(){
                //	ing = 0;
                //});

                $box2.css({"margin-left":"+="+box1width+"px"});
                ing = 0;
            }else{
                //$box2.animate({"margin-left":"0"},150,function(){
                //	ing = 0;
                //});
                $box2.css({"margin-left":"0px"});
                ing = 0;
            }
        }
    });

    $t.find(".goin_slide_rbtn").off("click").on("click",function(){
        if(ing){return;}
        var ml = parseInt($box2.css("margin-left"));
        var hidewidth = box2width+ml-box1width;
        ing = 1;
        if(hidewidth<=0){
            //$box2.stop().animate({"margin-left":"-=25px"},300).animate({"margin-left":"+=25px"},100,function(){
            ing = 0;
            //});
            $box2.css({"margin-left":"-=25px"}).delay(150).show(0,function(){
                $box2.css({"margin-left":"+=25px"});
                ing = 0;
            });
        }else if(hidewidth>box1width){
            //$box2.animate({"margin-left":"-="+box1width+"px"},150,function(){
            //	ing = 0;
            //});
            $box2.css({"margin-left":"-="+box1width+"px"});
            ing = 0;
        }else{
            //$box2.animate({"margin-left":"-="+hidewidth+"px"},150,function(){
            //	ing = 0;
            //});
            $box2.css({"margin-left":"-="+hidewidth+"px"});
            ing = 0;
        }
    });
}

//选择包装
var chose2 = "2";
function bzcheck(t){
    "use strict";
    var $t = $(t);
    chose2 = $t.data("chose");
    $(".goin_slide ul li").removeClass("check");
    $t.addClass("check");
}