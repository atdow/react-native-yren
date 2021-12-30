/*
 * @Author: atdow
 * @Date: 2021-12-26 00:27:16
 * @LastEditors: null
 * @LastEditTime: 2021-12-26 12:07:38
 * @Description: file description
 */
import React from 'react'
import { ActivityIndicator } from 'react-native'
import { Toast, Theme } from 'teaset'

let customKey = null;
Toast.showLoading = (text) => {
    if (customKey) return;
    customKey = Toast.show({
        text,
        icon: <ActivityIndicator size="large" color={Theme.toastIconTintColor}></ActivityIndicator>,
        position: "center",
        duration: 100000
    })
}

Toast.hideLoading = () => {
    if (!customKey) return;
    Toast.hide(customKey);
    customKey = null;
}

export default Toast;