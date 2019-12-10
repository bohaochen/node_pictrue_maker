var Fontmin = require("fontmin");
var rename = require('gulp-rename');
var {fontStyleList } = require(`../common/styles.js`);

// const {toTraditionZhChar} = require('zh-transfer-utils');
 
var getFontFile = (fontName,text) => {
    //根据字体名找到字体文件，返回字体文件路径和字符
    var src = "";
    var textStr = text;
    var fontFamilyItem = fontStyleList.find((fontFamily)=>{
        return fontFamily[7]==fontName
    })
    if(fontFamilyItem){
        src = `./fontFiles/${fontFamilyItem[7]}.ttf`;
    }else{
        //未找到字体的话默认返回台北黑体
        src = `./fontFiles/台北黑体Regular.ttf`;
    }
    return {fontSrc:src,text:textStr};
}

var index = 0;

var setFontmin = (fontFamily, text) => {
    //利用fontmin库，挑拣出只包含指定字符的删减版字体
    index += 1;
    var d = new Date();
    var time = d.getTime();
    var fontFileName = `font_${time}_${index}.ttf`;
    var fontObj = getFontFile(fontFamily,text);
    var fontmin = new Fontmin()
        .src(fontObj.fontSrc)
        .use(rename(`${fontFileName}`))
        .use(Fontmin.glyph({
            text: fontObj.text,
        }))
        .dest(`build`);
    return { fontmin, fontFileName };
}

 var zipFont = (fontFamily, text,resolve,reject) => {
     //用于生成好压缩字体以后,异步回调请求，返回文件名
    var { fontmin, fontFileName } = setFontmin(fontFamily, text);
    fontmin.run(function (err, files) {
        if (err) {
            if(reject){
                reject(err)
            }
            throw err
        } else {
            if(resolve){
                resolve(fontFileName)
            }
        }
    })
}

exports.zipFont = zipFont;