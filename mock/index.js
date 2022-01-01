/*
 * @Author: atdow
 * @Date: 2021-12-26 00:03:16
 * @LastEditors: null
 * @LastEditTime: 2022-01-01 21:53:05
 * @Description: file description
 */
var express = require("express");
var app = express()

var userRouter = require("./routers/users")
var friendsRouter = require("./routers/friends")


app.use("/user", userRouter)
app.use("/friends", friendsRouter)


app.listen(3000)