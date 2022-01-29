/*
 * @Author: atdow
 * @Date: 2022-01-29 23:52:21
 * @LastEditors: null
 * @LastEditTime: 2022-01-30 00:09:18
 * @Description: file description
 */
// 符号-->图片路径
export const EMOTIONS_DATA = {
    '/{Angry1}': require("./emotions/Angry1.png"),
    '/{Angry2}': require("./emotions/Angry2.png"),
    '/{Delightful}': require("./emotions/Delightful.png")
}

// 符号-->中文
export const EMOTIONS_ZHCN = {
    '/{Angry 1}': '[生气1]',
    '/{Angry 2}': '[生气2]',
    '/{Angry 1}': '[Delightful]',
}
// [{key:"/{Angry 1}",value:require("./emotions/Angry 1.png")}]
export const EMOTIONS_ARR = Object.keys(EMOTIONS_DATA).map(key => ({ key: key, value: EMOTIONS_DATA[key] }))