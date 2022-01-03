/*
 * @Author: atdow
 * @Date: 2022-01-01 21:47:51
 * @LastEditors: null
 * @LastEditTime: 2022-01-03 19:09:26
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

let girlImgList = [
    "https://img2.baidu.com/it/u=1344806185,1573399636&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=500",
    "https://img0.baidu.com/it/u=2450392317,2129300083&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=500",
    "https://img0.baidu.com/it/u=3013919039,118212744&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=500",
    "https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fn.sinaimg.cn%2Fsinacn20121%2F136%2Fw1018h718%2F20181227%2Fc490-hqtwzee4361909.png&refer=http%3A%2F%2Fn.sinaimg.cn&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1643799081&t=6aa76604996ab684d2aba2cca66e2c68",
    "https://img2.baidu.com/it/u=2934441460,44561809&fm=253&fmt=auto&app=138&f=JPG?w=499&h=341"
]
let boyImgList = [
    "https://img0.baidu.com/it/u=2950070478,540403597&fm=26&fmt=auto",
    "https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fwww.haoz.net%2Fd%2Ffile%2F2020%2F02%2F18%2F1014-20021QA533207.jpg&refer=http%3A%2F%2Fwww.haoz.net&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1643799166&t=568f2846dcef8ac608fac51614e607f3",
    "https://gimg2.baidu.com/image_search/src=http%3A%2F%2F5b0988e595225.cdn.sohucs.com%2Fimages%2F20171127%2Ff62293773bb64acca2aa2934839d1b0b.jpeg&refer=http%3A%2F%2F5b0988e595225.cdn.sohucs.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1643799219&t=ef72ec35a56e32fec16669733c45d7be",
    "https://gimg2.baidu.com/image_search/src=http%3A%2F%2Finews.gtimg.com%2Fnewsapp_bt%2F0%2F9125223062%2F640&refer=http%3A%2F%2Finews.gtimg.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1643799245&t=62cdc725f8d1171395dd784ae62a5ef3",
    "https://img2.baidu.com/it/u=1612841309,1498312041&fm=26&fmt=auto"
]
let imgList = [...girlImgList, ...boyImgList]
router.get("/search-nearby", function (req, res) {
    const { gender } = req.query
    res.status(200)
    let data = []
    for (var i = 0; i < Math.floor((Math.random() * 20) + 1); i++) {
        let header = ''
        let nick_name = ""
        if (gender === '女') {
            header = girlImgList[Math.floor((Math.random() * (girlImgList.length - 1)) + 1)]
            nick_name = 'iu'
        } else if (gender === '男') {
            header = boyImgList[Math.floor((Math.random() * (boyImgList.length - 1)) + 1)]
            nick_name = '胡歌'
        } else {
            header = imgList[Math.floor((Math.random() * (girlImgList.length + boyImgList.length - 1)) + 1)]
            nick_name = "atdow"
        }
        data.push({
            uid: 7,
            header,
            nick_name,
            dist: Math.random(0, 1) * 800
        })
    }
    res.send({
        code: 200,
        data: data,
        msg: "请求成功"
    })
})

module.exports = router;