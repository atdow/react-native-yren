/*
 * @Author: atdow
 * @Date: 2022-01-01 19:51:52
 * @LastEditors: null
 * @LastEditTime: 2022-02-09 22:56:37
 * @Description: file description
 */
import React, { Component } from 'react';
import { View, Text, StyleSheet, StatusBar, Image, TouchableOpacity } from 'react-native';
import { pxToDp } from '../../../utils/stylesKits'
import IconFont from '../../../components/IconFont'
import { inject, observer } from 'mobx-react'
@inject("UserStore")
@observer
class Index extends Component {
    render() {
        const user = this.props.UserStore.user
        return (
            <View>
                <View style={{ height: pxToDp(150), backgroundColor: "#c7689f", position: "relative" }}>
                    <StatusBar backgroundColor="transparent" translucent></StatusBar>
                    <IconFont name="iconbianji" style={{ position: "absolute", top: pxToDp(30), right: pxToDp(20), color: "white", fontSize: pxToDp(16) }}></IconFont>
                    <View style={{ flexDirection: "row", alignItems: "center", marginTop: pxToDp(60) }}>
                        <Image
                            source={{ uri: user.header }}
                            style={styles.userHeader}
                        ></Image>
                        <View style={{ flex: 2, justifyContent: "space-around" }}>
                            <View style={{ flexDirection: "row", alignItems: "center" }}>
                                <Text style={{ color: "white", fontWeight: "bold", fontSize: pxToDp(17) }}>{user.nick_name}</Text>
                                <View style={{ flexDirection: "row", backgroundColor: "white", borderRadius: pxToDp(8), alignItems: "center", justifyContent: "center", marginLeft: pxToDp(15), paddingLeft: pxToDp(3), paddingRight: pxToDp(3) }}>
                                    <IconFont
                                        name={user.gender === "女" ? "icontanhuanv" : "icontanhuanan"}
                                        style={{ color: user.gender === "女" ? "#b564bf" : "red", ...styles.genderIcon }}
                                    ></IconFont>
                                    <Text style={{ color: "#555" }}>{user.age}岁</Text>
                                </View>
                            </View>
                            <View style={{ flexDirection: "row", alignItems: "center" }}>
                                <IconFont name="iconlocation" style={{ color: "white" }}></IconFont>
                                <Text style={{ color: "white" }}>广州</Text>
                            </View>
                        </View>
                    </View>
                </View>
            </View>
        )
    }
}
const styles = StyleSheet.create({
    userHeader: {
        width: pxToDp(40),
        height: pxToDp(40),
        borderRadius: pxToDp(20),
        marginRight: pxToDp(10)
    },
    genderIcon: {
        fontSize: pxToDp(18),
        marginRight: pxToDp(3),
    },
})
export default Index