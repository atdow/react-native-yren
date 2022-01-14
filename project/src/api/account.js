/*
 * @Author: atdow
 * @Date: 2022-01-09 23:21:38
 * @LastEditors: null
 * @LastEditTime: 2022-01-09 23:31:39
 * @Description: file description
 */
import axios from "./request";

export function getVerification(parameter) {
    return axios({
        url: '/user/loginVerification',
        method: 'post',
        data: parameter
    })
}

export function login(parameter) {
    return axios({
        url: '/user/login',
        method: 'post',
        data: parameter
    })
}