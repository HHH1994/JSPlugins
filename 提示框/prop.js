/**
 * Created by HHH on 2018/3/25.
 */
function hProp(option) {
    this.init(option);
}

/*初始化*/
hProp.prototype.init = function (option) {
    var o = option||
        {title:"提示",
            content:"只是一个提示框",
            type:2,
            onOk:function () {
                alert("默认回调函数");
            }
        };
    var warp = document.createElement("div");
    var contain = document.createElement("div");
    var tit = document.createElement("div");
    var content = document.createElement("div");
    var foot = document.createElement("div");
    tit.innerHTML = o.title;
    //给元素添加样式
    this.addClass(warp,"h_confirm");
    this.addClass(contain,"contain");
    this.addClass(tit,"tit");
    this.addClass(content,"content");
    this.addClass(foot,"foot");
    //添加元素
    warp.appendChild(contain);
    contain.appendChild(tit);
    contain.appendChild(content);
    contain.appendChild(foot);
    document.body.appendChild(warp);
    //加载底部按钮
    this.loadBtn(o.type,o.onOk);
};

/**
 * 移除元素
 */
hProp.prototype.removeEl = function () {
    var warp =document.getElementsByClassName("h_confirm")[0];
    document.body.removeChild(warp);
};

/*添加样式*/
hProp.prototype.addClass = function (el,className) {
    el.className += ' '+className;
};

/**
 * 加载底部按钮
 * @param type 类型
 * @param callback 带回调的prop的确认回调函数
 */
hProp.prototype.loadBtn = function (type,callback) {
    var foot = document.getElementsByClassName('foot')[0];
    if(type==1){
        var confirm = document.createElement("button");
        confirm.innerHTML = "确认";
        this.addClass(confirm,'prop_confirm_btn');
        confirm.addEventListener('click',this.removeEl);
        foot.appendChild(confirm);
    }else{
        var confirm = document.createElement("button");
        confirm.innerHTML = "确认";
        this.addClass(confirm,'prop_confirm_btn');
        var close = document.createElement("button");
        close.innerHTML = "关闭";
        this.addClass(close,'prop_confirm_close');
        confirm.addEventListener('click',callback);
        close.addEventListener('click',this.removeEl);
        foot.appendChild(confirm);
        foot.appendChild(close);
    }
};
