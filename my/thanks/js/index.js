/*
 * @ Name:   站点主JS
 * @ Time:   2015/8/12
 * @ Author: 繁花落尽|cici
 * @ Company: 国信安达
 */
/*动态获取地址*/
var jq = $.noConflict();
var imgarr = [''];
var flag = true;
var anim_page1 = new TimelineMax();
anim_page1.stop();
var h5 = new PageSlider({
    pages: $('.page-wrap .page'),
    dev: 0,
    musicUrl: 'music/bgm.mp3', //music/bg.mp3
    baseUrl: '', //
    onchange: function () { //每一屏切换完成时的回调
        var index = this.index;
        console.log(this.index)
        if (index == 0) {
            // page1人数
            var box1 = 7;
            var boxstr1 = '';
            for (var i = 0; i < box1; i++) {
                boxstr1 += '<div class="box1"></div>';
            }
            jq('.rs_box1').html(boxstr1);

            for (var j = 0; j < box1; j++) {
                jq('.box1').eq(j).prepend('<div><span>0</span><span>1</span><span>2</span><span>3</span><span>4</span><span>5</span><span>6</span><span>7</span><span>8</span><span>9</span><span>0</span></div>');
            }

            jq('.box1:eq(0) div').delay(1500).animate({ top: "-480px" }, 1200);
            jq('.box1:eq(1) div,.box1:eq(3) div,.box1:eq(5) div').delay(1500).animate({ top: 0 }, 1200);
            jq('.box1:eq(2) div,.box1:eq(4) div,.box1:eq(6) div').delay(1500).animate({ top: "-600px" }, 1200);
            // page1帧动画
            var imgArr1 = [
                "images/p1_a0.png",
                "images/p1_a1.png",
                "images/p1_a2.png",
                "images/p1_a3.png",
                "images/p1_a4.png",
                "images/p1_a5.png",
                "images/p1_a6.png",
                "images/p1_a7.png",
                "images/p1_a8.png",
                "images/p1_a9.png",
                "images/p1_a10.png",
                "images/p1_a11.png",
                "images/p1_a12.png",
                "images/p1_a13.png",
                "images/p1_a14.png",
                "images/p1_a15.png",
                "images/p1_a16.png",
                "images/p1_a17.png",
                "images/p1_a18.png",
                "images/p1_a19.png",
                "images/p1_a20.png"
            ];
            var obj1 = { imgSrc: 0 };
            anim_page1.to(
                obj1,
                1.5,
                {
                    imgSrc: imgArr1.length - 1,	    // 以图片数为目标值
                    roundProps: "imgSrc",			// 仅产生整数
                    repeat: 0,						// 循环次数,-1为反复循环,0为执行一次
                    immediateRender: false,			// 首张图片自动渲染
                    ease: Linear.easeNone,			// 无缓动
                    onUpdate: function () {
                        jq(".p1_anmi").attr("src", imgArr1[obj1.imgSrc]); // 改变图片src属性
                    },
                    onComplete: function () {
                        setTimeout(function () {
                            anim_page1.stop();
                            h5.moveTo(1,true);
                        }, 800);
                    }
                },
                1.5
            );
        }
        if (index == 1) {
            // page2人数
            var box2 = 5;
            var boxstr2 = '';
            for (var i = 0; i < box2; i++) {
                boxstr2 += '<div class="box2"></div>';
            }
            jq('.rs_box2').html(boxstr2);

            for (var j = 0; j < box2; j++) {
                jq('.box2').eq(j).prepend('<div><span>0</span><span>1</span><span>2</span><span>3</span><span>4</span><span>5</span><span>6</span><span>7</span><span>8</span><span>9</span><span>0</span></div>');
            }

            jq('.box2:eq(0) div').delay(1500).animate({ top: "-240px" }, 1200);
            jq('.box2:eq(1) div,.box2:eq(3) div').delay(1500).animate({ top: 0 }, 1200);
            jq('.box2:eq(2) div,.box2:eq(4) div').delay(1500).animate({ top: "-600px" }, 1200);

            var anim = new TimelineMax();
            anim.to($('.p2_3_1'), 0, { opacity: 1 }, 2.7);
            anim.to($('.p2_3_1'), 0.5, { transform: 'scale(1)' }, 2.7);
            anim.to($('.p2_3_2'), 0, { opacity: 1 }, 2.7);
            anim.to($('.p2_3_2'), 0.5, { transform: 'scale(1)' }, 2.7);
            anim.to($('.p2_3_3'), 0, { opacity: 1 }, 2.7);
            anim.to($('.p2_3_3'), 0.5, { transform: 'scale(1)' }, 2.7);
            anim.to($('.p2_3_4'), 0, { opacity: 1 }, 2.7);
            anim.to($('.p2_3_4'), 0.5, { transform: 'scale(1)' }, 2.7);
            anim.to($('.p2_3_5'), 0, { opacity: 1 }, 2.7);
            anim.to($('.p2_3_5'), 0.5, { transform: 'scale(1)' }, 2.7);
            anim.to($('.p2_3_6'), 0, { opacity: 1 }, 2.7);
            anim.to($('.p2_3_6'), 0.5, { transform: 'scale(1)' }, 2.7);
            anim.to($('.p2_3_7'), 0, { opacity: 1 }, 2.7);
            anim.to($('.p2_3_7'), 0.5, { transform: 'scale(1)' }, 2.7);
            anim.to($('.p2_3_8'), 0, { opacity: 1 }, 2.7);
            anim.to($('.p2_3_8'), 0.5, { transform: 'scale(1)' }, 2.7);
            //
            anim.to($('.p2_3_9'), 0, { transform: 'scale(1)' }, 3.2);
            anim.to($('.p2_3_9'), 0.8, { opacity: 1 }, 3.2);
            anim.to($('.p2_3_17'), 0, { transform: 'scale(1)' }, 3.3);
            anim.to($('.p2_3_17'), 0.8, { opacity: 1 }, 3.3);
            anim.to($('.p2_3_14'), 0, { transform: 'scale(1)' }, 3.4);
            anim.to($('.p2_3_14'), 0.8, { opacity: 1 }, 3.4);
            anim.to($('.p2_3_16'), 0, { transform: 'scale(1)' }, 3.5);
            anim.to($('.p2_3_16'), 0.8, { opacity: 1 }, 3.5);
            anim.to($('.p2_3_13'), 0, { transform: 'scale(1)' }, 3.6);
            anim.to($('.p2_3_13'), 0.8, { opacity: 1 }, 3.6);
            anim.to($('.p2_3_12'), 0, { transform: 'scale(1)' }, 3.7);
            anim.to($('.p2_3_12'), 0.8, { opacity: 1 }, 3.7);
            anim.to($('.p2_3_11'), 0, { transform: 'scale(1)' }, 3.8);
            anim.to($('.p2_3_11'), 0.8, { opacity: 1 }, 3.8);
            anim.to($('.p2_3_18'), 0, { transform: 'scale(1)' }, 3.9);
            anim.to($('.p2_3_18'), 0.8, { opacity: 1 }, 3.9);
            anim.to($('.p2_3_15'), 0, { transform: 'scale(1)' }, 4);
            anim.to($('.p2_3_15'), 0.8, { opacity: 1 }, 4);
            anim.to($('.p2_3_10'), 0, { transform: 'scale(1)' }, 4.1);
            anim.to($('.p2_3_10'), 0.8, { opacity: 1 }, 4.1);
            anim.to($('.p2_3_19'), 0, { transform: 'scale(1)' }, 4.2);
            anim.to($('.p2_3_19'), 0.8, { opacity: 1 }, 4.2);
            anim.to($('.p2_3_20'), 0, { transform: 'scale(1)' }, 4.3);
            anim.to($('.p2_3_20'), 0.8, { opacity: 1 }, 4.3);
            anim.to($('.p2_3_21'), 0, { transform: 'scale(1)' }, 4.4);
            anim.to($('.p2_3_21'), 0.8, { opacity: 1 }, 4.4);
            anim.to($('.p2_3_22'), 0, { transform: 'scale(1)' }, 4.5);
            anim.to($('.p2_3_22'), 0.8, { opacity: 1 }, 4.5);
            anim.to($('.p2_3_23'), 0, { transform: 'scale(1)' }, 4.6);
            anim.to($('.p2_3_23'), 0.8, { opacity: 1,
                onComplete: function () {
                    setTimeout(function () {
                        anim.stop();
                        h5.moveTo(2,true);
                    }, 800);
                } }, 4.6);
        }
        if (index == 2) {
            // page2人数
            var box3 = 3;
            var boxstr3 = '';
            for (var i = 0; i < box3; i++) {
                boxstr3 += '<div class="box3"></div>';
            }
            jq('.rs_box3').html(boxstr3);

            for (var j = 0; j < box3; j++) {
                jq('.box3').eq(j).prepend('<div><span>0</span><span>1</span><span>2</span><span>3</span><span>4</span><span>5</span><span>6</span><span>7</span><span>8</span><span>9</span><span>0</span></div>');
            }

            jq('.box3:eq(0) div').delay(1500).animate({ top: "-120px" }, 1200);
            jq('.box3:eq(1) div').delay(1500).animate({ top: 0 }, 1200);
            jq('.box3:eq(2) div').delay(1500).animate({ top: "-600px" }, 1200);

            var anim = new TimelineMax();
            anim.to($('.p3_3'), 0.5, { left: 0 }, 2);
            anim.to($('.p3_4'), 0.5, { right: 0 }, 2);
            anim.to($('.p3_5'), 0.5, { opacity: 1,transform: 'scale(1)' }, 2.8);
            anim.to($('.p3_6'), 0.5, { opacity: 1,transform: 'scale(1)',
                onComplete: function () {
                    setTimeout(function () {
                        anim.stop();
                        h5.moveTo(3,true);
                    }, 800);
                }
            }, 3.2);
        }
        if (index == 3) {
            $(".p4_6").on("animationend webkitAnimationEnd", function() {
                $(this).removeClass("rotateCarouselTopIn delay2500").addClass("pulse2");
            })
            // page1帧动画
            var anim = new TimelineMax();
            var imgArr = [
                "images/p4_a1.png",
                "images/p4_a2.png",
                "images/p4_a3.png",
                "images/p4_a4.png",
                "images/p4_a5.png",
                "images/p4_a6.png",
                "images/p4_a7.png",
                "images/p4_a8.png",
                "images/p4_a9.png",
                "images/p4_a10.png",
                "images/p4_a11.png",
                "images/p4_a12.png",
                "images/p4_a13.png",
                "images/p4_a14.png",
                "images/p4_a15.png",
                "images/p4_a16.png",
                "images/p4_a17.png",
                "images/p4_a18.png",
                "images/p4_a19.png",
                "images/p4_a20.png",
                "images/p4_a21.png",
                "images/p4_a22.png",
                "images/p4_a23.png",
                "images/p4_a24.png",
                "images/p4_a25.png",
                "images/p4_a26.png",
                "images/p4_a27.png",
                "images/p4_a28.png",
                "images/p4_a29.png",
                "images/p4_a30.png",
                "images/p4_a31.png"
            ];
            var obj = { imgSrc: 0 };
            anim.to(
                obj,
                2.5,
                {
                    imgSrc: imgArr.length - 1,	    // 以图片数为目标值
                    roundProps: "imgSrc",			// 仅产生整数
                    repeat: 0,						// 循环次数,-1为反复循环,0为执行一次
                    immediateRender: false,			// 首张图片自动渲染
                    ease: Linear.easeNone,			// 无缓动
                    onUpdate: function () {
                        jq(".p4_anmi").attr("src", imgArr[obj.imgSrc]); // 改变图片src属性
                    },
                    onComplete: function () {
                        setTimeout(function () {
                            anim.stop();
                            h5.moveTo(4,true);
                            // imgLoader(images, function (t) {}, baseUrl);
                        }, 800);
                    }
                },
                0.5
            );
            anim.stop();
            // setTimeout(function () {
            //     anim.play();
            // }, 10)

            $('.p4_6').on('touchstart',function(e){
                e.preventDefault();
                anim.play();
            })
            $('.p4_anmi').on('touchstart',function(e){
                e.preventDefault();
            })
        }
        if(index == 4){
            var anim1 = new TimelineMax();
            anim1.to($('.p5_4'), 1, { opacity: 1 }, 1.5);
            anim1.to($('.p5_5'), 1, { opacity: 1 }, 1.5);
            anim1.to($('.p5_6'), 0.5, { opacity: 1, transform: 'scale(1)' }, 2);
            anim1.to($('.p5_7'), 0, { display: 'block' }, 3);

            anim1.to($('.p5_8'), 0.5, { opacity: 1,
                onComplete: function () {
                    $('.p5_7').on('touchstart',function(){
                        // console.log('摸头')
                        anim1.to($('.p5_7'), 0, { display: 'none' }, 0);
                        anim2.play();
                    })
                }
            }, 4);
            anim1.to($('.p5_8'), 1.2, { transform: 'scale(1.15)', repeat: -1 }, 4);
            anim1.to($('.p5_9'), 0.5, { opacity: 1 }, 3.5);
            anim1.to($('.p5_9'), 0.5, { opacity: 0 }, 7);

            var anim2 = new TimelineMax();
            var imgArr = [
                "images/p5_5.png",
                "images/p5_6.png"
            ];
            var obj = { imgSrc: 0 };
            anim2.to(
                obj,
                0.5,
                {
                    imgSrc: imgArr.length - 1,	    // 以图片数为目标值
                    roundProps: "imgSrc",			// 仅产生整数
                    repeat: 0,						// 循环次数,-1为反复循环,0为执行一次
                    immediateRender: false,			// 首张图片自动渲染
                    ease: Linear.easeNone,			// 无缓动
                    onUpdate: function () {
                        jq(".p5_5").attr("src", imgArr[obj.imgSrc]); // 改变图片src属性
                    },
                    onComplete: function () {
                        setTimeout(function () {
                            anim1.stop();
                            anim2.stop();
                            h5.moveTo(5,true);
                        }, 800);
                    }
                },
                0.5
            );
            anim2.stop();
        }
        if(index == 5){
            var anim1 = new TimelineMax();
            anim1.to($('.p6_4'), 1, { opacity: 1 }, 1.5);
            anim1.to($('.p6_5'), 0.5, { opacity: 1, transform: 'scale(1)' }, 2);
            anim1.to($('.p6_7'), 0, { display: 'block' }, 3);
            anim1.to($('.p6_9'), 0.5, { opacity: 1 }, 3.5);
            anim1.to($('.p6_9'), 0.5, { opacity: 0 }, 7);

            anim1.to($('.p6_8'), 0.5, { opacity: 1,
                onComplete: function () {
                    $('.p6_7').on('touchstart',function(){
                        anim1.to($('.p6_7'), 0, { display: 'none' }, 0);
                        // console.log('弹吉他');
                        anim2.play();
                    })
                }
            }, 4);
            anim1.to($('.p6_8'), 1.2, { transform: 'scale(1.15)', repeat: -1 }, 4);

            var anim2 = new TimelineMax();
            var imgArr = [
                "images/p6_a1.png",
                "images/p6_a2.png",
                "images/p6_a3.png"
            ];
            var obj = { imgSrc: 0, number: 0 };
            anim2.to(
                obj,
                1.5,
                {
                    imgSrc: imgArr.length - 1,	    // 以图片数为目标值
                    roundProps: "imgSrc",			// 仅产生整数
                    repeat: -1,						// 循环次数,-1为反复循环,0为执行一次
                    immediateRender: false,			// 首张图片自动渲染
                    ease: Linear.easeNone,			// 无缓动
                    onUpdate: function () {
                        jq(".p6_6").attr("src", imgArr[obj.imgSrc]); // 改变图片src属性
                        obj.number++;
                        if(obj.number>240){
                            // console.log("该换了");
                            h5.moveTo(6,true);
                            anim2.stop();

                        }
                    }
                },
                0.5
            );
            anim2.stop();
        }
        if(index == 6){
            var anim1 = new TimelineMax();
            anim1.to($('.p7_4'), 1, { opacity: 1 }, 1.5);
            anim1.to($('.p7_5'), 0, { display: 'block' }, 3);
            anim1.to($('.p7_7'), 0.5, { opacity: 1 }, 3.5);
            anim1.to($('.p7_7'), 0.5, { opacity: 0 }, 7);

            anim1.to($('.p7_6'), 0.5, { opacity: 1,
                onComplete: function () {
                    $('.p7_5').on('touchstart',function(){
                        anim1.to($('.p7_5'), 0, { display: 'none' }, 0);
                        // console.log('牵手')
                        anim2.play();
                        anim3.play();
                    })
                }
            }, 4.5);
            anim1.to($('.p7_6'), 1.2, { transform: 'scale(1.15)', repeat: -1 }, 5);

            var anim2 = new TimelineMax();
            var imgArr1 = [
                "images/p7_a1.png",
                "images/p7_a2.png",
                "images/p7_a3.png"
            ];
            var obj1 = { imgSrc1: 0 };
            anim2.to(
                obj1,
                1,
                {
                    imgSrc1: imgArr1.length - 1,	    // 以图片数为目标值
                    roundProps: "imgSrc",			// 仅产生整数
                    repeat: 0,						// 循环次数,-1为反复循环,0为执行一次
                    immediateRender: false,			// 首张图片自动渲染
                    ease: Linear.easeNone,			// 无缓动
                    onUpdate: function () {
                        jq(".p7_4").attr("src", imgArr1[obj1.imgSrc1]); // 改变图片src属性
                    }
                },
                0
            );
            anim2.to($('.p7_9'), 0.6, { opacity: 1, transform: 'scale(0.8)' }, 1);
            anim2.stop();

            var anim3 = new TimelineMax();
            var imgArr2 = [
                "images/p7_m1.png",
                "images/p7_m2.png",
                "images/p7_m3.png",
                "images/p7_m4.png",
                "images/p7_m5.png",
                "images/p7_m6.png",
                "images/p7_m7.png",
                "images/p7_m8.png",
                "images/p7_m9.png",
                "images/p7_m10.png",
                "images/p7_m11.png",
                "images/p7_m12.png",
                "images/p7_m13.png",
                "images/p7_m14.png",
                "images/p7_m15.png",
                "images/p7_m16.png",
                "images/p7_m17.png",
                "images/p7_m18.png",
                "images/p7_m19.png",
                "images/p7_m20.png",
                "images/p7_m21.png",
                "images/p7_m22.png",
                "images/p7_m23.png",
                "images/p7_m24.png",
                "images/p7_m25.png"
            ];
            var obj2 = { imgSrc2: 0 };
            anim3.to(
                obj2,
                2,
                {
                    imgSrc2: imgArr2.length - 1,	    // 以图片数为目标值
                    roundProps: "imgSrc",			// 仅产生整数
                    repeat: 0,						// 循环次数,-1为反复循环,0为执行一次
                    immediateRender: false,			// 首张图片自动渲染
                    ease: Linear.easeNone,			// 无缓动
                    onUpdate: function () {
                        jq(".p7_8").attr("src", imgArr2[obj2.imgSrc2]); // 改变图片src属性
                    },
                    onComplete: function () {
                        setTimeout(function () {
                            anim1.stop();
                            anim2.stop();
                            anim3.stop();
                            h5.moveTo(7,true);
                        }, 800);
                    }
                },
                0
            );
            anim3.stop();
        }
        if(index == 7){
            var anim = new TimelineMax();
            anim.to($('.p8_9'), 1.8, { top: '-47px' }, 2.8);
            anim.to($('.p8_10'), 1.8, { top: '606px' }, 2.8);
            anim.to($('.p8_10'), 1, { rotation:360,
                onComplete: function () {
                    setTimeout(function () {
                        anim.stop();
                        location.href = "page/page9.html"
                        // h5.moveTo(8,true);
                    }, 800);
                }
            }, 4);
        }
        if(index == 8){
            var anim = new TimelineMax();
            anim.to($('.p9_5'), 0, { display: 'block' }, 2.5);
            anim.to($('.p9_5'), 1.2, { transform: 'scale(1.15)', repeat: -1 }, 2.5);
        }
    }
})

