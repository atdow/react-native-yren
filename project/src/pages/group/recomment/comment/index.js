/*
 * @Author: atdow
 * @Date: 2022-01-16 20:06:30
 * @LastEditors: null
 * @LastEditTime: 2022-01-16 20:13:29
 * @Description: file description
 */
import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
class Index extends Component {
    render() {
        console.log("props:", this.props.route.params)
        return (
            <View><Text>评论</Text></View>
        )
    }
}
const styles = StyleSheet.create({
})
export default Index