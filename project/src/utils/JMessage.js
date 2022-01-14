/*
 * @Author: atdow
 * @Date: 2022-01-01 00:53:57
 * @LastEditors: null
 * @LastEditTime: 2022-01-10 00:17:45
 * @Description: file description
 */
import JMessage from "jmessage-react-plugin"
export default {
    init() {
        JMessage.init({
            appkey: "b41105de1b08bfcdde106c2b",
            isOpenMessageRoaming: true,
            isProduction: false,
            channel: ""
        })
    },
    register(username, password) {
        return new Promise((resolve, reject) => {
            JMessage.register({
                username,
                password
            }, resolve, reject)
        })
    },
    login(username, password) {
        return new Promise((resolve, reject) => {
            JMessage.login({
                username,
                password
            }, resolve, reject)
        })
    },
    sendTextMessage(username, text, extras = {}) {
        const type = "single"
        return new Promise((resolve, reject) => {
            JMessage.sendTextMessage({
                username,
                type,
                text,
                extras
            }, resolve, reject)
        })
    }
}
