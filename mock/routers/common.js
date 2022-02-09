/*
 * @Author: atdow
 * @Date: 2022-01-30 16:40:56
 * @LastEditors: null
 * @LastEditTime: 2022-02-09 20:41:30
 * @Description: file description
 */
var express = require("express");
var router = express.Router()
var imgData = require("../data/img");
// console.log("imgData:", imgData)

router.post("/image/upload", function (req, res) {
    // console.log("imgData:", imgData)
    let img = []
    imgData.girlImgList.forEach(girlImgListItem => {
        img.push({
            headImgShortPath: girlImgListItem
        })
    })
    res.status(200)
    res.send({
        code: 200,
        data: img,
        msg: "请求成功"
    })
})

module.exports = router;