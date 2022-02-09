/*
 * @Author: atdow
 * @Date: 2021-12-26 00:07:29
 * @LastEditors: null
 * @LastEditTime: 2022-02-09 20:45:54
 * @Description: file description
 */
var express = require("express");
var router = express.Router()
var imgData = require("../data/img");

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

router.post("/personalInfo", function (req, res) {
    // console.log("req:", req.body)
    res.status(200)
    let userInfoObj = {
        id: 'userId2',
        username: "userId2",
        mobile: 14716111111,
        header: imgData.girlImgList[0],
        nick_name: "iu",
        gender: "女",
        age: 18,
        marry: "单身",
        education: "本科",
        dist: 0,
        agediff: 0,
        fateValue: 99,
    }
    userInfoArr = []
    for (var i = 0; i < req.body.id.length; i++) {
        userInfoArr.push(userInfoObj)
    }
    let data = {
        code: 200,
        data: userInfoArr
    }
    res.send(data)
})

module.exports = router;