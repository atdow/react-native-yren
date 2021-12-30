/*
 * @Author: atdow
 * @Date: 2021-12-26 00:03:16
 * @LastEditors: null
 * @LastEditTime: 2021-12-26 00:13:54
 * @Description: file description
 */
var express = require("express");
var app = express()

var indexRouter = require("./routers/index");
var userRouter = require("./routers/users")


app.use("/", indexRouter)
app.use("/user", userRouter)


app.listen(3000)