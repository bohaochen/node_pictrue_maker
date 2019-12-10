var Fontmin = require("fontmin");
var rename = require('gulp-rename');
// const {toTraditionZhChar} = require('zh-transfer-utils');
 
var getFontFile = (fontName,text) => {
    //根据字体名找到字体文件
    var src = "";
    var textStr = text;
    switch (fontName.trim()) {
        case "台北黑体粗":
            src = "./fontFiles/台北黑体TaipeiSansTCBeta-Bold.ttf";
            break;
        case "台北黑体细":
            src = "./fontFiles/台北黑体TaipeiSansTCBeta-Light.ttf";
            break;
        default:
            src = "./fontFiles/台北黑体TaipeiSansTCBeta-Light.ttf";
            break;
    }
    return {fontSrc:src,text:textStr};
}

var index = 0;

var setFontmin = (fontFamily, text) => {
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