if(document.referrer == "" && document.URL == "https://yuin2018.github.io/"){
    var div = document.createElement("div");
    var text = document.createTextNode("非法访问!");
    div.appendChild(text);
    var windowWidth = window.innerWidth;
    var windowHeight = window.innerHeight;
    div.style.cssText =
        'z-index:9999;position: absolute;top:' + (windowHeight / 2) - 150 + 'px;left:' + (windowWidth / 2) - 250 / 2 +
        'px;background: rgba(0,0,0,.8);border-radius: 10px;font-size: 14px;letter-spacing: 2px;margin: 0 auto;text-align: center;width: 250px;height: 100px;line-height: 100px;color: #fff;'
    document.getElementsByTagName("body")[0].appendChild(div);
    setTimeout(() => {
        if(/Android|webOS|iPhone|iPod|BlackBerry/i.test(navigator.userAgent)){
            document.addEventListener('WeixinJSBridgeReady', function(){ WeixinJSBridge.call('closeWindow'); }, false);
            WeixinJSBridge.call('closeWindow')
        }else{
            window.location.href="about:blank";
            window.close();
        }
    }, 1000);
}