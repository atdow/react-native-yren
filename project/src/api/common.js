/*
 * @Author: atdow
 * @Date: 2022-01-30 16:29:24
 * @LastEditors: null
 * @LastEditTime: 2022-01-30 16:29:25
 * @Description: file description
 */
import axios from "./request";

export function uploadImage(parameter) {
    return axios({
        url: '/image/upload',
        method: 'post',
        data: parameter
    })
}
