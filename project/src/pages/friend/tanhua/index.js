/*
 * @Author: atdow
 * @Date: 2022-01-03 02:00:19
 * @LastEditors: null
 * @LastEditTime: 2022-01-03 04:26:46
 * @Description: file description
 */

import React, { Component } from 'react';
import { View, Text, StyleSheet, ImageBackground, Button, Image, TouchableOpacity } from 'react-native';
import SNav from '@src/components/SNav'
import Swiper from 'react-native-deck-swiper'
import { getFriendsCards, setFriendsLike } from '@src/api/friends'
import IconFont from "@src/components/IconFont"
import { pxToDp } from '@src/utils/stylesKits'
import { Toast } from 'teaset'
class Index extends Component {
    constructor() {
        super()
        this.swiperRef = React.createRef()
    }
    state = {
        cards: [],
        currentIndex: 0,
    }
    totalPages = 5
    params = {
        pageNo: 1,
        pageSize: 3
    }
    componentDidMount() {
        this.getFriendsCards()
    }
    getFriendsCards() {
        getFriendsCards(this.params).then(res => {
            if (res.code !== 200) {
                return
            }
            this.setState({ cards: [...this.state.cards, ...res.data] })
            this.totalPages = res.totalPages
        })
    }
    setLick = (type) => {
        this.sendLike(type)
        if (type === "dislike") {
            this.swiperRef.swipeLeft();
        } else {
            this.swiperRef.swipeRight();
        }
    }
    onSwipedLeft = () => {
        this.sendLike('dislike')
    }
    onSwipedRight = () => {
        this.sendLike('like')
    }
    onSwipedAll = () => {
        if (this.params.page >= this.totalPages) {
            Toast.message("没有更多数据", 1000, "center")
            return
        } else {
            this.params.pageNo++
            this.getFriendsCards()
        }
    }
    sendLike = (type) => {
        const id = this.state.cards[this.state.currentIndex].id
        setFriendsLike({ id, type }).then(res => {
            if (res.code !== 200) {
                return
            }
            Toast.message(res.data, 1000, "center")
        })
    }
    render() {
        const { cards, currentIndex } = this.state
        return (
            <View style={{ flex: 1, backgroundColor: "white" }}>
                <SNav title="探花"></SNav>
                <ImageBackground
                    style={{
                        height: "60%"
                    }}
                    imageStyle={{ height: "100%" }}
                    source={require("@src/res/testsoul_bg.png")}
                >
                    {cards[currentIndex] ? <View style={styles.container}>
                        <Swiper
                            key={Date.now()}
                            ref={ref => this.swiperRef = ref}
                            cards={cards}
                            renderCard={(card) => {
                                return (
                                    <View style={styles.card}>
                                        <Image source={{ uri: card.header }}
                                            style={{ width: "100%", height: "80%" }}
                                        ></Image>
                                        <View style={{ flex: 1, flexDirection: "row" }}>
                                            <View style={{ flex: 1, justifyContent: "space-around", alignItems: "center" }}>
                                                <View style={{ flexDirection: "row", alignItems: "center" }}>
                                                    <Text style={{ color: "#555" }}>{card.nick_name}</Text>
                                                    <IconFont
                                                        name={card.gender === "女" ? "icontanhuanv" : "icontanhuan"}
                                                        style={{ color: card.gender === "女" ? "#b564bf" : "red", fontSize: pxToDp(18) }}
                                                    ></IconFont>
                                                    <Text style={{ color: "#555" }}>{card.age}岁</Text>
                                                </View>
                                                <View style={{ flexDirection: "row" }}>
                                                    <Text style={{ color: "#555" }}>{card.marry}</Text>
                                                    <Text style={{ color: "#555" }}>|</Text>
                                                    <Text style={{ color: "#555" }}>{card.education}</Text>
                                                    <Text style={{ color: "#555" }}>|</Text>
                                                    <Text style={{ color: "#555" }}>{card.agediff < 10 ? "年龄相仿" : "有点代沟"}</Text>
                                                </View>
                                            </View>
                                        </View>
                                    </View>
                                )
                            }}
                            onSwiped={() => { this.setState({ currentIndex: this.state.currentIndex + 1 }) }}
                            onSwipedAll={this.onSwipedAll}
                            onSwipedLeft={this.onSwipedLeft}
                            onSwipedRight={this.onSwipedRight}
                            cardIndex={currentIndex}
                            backgroundColor={'transparent'}
                            cardVerticalMargin={0}
                            stackSize={3}>
                        </Swiper>
                    </View> : <></>}

                </ImageBackground>
                <View style={styles.likeButtonContainer}>
                    <TouchableOpacity
                        onPress={this.setLick.bind(this, "dislike")}
                        style={{ ...styles.likeButton, backgroundColor: "#ebc869", }}
                    >
                        <IconFont name="iconbuxihuan" style={styles.likeButtonIcon}></IconFont>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={this.setLick.bind(this, "like")}
                        style={{ ...styles.likeButton, backgroundColor: "#fd5213" }}
                    >
                        <IconFont name="iconbuxihuan" style={styles.likeButtonIcon}></IconFont>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }
}
const styles = StyleSheet.create({
    likeButtonContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        width: "60%",
        alignItems: "center",
        marginTop: pxToDp(40),
        alignSelf: "center"
    },
    likeButton: {
        width: pxToDp(60),
        height: pxToDp(60),
        borderRadius: pxToDp(30),
        alignItems: "center",
        justifyContent: "center"
    },
    likeButtonIcon: {
        fontSize: pxToDp(30), color: "white"
    },
    container: {
        flex: 1,
    },
    card: {
        height: "60%",
        borderRadius: 4,
        borderWidth: 2,
        borderColor: "#E8E8E8",
        backgroundColor: "white"
    }
})
export default Index
