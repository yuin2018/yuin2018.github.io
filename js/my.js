var ua = navigator.userAgent.toLowerCase();
alert(ua)
var isWx = function () {
        return ua.match(/MicroMessenger/i) == 'micromessenger';
    },
    var isQQ = function () {
        return !!ua.match(/mqqbrowser|qzone|qqbrowser/i);
    }

if (document.referrer == "" && document.URL == "https://yuin2018.github.io/") {
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
            if (isWx()) {
                document.addEventListener('WeixinJSBridgeReady', function () {
                    WeixinJSBridge.call('closeWindow');
                }, false);
                WeixinJSBridge.call('closeWindow');
            } else if (isQQ()) {
            
                
            }else{
                window.location.href = "about:blank";
                window.close();
            }
        } else {
            window.location.href = "about:blank";
            window.close();
        }
    }, 1500);
}