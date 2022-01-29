/*
 * @Author: atdow
 * @Date: 2022-01-29 23:52:07
 * @LastEditors: null
 * @LastEditTime: 2022-01-30 00:17:12
 * @Description: file description
 */
import React, { Component } from 'react';
import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity } from 'react-native';
import { EMOTIONS_ARR } from './datasource'
import { screenWidth } from '../../utils/stylesKits'
class Index extends Component {
    render() {
        const width = screenWidth / 9 - 10
        return (
            <ScrollView contentContainerStyle={{ flexDirection: "row", flexWrap: "wrap", justifyContent: "space-between", padding: 4 }}>
                {EMOTIONS_ARR.map((item, index) => <TouchableOpacity
                    key={index}
                    style={{}}
                    onPress={() => this.props.onPress(item)}
                >
                    <Image source={item.value}
                        style={{ width, height: width }}
                    ></Image>
                </TouchableOpacity>)}
            </ScrollView>
        )
    }
}
const styles = StyleSheet.create({
})
export default Index