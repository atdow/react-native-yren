/*
 * @Author: atdow
 * @Date: 2022-01-01 21:47:51
 * @LastEditors: null
 * @LastEditTime: 2022-01-15 22:23:32
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


router.get("/questions", function (req, res) {
    const { pageNo = 1, pageSize = 3 } = req.query
    res.status(200)
    let data = [
        {
            qid: 1,
            type: "初级",
            title: "初级灵魂题",
            star: 2,
            img: "https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fb-ssl.duitang.com%2Fuploads%2Fitem%2F201608%2F21%2F20160821204304_n2HUu.jpeg&refer=http%3A%2F%2Fb-ssl.duitang.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1644067727&t=a94a2fa27995c701737e77e2735ecab0",
            status: 0,
            count: 3,
            sort_no: 1,
            istested: true,
            islock: false
        },
        {
            qid: 2,
            type: "中级",
            title: "中级灵魂题",
            star: 2,
            img: "https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fc-ssl.duitang.com%2Fuploads%2Fitem%2F201510%2F25%2F20151025185513_rQCYG.thumb.1000_0.jpeg&refer=http%3A%2F%2Fc-ssl.duitang.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1644067751&t=1c1858032e34e1be7682525f225a0a98",
            status: 0,
            count: 3,
            sort_no: 1,
            istested: true,
            islock: false
        },
        {
            qid: 3,
            type: "高级",
            title: "高级灵魂题",
            star: 3,
            img: "https://img0.baidu.com/it/u=2650854169,1602150023&fm=26&fmt=auto",
            status: 0,
            count: 3,
            sort_no: 1,
            istested: true,
            islock: false
        }
    ]

    res.send({
        code: 200,
        data: data,
        pageNo: 1,
        totalPages: 1,
        counts: 3,
        pageSize: 5,
        msg: "请求成功"
    })
})

router.get("/questionSection", function (req, res) {
    res.status(200)
    let data = [
        {
            qsid: 1,
            questionTitle: "未来生活的幸福指数跟物质和精神那个关系更大？",
            answers: [
                {
                    qsid: 1,
                    answerTitle: "跟物质关系更大",
                    answerNo: "A"
                },
                {
                    qsid: 1,
                    answerTitle: "跟精神关系更大",
                    answerNo: "B"
                }
            ]
        },
        {
            qsid: 2,
            questionTitle: "如果遇到一个你爱的人，你能接受裸婚吗？",
            answers: [
                {
                    qsid: 2,
                    answerTitle: "会",
                    answerNo: "A"
                },
                {
                    qsid: 2,
                    answerTitle: "不会",
                    answerNo: "B"
                }
            ]
        }
    ]

    res.send({
        code: 200,
        data: data,
        msg: "请求成功"
    })
})

router.post("/questionsAnswer", function (req, res) {
    res.status(200)
    let data = {
        content: `1、心中百般酸楚千般感受也抵不过你在睡梦中一个无意的拥抱。
        2、不用羡慕别人有多么幸福。每个人的感情都不顺利。    
        3、我开得起玩笑只要你别戳中痛处      
        4、我多高尚向自尊开了枪      
        5、你怎么一提他的名字就不笑了.
        6、道理都懂但是就像鱼活在水里也死在水里
        7、不是以为我在等你只是还没找到代替你的人而已
        8、有多痛有多牵挂成为我心头的伤疤
        9、可能后来我们互不拖欠互不想念互不怀念.
        10、活鱼逆流而上死鱼随波逐流 
        11、也许我更像个骗子热衷于为你找借口来搪塞自己
        12、情愿彼此是路人总好过最后你转身   
        13、“也羡慕那些一沾着枕头就能安睡的人和那些决心放手后就不再回头的人” 
        14、Ifyoudon'ttravelaround,you'dthinkthisistheworld.     
        15、我很难想象到等我掉光了牙满头银发步履拖沓的时候谁还在我身旁。   
        16、不厌其烦的提醒自己不去爱你，是因为我懂你不爱我。  
        17、炎热的夏天只有你让我心凉寒冷的冬天你也没给我拥抱拿走你的外套我不需要。   
        18、你走以后我的醉意却停留一季又一季经了万水和千山`,
        currentUser: {
            id: 1,
            distance: 0,
            address: "广州市天河区",
            age: 18,
            amout: null,
            birthday: "2000-01-01",
            city: "广州",
            email: null,
            gender: "男",
            guid: null,
            lat: "23.12933",
            lng: "113.42782",
            marry: "单身",
            mobile: 14716111111,
            nick_name: "atdow",
            education: "本科",
            header: "https://pics1.baidu.com/feed/6d81800a19d8bc3ed7f42a8e549efe18a9d34595.jpeg?token=d3993bd6594eb3e4db794aca449aa813&s=94D3CA23442301156CADE09F0100C083",
        },
        extroversion: 88,
        judgment: 98,
        abstract: 80,
        rational: 96,
        silimarUser: [
            {
                id: 2,
                header: girlImgList[0]
            },
            {
                id: 3,
                header: girlImgList[1]
            },
            {
                id: 4,
                header: girlImgList[2]
            },
            {
                id: 5,
                header: girlImgList[3]
            },
            {
                id: 6,
                header: girlImgList[4]
            },
        ]
    }

    res.send({
        code: 200,
        data: data,
        msg: "请求成功"
    })
})

router.get("/personalInfo", function (req, res) {
    const { pageNo = 1, pageSize = 3 } = req.query
    res.status(200)
    let data = {
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
        agediff: 0,
        fateValue: 99,
        trends: [
            {
                tid: 3,
                uid: 7,
                content: "不积跬步无以至千里...",
                start_count: 1,
                comment_count: 0,
                like_count: 1,
                status: 0,
                lng: null,
                lat: null,
                address: null,
                album: [
                    {
                        aid: 6,
                        tid: 3,
                        img: girlImgList[0]
                    },
                    {
                        aid: 6,
                        tid: 3,
                        img: girlImgList[1]
                    }
                ]
            },
            {
                tid: 3,
                uid: 7,
                content: "不积跬步无以至千里...",
                start_count: 1,
                comment_count: 0,
                like_count: 1,
                status: 0,
                lng: null,
                lat: null,
                address: null,
                album: [
                    {
                        aid: 6,
                        tid: 3,
                        img: girlImgList[0]
                    },
                    {
                        aid: 6,
                        tid: 3,
                        img: girlImgList[1]
                    }
                ]
            },
            {
                tid: 3,
                uid: 7,
                content: "不积跬步无以至千里...",
                start_count: 1,
                comment_count: 0,
                like_count: 1,
                status: 0,
                lng: null,
                lat: null,
                address: null,
                album: [
                    {
                        aid: 6,
                        tid: 3,
                        img: girlImgList[0]
                    },
                    {
                        aid: 6,
                        tid: 3,
                        img: girlImgList[1]
                    }
                ]
            }
        ],
        slider: [
            {
                aid: 1,
                tid: 1,
                uid: 7,
                img: girlImgList[0]
            },
            {
                aid: 1,
                tid: 1,
                uid: 7,
                img: girlImgList[1]
            },
            {
                aid: 1,
                tid: 1,
                uid: 7,
                img: girlImgList[2]
            },
        ]
    }

    res.send({
        code: 200,
        data: data,
        pageNo: 1,
        totalPages: 2,
        counts: 3,
        pageSize: 5,
        msg: "请求成功"
    })
})

module.exports = router;