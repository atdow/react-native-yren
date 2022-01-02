/*
 * @Author: atdow
 * @Date: 2022-01-01 21:47:51
 * @LastEditors: null
 * @LastEditTime: 2022-01-03 04:16:15
 * @Description: file description
 */
var express = require("express");
var router = express.Router()

router.get("/visitors", function (req, res) {
    res.status(200)
    res.send({
        code: 200,
        data: [
            {
                target_uid: 7,
                uid: 8,
                nick_name: "张三",
                age: 21,
                eductaion: "大专",
                marry: "未婚",
                gender: "男",
                Distance: 12,
                header: "https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fimg1.doubanio.com%2Fview%2Frichtext%2Flarge%2Fpublic%2Fp207545447.jpg&refer=http%3A%2F%2Fimg1.doubanio.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1643637427&t=4e78bf6d531ab093966fea37b446f4ae",
                agediff: -3,
                fateValue: 82
            },
            {
                target_uid: 7,
                uid: 7,
                nick_name: "iu",
                age: 18,
                eductaion: "本科",
                marry: "未婚",
                gender: "女",
                Distance: 0,
                header: "https://img2.baidu.com/it/u=1344806185,1573399636&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=500",
                agediff: 0,
                fateValue: 100
            }
        ],
        msg: "请求成功"
    })
})

router.get("/todayBest", function (req, res) {
    res.status(200)
    res.send({
        code: 200,
        data: [
            {
                id: 16,
                header: "https://img2.baidu.com/it/u=1344806185,1573399636&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=500",
                nick_name: "iu",
                gender: "女",
                age: 18,
                marry: "单身",
                education: "本科",
                dist: 666,
                agediff: 0,
                fateValue: 99
            }
        ],
        msg: "请求成功"
    })
})

router.post("/recommendation", function (req, res) {
    res.status(200)
    let data = []
    for (var i = 0; i < 10; i++) {
        data.push({
            id: 7,
            header: "https://img2.baidu.com/it/u=1344806185,1573399636&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=500",
            nick_name: "iu",
            gender: "女",
            age: 18,
            marry: "单身",
            education: "本科",
            dist: 666,
            agediff: 0,
            fateValue: 99
        })
    }
    res.send({
        code: 200,
        data: data,
        msg: "请求成功"
    })
})

router.get("/cards", function (req, res) {

    const { pageNo = 1, pageSize = 3 } = req.query
    console.log("req:", pageNo)
    res.status(200)
    let data = []
    for (var i = 0; i < 3; i++) {
        data.push({
            id: 7,
            header: pageNo == 1 ? "https://img2.baidu.com/it/u=1344806185,1573399636&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=500" :
                "https://img0.baidu.com/it/u=2450392317,2129300083&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=500",
            nick_name: pageNo == 1 ? "iu" : "lisa",
            gender: "女",
            age: pageNo == 1 ? 18 : 19,
            marry: "单身",
            education: "本科",
            dist: 666,
            agediff: 0,
            fateValue: 99
        })
    }
    res.send({
        code: 200,
        data: data,
        pageNo: 1,
        totalPages: 2,
        counts: 6,
        pageSize: 5,
        msg: "请求成功"
    })
})

router.post("/like", function (req, res) {
    // console.log("req:", req.body)
    let data = ""
    const { type } = req.body
    if (type === 'dislike') {
        data = "不喜欢"
    } else if (type === 'like') {
        data = "喜欢"
    }
    res.status(200)
    res.send({
        code: 200,
        data: data,
        msg: "请求成功"
    })
})

module.exports = router;