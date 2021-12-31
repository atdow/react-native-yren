/*
 * @Author: atdow
 * @Date: 2021-12-31 22:56:29
 * @LastEditors: null
 * @LastEditTime: 2021-12-31 23:25:25
 * @Description: file description
 */
import axios from "./request";

export function uploadImg(parameter) {
    return axios({
        url: '/user/loginReginfo/head',
        headers: { "Content-Type": "multipart/form-data" },
        method: 'post',
        data: parameter,
        processData: false,
    })
}

export function registerUserInfo(parameter) {
    return axios({
        url: '/user/loginReginfo',
        method: 'post',
        data: parameter,
    })
}