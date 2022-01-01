/*
 * @Author: atdow
 * @Date: 2022-01-02 01:56:23
 * @LastEditors: null
 * @LastEditTime: 2022-01-02 02:31:02
 * @Description: file description
 */
import React, { Component } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { getTodayBest } from '../../../../api/friends'
import { pxToDp } from '../../../../utils/stylesKits';
import IconFont from '../../../../components/IconFont'
class Index extends Component {
    state = {
        data: {}
    }
    componentDidMount() {
        getTodayBest().then(res => {
            if (res.code !== 200) {
                return
            }
            this.setState({ data: res.data[0] })
        })
    }
    render() {
        const { data } = this.state
        return (
            <View style={{ flexDirection: "row", backgroundColor: "#eee" }}>
                <View style={{ position: "relative" }}>
                    <Image
                        style={{ width: pxToDp(90), height: pxToDp(90) }}
                        source={{ uri: data.header }}
                    ></Image>
                    <View style={{
                        width: pxToDp(60), height: pxToDp(20), backgroundColor: "#b564bf",
                        justifyContent: "center", alignItems: "center", borderRadius: pxToDp(4),
                        position: "absolute", left: 0, bottom: pxToDp(5)
                    }}>
                        <Text style={{ color: "#fff", fontSize: pxToDp(12) }}>今日佳人</Text>
                    </View>
                </View>
                <View style={{ flex: 1, flexDirection: "row", paddingLeft: pxToDp(10), marginTop: pxToDp(5), marginBottom: pxToDp(5), backgroundColor: "white" }}>
                    <View style={{ flex: 1, flexDirection: "row" }}>
                        <View style={{ flex: 3, justifyContent: "space-around" }}>
                            <View style={{ flexDirection: "row", alignItems: "center" }}>
                                <Text style={{ color: "#555" }}>{data.nick_name}</Text>
                                <IconFont
                                    name={data.gender === "女" ? "icontanhuanv" : "icontanhuan"}
                                    style={{ color: data.gender === "女" ? "#b564bf" : "red", fontSize: pxToDp(18) }}
                                ></IconFont>
                                <Text style={{ color: "#555" }}>{data.age}岁</Text>
                            </View>
                            <View style={{ flexDirection: "row" }}>
                                <Text style={{ color: "#555" }}>{data.marry}</Text>
                                <Text style={{ color: "#555" }}>|</Text>
                                <Text style={{ color: "#555" }}>{data.education}</Text>
                                <Text style={{ color: "#555" }}>|</Text>
                                <Text style={{ color: "#555" }}>{data.agediff < 10 ? "年龄相仿" : "有点代沟"}</Text>
                            </View>
                        </View>
                    </View>
                    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
                        <View style={{ position: "relative", alignItems: "center", justifyContent: "center" }}>
                            <IconFont name="iconxihuan" style={{ fontSize: pxToDp(40), color: "red" }}></IconFont>
                            <Text style={{ position: "absolute", color: "white", fontSize: pxToDp(11), fontWeight: "bold" }}>{data.fateValue}</Text>
                        </View>
                        <Text style={{ color: "red", fontSize: pxToDp(12) }}>缘分值</Text>
                    </View>
                </View>
            </View>
        )
    }
}
const styles = StyleSheet.create({
})
export default Index
