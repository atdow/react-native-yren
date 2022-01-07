/*
 * @Author: atdow
 * @Date: 2022-01-08 00:59:37
 * @LastEditors: null
 * @LastEditTime: 2022-01-08 01:45:22
 * @Description: file description
 */
import React, { Component } from 'react';
import { View, Text, StyleSheet, ImageBackground, ScrollView, Image, TouchableOpacity } from 'react-native';
import SNav from '../../../../components/SNav'
import { pxToDp } from '../../../../utils/stylesKits';
import SButton from '../../../../components/SButton'
class Index extends Component {
    render() {
        // console.log("props:", this.props.route.params)
        const params = this.props.route.params
        return (
            <ImageBackground
                source={require("../../../../res/qabg.png")}
                style={{ flex: 1, width: "100%" }}
            >
                <SNav title="测试结果"></SNav>
                <ImageBackground
                    source={require("../../../../res/result.png")}
                    style={{ flex: 1, width: "100%", position: "relative" }}
                    resizeMode='stretch'
                >
                    <Text style={styles.title}>灵魂基因鉴定单</Text>
                    <View style={styles.userNameContainer}>
                        <Text style={styles.userNameText}>[</Text>
                        <Text style={styles.userNameText}>{params.currentUser.nick_name}</Text>
                        <Text style={styles.userNameText}>]</Text>
                    </View>
                    <ScrollView style={styles.judgment}>
                        <Text style={{ color: "white" }}>{params.content}</Text>
                    </ScrollView>
                    <View style={{ position: "absolute", left: "5%", top: "43%" }}>
                        <Text style={styles.analyseText}>外向</Text>
                        <Text style={styles.analyseText}>{params.extroversion}%</Text>
                    </View>
                    <View style={{ position: "absolute", left: "5%", top: "49%" }}>
                        <Text style={styles.analyseText}>判断</Text>
                        <Text style={styles.analyseText}>{params.judgment}%</Text>
                    </View>
                    <View style={{ position: "absolute", left: "5%", top: "56%" }}>
                        <Text style={styles.analyseText}>抽象</Text>
                        <Text style={styles.analyseText}>{params.abstract}%</Text>
                    </View>
                    <View style={{ position: "absolute", right: "5%", top: "43%" }}>
                        <Text style={styles.analyseText}>理性</Text>
                        <Text style={styles.analyseText}>{params.rational}%</Text>
                    </View>
                    <Text style={styles.similarText}>与你相似</Text>
                    <ScrollView
                        horizontal={true}
                        contentContainerStyle={{ flexDirection: "row", alignItems: "center" }}
                        style={styles.similarContainer}
                    >
                        {params.silimarUser.map((item, index) => <TouchableOpacity>
                            <Image
                                source={{ uri: item.header }}
                                style={styles.similarImg}
                                key={index}
                            ></Image>
                        </TouchableOpacity>)}
                    </ScrollView>
                    <SButton
                        onPress={() => this.props.navigation.navigate("TestSoul")}
                        style={styles.button}
                    >继续测试</SButton>
                </ImageBackground>
            </ImageBackground>
        )
    }
}
const styles = StyleSheet.create({
    title: {
        position: "absolute",
        top: "1%",
        left: "6%",
        color: "#ffffff9a",
        letterSpacing: pxToDp(8)
    },
    userNameContainer: {
        position: "absolute",
        flexDirection: "row",
        justifyContent: "space-between",
        width: "47%",
        top: "6%",
        right: "5%"
    },
    userNameText: {
        color: "white",
        fontSize: pxToDp(16)
    },
    judgment: {
        width: "47%",
        position: "absolute",
        right: "5%",
        top: "12%",
        height: "26%"
    },
    analyseText: {
        color: "#ffffff9a",
        fontSize: pxToDp(14)
    },
    similarText: {
        color: "#ffffff9a",
        position: "absolute",
        top: "69%",
        left: "5%"
    },
    similarContainer: {
        position: "absolute",
        width: "96%",
        height: "11%",
        left: "2%",
        top: "72%"
    },
    similarImg: {
        width: pxToDp(50),
        height: pxToDp(50),
        borderRadius: pxToDp(25),
        marginRight: pxToDp(15)
    },
    button: {
        width: "96%",
        height: pxToDp(40),
        position: "absolute",
        top: "90%",
        alignSelf: "center"
    }

})
export default Index