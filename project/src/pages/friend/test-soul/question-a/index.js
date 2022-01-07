/*
 * @Author: atdow
 * @Date: 2022-01-06 21:37:06
 * @LastEditors: null
 * @LastEditTime: 2022-01-08 00:34:23
 * @Description: file description
 */
import React, { Component } from 'react';
import { View, Text, StyleSheet, ImageBackground, Image, TouchableOpacity } from 'react-native';
import { getTestSoulQuestionSection, submitTestSoulQuestion } from '../../../../api/friends'
import SNav from '../../../../components/SNav'
import { pxToDp } from '../../../../utils/stylesKits';
import LinearGradient from 'react-native-linear-gradient';
import { inject, observer } from 'mobx-react'
@inject("UserStore")
@observer
class Index extends Component {
    title = {
        "初级": require("../../../../res/leve1.png"),
        "中级": require("../../../../res/leve2.png"),
        "高级": require("../../../../res/leve3.png"),
    }
    answerList = []
    state = {
        questionList: [],
        currentIndex: 0
    }
    componentDidMount() {
        this.getList()
    }
    getList = () => {
        getTestSoulQuestionSection({ id: this.props.route.params.qid }).then(res => {
            // console.log("res:", res)
            if (res.code !== 200) {
                return
            }
            this.setState({ questionList: res.data })
        })
    }
    getFont = (number) => {
        let numUpperCase = ''
        switch (number) {
            case 1:
                numUpperCase = "一"
                break;
            case 2:
                numUpperCase = "二"
                break;
            case 3:
                numUpperCase = "三"
                break;
            case 4:
                numUpperCase = "四"
                break;
            default:
                numUpperCase = numUpperCase
                break
        }
        return numUpperCase
    }
    chooseAnswer = (answer) => {
        const { currentIndex, questionList } = this.state
        this.answerList.push(answer) //
        if (currentIndex >= questionList.length - 1) {
            submitTestSoulQuestion({
                id: this.props.route.params.qid,
                data: this.answerList
            }).then(res => {
                if (res.code !== 200) {
                    return
                }
            })
        } else {
            this.setState({ currentIndex: currentIndex + 1 })
        }
    }
    render() {
        const routeParams = this.props.route.params
        const userInfo = this.props.UserStore.user
        const { questionList, currentIndex } = this.state
        if (!questionList[currentIndex]) {
            return <></>
        }
        return (
            <View style={{ flex: 1, backgroundColor: "white" }}>
                <SNav title={routeParams.title}></SNav>
                <ImageBackground
                    source={require("../../../../res/qabg.png")}
                    style={{ width: "100%", height: "100%" }}
                >
                    <View style={{ marginTop: pxToDp(60), flexDirection: "row", justifyContent: "space-between" }}>
                        <ImageBackground
                            source={require("../../../../res/qatext.png")}
                            style={{ width: pxToDp(66), height: pxToDp(52), flexDirection: "row", justifyContent: "flex-end", alignItems: "center" }}
                        >
                            <Image
                                source={{ uri: userInfo.header }}
                                style={{ width: pxToDp(50), height: pxToDp(50), borderRadius: pxToDp(25) }}
                            ></Image>
                        </ImageBackground>
                        <ImageBackground
                            source={this.title[routeParams.type]}
                            style={{ width: pxToDp(66), height: pxToDp(52), justifyContent: "center", alignItems: "center" }}
                        ></ImageBackground>
                    </View>
                    <View style={{
                        position: "absolute", width: "80%", top: pxToDp(60),
                        alignItems: 'center', alignSelf: "center"
                    }}>
                        <View>
                            <Text style={{ color: "white", fontSize: pxToDp(26), fontWeight: "bold" }}>第{this.getFont(currentIndex + 1)}题</Text>
                            <Text style={{ color: "white", textAlign: "center" }}>({currentIndex + 1}/{questionList.length})</Text>
                        </View>
                        <Text
                            style={{ marginTop: pxToDp(30), fontSize: pxToDp(14), color: "white", fontWeight: "bold" }}>
                            {questionList[currentIndex].questionTitle}
                        </Text>
                        <View style={{ width: "100%", marginTop: pxToDp(10) }}>
                            {questionList[currentIndex].answers.map((item, index) => <TouchableOpacity key={index}
                                style={{ marginTop: pxToDp(10) }}
                                onPress={this.chooseAnswer.bind(this, item.answerNo)}
                            >
                                <LinearGradient
                                    style={{ height: pxToDp(40), borderRadius: pxToDp(6), flexDirection: "row", alignItems: "center", justifyContent: "center" }}
                                    colors={["#6f45f3", "#6f45f31a"]}
                                    start={{ x: 0, y: 0 }}
                                    end={{ x: 1, y: 0 }}
                                >
                                    <Text style={{ color: "white" }}>{item.answerTitle}</Text>
                                </LinearGradient>
                            </TouchableOpacity>)}

                        </View>
                    </View>
                </ImageBackground >
            </View >
        )
    }
}
const styles = StyleSheet.create({
})
export default Index