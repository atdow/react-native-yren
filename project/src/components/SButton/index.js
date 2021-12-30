/*
 * @Author: atdow
 * @Date: 2021-12-26 12:16:46
 * @LastEditors: null
 * @LastEditTime: 2021-12-26 17:55:09
 * @Description: file description
 */
import React, { Component } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import LinearGradient from 'react-native-linear-gradient'
import { pxToDp } from "../../utils/stylesKits";
class Index extends Component {
    static defaultProp: {
        style: {},
        textStyle: {},
        disabled: false
    }
    render() {
        return (
            <TouchableOpacity disabled={this.props.disabled} onPress={this.props.onPress} style={{ width: pxToDp(200), height: pxToDp(30), ...this.props.style, overflow: "hidden" }}>
                <LinearGradient start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} colors={['#9b63cd', '#e0708c']} style={styles.linearGradient} >
                    <Text style={{ ...styles.buttonText, ...this.props.textStyle }}>{this.props.children}</Text>
                </LinearGradient>
            </TouchableOpacity>
        )
    }
}

const styles = StyleSheet.create({
    linearGradient: {
        flex: 1,
        paddingLeft: pxToDp(15),
        paddingRight: pxToDp(15),
        borderRadius: pxToDp(5),
        width: "100%",
        height: "100%",
        justifyContent: "center",
        alignItems: "center"
    },
    buttonText: {
        fontSize: pxToDp(18),
        fontFamily: 'Gill Sans',
        textAlign: 'center',
        color: '#ffffff',
        backgroundColor: 'transparent',
    },
});
export default Index
