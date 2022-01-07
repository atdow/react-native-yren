/*
 * @Author: atdow
 * @Date: 2022-01-01 21:14:04
 * @LastEditors: null
 * @LastEditTime: 2022-01-06 21:10:50
 * @Description: file description
 */
import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import SVG from 'react-native-svg-uri'
import { tanhua, near, testSoul } from '../../../../res/fonts/iconSvg'
import { pxToDp } from '../../../../utils/stylesKits';
import { NavigationContext } from "@react-navigation/native"
class Index extends Component {
    static contextType = NavigationContext
    goPage = (pageName) => {
        this.context.navigate(pageName)
    }
    render() {
        return (
            <View style={styles.friendHeader}>
                <TouchableOpacity onPress={() => this.goPage("TanHua")} style={styles.alignItemsCenter}>
                    <View style={{ ...styles.friendHeaderIcon, backgroundColor: "red", }}>
                        <SVG width={25} height={25} fill='#fff' svgXmlData={tanhua}></SVG>
                    </View>
                    <Text style={styles.friendHeaderText}>探花</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => this.goPage("SearchNearby")} style={styles.alignItemsCenter}>
                    <View style={{ ...styles.friendHeaderIcon, backgroundColor: "#2db3f8" }}>
                        <SVG width={25} height={25} fill='#fff' svgXmlData={near}></SVG>
                    </View>
                    <Text style={styles.friendHeaderText}>搜附近</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => this.goPage("TestSoul")} style={styles.alignItemsCenter}>
                    <View style={{ ...styles.friendHeaderIcon, backgroundColor: "#ecc768" }}>
                        <SVG width={25} height={25} fill='#fff' svgXmlData={testSoul}></SVG>
                    </View>
                    <Text style={styles.friendHeaderText}>测灵魂</Text>
                </TouchableOpacity>
            </View >
        )
    }
}

const styles = StyleSheet.create({
    friendHeader: {
        flexDirection: "row",
        width: "80%",
        justifyContent: "space-around"
    },
    alignItemsCenter: {
        alignItems: "center"
    },
    friendHeaderIcon: {
        width: pxToDp(50),
        height: pxToDp(50),
        borderRadius: pxToDp(35),
        justifyContent: "center",
        alignItems: "center"
    },
    friendHeaderText: {
        fontSize: pxToDp(12),
        marginTop: pxToDp(4),
        color: "#ffffff9a"
    }
})
export default Index