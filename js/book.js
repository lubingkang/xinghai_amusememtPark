var config = [
    {
        width: 240,
        top: 12,
        left: 30,
        opacity: 0.2,
        "z-index": 2
    },//0
    {
        width: 360,
        top: 42,
        left: 0,
        opacity: 0.8,
        "z-index": 3
    },//1
    {
        width: 480,
        top: 60,
        left: 120,
        opacity: 1,
        "z-index": 4
    },//2
    {
        width: 360,
        top: 42,
        left: 336,
        opacity: 0.8,
        "z-index": 3
    },//3
    {
        width: 240,
        top: 12,
        left: 450,
        opacity: 0.2,
        "z-index": 2
    }//4

];


onload=function () {
    //假设所有动画执行完毕了
    var flag=true;
    var list=my$("slide").children[0].children;
    function assign() {
        for(var i=0;i<list.length;i++){
            animate3(list[i],config[i],function () {
                flag=true;//动画执行完毕
            });
        }
    }
    assign();

    var timeId=timeId=setInterval(righthandle,1500);;
    //注册鼠标进入事件
    my$("wrap").onmouseover=function () {
        clearInterval(timeId);
        animate3(my$("arrow"),{"opacity":1});
    };

    //鼠标离开事件
    my$("wrap").onmouseout=function () {
        timeId=setInterval(righthandle,1500);
        animate3(my$("arrow"),{"opacity":0});
    };

    //点击右侧按钮
    my$("arrRight").onclick=righthandle;

    //点击左侧按钮
    my$("arrLeft").onclick=lefthandle;

    function righthandle() {
        //当上一个动画执行完毕之后再执行---防止点击过快图片聚拢
        if(flag){
            //将flag置为false
            flag=false;
            config.push(config.shift());
            assign();//flag在动画函数执行完毕后的回调函数中变为true
        }
    }

    function lefthandle() {
        if(flag){
            flag=false;
            config.unshift(config.pop());
            assign();
        }
    }
};