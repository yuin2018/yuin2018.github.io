if(document.referrer == "" && document.URL == "https://yuin2018.github.io/"){
    alert("非法访问!")
    // window.open("","_self"); 
    // window.close(); 
    window.location.href="about:blank";
    window.close();
    if(WeixinJSBridge)  WeixinJSBridge.call('closeWindow')
}