/*
 * @Author: atdow
 * @Date: 2022-01-09 03:10:40
 * @LastEditors: null
 * @LastEditTime: 2022-01-14 23:47:00
 * @Description: file description
 */
import React, { Component } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, Modal } from 'react-native';
import { getFriendDetail } from "../../../api/friends"
import HeaderImageScrollView from 'react-native-image-header-scroll-view';
import { Carousel } from "teaset"
import { pxToDp } from '../../../utils/stylesKits';
import IconFont from '../../../components/IconFont'
import LinearGradient from 'react-native-linear-gradient';
import ImageViewer from 'react-native-image-zoom-viewer'
import JMessage from '../../../utils/JMessage';
import { inject, observer } from 'mobx-react'
import { Toast } from 'teaset'
@inject("UserStore")
@observer
class Index extends Component {
    state = {
        userDetail: {},
        trends: [],
        showAlbum: false,
        albumIndex: 0,
        albumList: []
    }
    params = {
        pageNo: 1,
        pageSize: 5
    }
    totalPages = 1
    loading = false
    componentDidMount() {
        this.getDetail()
    }
    getDetail() {
        this.loading = true
        getFriendDetail({ id: this.props.route.params.id, ...this.params }).then(res => {
            // console.log("res:", res)
            if (res.code !== 200) {
                return
            }
            this.totalPages = res.totalPages || 0
            this.setState({
                userDetail: res.data,
                trends: [...this.state.trends, ...res.data.trends]
            })
        }).catch(err => { }).finally(() => {
            this.loading = false
        })
    }
    handleShowAlbum = (trendsItem, albumIndex) => {
        const albumList = trendsItem.album.map((albumItem) => ({ url: albumItem.img }))
        const showAlbum = true
        this.setState({ albumList, albumIndex, showAlbum })
        console.log(albumList)
    }
    onScroll = ({ nativeEvent }) => {
        /**
         * nativeEvent.contentSize.height: 列表内容的高度
         * nativeEvent.layoutMeasurement.height: 可视区域的高度
         * nativeEvent.contentOffset.y: 滚动条距离顶部的高度
         */
        const isReachBottom = nativeEvent.contentSize.height - nativeEvent.layoutMeasurement.height - nativeEvent.contentOffset.y < 10
        const hasMore = this.params.pageNo < this.totalPages
        if (isReachBottom && hasMore && this.loading === false) {
            this.params.pageNo++
            this.getDetail()
        }
    }
    sendLike = () => {
        const id = this.state.userDetail.id
        const text = this.props.UserStore.user.mobile + "喜欢了你"
        const extras = { user: JSON.stringify(this.state.userDetail) }
        JMessage.sendTextMessage(id, text, extras).then(res => {
            // console.log("res:", res)
            Toast.smile("喜欢成功", 1000, "center")
        }).catch(err => {
            Toast.sad("喜欢失败", 1000, "center")
        })
    }
    goChat = () => {
        const { userDetail } = this.state
        this.props.navigation.navigate("Chat", userDetail)
    }
    render() {
        const { userDetail, trends, showAlbum, albumList, albumIndex } = this.state
        if (!userDetail.slider) {
            return <></>
        }
        return (
            <HeaderImageScrollView
                maxHeight={pxToDp(220)}
                minHeight={pxToDp(40)}
                onScroll={this.onScroll}
                renderFixedForeground={() => (
                    <Carousel
                        control
                        style={{ height: pxToDp(220) }}
                    >
                        {
                            userDetail.slider.map((sliderItem, sliderIndex) => <Image
                                key={sliderIndex}
                                source={{ uri: sliderItem.img }}
                                style={{ width: "100%", height: pxToDp(220) }}
                            >
                            </Image>)
                        }

                    </Carousel>
                )}
            >
                <View style={{ backgroundColor: "white" }}>
                    <View style={{ flexDirection: "row", padding: pxToDp(5), borderBottomWidth: pxToDp(1), borderColor: "#eee" }}>
                        <View style={{ flex: 2, justifyContent: "space-around" }}>
                            <View style={{ flexDirection: "row", alignItems: "center" }}>
                                <Text style={{ color: "#555" }}>{userDetail.nick_name}</Text>
                                <IconFont
                                    name={userDetail.gender === "女" ? "icontanhuanv" : "icontanhuan"}
                                    style={{ color: userDetail.gender === "女" ? "#b564bf" : "red", fontSize: pxToDp(18), marginLeft: pxToDp(5), marginRight: pxToDp(5) }}
                                ></IconFont>
                                <Text style={{ color: "#555" }}>{userDetail.age}岁</Text>
                            </View>
                            <View style={{ flexDirection: "row" }}>
                                <Text style={{ color: "#555", marginRight: pxToDp(5) }}>{userDetail.marry}</Text>
                                <Text style={{ color: "#555", marginRight: pxToDp(5) }}>|</Text>
                                <Text style={{ color: "#555", marginRight: pxToDp(5) }}>{userDetail.education}</Text>
                                <Text style={{ color: "#555", marginRight: pxToDp(5) }}>|</Text>
                                <Text style={{ color: "#555", marginRight: pxToDp(5) }}>{userDetail.agediff < 10 ? "年龄相仿" : "有点代沟"}</Text>
                            </View>
                        </View>
                    </View>
                    <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between", borderBottomWidth: pxToDp(1), borderColor: "#eee" }}>
                        <View style={{ padding: pxToDp(10), flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
                            <View style={{ flexDirection: "row", alignItems: "center" }}>
                                <Text style={{ color: "#666" }}>动态</Text>
                                <View style={{
                                    backgroundColor: "red", width: pxToDp(16), height: pxToDp(16),
                                    borderRadius: pxToDp(8), alignItems: "center", justifyContent: "center", marginLeft: pxToDp(5)
                                }}>
                                    <Text style={{ color: "white" }}>{trends.length}</Text>
                                </View>
                            </View>
                        </View>
                        <View style={{ flexDirection: "row" }}>
                            <TouchableOpacity onPress={this.goChat} style={{ marginRight: pxToDp(8) }}>
                                <LinearGradient
                                    colors={["#f2ab5a", "#ec7c50"]}
                                    start={{ x: 0, y: 0 }}
                                    end={{ x: 1, y: 0 }}
                                    style={{
                                        width: pxToDp(100), height: pxToDp(30), borderRadius: pxToDp(15),
                                        flexDirection: "row", alignItems: "center", justifyContent: "space-evenly"
                                    }}
                                >
                                    <IconFont name="iconliaotian" style={{ color: "white" }}></IconFont>
                                    <Text style={{ color: "white" }}>聊一下</Text>
                                </LinearGradient>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={this.sendLike} style={{ marginRight: pxToDp(8) }}>
                                <LinearGradient
                                    colors={["#6d47f8", "#e56b7f"]}
                                    start={{ x: 0, y: 0 }}
                                    end={{ x: 1, y: 0 }}
                                    style={{
                                        width: pxToDp(100), height: pxToDp(30), borderRadius: pxToDp(15),
                                        flexDirection: "row", alignItems: "center", justifyContent: "space-evenly"
                                    }}
                                >
                                    <IconFont name="iconxihuan-o" style={{ color: "white" }}></IconFont>
                                    <Text style={{ color: "white" }}>喜欢</Text>
                                </LinearGradient>
                            </TouchableOpacity>
                        </View>

                    </View>
                    <View style={{ padding: pxToDp(10) }}>
                        {trends.map((trendsItem, trendsIndex) => <View key={trendsIndex}>
                            <View style={{ borderBottomWidth: pxToDp(1), borderColor: "#eee" }}>
                                <View style={{ flexDirection: "row" }}>
                                    <Image
                                        source={{ uri: userDetail.header }}
                                        style={{ width: pxToDp(40), height: pxToDp(40), borderRadius: pxToDp(20), marginRight: pxToDp(10) }}
                                    ></Image>
                                    <View style={{ flex: 2, justifyContent: "space-around" }}>
                                        <View style={{ flexDirection: "row", alignItems: "center" }}>
                                            <Text style={{ color: "#555" }}>{userDetail.nick_name}</Text>
                                            <IconFont
                                                name={userDetail.gender === "女" ? "icontanhuanv" : "icontanhuan"}
                                                style={{ color: userDetail.gender === "女" ? "#b564bf" : "red", fontSize: pxToDp(18), marginLeft: pxToDp(5), marginRight: pxToDp(5) }}
                                            ></IconFont>
                                            <Text style={{ color: "#555" }}>{userDetail.age}岁</Text>
                                        </View>
                                        <View style={{ flexDirection: "row" }}>
                                            <Text style={{ color: "#555", marginRight: pxToDp(5) }}>{userDetail.marry}</Text>
                                            <Text style={{ color: "#555", marginRight: pxToDp(5) }}>|</Text>
                                            <Text style={{ color: "#555", marginRight: pxToDp(5) }}>{userDetail.education}</Text>
                                            <Text style={{ color: "#555", marginRight: pxToDp(5) }}>|</Text>
                                            <Text style={{ color: "#555", marginRight: pxToDp(5) }}>{userDetail.agediff < 10 ? "年龄相仿" : "有点代沟"}</Text>
                                        </View>
                                    </View>
                                </View>
                                <View style={{ paddingTop: pxToDp(8) }}>
                                    <Text style={{ color: "#666" }}>{trendsItem.content}</Text>
                                </View>
                                <View style={{ flexDirection: "row", flexWrap: "wrap", paddingTop: pxToDp(5), paddingBottom: pxToDp(5) }}>
                                    {trendsItem.album.map((albumItem, albumIndex) => <TouchableOpacity
                                        key={albumIndex}
                                        onPress={() => this.handleShowAlbum(trendsItem, albumIndex)}
                                    >
                                        <Image
                                            source={{ uri: albumItem.img }}
                                            style={{ width: pxToDp(70), height: pxToDp(70), marginRight: pxToDp(5) }}
                                        ></Image>
                                    </TouchableOpacity>)}
                                </View>
                            </View>
                        </View>)}
                    </View>
                    {this.params.pageNo >= this.totalPages && <View style={{ height: pxToDp(80), alignItems: "center", justifyContent: "center" }}>
                        <Text style={{ color: "#666" }}>没有更多数据了</Text>
                    </View>}
                    <Modal visible={showAlbum} transparent={true}>
                        <ImageViewer
                            onClick={() => this.setState({ showAlbum: false })}
                            imageUrls={albumList}
                            index={albumIndex}></ImageViewer>
                    </Modal>
                </View>
            </HeaderImageScrollView >
        )
    }
}
const styles = StyleSheet.create({
})
export default Index