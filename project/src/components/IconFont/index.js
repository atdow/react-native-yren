/*
 * @Author: atdow
 * @Date: 2022-01-02 01:50:47
 * @LastEditors: null
 * @LastEditTime: 2022-01-02 01:54:09
 * @Description: file description
 */
import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import IconMap from '../../res/fonts/icon'
class Index extends Component {
    constructor(props) {
        super(props)
    }
    render() {
        return (
            <Text
                style={{ fontFamily: "iconfont", ...this.props.style }}
            >{IconMap[this.props.name]}</Text>
        )
    }
}
export default Index