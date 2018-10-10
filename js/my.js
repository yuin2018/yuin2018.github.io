if (document.referrer == "" && document.URL == "https://yuin2018.github.io/") {
    document.getElementsByTagName("body")[0].style.overflow = 'hidden';
    var ua = navigator.userAgent.toLowerCase();
    var div = document.createElement("div");
    var text = document.createTextNode("非法访问!");
    div.appendChild(text);
    var windowWidth = window.innerWidth;
    var windowHeight = window.innerHeight;
    div.style.cssText =
        'z-index:9999;position: absolute;top:' + (windowHeight / 2 - 150) + 'px;left:' + (windowWidth / 2 - 150) +
        'px;background: rgba(0,0,0,.8);border-radius: 10px;font-size: 14px;letter-spacing: 2px;margin: 0 auto;text-align: center;width: 300px;height: 150px;line-height: 150px;color: #fff;box-shadow: 0px 0px 8px 3px whitesmoke;'
    document.getElementsByTagName("body")[0].appendChild(div);

    setTimeout(function () {
        if (/Android|webOS|iPhone|iPod|BlackBerry/i.test(ua)) {
            if (ua.match(/MicroMessenger/i) == 'micromessenger') {
                document.addEventListener('WeixinJSBridgeReady', function () {
                    WeixinJSBridge.call('closeWindow');
                }, false);
                WeixinJSBridge.call('closeWindow');
            }
            // else if(ua.match(/mqqbrowser|qzone|qqbrowser/i)){
            //     location.href = "http://google.com"
            // } 
            else{
                window.location.href = "about:blank";
                window.close();
            }
        } else {
            window.location.href = "about:blank";
            window.close();
        }
    }, 1500);
}


var yqc = {
    name: '名字',
    Hello: function(){
        console.log('%c 很开心你能来看我','color: #fff;letter-space:1px;text-shadow: 0px 0px 1px #666;')
    },
    user:{
        hello:function(){
            console.log('欢迎')
        }
    },
    log: function(msg){
        console.log("%c"+ msg+"","color: #fff;letter-space:1px;text-shadow: 0px 0px 1px #666;")
    }
}; 
yqc.Hello.prototype.english = function() {
    yqc.log("hello");
}
yqc.Hello.prototype.chinese = function () {
    yqc.log("你好");
}

yqc.Hello();
// var e = new yqc.Hello();
// e.english()