/*
 * @Author: atdow
 * @Date: 2022-01-06 22:30:51
 * @LastEditors: null
 * @LastEditTime: 2022-01-10 00:09:11
 * @Description: file description
 */
var express = require("express");
var router = express.Router()

router.get("/userinfo", function (req, res) {
    res.status(200)
    let data = {
        code: 200,
        data: {
            id: 'userId1',
            distance: 0,
            address: "广州市天河区",
            age: 18,
            amout: null,
            birthday: "2000-01-01",
            city: "广州",
            email: null,
            gender: "男",
            guid: 1,
            lat: "23.12933",
            lng: "113.42782",
            marry: "单身",
            mobile: 14716168418,
            jgPwd: "jg123456789",
            nick_name: "atdow",
            education: "本科",
            header: "https://pics1.baidu.com/feed/6d81800a19d8bc3ed7f42a8e549efe18a9d34595.jpeg?token=d3993bd6594eb3e4db794aca449aa813&s=94D3CA23442301156CADE09F0100C083",
        },
        msg: "成功"
    }
    res.send(data)
})

module.exports = router;