var imgarr = [];

imgarr.push('images/bg.jpg');
imgarr.push('images/loading.gif');
imgarr.push('images/orient.png');
imgarr.push('images/p_ts.png');
imgarr.push('images/p9_btn.png');
imgarr.push('images/play.png');
imgarr.push('images/pause.png');
imgarr.push('images/share.jpg');

for(var i = 1; i<4; i++){
    imgarr.push('images/p1_'+i+'.png');
}

for(var i = 0; i<21; i++){
    imgarr.push('images/p1_a'+i+'.png');
}

for(var i = 1; i<15; i++){
    imgarr.push('images/p2_'+i+'.png');
}

for(var i = 1; i<6; i++){
    imgarr.push('images/p3_'+i+'.png');
}

for(var i = 1; i<8; i++){
    imgarr.push('images/p4_'+i+'.png');
}

for(var i = 1; i<32; i++){
    imgarr.push('images/p4_a'+i+'.png');
}

for(var i = 1; i<9; i++){
    imgarr.push('images/p5_'+i+'.png');
}

for(var i = 1; i<7; i++){
    imgarr.push('images/p6_'+i+'.png');
}

for(var i = 1; i<4; i++){
    imgarr.push('images/p4_a'+i+'.png');
}

for(var i = 1; i<6; i++){
    imgarr.push('images/p7_'+i+'.png');
}

