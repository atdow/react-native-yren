/*
 * @Author: atdow
 * @Date: 2022-01-01 19:50:00
 * @LastEditors: null
 * @LastEditTime: 2022-01-09 04:21:00
 * @Description: file description
 */
import React, { Component } from 'react';
import { View, Text, TouchableOpacity, StatusBar, Image } from 'react-native';
import HeaderImageScrollView, { TriggeringView } from 'react-native-image-header-scroll-view';
import { pxToDp } from '../../../utils/stylesKits'
import FriendHead from './components/FriendHead'
import Visitors from './components/Visitors'
import TodayBest from './components/TodayBest'
import { getRecommends } from '../../../api/friends'
import IconFont from '../../../components/IconFont'
import { Overlay } from 'teaset'
import FilterPanel from './components/FilterPanel'
import { themeColor } from '@src/style/config'
import { NavigationContext } from '@react-navigation/native'
class Index extends Component {
    static contextType = NavigationContext
    state = {
        params: {
            page: 1,
            pageSize: 10,
            gender: "女",
            distance: 2,
            lastLogin: "",
            city: "",
            education: ""
        },
        recommendsData: []
    }
    componentDidMount() {
        this.getRecommends()
    }
    getRecommends = (filterParams = {}) => {
        getRecommends({ ...this.state.params, ...filterParams }).then(res => {
            if (res.code !== 200) {
                return
            }
            this.setState({ recommendsData: res.data })
        })
    }
    recommendFilterShow = () => {
        const { page, pageSize, ...others } = this.state.params
        let overlayViewRef = null
        let overlayView = (
            <Overlay.View
                style={{ alignItems: "center", justifyContent: "center" }}
                modal={true}
                overlayOpacity={0.3}
                ref={v => overlayViewRef = v}
            >
                <FilterPanel handleSubmitFilter={this.handleSubmitFilter} params={others} onClose={() => overlayViewRef.close()} />
            </Overlay.View>
        )
        Overlay.show(overlayView)
    }
    handleSubmitFilter = (filterParams) => {
        this.getRecommends(filterParams)
    }
    render() {
        const { recommendsData } = this.state
        return (
            <HeaderImageScrollView
                maxHeight={pxToDp(130)}
                minHeight={pxToDp(44)}
                headerImage={require("@src/res/headfriend.png")}
                renderForeground={() => (
                    <View style={{ height: pxToDp(130), justifyContent: "center", alignItems: "center" }} >
                        <StatusBar backgroundColor={"transparent"} translucent={true}></StatusBar>
                        <FriendHead />
                    </View>
                )}
            >
                <View>
                    <Visitors />
                    <View style={{ marginTop: pxToDp(10), paddingLeft: pxToDp(5), paddingRight: pxToDp(5) }}>
                        <TodayBest />
                        <View>
                            <View style={{
                                height: pxToDp(40), backgroundColor: "#eee", flexDirection: "row",
                                justifyContent: "space-between", paddingLeft: pxToDp(5), paddingRight: pxToDp(5),
                                alignItems: "center"
                            }}>
                                <Text style={{ color: "#666" }}>推荐</Text>
                                <IconFont onPress={this.recommendFilterShow} name="iconshaixuan" style={{ color: "#666" }}></IconFont>
                            </View>
                            <View>
                                {recommendsData.map((item, index) =>
                                    <TouchableOpacity onPress={() => this.context.navigate("FriendDetail", { id: item.id })}>
                                        <View style={{ flexDirection: "row", paddingTop: pxToDp(15), paddingBottom: pxToDp(15), borderBottomWidth: pxToDp(1), borderBottomColor: "#ccc" }}>
                                            <View key={index} style={{ marginRight: pxToDp(10) }}>
                                                <Image source={{ uri: item.header }}
                                                    style={{ width: pxToDp(50), height: pxToDp(50), borderRadius: pxToDp(50) }}
                                                ></Image>
                                            </View>
                                            <View style={{ flex: 1, flexDirection: "row" }}>
                                                <View style={{ flex: 3, justifyContent: "space-around" }}>
                                                    <View style={{ flexDirection: "row", alignItems: "center" }}>
                                                        <Text style={{ color: "#555" }}>{item.nick_name}</Text>
                                                        <IconFont
                                                            name={item.gender === "女" ? "icontanhuanv" : "icontanhuan"}
                                                            style={{ color: item.gender === "女" ? "#b564bf" : "red", fontSize: pxToDp(18) }}
                                                        ></IconFont>
                                                        <Text style={{ color: "#555" }}>{item.age}岁</Text>
                                                    </View>
                                                    <View style={{ flexDirection: "row" }}>
                                                        <Text style={{ color: "#555" }}>{item.marry}</Text>
                                                        <Text style={{ color: "#555" }}>|</Text>
                                                        <Text style={{ color: "#555" }}>{item.education}</Text>
                                                        <Text style={{ color: "#555" }}>|</Text>
                                                        <Text style={{ color: "#555" }}>{item.agediff < 10 ? "年龄相仿" : "有点代沟"}</Text>
                                                    </View>
                                                </View>
                                            </View>
                                            <View style={{ flexDirection: "row", alignItems: "center" }}>
                                                <IconFont name="iconxihuan" style={{ color: themeColor, fontSize: pxToDp(30) }}></IconFont>
                                                <Text style={{ color: "#666" }}>{item.fateValue}</Text>
                                            </View>
                                        </View>
                                    </TouchableOpacity>
                                )}
                            </View>
                        </View>
                    </View>
                </View>
            </HeaderImageScrollView >
        )
    }
}
export default Index