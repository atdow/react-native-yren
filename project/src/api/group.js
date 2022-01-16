/*
 * @Author: atdow
 * @Date: 2022-01-16 02:02:52
 * @LastEditors: null
 * @LastEditTime: 2022-01-16 19:39:05
 * @Description: file description
 */
import axios from "./request";

export function getGroupRecommend(parameter) {
    return axios({
        url: '/group/recommend',
        method: 'get',
        params: parameter
    })
}

export function groupRecommendStar(parameter) {
    return axios({
        url: '/group/star',
        method: 'post',
        data: parameter
    })
}

export function groupRecommendLike(parameter) {
    return axios({
        url: '/group/like',
        method: 'post',
        data: parameter
    })
}

export function groupRecommendNoInterest(parameter) {
    return axios({
        url: '/group/noInterest',
        method: 'post',
        data: parameter
    })
}