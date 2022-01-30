/*
 * @Author: atdow
 * @Date: 2022-01-01 00:53:57
 * @LastEditors: null
 * @LastEditTime: 2022-01-31 01:01:39
 * @Description: file description
 */
import JMessage from "jmessage-react-plugin"
import { Toast } from 'teaset'
export default {
    init() {
        JMessage.init({
            appkey: "b41105de1b08bfcdde106c2b",
            isOpenMessageRoaming: true, // 是否开启消息漫游
            isProduction: false,
            channel: "" // (选填)应用的渠道名称
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
    },
    /**
     * 获取历史消息
     * @param {*} username 要获取和谁的聊天记录
     * @param {*} from 从第几条开始获取
     * @param {*} limit 一共要获取几条
     * @returns
     */
    getHistoryMessage(username, from, limit) {
        return new Promise((resolve, reject) => {
            JMessage.getHistoryMessages({
                type: "single",
                username,
                from,
                limit
            }, resolve, reject)
        })
    },
    /**
     * 发送图片信息
     * @param {String} acceptUserName 接受者的用户名
     * @param {String} path 图片路径
     * @param {Object} extras 附带的额外信息
     * @returns
     */
    sendImageMessage(acceptUserName, path, extras = {}) {
        return new Promise((resolve, reject) => {
            JMessage.sendImageMessage({
                type: "single",
                acceptUserName,
                path,
                extras
            }, resolve, reject)
        })
    },
    /**
     * 获取昂前登录用户的未读信息
     */
    getConversations() {
        Toast.showLoading("获取中")
        return new Promise((resolve, reject) => {
            JMessage.getConversations(res => {
                Toast.hideLoading()
                resolve(res)
            }, reject)
        })
    }
}
