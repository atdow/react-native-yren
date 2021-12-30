/*
 * @Author: atdow
 * @Date: 2021-12-25 23:30:24
 * @LastEditors: null
 * @LastEditTime: 2021-12-26 16:37:39
 * @Description: file description
 */
import axios from "axios";
import { BASE_URI } from './pathMap'
import Toast from "./Toast";
const instance = axios.create({
    baseURL: BASE_URI,
    headers: { 'Accept': 'application/json', "Content-Type": "application/json" }
})

instance.interceptors.request.use(function (config) {
    Toast.showLoading("请求中")
    return config;
}, function (error) {
    return Promise.reject(error);
})

instance.interceptors.response.use(function (response) {
    Toast.hideLoading()
    return response.data;
}, function (error) {
    Toast.hideLoading()
    return Promise.reject(error);
})

export default {
    get: instance.get,
    post: instance.post
}