/**
 * Created by HHH on 2018/3/27.
 */

/**
 * 轮播图构造函数
 * @param option
 * @constructor
 */
function Carousel(option) {
    this.init(option);
    this.list = option.list;
}

Carousel.prototype.init = function (option) {
    var o = option||
        {
            list:[],
            time:3000
        };
    if(o.list==0){
        alert("没图片啊,大哥");
        return;
    }
    var carsousel = document.createElement("div");
    var left = document.createElement("img");
    var right = document.createElement("img");
    var pagenation = document.createElement("div");
    var imgList = [];
    var aList = [];
    for(var i =0;i<o.list.length;i++){
        imgList[i] = document.createElement("img");
        aList[i] = document.createElement("a");
    }
    //添加样式
    carsousel.className += "carousel";
    left.className += "left";
    left.src="./img/left.png";
    right.className += "right";
    right.src="./img/left.png";
    pagenation.className += "pagenation";
    aList[0].className +="active";
    imgList.forEach(function (item,index) {
        //添加样式
        if(index==0){
            item.className +="pic show";
        }else {
            item.className +="pic";
        }
        item.src = o.list[index];
    });

    //添加元素
    document.body.appendChild(carsousel);
    carsousel.appendChild(left);
    carsousel.appendChild(right);
    imgList.forEach(function (item) {
        carsousel.appendChild(item);
    });
    carsousel.appendChild(pagenation);
    aList.forEach(function (item) {
        pagenation.appendChild(item);
    });
    //添加事件
    left.addEventListener("click",()=>{this.last(o.list.length);});
    right.addEventListener("click",()=>{this.next(o.list.length);});
    aList.forEach((item,index)=>{
        item.addEventListener("click", (event) =>{
            console.log(index);
            this.select(index);
        });
    });
    //轮播效果添加
    setInterval(()=>{this.next(o.list.length)},3000)

};


/**
 *  下一页
 * @param len
 */
Carousel.prototype.next = function (len) {
    var index = getActiveIndex();
    if(index==len-1){
        addActive(index,0);
        showPic(0);
    }else {
        addActive(index,index+1);
        showPic(index+1);
    }
};

/**
 *  上一页
 * @param len
 */
Carousel.prototype.last = function (len) {
    var index = getActiveIndex();
    if(index==0){
        addActive(index,len-1);
        showPic(len-1);
    }else {
        addActive(index,index-1);
        showPic(index-1);
    }
};

Carousel.prototype.select = function (index) {
    var i = getActiveIndex();
    showPic(index);
    addActive(i,index);
};

//获取当前页面序号
function getActiveIndex(){
    var a = document.getElementsByTagName('a');
    var index;
    for(var i = 0;i<a.length;i++) {
        if (a[i].className.indexOf("active")!= -1) {
            index = i;
            break;
        }
    }
    return index;
}

/**
 *  给目标元素active样式,取消当前active样式
 * @param index 当前序列号
 */
function addActive(index,tIndex){
    var a = document.getElementsByTagName('a');
    a[index].className = a[index].className.replace("active","");
    a[tIndex].className += " active";
}

/**
 * 显示图片
 * @param index
 */
function showPic(index){
    var picList = document.getElementsByClassName('pic');
    var cIndex ;
    for(var i =0;i<picList.length;i++){
        if(picList[i].className.indexOf("show")!=-1){
            cIndex = i;
            break;
        }
    }
    picList[cIndex].className = picList[cIndex].className.replace(" show",'');
    picList[index].className += ' show';
}