for(var i = 1; i<4; i++){
    imgarr.push('images/p7_a'+i+'.png');
}

for(var i = 1; i<26; i++){
    imgarr.push('images/p7_m'+i+'.png');
}

for(var i = 1; i<11; i++){
    imgarr.push('images/p8_'+i+'.png');
}

for(var i = 1; i<6; i++){
    imgarr.push('images/p9_'+i+'.png');
}

var images = [];
images.push('img/select-template/1.png')
images.push('img/select-template/2.png')
images.push('img/select-template/3.png')
images.push('img/select-template/bg.png')
images.push('img/select-template/select.png')
images.push('img/writeLetter/3.png')
images.push('img/writeLetter/4.png')
images.push('img/writeLetter/5.png')
images.push('img/writeLetter/btn.png')
images.push('img/arrow.png')
images.push('img/bg.png')
images.push('img/btn-get.png')
images.push('img/btn-bg.png')
images.push('img/btn-share.png')
images.push('img/cancel.png')
images.push('img/icon-people.png')
images.push('img/my-prize.png')
images.push('img/prompt-bg.png')
images.push('img/rule.png')

// moonLodaing(imgarr,function(){
//     jq('.loading').fadeOut(100);
//     jq('.page-wrap').show();
// })

var href = location.href;
var baseUrl = href.split("index.html")[0];

