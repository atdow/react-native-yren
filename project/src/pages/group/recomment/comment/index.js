/*
 * @Author: atdow
 * @Date: 2022-01-16 20:06:30
 * @LastEditors: null
 * @LastEditTime: 2022-01-18 23:50:43
 * @Description: file description
 */
import React, { Component } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, Modal } from 'react-native';
import SNav from '../../../../components/SNav'
import IconFont from '../../../../components/IconFont'
import SButton from '../../../../components/SButton'
import { pxToDp } from "../../../../utils/stylesKits"
import date from '../../../../utils/date'
import ImageViewer from 'react-native-image-zoom-viewer'
import { groupRecommendDynamicComment, recommendDynamicCommentStar } from '../../../../api/group'
import { Toast } from 'teaset';
class Index extends Component {
    state = {
        list: [],
        showAlbum: false,
        albumIndex: 0,
        albumList: []
    }
    params = {
        pageNo: 1,
        pageSize: 5
    }
    totalPages = 1
    componentDidMount() {
        this.getList()
    }
    getList = () => {
        groupRecommendDynamicComment({ id: this.props.route.params.tid, ...this.params }).then(res => {
            console.log("res:", res)
            if (res.code !== 200) {
                return
            }
            const { data = [], totalPages = 0 } = res
            this.setState({ list: data })
            this.totalPages = totalPages
        })
    }
    handleShowAlbum = (item, albumIndex) => {
        const albumList = item.images.map((albumItem) => ({ url: albumItem }))
        const showAlbum = true
        this.setState({ albumList, albumIndex, showAlbum })
    }
    star = (cid, index) => {
        recommendDynamicCommentStar({ id: cid }).then(res => {
            console.log("res:", res)
            if (res.code !== 200) {
                return
            }
            const { star_count = 0 } = res.data
            const { list } = this.state
            list[index].star_count = star_count
            this.setState({ list })
            Toast.smile("点赞成功", 2000, 'center')
        })
    }
    render() {
        // console.log("props:", this.props.route.params)
        const { list, showAlbum, albumList, albumIndex } = this.state
        let item = this.props.route.params
        return (
            <View style={{ flex: 1, backgroundColor: "white" }}>
                <SNav title="最新评论"></SNav>
                <View style={styles.container}>
                    <View style={{ flexDirection: "row", alignItems: "center" }}>
                        <Image
                            source={{ uri: item.header }}
                            style={styles.userHeader}
                        ></Image>
                        <View style={{ flex: 2, justifyContent: "space-around" }}>
                            <View style={{ flexDirection: "row", alignItems: "center" }}>
                                <Text style={{ color: "#555" }}>{item.nick_name}</Text>
                                <IconFont
                                    name={item.gender === "女" ? "icontanhuanv" : "icontanhuan"}
                                    style={{ color: item.gender === "女" ? "#b564bf" : "red", ...styles.genderIcon }}
                                ></IconFont>
                                <Text style={{ color: "#555" }}>{item.age}岁</Text>
                            </View>
                            <View style={{ flexDirection: "row" }}>
                                <Text style={styles.userInfoText}>{item.marry}</Text>
                                <Text style={styles.userInfoText}>|</Text>
                                <Text style={styles.userInfoText}>{item.education}</Text>
                                <Text style={styles.userInfoText}>|</Text>
                                <Text style={styles.userInfoText}>{item.agediff < 10 ? "年龄相仿" : "有点代沟"}</Text>
                            </View>
                        </View>
                    </View>
                    <View style={{ paddingTop: pxToDp(8) }}>
                        <Text style={{ color: "#666" }}>{item.content}</Text>
                    </View>
                    <View style={styles.galleryImageContainer}>
                        {item.images.map((albumItem, albumIndex) => <TouchableOpacity
                            key={albumIndex}
                            onPress={() => this.handleShowAlbum(item, albumIndex)}
                        >
                            <Image source={{ uri: albumItem }} style={styles.galleryImage}></Image>
                        </TouchableOpacity>)}
                    </View>
                    <View style={styles.dynamicExtrasInfoContainer}>
                        <Text style={styles.dynamicExtrasInfoText}>距离{item.dist} m</Text>
                        <Text style={{ ...styles.dynamicExtrasInfoText, marginLeft: pxToDp(8) }}>{date(item.create_time).fromNow()}</Text>
                    </View>
                    <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                        <View style={{ flexDirection: "row" }}>
                            <Text style={{ color: "#666" }}>最新评论</Text>
                            <View style={styles.commentCountContainer}>
                                <Text style={{ color: "white" }}>3</Text>
                            </View>
                        </View>
                        <View>
                            <SButton
                                textStyle={{ fontSize: pxToDp(10) }}
                                style={styles.publishCommentBtn}>发表评论</SButton>
                        </View>
                    </View>
                    <View>
                        {list.map((listItem, listIndex) => <View key={listIndex}>
                            <View style={{
                                flexDirection: "row", paddingTop: pxToDp(5), paddingBottom: pxToDp(10),
                                borderBottomColor: "#ccc", borderBottomWidth: pxToDp(1)
                            }}>
                                <Image source={{ uri: listItem.header }}
                                    style={{ width: pxToDp(40), height: pxToDp(40), borderRadius: pxToDp(40), marginRight: pxToDp(10) }}
                                ></Image>
                                <View style={{ flex: 1 }}>
                                    <View>
                                        <Text style={{ color: "#666" }}>{listItem.nick_name}</Text>
                                        <View style={{ flexDirection: 'row', alignItems: "center" }}>
                                            <Text style={{ color: "#666", fontSize: pxToDp(13) }}>{date(listItem.create_time).format("YYYY-MM-DD HH:mm:ss")}</Text>
                                            <TouchableOpacity
                                                onPress={this.star.bind(this, listItem.cid, listIndex)}
                                                style={{ flexDirection: "row", flex: 1, justifyContent: "flex-end", alignItems: "center" }}>
                                                <IconFont name="icondianzan-o" style={{ color: "#666", fontSize: pxToDp(13) }}></IconFont>
                                                <Text style={{ color: "#666" }}>{listItem.star_count}</Text>
                                            </TouchableOpacity>
                                        </View>

                                        <Text>{listItem.content}</Text>
                                    </View>

                                </View>
                            </View>
                        </View>)}
                    </View>
                </View>
                <Modal visible={showAlbum} transparent={true}>
                    <ImageViewer
                        onClick={() => this.setState({ showAlbum: false })}
                        imageUrls={albumList}
                        index={albumIndex}></ImageViewer>
                </Modal>
            </View>
        )
    }
}
const styles = StyleSheet.create({
    container: {
        padding: pxToDp(10)
    },
    userHeader: {
        width: pxToDp(40),
        height: pxToDp(40),
        borderRadius: pxToDp(20),
        marginRight: pxToDp(10)
    },
    genderIcon: {
        fontSize: pxToDp(18), marginLeft: pxToDp(5), marginRight: pxToDp(5)
    },
    userInfoText: {
        color: "#555",
        marginRight: pxToDp(5)
    },
    moreIcon: {
        color: "#666",
        fontSize: pxToDp(20)
    },
    galleryImageContainer: {
        flexDirection: "row",
        flexWrap: "wrap",
        paddingTop: pxToDp(5),
        paddingBottom: pxToDp(5)
    },
    galleryImage: {
        width: pxToDp(60),
        height: pxToDp(60),
        marginRight: pxToDp(5)
    },
    dynamicExtrasInfoContainer: {
        flexDirection: "row",
        alignItems: "center",
        paddingTop: pxToDp(5),
        paddingBottom: pxToDp(5)
    },
    dynamicExtrasInfoText: {
        color: "#666"
    },
    commentCountContainer: {
        backgroundColor: "red",
        height: pxToDp(20),
        width: pxToDp(20),
        borderRadius: pxToDp(10),
        marginLeft: pxToDp(5),
        alignItems: "center",
        justifyContent: "center"
    },
    publishCommentBtn: {
        width: pxToDp(80),
        height: pxToDp(20),
        borderRadius: pxToDp(10)
    }
})
export default Index