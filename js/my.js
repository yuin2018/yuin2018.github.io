if(document.referrer == "" && document.URL == "https://yuin2018.github.io/"){
    alert("非法访问!")
    if(WeixinJSBridge){
        alert(1)
        WeixinJSBridge.call('closeWindow')
    }
    window.location.href="about:blank";
    window.close();
}