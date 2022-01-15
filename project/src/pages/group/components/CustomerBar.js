/*
 * @Author: atdow
 * @Date: 2022-01-16 01:49:48
 * @LastEditors: null
 * @LastEditTime: 2022-01-16 01:59:09
 * @Description: file description
 */
import React, { Component } from 'react';
import { View, Text, StyleSheet, ImageBackground, TouchableOpacity } from 'react-native';
import { pxToDp } from '../../../utils/stylesKits';
class Index extends Component {
    render() {
        const { goToPage, tabs, activeTab } = this.props
        return (
            <ImageBackground
                style={{
                    height: pxToDp(60), flexDirection: "row", paddingLeft: pxToDp(20), paddingRight: pxToDp(20),
                    justifyContent: "space-evenly", alignItems: "flex-end"
                }}
                source={require("../../../res/rectanglecopy.png")}
            >
                {
                    tabs.map((tabsItem, tabIndex) => <TouchableOpacity
                        key={tabIndex}
                        onPress={() => goToPage(tabIndex)}
                        style={{ justifyContent: "center", borderBottomColor: "white", borderBottomWidth: activeTab === tabIndex ? pxToDp(3) : 0 }}
                    >
                        <Text style={{ color: "white", lineHeight: pxToDp(50), fontSize: activeTab === tabIndex ? pxToDp(26) : pxToDp(20) }}>{tabsItem}</Text>
                    </TouchableOpacity>)
                }
            </ImageBackground>
        )
    }
}
const styles = StyleSheet.create({
})
export default Index