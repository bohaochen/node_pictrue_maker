var {
    getDataWithStyle
} = require("../getDataWithStyle/getDataWithStyle.js");
var {
    getBackgroundByStyle
} = require("../background/getBackgroundByStyle.js");
var layouts = require("./layouts.js");

exports.getLayoutByData = function (data) {
    //根据海报内容选取相应布局
    //1.根据内容复杂度决定设计图类型是长图还是海报，用户可以强制设置为长图
    //2.如果设计图类型为海报，则依据规则随机选取背景图，依据背景图随机选择布局
    //  如果为长图则依规则随机选择一种长图布局
    //3.根据选定设计图布局，选取段落布局，大标题布局，

    var dataWithStyle = getDataWithStyle(data)
    console.log(dataWithStyle, "styleWithData")

    var userLongPicture = shouldUserLongPicture(dataWithStyle)
    console.log(userLongPicture, "userLongPicture")

    var bg = null;
    
    getBackgroundByStyle(dataWithStyle.styleName);
if(userLongPicture){
    //長圖結構(純色背景或者肌理背景,不用圖片背景)
}else{
    //海報結構(主要使用圖片背景)
    bg = getBackgroundByStyle(dataWithStyle.styleName);
}
// todo

}

function shouldUserLongPicture(dataWithStyle) {
    var shouldUse = false;
    if (dataWithStyle.params.mustLongPicture) {
        //假如用户强制设置为长图
        shouldUse = true
    } else {
        //假如不是强制设置，则依据内容层次，以及内容长度来判断
        if(dataWithStyle.content.length==1&&
            dataWithStyle.content[1].content.length<=3&&
            addArrLength(dataWithStyle.content)<45
            ){
                //如果段落为1，段落内句子小于3，段落内容长度小于45，则使用海报构图
                shouldUse = false;
        }else if(dataWithStyle.content.length>=3
            && addArrLength(dataWithStyle.content)>120){
                //如果段落大于3，段落内容长度大于120，则使用长构图
            shouldUse = true
        }else{
            //如果内容不多不少，則隨機選擇
            var arr = [false,true]
            shouldUse = arr[Math.floor(Math.random() * arr.length)]
        }
    }
    return shouldUse
}


function addArrLength(arr){
    var num = 0;
    arr.map((item)=>{
        item.content.map((item1)=>{
            num += item1.length
            return ""
        })
        return ""
    })
    return num;
}