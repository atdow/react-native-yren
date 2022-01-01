/*
 * @Author: atdow
 * @Date: 2022-01-01 21:45:11
 * @LastEditors: null
 * @LastEditTime: 2022-01-02 02:42:44
 * @Description: file description
 */
import axios from "./request";

export function getVisitors(parameter) {
    return axios({
        url: '/friends/visitors',
        method: 'get',
        params: parameter
    })
}

export function getTodayBest(parameter) {
    return axios({
        url: '/friends/todayBest',
        method: 'get',
        params: parameter
    })
}

export function getRecommends(parameter) {
    return axios({
        url: '/friends/recommendation',
        method: 'post',
        params: parameter
    })
}

