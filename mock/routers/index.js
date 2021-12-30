/*
 * @Author: atdow
 * @Date: 2021-12-26 00:07:20
 * @LastEditors: null
 * @LastEditTime: 2021-12-26 00:11:57
 * @Description: file description
 */
var express = require("express");
var router = express.Router()

router.get("/", function (req, res) {
    res.status(200)
    res.send("00000888899888888")
})

module.exports = router;
