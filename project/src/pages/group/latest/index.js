/*
 * @Author: atdow
 * @Date: 2022-01-16 01:59:40
 * @LastEditors: null
 * @LastEditTime: 2022-01-30 22:45:58
 * @Description: file description
 */
import React, { Component } from 'react';
import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity, Modal } from 'react-native';
import { getGroupLatest, groupRecommendStar, groupRecommendLike, groupRecommendNoInterest } from '../../../api/group'
import IconFont from '../../../components/IconFont'
import { pxToDp } from '../../../utils/stylesKits';
import date from '../../../utils/date'
import { inject, observer } from 'mobx-react'
import { Toast, ActionSheet } from 'teaset'
import JMessage from '../../../utils/JMessage';
import ImageViewer from 'react-native-image-zoom-viewer'
import { NavigationContext } from '@react-navigation/native'
import Validator from '../../../utils/validator'
import { EMOTIONS_DATA } from '../../../components/Emotion/datasource'
@inject("UserStore")
@observer
class Index extends Component {
    static contextType = NavigationContext
    params = {
        pageNo: 1,
        pageSize: 5
    }
    totalPages = 2
    isLoading = false
    state = {
        list: [],
        showAlbum: false,
        albumIndex: 0,
        albumList: []
    }
    componentDidMount() {
        this.getList()
    }
    getList = () => {
        this.isLoading = true
        getGroupLatest(this.params)
            .then(res => {
                if (res.code !== 200) {
                    return
                }
                // console.log("res:", res)
                const { data = [], totalPages = 1 } = res
                this.setState({ list: [...this.state.list, ...data] })
                this.totalPages = totalPages
            })
            .catch(err => { })
            .finally(() => {
                this.isLoading = false
            })
    }
    reachBottom = () => {
        if (this.params.pageNo >= this.totalPages || this.isLoading) {
            return
        }
        this.params.pageNo++
        this.getList()
    }
    handleShowAlbum = (item, albumIndex) => {
        const albumList = item.images.map((albumItem) => ({ url: albumItem }))
        const showAlbum = true
        this.setState({ albumList, albumIndex, showAlbum })
    }
    handleStar = (item, index) => {
        groupRecommendStar({ id: item.tid }).then(res => {
            if (res.code !== 200) {
                return
            }
            const { start_count = 0, isCancelStar = false } = res.data || {}
            if (isCancelStar) {
                Toast.smile("????????????", 2000, "center")
            } else {
                Toast.smile("????????????", 2000, "center")
                const text = `${this.props.UserStore.user.nick_name} ?????????????????????`
                const extras = { user: JSON.stringify(this.props.UserStore.user) }
                JMessage.sendTextMessage(item.username, text, extras)
            }
            let { list } = this.state
            list[index].start_count = start_count
            this.setState({ list })
        })
    }
    noInterest = (item, index) => {
        groupRecommendNoInterest({ id: item.tid }).then(res => {
            if (res.code !== 200) {
                return
            }
            let { list } = this.state
            list.splice(index, 1)
            this.setState({ list })
        })
    }
    goComment = (item) => {
        this.context.navigate("GroupRecommentComment", item)
    }
    renderRichText = (text) => {
        const list = Validator.renderRichText(text)
        let content = list.map((listItem, listIndex) => {
            if (listItem.text) {
                return <Text key={listIndex}>{listItem.text}</Text>
            } else if (listItem.image) {
                return <Image source={EMOTIONS_DATA[listItem.image]}
                    key={listIndex}
                    style={{ width: pxToDp(20), height: pxToDp(20) }}
                ></Image>
            } else {
                return <></>
            }
        })
        // console.log("content:", content)
        return content
    }
    render() {
        const { list, showAlbum, albumList, albumIndex } = this.state
        return (
            <>
                <FlatList
                    data={list}
                    onEndReachedThreshold={0.1}
                    onEndReached={this.reachBottom}
                    keyExtractor={listItem => listItem.tid + ""}
                    renderItem={({ item, index }) => <>
                        <View key={index} style={styles.dynamicContainer}>
                            <View style={styles.listItemContainer}>
                                <View style={{ flexDirection: "row", alignItems: "center" }}>
                                    <Image
                                        source={{ uri: item.header }}
                                        style={styles.userHeader}
                                    ></Image>
                                    <View style={{ flex: 2, justifyContent: "space-around" }}>
                                        <View style={{ flexDirection: "row", alignItems: "center" }}>
                                            <Text style={{ color: "#555" }}>{item.nick_name}</Text>
                                            <IconFont
                                                name={item.gender === "???" ? "icontanhuanv" : "icontanhuan"}
                                                style={{ color: item.gender === "???" ? "#b564bf" : "red", ...styles.genderIcon }}
                                            ></IconFont>
                                            <Text style={{ color: "#555" }}>{item.age}???</Text>
                                        </View>
                                        <View style={{ flexDirection: "row" }}>
                                            <Text style={styles.userInfoText}>{item.marry}</Text>
                                            <Text style={styles.userInfoText}>|</Text>
                                            <Text style={styles.userInfoText}>{item.education}</Text>
                                            <Text style={styles.userInfoText}>|</Text>
                                            <Text style={styles.userInfoText}>{item.agediff < 10 ? "????????????" : "????????????"}</Text>
                                        </View>
                                    </View>
                                </View>
                                <View style={{ paddingTop: pxToDp(8), flexDirection: "row", flexWrap: "wrap", alignItems: "center", }}>
                                    {this.renderRichText(item.content)}
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
                                    <Text style={styles.dynamicExtrasInfoText}>??????{item.dist} m</Text>
                                    <Text style={{ ...styles.dynamicExtrasInfoText, marginLeft: pxToDp(8) }}>{date(item.create_time).fromNow()}</Text>
                                </View>
                                <View style={styles.dynamicOperateContainer}>
                                    <TouchableOpacity onPress={this.handleStar.bind(this, item, index)} style={styles.dynamicOperateItem}>
                                        <IconFont name="icondianzan-o" style={styles.dynamicOperateItemText}></IconFont>
                                        <Text style={styles.dynamicOperateItemText}>{item.start_count}</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity onPress={this.goComment.bind(this, item)} style={styles.dynamicOperateItem}>
                                        <IconFont name="iconpinglun" style={styles.dynamicOperateItemText}></IconFont>
                                        <Text style={styles.dynamicOperateItemText}>{item.comment_count}</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity ></TouchableOpacity>
                                </View>
                            </View>
                        </View>
                        {this.params.pageNo >= this.totalPages && index === list.length - 1 ?
                            <View style={styles.noMoreDataContainer}>
                                <Text style={styles.noMoreDataText}>?????????????????????</Text>
                            </View> : <></>}
                    </>
                    }
                >
                </FlatList>
                <Modal visible={showAlbum} transparent={true}>
                    <ImageViewer
                        onClick={() => this.setState({ showAlbum: false })}
                        imageUrls={albumList}
                        index={albumIndex}></ImageViewer>
                </Modal>
            </>
        )
    }
}
const styles = StyleSheet.create({
    dynamicContainer: {
        padding: pxToDp(10)
    },
    listItemContainer: {
        borderBottomWidth: pxToDp(1),
        borderColor: "#eee",
        paddingBottom: pxToDp(10)
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
    dynamicOperateContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center"
    },
    dynamicOperateItem: {
        flexDirection: "row",
        alignItems: "center"
    },
    dynamicOperateItemText: {
        color: "#666"
    },
    noMoreDataContainer: {
        height: pxToDp(40),
        alignItems: "center",
        justifyContent: "center"
    },
    noMoreDataText: {
        color: "#666",
        fontSize: pxToDp(12)
    }

})
export default Index