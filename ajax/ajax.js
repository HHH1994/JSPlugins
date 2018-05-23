/**
 * Created by HHH on 2018/5/23.
 */
/*兼容IE6*/
if(window.XMLHttpRequest==undefined){
    window.XMLHttpRequest = function () {
        try{
            return new ActiveXObject("Msxml2.XMLHTTP.6.0")
        }catch(e1) {
            try{
                return new ActiveXObject("Msxml2.XMLHTTP.3.0")
            }
            catch (e2){
                throw new Error("浏览器不支持XMLHttpRequest");
            }
        }
    }
}


function Ajax(){
    this.async = true;//是否同步
}

Ajax.prototype.get = function (config) {
    var request = new XMLHttpRequest();
    //开启请求
    request.open("GET",config.url,this.async);
    //监听进度
    request.onprogress = function (e) {
        console.log(e.loaded);
        console.log(e.total);
        console.log(e.loaded*100/e.total);
    };
    //监听响应结果
    request.onreadystatechange = function () {
        if(request.readyState===4&&request.status ===200){
            var dataType = request.getResponseHeader("content-type");
            if(dataType.indexOf("application/json")!=-1){
                var res = JSON.parse(request.response);
            }
            config.success(res);
        }else if(request.status===500){
            console.log(request.response);
            throw new Error(JSON.parse(request.response).error);
        }
    };
    //设置请求头
    request.setRequestHeader("auth","8c4bef429e754908aae05428bd008ca6");
    //发送请求
    request.send(null);
};

/*上传图片*/
Ajax.prototype.postFormData =function (config) {
  var request  =  new XMLHttpRequest();
    request.open("POST",config.url,this.async);
    //监听响应结果
    request.onreadystatechange = function () {
        if(request.readyState===4&&request.status ===200){
            var dataType = request.getResponseHeader("content-type");
            if(dataType.indexOf("application/json")!=-1){
                var res = JSON.parse(request.response);
            }
            config.success(res);
        }else if(request.status===500){
            console.log(request.response);
            throw new Error(JSON.parse(request.response).error);
        }
    };
    //设置请求头
    request.setRequestHeader("auth","8c4bef429e754908aae05428bd008ca6");
    //设置请求体
    var requestBody = config.data;
    //发送请求
    request.send(requestBody);
};

/*普通post*/
Ajax.prototype.post = function (config) {
    var request  =  new XMLHttpRequest();
    //监听进度
    request.onprogress = function (e) {
        console.log(e.loaded);
        console.log(e.total);
        console.log(e.loaded*100/e.total);
    };
    request.open("POST",config.url,this.async);
    //监听响应结果
    request.onreadystatechange = function () {
        if(request.readyState===4&&request.status ===200){
            var dataType = request.getResponseHeader("content-type");
            if(dataType.indexOf("application/json")!=-1){
                var res = JSON.parse(request.response);
            }
            config.success(res);
        }else if(request.status===500){
            console.log(request.response);
            throw new Error(JSON.parse(request.response).error);
        }
    };
    //设置请求头
    request.setRequestHeader("auth","8c4bef429e754908aae05428bd008ca6");
    //设置请求体
    var requestBody = JSON.stringify(config.data);
    //发送请求
    request.send(requestBody);
};
