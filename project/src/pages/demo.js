/*
 * @Author: atdow
 * @Date: 2021-12-26 17:03:29
 * @LastEditors: null
 * @LastEditTime: 2022-01-01 00:59:05
 * @Description: file description
 */
import React, { Component, useState } from 'react';
import { SafeAreaView, View, Text, StyleSheet } from 'react-native';
import JMessage from "../utils/JMessage"
class App extends Component {
    state = {

    }
    componentDidMount() {
        JMessage.init()
        JMessage.login("username", "password").then(res => {
            console.log("res:", res)
        }).catch(err => {
            console.log("err:", err)
        })
    }
    render() {
        return (
            <View><Text>demo</Text></View>
        )
    }
}

export default App;