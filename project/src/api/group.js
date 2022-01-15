/*
 * @Author: atdow
 * @Date: 2022-01-16 02:02:52
 * @LastEditors: null
 * @LastEditTime: 2022-01-16 02:04:00
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