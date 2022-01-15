/*
 * @Author: atdow
 * @Date: 2021-12-26 00:03:16
 * @LastEditors: null
 * @LastEditTime: 2022-01-16 02:06:17
 * @Description: file description
 */
var express = require("express");
var app = express()
var bodyParser = require('body-parser')

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json())

var userRouter = require("./routers/users")
var friendsRouter = require("./routers/friends")
var myRouter = require("./routers/my")
var groupRouter = require("./routers/group")

app.use("/user", userRouter)
app.use("/friends", friendsRouter)
app.use("/my", myRouter)
app.use("/group", groupRouter)


app.listen(3000)