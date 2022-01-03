/*
 * @Author: atdow
 * @Date: 2022-01-03 17:57:39
 * @LastEditors: null
 * @LastEditTime: 2022-01-03 18:37:34
 * @Description: file description
 */
import React, { Component } from 'react';
import { View, Text, StyleSheet, StatusBar, ImageBackground, TouchableOpacity, Image } from 'react-native';
import { setSearchNearby } from "@src/api/friends"
import { pxToDp, screenHeight, screenWidth } from '../../../utils/stylesKits';
import IconFont from '@src/components/IconFont'
import { Overlay } from 'teaset'
import FilterPanel from './components/FilterPanel'
class Index extends Component {
    params = {
        gender: "女",
        distance: 2 //1
    }
    state = {
        list: []
    }
    WHMAP = {
        "wh1": { width: pxToDp(70), height: pxToDp(100) },
        "wh2": { width: pxToDp(60), height: pxToDp(90) },
        "wh3": { width: pxToDp(50), height: pxToDp(80) },
        "wh4": { width: pxToDp(40), height: pxToDp(70) },
        "wh5": { width: pxToDp(30), height: pxToDp(60) },
        "wh6": { width: pxToDp(20), height: pxToDp(50) },
    }
    getWidthHeight = (dist) => {
        if (dist < 200) {
            return "wh1"
        }
        if (dist < 400) {
            return "wh2"
        }
        if (dist < 600) {
            return "wh3"
        }
        if (dist < 1000) {
            return "wh4"
        }
        if (dist < 1500) {
            return "wh5"
        }
        return "wh6"
    }
    componentDidMount() {
        this.getList()
    }
    getList = () => {
        setSearchNearby(this.params).then(res => {
            if (res.code !== 200) {
                return
            }
            // console.log("res.data:", res.data)
            this.setState({ list: res.data })
        })
    }
    handleFilterShow = () => {
        let overlayViewRef = null
        let overlayView = (
            <Overlay.View
                style={{ alignItems: "center", justifyContent: "center" }}
                modal={true}
                overlayOpacity={0.3}
                ref={v => overlayViewRef = v}
            >
                <FilterPanel handleSubmitFilter={this.handleSubmitFilter} params={this.params} onClose={() => overlayViewRef.close()} />
            </Overlay.View>
        )
        Overlay.show(overlayView)
    }
    handleSubmitFilter = (filterParams) => {
        this.params = filterParams
        this.getList()
    }
    render() {
        const { list } = this.state
        return (
            <ImageBackground
                style={{ flex: 1, position: "relative" }}
                source={require("../../../res/search.gif")}>
                <StatusBar backgroundColor={"transparent"} translucent={true}></StatusBar>
                <TouchableOpacity
                    onPress={this.handleFilterShow}
                    style={{
                        backgroundColor: "white", position: "absolute", right: "10%", top: "10%",
                        width: pxToDp(55), height: pxToDp(55), borderRadius: pxToDp(55), alignItems: "center", justifyContent: "center",
                        zIndex: 1000
                    }}
                >
                    <IconFont name="iconshaixuan" style={{ color: "#912375", fontSize: pxToDp(30) }}></IconFont>
                </TouchableOpacity>
                {
                    list.map((item, index) => {
                        const whMap = this.WHMAP[this.getWidthHeight(item.dist)]
                        const tx = Math.random() * (screenWidth - whMap.width)
                        const ty = Math.random() * (screenHeight - whMap.height)
                        return <TouchableOpacity key={index} style={{ position: "absolute", left: tx, top: ty }}>
                            <ImageBackground
                                source={require("../../../res/showfirend.png")}
                                resizeMode='stretch'
                                style={{ ...whMap, position: "relative", alignItems: "center" }}
                            >
                                <Text
                                    numberOfLines={1}
                                    style={{ position: "absolute", color: "#ffffff9a", top: -pxToDp(20) }}>{item.nick_name}</Text>
                                <Image source={{ uri: item.header }}
                                    style={{ width: whMap.width, height: whMap.width, borderRadius: whMap.width / 2 }}
                                ></Image>
                            </ImageBackground>
                        </TouchableOpacity>
                    })
                }
                <View style={{ position: "absolute", bottom: pxToDp(50), width: "100%", alignItems: "center" }}>
                    <Text style={{ color: "white" }}>您附近有<Text style={{ color: "red", fontSize: pxToDp(20) }}>{list.length}</Text>个好友</Text>
                    <Text style={{ color: "white" }}>选择聊聊吧</Text>
                </View>

            </ImageBackground>
        )
    }
}
const styles = StyleSheet.create({
})
export default Index