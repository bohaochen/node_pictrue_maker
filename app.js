
const express = require("express");
const {runApiServer}  = require("./api.js");

var app = express();

//运行API服务
runApiServer(app);


app.listen("4399", () => {
    console.log("启动成功,服务端口号:4399")
})
