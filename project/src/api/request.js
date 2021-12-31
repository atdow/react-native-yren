/*
 * @Author: atdow
 * @Date: 2021-12-31 22:54:51
 * @LastEditors: null
 * @LastEditTime: 2022-01-01 01:43:13
 * @Description: file description
 */

import axios from "axios";
import { BASE_URI } from '../utils/pathMap'
import Toast from "../utils/Toast";
import RootStore from '../mobx'
const instance = axios.create({
    baseURL: BASE_URI,
})

instance.interceptors.request.use(function (config) {
    Toast.showLoading("请求中")
    const token = RootStore.token
    if (token) {
        config.headers['Authorization'] = token
    }
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

export default instance
