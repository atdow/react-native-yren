/*
 * @Author: atdow
 * @Date: 2022-01-06 22:26:15
 * @LastEditors: null
 * @LastEditTime: 2022-01-06 22:27:22
 * @Description: file description
 */
import axios from "./request";

export function getUserInfo(parameter) {
    return axios({
        url: '/my/userinfo',
        method: 'get',
        params: parameter
    })
}