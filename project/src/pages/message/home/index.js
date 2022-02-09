/*
 * @Author: atdow
 * @Date: 2022-01-01 19:51:26
 * @LastEditors: null
 * @LastEditTime: 2022-02-09 22:24:50
 * @Description: file description
 */

import React, { Component } from 'react';
import { View, Text, StyleSheet, StatusBar, ImageBackground, TouchableOpacity, Image } from 'react-native';
import { pxToDp } from '../../../utils/stylesKits'
import IconFont from '../../../components/IconFont'
import JMessage from '../../../utils/JMessage';
import { guidToPersonalInfo } from '../../../api/user'
import date from '../../../utils/date'
import { NavigationContext } from '@react-navigation/native'
class Index extends Component {
    static contextType = NavigationContext
    state = {
        list: []
    }
    componentDidMount() {
        this.getConversations()
    }
    getConversations = async () => {
        const res = await JMessage.getConversations()
        // console.log("res:", res)
        if (res.length) {
            const idArr = res.map(v => v.target.username)
            // console.log("idArr:", idArr)
            const users = await guidToPersonalInfo({ id: idArr })
            // console.log("users:", users)
            this.setState({ list: res.map((resItem, resIndex) => ({ ...resItem, user: users.data[resIndex] })) })
        }
    }
    render() {
        const { list } = this.state
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
                <View>
                    {list.map((listItem, listIndex) => <TouchableOpacity
                        onPress={() => this.context.navigate("Chat", listItem.user)}
                        key={listIndex} style={{ padding: pxToDp(15), flexDirection: "row", borderBottomWidth: pxToDp(1), borderBottomColor: "#ccc" }}>
                        <View>
                            <Image
                                source={{ uri: listItem.user.header }}
                                style={{ width: pxToDp(40), height: pxToDp(40), borderRadius: pxToDp(20) }}
                            ></Image>
                        </View>
                        <View style={{ justifyContent: "space-evenly", paddingLeft: pxToDp(15) }}>
                            <Text style={{ color: "#666" }}>{listItem.user.nick_name}</Text>
                            <Text style={{ color: "#666" }}>{listItem.latestMessage && listItem.latestMessage.text}</Text>
                        </View>
                        <View style={{ flex: 1, alignItems: "flex-end" }}>
                            <Text style={{ color: "#666" }}>{listItem.latestMessage && date(listItem.latestMessage.createTime).fromNow()}</Text>
                            <View style={{ width: pxToDp(20), height: pxToDp(20), borderRadius: pxToDp(20), backgroundColor: "red", alignItems: "center", justifyContent: "center" }}>
                                <Text style={{ color: "white" }}>{listItem.unreadCount}</Text>
                            </View>
                        </View>
                    </TouchableOpacity>)}
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