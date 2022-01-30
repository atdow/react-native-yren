/*
 * @Author: atdow
 * @Date: 2022-01-01 19:51:26
 * @LastEditors: null
 * @LastEditTime: 2022-01-31 01:03:22
 * @Description: file description
 */

import React, { Component } from 'react';
import { View, Text, StyleSheet, StatusBar, ImageBackground, TouchableOpacity } from 'react-native';
import { pxToDp } from '../../../utils/stylesKits'
import IconFont from '../../../components/IconFont'
import JMessage from '../../../utils/JMessage';
class Index extends Component {
    componentDidMount() {
        this.getConversations()
    }
    getConversations = async () => {
        const res = await JMessage.getConversations()
        // console.log("res:", res)
    }
    render() {
        return (
            <View>
                <StatusBar
                    backgroundColor="transparent"
                    translucent={true}
                >
                </StatusBar>
                <ImageBackground source={require("../../../res/headbg.png")}
                    style={styles.imageBackground}
                >
                    <TouchableOpacity></TouchableOpacity>
                    <Text style={{ color: "white", fontWeight: "bold" }}>消息</Text>
                    <TouchableOpacity>
                        <IconFont name="icontongxunlu"
                            style={{ color: "white", fontSize: pxToDp(20) }}
                        ></IconFont>
                    </TouchableOpacity>
                </ImageBackground>
                <View style={styles.tabContainer}>
                    <TouchableOpacity style={{ alignItems: "center" }}>
                        <View style={{ ...styles.tabIconContainer, backgroundColor: "#ebc969" }}>
                            <IconFont name="icongonggao" style={styles.tabIcon}></IconFont>
                        </View>
                        <Text style={styles.tabText}>全部</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={{ alignItems: "center" }}>
                        <View style={{ ...styles.tabIconContainer, backgroundColor: "#ff5314", }}>
                            <IconFont name="icondianzan-o" style={{ color: "#fff", fontSize: pxToDp(24) }}></IconFont>
                        </View>
                        <Text style={styles.tabText}>点赞</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={{ alignItems: "center" }}>
                        <View style={{ ...styles.tabIconContainer, backgroundColor: "#2fb4f9" }}>
                            <IconFont name="iconpinglun" style={{ color: "#fff", fontSize: pxToDp(24) }}></IconFont>
                        </View>
                        <Text style={styles.tabText}>评论</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={{ alignItems: "center" }}>
                        <View style={{ ...styles.tabIconContainer, backgroundColor: "#1adbde" }}>
                            <IconFont name="iconxihuan-o" style={{ color: "#fff", fontSize: pxToDp(24) }}></IconFont>
                        </View>
                        <Text style={styles.tabText}>喜欢</Text>
                    </TouchableOpacity>
                </View>
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
    tabContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        paddingTop: pxToDp(10),
        paddingBottom: pxToDp(10),
        paddingLeft: pxToDp(30),
        paddingRight: pxToDp(30),
        borderBottomWidth: pxToDp(3),
        borderBottomColor: "#dce2e5"
    },
    tabIconContainer: {
        width: pxToDp(60),
        height: pxToDp(60),
        borderRadius: pxToDp(30),
        alignItems: "center",
        justifyContent: "center"
    },
    tabIcon: {
        color: "#fff",
        fontSize: pxToDp(24)
    },
    tabText: {
        color: "#666"
    }
})
export default Index