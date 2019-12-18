
const express = require("express");
const {runApiServer}  = require("./api.js");
const {getLayoutByData}  = require("./src/boxLayout/getLayoutByData.js");

var app = express();

//运行API服务
runApiServer(app);


getLayoutByData()


app.listen("4399", () => {
    console.log("启动成功,服务端口号:4399")
})
