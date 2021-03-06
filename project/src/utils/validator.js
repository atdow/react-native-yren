/*
 * @Author: atdow
 * @Date: 2021-12-25 23:24:37
 * @LastEditors: null
 * @LastEditTime: 2022-01-30 17:31:17
 * @Description: file description
 */
export default {
    validatePhone(phone) {
        const reg = /^[1](([3][0-9])|([4][5-9])|([5][0-3,5-9])|([6][5,6])|([7][0-8])|([8][0-9])|([9][1,8,9]))[0-9]{8}$/;
        return reg.test(phone)
    },
    /**
     * 匹配富文本
     * @param {*} text
     */
    renderRichText(text) {
        const finalList = []
        const rule = /(\/\{.+?\})/g
        const emoArr = text.match(rule)
        // console.log("emoArr:", emoArr)
        if (emoArr === null) {
            finalList.push({ text: text })
        } else {
            const textArr = text.replace(rule, "￥￥").split("￥￥")
            // console.log("textArr:", textArr)
            while (textArr.length) {
                finalList.push({ text: textArr.shift() })
                if (emoArr.length) {
                    finalList.push({ image: emoArr.shift() })
                }
            }
        }
        //  console.log("finalList:", finalList)
        return finalList
    }
}