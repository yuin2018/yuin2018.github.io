if(document.referrer == "" && document.URL == "https://yuin2018.github.io/"){
    alert("非法访问!")
    window.location.href="about:blank";
    window.close();
    alert(1)
    WeixinJSBridge.call('closeWindow')
    
}