var stylesObj = require("../common/styles.js");
exports.getDataWithStyle=function(data){
    //客户端传递回来的data格式如下
    var reqData = {
        styleName:"沉稳现代商务",
        title:"2021制造业指南",
        subhead:"17位行业专家基于中国轻工业协会统计数据的深度解读",
        content:[{
            minTitle:"行程概要",
            content:["1.乘车至产体路102号","2.中南阁参加研讨会议","3.至香格里拉晚宴","乘车送回酒店"]
        },{
            minTitle:"会议概要",
            content:["1.中国工业部部长陈思山致辞","2.中过国工业现状与展望","3.解读135国家战略规划"]
        }],
        contactInformation:{
            address:"洪山区工业路212号富华大厦3302室",
            phoneNum:"400-451-5556",
            contactPerson:"数联大数据"
        },
        params:{
            //用户可选参数
            direction:"横",//构图方向,横，竖，随机
            mustLongPicture:false,//是否必须为长图模式
        }
    }
    
    if(data){
        reqData=data
    }
    
    if(data&&data.styleName){
        //如果data中指定了styleName，则直接使用该风格
        reqData.styleName = data.styleName;
    }else{
        //如data中没有指定风格，则随机选取风格，未来将根据词组选择风格
        var newArr = Object.keys(stylesObj.pictureStyles)
        reqData.styleName = newArr[Math.floor(Math.random() * newArr.length)]
    }
    return reqData

}

  