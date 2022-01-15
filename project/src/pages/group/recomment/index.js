/*
 * @Author: atdow
 * @Date: 2022-01-16 01:59:40
 * @LastEditors: null
 * @LastEditTime: 2022-01-16 03:22:10
 * @Description: file description
 */
import React, { Component } from 'react';
import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity } from 'react-native';
import { getGroupRecommend } from '../../../api/group'
import IconFont from '../../../components/IconFont'
import { pxToDp } from '../../../utils/stylesKits';
import date from '../../../utils/date'
class Index extends Component {
    params = {
        pageNo: 1,
        pageSize: 5
    }
    totalPages = 2
    isLoading = false
    state = {
        list: []
    }
    componentDidMount() {
        this.getList()
    }
    getList = () => {
        this.isLoading = true
        getGroupRecommend(this.params)
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
    handleShowAlbum = () => { }
    render() {
        const { list } = this.state
        return (
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
                                <TouchableOpacity>
                                    <IconFont name="icongengduo" style={styles.moreIcon}></IconFont>
                                </TouchableOpacity>
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
                            <View style={styles.dynamicOperateContainer}>
                                <TouchableOpacity style={styles.dynamicOperateItem}>
                                    <IconFont name="icondianzan-o" style={styles.dynamicOperateItemText}></IconFont>
                                    <Text style={styles.dynamicOperateItemText}>{item.start_count}</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={styles.dynamicOperateItem}>
                                    <IconFont name="iconpinglun" style={styles.dynamicOperateItemText}></IconFont>
                                    <Text style={styles.dynamicOperateItemText}>{item.comment_count}</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={styles.dynamicOperateItem}>
                                    <IconFont name="iconxihuan-o" style={styles.dynamicOperateItemText}></IconFont>
                                    <Text style={styles.dynamicOperateItemText}>{item.like_count}</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                    {this.params.pageNo >= this.totalPages && index === list.length - 1 ?
                        <View style={styles.noMoreDataContainer}>
                            <Text style={styles.noMoreDataText}>没有更多数据了</Text>
                        </View> : <></>}
                </>
                }
            >
            </FlatList>
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