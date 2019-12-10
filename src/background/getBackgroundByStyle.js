var {backgroundStyleList,pictureStyles } = require(`../common/styles.js`);
var { findPassedByStyleArr} = require(`../../uitls/uitls.js`);
var { url} = require(`../common/common.js`);


exports.getBackgroundByStyle = function(style){
    //找出符合风格的素材，随机取一张素材
   var bgArr = findPassedByStyleArr(backgroundStyleList,pictureStyles[style].background)
   var item = bgArr[Math.floor(Math.random() * bgArr.length)]
    return {
        data:item,
        url:url.imgUrl+"/"+item[8]+".png"
    };
}