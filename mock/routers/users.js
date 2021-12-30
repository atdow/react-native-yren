/*
 * @Author: atdow
 * @Date: 2021-12-26 00:07:29
 * @LastEditors: null
 * @LastEditTime: 2021-12-30 21:42:52
 * @Description: file description
 */
var express = require("express");
var router = express.Router()

router.post("/login", function (req, res) {
    res.status(200)
    let data = {
        code: 200,
        data: {
            msg: "成功"
        }
    }
    res.send(data)
})

router.post("/loginVerification", function (req, res) {
    res.status(200)
    let data = {
        code: 200,
        data: {
            isNew: true,
            id: 1,
            token: "fkjalsjflkajsfljaklfadf",
            msg: "成功"
        }
    }
    res.send(data)
})


router.get("/4444", function (req, res) {
    res.status(200)
    res.send("00000888899")
})

module.exports = router;