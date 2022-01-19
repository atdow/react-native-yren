/*
 * @Author: atdow
 * @Date: 2022-01-03 02:21:28
 * @LastEditors: null
 * @LastEditTime: 2022-01-19 21:39:06
 * @Description: file description
 */
import React, { Component } from 'react';
import { View, Text, StyleSheet, StatusBar, ImageBackground, TouchableOpacity } from 'react-native';
import { pxToDp } from '../../utils/stylesKits';
import IconFont from '../IconFont'
import { NavigationContext } from '@react-navigation/native'
class Index extends Component {
    static contextType = NavigationContext
    render() {
        return (
            <View>
                <StatusBar
                    backgroundColor="transparent"
                    translucent={true}
                >
                </StatusBar>
                <ImageBackground source={require("../../res/headbg.png")}
                    style={styles.imageBackground}
                >
                    <TouchableOpacity onPress={this.context.goBack} style={styles.backContainer}>
                        <IconFont name="iconfanhui" style={{ color: "white" }}></IconFont>
                        <Text style={{ color: "white" }}>返回</Text>
                    </TouchableOpacity>
                    <Text style={{ color: "white", fontWeight: "bold" }}>{this.props.title}</Text>
                    <Text
                        onPress={this.props.onRightTextPress || function () { }}
                        style={styles.rightText}>{this.props.rightText}</Text>
                </ImageBackground>
            </View>
        )
    }
}
const styles = StyleSheet.create({
    imageBackground: {
        height: pxToDp(60),
        paddingTop: pxToDp(12),
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        paddingLeft: pxToDp(10),
        paddingRight: pxToDp(10)
    },
    backContainer: {
        flexDirection: "row",
        alignItems: "center",
        width: pxToDp(80)
    },
    rightText: {
        width: pxToDp(80),
        color: "white",
        textAlign: "right"
    }
})
export default Index