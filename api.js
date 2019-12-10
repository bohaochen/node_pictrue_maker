
const express = require("express");
const { zipFont } = require(`./src/fontFamily/zipFont.js`);
const { getFontDataByStyle } = require(`./src/fontFamily/getFontDataByStyle.js`);
const { getBackgroundByStyle } = require(`./src/background/getBackgroundByStyle.js`);
const { transformLang } = require(`./src/fontFamily/transformLang.js`);


var bodyParser = require('body-parser')
exports.runApiServer = (app) => {
    //解析post请求
    app.use(bodyParser.json())
    //设置静态文件目录，用于访问图片
    app.use(express.static(__dirname + '/backgroundFiles'));

    app.all('*', function (req, res, next) {
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Headers", "Content-Type,XFILENAME,XFILECATEGORY,XFILESIZE,X-Requested-With");
        res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
        res.header("X-Powered-By", ' 3.2.1')
        res.header("Content-Type", "application/json;charset=utf-8");
        next();
    });
    app.get('/api/buildFont', function (req, res) {
        //生成指定字符集字体，返回字体文件
        //    [fontFamily] = str 
        //    [text] = str 
        // http://127.0.0.1:4399/api/buildFont?fontFamily=台北黑体Bold&text=快乐的一只小跳蛙

        var { fontFamily, text } = req.query;
        var fileName = "";
        var a = new Promise((resolve, reject) => {
            zipFont(fontFamily, text, resolve, reject);
        }).then(function (result) {
            console.log('成功：' + result);
            fileName = result;
            const file = `${__dirname}/build/${fileName}`;
            console.log("file", file)
            var headersParams = {
                'Content-Type': 'application/octet-stream',
                'Content-Disposition': `filename=${fileName}`,
                "Access-Control-Allow-Origin": "*"
            }
            res.sendFile(file, {
                headers: headersParams,
            })
        }).catch(function (reason) {
            console.log('失败：' + reason);
        });

    });

    app.post('/api/getFontFamilys', function (req, res) {
        //生成指定字符集字体，返回符合风格的随机字体文件
        //    [style] = str （指定类型得，风格分类中的整体样式）
        // http://127.0.0.1:4399/api/getFontFamilys?style=现代商务
        var { style, title, subhead, content } = req.body;
        var fontData = getFontDataByStyle(style);
        var obj = {};
        Object.keys(fontData).map((item) => {
            var text = "";
            if (item == "title") {
                text = title
            } else if (item == "subhead") {
                text = subhead
            } else {
                text = content
            }
            obj[item] = {}
            if (fontData[item][6] == "繁") {
                //如果为繁体则返回繁体
                text = transformLang.s2t(text)
            }
            obj[item].text = text
            obj[item].style = fontData[item]
            return ""
        })
        res.send(obj)
        res.end()
    });


    app.post('/api/getBackground', function (req, res) {
        //生成指定字符集字体，返回符合风格的随机字体文件
        //    [style] = str （指定类型得，风格分类中的整体样式）
        // http://127.0.0.1:4399/api/getFontFamilys?style=现代商务
        var { style } = req.body;
        var data = getBackgroundByStyle(style);
        var obj = data;
        res.send(obj)
        res.end()
    });

}

