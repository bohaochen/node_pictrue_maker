exports.getStyleByData=function(data){
    //客户端传递回来的data格式如下
    var reqData = {
        styleName:"沉稳现代商务",
        title:"2021制造业指南",
        subhead:"17位行业专家基于中国轻工业协会统计数据的深度解读",
        content:[{
            minTitle:"行程概要",
            
        }],
        contactInformation:{
            address:"洪山区工业路212号富华大厦3302室",
            phoneNum:"400-451-5556",
            contactPerson:"数联大数据"
        }
    }
    var styleName = "";
    //整体风格名称
    
    if(data.styleName){
        //如果data中指定了styleName，则直接使用该风格
    }else{

    }
    console.log(123)
}

