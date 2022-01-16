/*
 * @Author: atdow
 * @Date: 2022-01-16 02:05:31
 * @LastEditors: null
 * @LastEditTime: 2022-01-16 20:03:12
 * @Description: file description
 */
var express = require("express");
var router = express.Router()
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

router.get("/recommend", function (req, res) {
    const { pageNo = 1, pageSize = 3 } = req.query
    // console.log("req.query:", req.query)
    res.status(200)
    let data = []
    for (var i = 0; i < pageSize; i++) {
        data.push(
            {
                id: 'userId2',
                username: "userId2",
                mobile: 14716111111,
                header: girlImgList[0],
                nick_name: "iu",
                gender: "女",
                age: 18,
                marry: "单身",
                education: "本科",
                dist: 0,
                tid: pageSize * pageNo + i,
                content: `心中百般酸楚千般感受也抵不过你在睡梦中一个无意的拥抱。不用羡慕别人有多么幸福。每个人的感情都不顺利。`,
                start_count: 1,
                comment_count: 0,
                like_count: 1,
                create_time: "2021-11-11T07:22:22.000Z",
                agediff: 0,
                images: girlImgList

            }
        )
    }
    res.send({
        code: 200,
        data: data,
        pageNo: 1,
        totalPages: 3,
        counts: 3,
        pageSize: pageSize,
        msg: "请求成功"
    })
})


router.post("/star", function (req, res) {
    // console.log("req:", req.body)
    const { tid } = req.body
    let data = {
        start_count: 2,
        isCancelStar: false
    }

    res.status(200)

    res.send({
        code: 200,
        data: data,
        msg: "请求成功"
    })
})

router.post("/like", function (req, res) {
    // console.log("req:", req.body)
    const { tid } = req.body
    let data = {
        like_count: 2,
        isCancelLike: false
    }

    res.status(200)

    res.send({
        code: 200,
        data: data,
        msg: "请求成功"
    })
})

router.post("/noInterest", function (req, res) {
    const { tid } = req.body
    res.status(200)
    res.send({
        code: 200,
        msg: "请求成功"
    })
})

module.exports = router;