/*
 * @Author: atdow
 * @Date: 2022-01-29 23:52:07
 * @LastEditors: null
 * @LastEditTime: 2022-01-30 20:07:53
 * @Description: file description
 */
import React, { Component } from 'react';
import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity } from 'react-native';
import { EMOTIONS_ARR } from './datasource'
import { pxToDp, screenWidth } from '../../utils/stylesKits'
class Index extends Component {
    render() {
        // 屏幕宽度/9
        const width = screenWidth / 9
        return (
            <ScrollView contentContainerStyle={{ flexDirection: "row", flexWrap: "wrap" }}>
                {EMOTIONS_ARR.map((item, index) => <TouchableOpacity
                    key={index}
                    style={{}}
                    onPress={() => this.props.onPress(item)}
                >
                    <View style={{ width, height: width, justifyContent: "center", alignItems: "center" }}>
                        <Image source={item.value}
                            style={{ width: "80%", height: "80%" }}
                        ></Image>
                    </View>
                </TouchableOpacity>)}
            </ScrollView>
        )
    }
}
const styles = StyleSheet.create({
})
export default Index