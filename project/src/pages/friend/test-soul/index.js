/*
 * @Author: atdow
 * @Date: 2022-01-06 21:09:37
 * @LastEditors: null
 * @LastEditTime: 2022-01-06 21:42:51
 * @Description: file description
 */
import React, { Component } from 'react';
import { View, Text, StyleSheet, ImageBackground, Image } from 'react-native';
import SNav from '../../../components/SNav'
import { getTestSoulQuestions } from '../../../api/friends'
import Swiper from 'react-native-deck-swiper';
import SButton from '../../../components/SButton'
import { pxToDp } from '../../../utils/stylesKits';
class Index extends Component {
    state = {
        list: [],
        currentIndex: 0
    }
    componentDidMount() {
        this.getList()
    }
    getList = () => {
        getTestSoulQuestions().then(res => {
            // console.log("res:", res.data)
            if (res.code !== 200) {
                return
            }
            this.setState({ list: res.data })
        })
    }
    goQuestionPage = () => {
        const { list, currentIndex } = this.state
        this.props.navigation.navigate("QuestionA", list[currentIndex])
    }
    render() {
        const { list } = this.state
        return (
            <View style={{ flex: 1, backgroundColor: "white" }}>
                <SNav title="测灵魂"></SNav>
                <ImageBackground
                    source={require("../../../res/testsoul_bg.png")}
                    style={{ width: "100%", height: "60%" }}
                    imageStyle={{ height: "100%" }}
                >
                    {list.length > 0 ? <Swiper
                        cards={list}
                        renderCard={(card) => {
                            return (
                                <View style={styles.card}>
                                    <Image
                                        source={{ uri: card.img }}
                                        style={{ width: "100%", height: "100%" }}
                                    ></Image>
                                </View>
                            )
                        }}
                        onSwiped={(cardIndex) => this.setState({ currentIndex: this.state.currentIndex + 1 })}
                        onSwipedAll={() => { console.log('onSwipedAll') }}
                        cardIndex={0}
                        cardVerticalMargin={0}
                        backgroundColor={'transparent'}
                        stackSize={3}>
                    </Swiper> : <></>}
                </ImageBackground>
                <SButton
                    style={{
                        position: "absolute", width: "40%", height: pxToDp(40),
                        bottom: pxToDp(20), alignSelf: "center"
                    }}
                    onPress={this.goQuestionPage}
                >开始测试</SButton>
            </View>
        )
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#F5FCFF"
    },
    card: {
        height: "80%",
        borderRadius: 4,
        borderWidth: 2,
        borderColor: "#E8E8E8",
        justifyContent: "center",
        backgroundColor: "white"
    },
    text: {
        textAlign: "center",
        fontSize: 50,
        backgroundColor: "transparent"
    }
});
export default Index