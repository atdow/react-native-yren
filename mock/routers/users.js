/*
 * @Author: atdow
 * @Date: 2021-12-26 00:07:29
 * @LastEditors: null
 * @LastEditTime: 2022-01-09 23:48:00
 * @Description: file description
 */
var express = require("express");
var router = express.Router()


router.post("/loginVerification", function (req, res) {
    res.status(200)
    let data = {
        code: 200,
        data: {
            msg: "成功"
        }
    }
    res.send(data)
})

router.post("/login", function (req, res) {
    // console.log("req:", req.body)
    const { phone, vcode } = req.body
    let data = {}
    if (vcode == 666666) {
        data = {
            code: 200,
            data: {
                isNew: true,
                id: "userId1",
                token: "fkjalsjflkajsfljaklfadf",
                msg: "成功"
            }
        }
    } else {
        data = {
            code: 400,
            data: {
                msg: "验证码错误"
            }
        }
    }
    res.status(200)

    res.send(data)
})

router.post("/loginReginfo/head", function (req, res) {
    res.status(200)
    let data = {
        code: 200,
        data: {
            uri: "https://aaa",
            msg: "成功"
        }
    }
    res.send(data)
})


router.post("/loginReginfo", function (req, res) {
    res.status(200)
    let data = {
        code: 200,
        data: {
            msg: "成功"
        }
    }
    res.send(data)
})

module.exports = router;