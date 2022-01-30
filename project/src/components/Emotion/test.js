/*
 * @Author: atdow
 * @Date: 2022-01-30 17:19:26
 * @LastEditors: null
 * @LastEditTime: 2022-01-30 17:30:37
 * @Description: file description
 */
function test() {
    let text = "/{Delightful}心中百般酸楚千般感受也抵不过你在睡梦中/{Delightful}心中百般酸楚千般感受也抵不过你在睡梦中一个无意的拥抱。不用羡慕别人有多么幸福。每个人的感情都不顺利/{Delightful}一个无意的拥抱。不用羡慕别人有多么幸福。每个人的感情都不顺利/{Delightful}。"
    function renderRichText(text) {
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
    }
    renderRichText(text)
    // [{text:""},{image:"/{Delightful}"}]




}

test()