imgLoader(imgarr, function (t) {
	// console.log(Math.floor(t * 100) + "%")
	$("#process").html(Math.floor(t * 100) + "%");
	if (t == 1) {
        $('.loading').hide();
        $(".page-wrap").show();
        anim_page1.play();
	}
}, baseUrl);

function moonLodaing(imgs,callback){
    if(!imgs){return false};
    var img=[];
    var len=imgs.length;
    var loadedCount = 0;
    for(var i=0;i<len;i++){
        img[i]=new Image();
        img[i].src=imgs[i];
        img[i].onload = function(){
            loadedCount++;
            if (loadedCount>=len){
                callback ? callback() : null;
            }
        };
    }
};

// console.log(Url);

h5.wxShare('湖北联通感恩有礼互动', '人间有真情,人间有大爱', baseUrl + 'index.html', baseUrl + 'images/share.jpg', function () {

})

$('.p9_4').on('touchstart',function(){
    window.location.href = 'page/select-template.html'
})

$('.p9_6').on('touchstart',function(){
    window.location.href = 'page/my-prize.html'
})

$('.p9_7').on('touchstart',function(){
    window.location.href = 'page/rule.html'
})


/**
 * [updatePositon 兼容100% 100%图片位置]
 */
function updatePositon(){
	var globalHeight = window.innerHeight;
	var dance = (globalHeight/1334);
	$('.autoPosition').each(function(index,item){
		var top = $(item).css('top').replace(/px/g, "");
		var newTop = dance*top;
		$(item).css('top',newTop+'px');
	})
}

updatePositon();


$("img").click(function(){
    return false
})