/*
 * @Author: atdow
 * @Date: 2021-12-25 03:41:44
 * @LastEditors: null
 * @LastEditTime: 2022-01-09 23:36:07
 * @Description: file description
 */
import React, { Component } from "react";
import { SafeAreaView, View, Text, Image, StatusBar, StyleSheet, AsyncStorage } from 'react-native';
import { pxToDp } from '../../../utils/stylesKits'
import { Input } from "react-native-elements"
import validator from "../../../utils/validator";
import request from "../../../utils/request";
import { ACCOUNT_LOGIN, ACCOUNT_VALIDATEVCODE } from '../../../utils/pathMap'
import { getVerification, login } from '../../../api/account'
import SButton from '../../../components/SButton'
import {
    CodeField,
    Cursor,
} from 'react-native-confirmation-code-field';
import Toast from "../../../utils/Toast";

import { inject, observer } from 'mobx-react'

@inject("RootStore")
@observer
class Login extends Component {
    state = {
        phoneNumber: '14716168488',
        phoneValid: true,
        showLogin: true,
        vcodeTxt: "",
        btnText: "重新获取",
        isCountDowning: false
    }
    constructor() {
        super();
    }

    phoneNumberChangeText = (phoneNumber) => {
        this.setState({ phoneNumber })
    }
    getVcode = () => {
        const { phoneNumber } = this.state
        const phoneValid = validator.validatePhone(phoneNumber)
        this.setState({ phoneValid })
        if (!phoneValid) {
            return
        }
        getVerification({ phone: phoneNumber }).then(res => {
            // console.log("Res;", res)
            if (res.code !== 200) {
                return
            }
            this.setState({ showLogin: false })
            this.countDown()
            // console.log("Res;", res)
        }).catch((err) => {
            // console.log("err;", err)
        })

    }
    countDown = () => {
        if (this.state.isCountDowning) {
            return
        }
        this.setState({ isCountDowning: true })
        let seconds = 5
        this.setState({ btnText: `重新获取${seconds}s` })
        let timerId = setInterval(() => {
            seconds--;
            this.setState({ btnText: `重新获取${seconds}s` })
            if (seconds === 0) {
                clearInterval(timerId)
                this.setState({ btnText: `重新获取`, isCountDowning: false })
            }
        }, 1000);
    }
    renderLogin = () => {
        const { phoneNumber, phoneValid, showLogin } = this.state
        return (
            <View>
                <View>
                    <View>
                        <Text style={{ fontSize: pxToDp(25), color: "#888", fontWeight: "bold" }}>手机号码登录注册</Text>
                    </View>
                </View>
                <View style={{ marginTop: pxToDp(30) }}>
                    <Input
                        placeholder="请输入手机号码"
                        maxLength={11}
                        keyboardType="phone-pad"
                        value={phoneNumber}
                        inputStyle={{ color: "#333" }}
                        onChangeText={this.phoneNumberChangeText}
                        errorMessage={phoneValid ? "" : "手机号码格式不正确"}
                        onSubmitEditing={this.getVcode}
                    // leftIcon={{ name: "phone", color: "#333", size: pxToDp(20) }}
                    ></Input>
                </View>
                <View>
                    <View >
                        <SButton onPress={this.getVcode}
                            style={{ width: "75%", height: pxToDp(40), alignSelf: "center", borderRadius: pxToDp(20) }}>获取验证码</SButton>
                    </View>
                </View>
            </View>
        )
    }
    onVcodeChangeTxt = (vcodeTxt) => {
        this.setState({ vcodeTxt })
    }
    repGetVcode = () => {
        this.countDown()
    }
    login = () => {
        const { vcodeTxt, phoneNumber } = this.state
        if (vcodeTxt.length !== 6) {
            Toast.message("验证码不正确", 2000, "cneter")
            return
        }
        login({
            phone: phoneNumber,
            vcode: vcodeTxt
        }).then(res => {
            if (res.code !== 200) {
                Toast.message(res.data.msg, 2000, "cneter")
                return
            }
            const { data } = res
            this.props.RootStore.setUserInfo(phoneNumber, data.token, data.id)
            AsyncStorage.setItem("userInfo", JSON.stringify({
                mobile: phoneNumber,
                token: data.token,
                userId: data.id
            }))
            if (data.isNew) {
                this.props.navigation.navigate("UserInfo")
            } else {
                this.props.navigation.navigate("Tabbar")
            }
        })

    }
    renderVcode = () => {
        const { phoneNumber, phoneValid, showLogin, vcodeTxt, btnText, isCountDowning } = this.state
        return (
            <View>
                <View>
                    <Text style={{ fontSize: pxToDp(25), color: "#888", fontWeight: "bold" }}>输入6位验证码</Text>
                </View>
                <View style={{ marginTop: pxToDp(15) }}>
                    <Text style={{ color: "#888" }}>已发送到: +86 {phoneNumber}</Text>
                </View>
                <CodeField
                    value={vcodeTxt}
                    onChangeText={this.onVcodeChangeTxt}
                    onSubmitEditing={this.login}
                    cellCount={6}
                    rootStyle={styles.codeFieldRoot}
                    keyboardType="number-pad"
                    textContentType="oneTimeCode"
                    renderCell={({ index, symbol, isFocused }) => (
                        <Text
                            key={index}
                            style={[styles.cell, isFocused && styles.focusCell]}
                        >
                            {symbol || (isFocused ? <Cursor /> : null)}
                        </Text>
                    )}
                />
                <View style={{ marginTop: pxToDp(15) }}>
                    <SButton
                        disabled={isCountDowning}
                        onPress={this.repGetVcode}
                        style={{ width: "75%", height: pxToDp(40), alignSelf: "center", borderRadius: pxToDp(20) }}>{btnText}</SButton>
                </View>
            </View>
        )
    }
    render() {
        const { phoneNumber, phoneValid, showLogin } = this.state
        return (
            <View>
                <StatusBar backgroundColor="transparent" translucent={true}></StatusBar>
                <Image style={{ width: "100%", height: pxToDp(200) }}
                    source={require("../../../res/profileBackground.jpg")}>
                </Image>
                <View style={{ padding: pxToDp(20) }}>
                    {showLogin ? this.renderLogin() : this.renderVcode()}
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    root: { flex: 1, padding: 20 },
    title: { textAlign: 'center', fontSize: 30 },
    codeFieldRoot: { marginTop: 20 },
    cell: {
        width: 40,
        height: 40,
        lineHeight: 38,
        fontSize: 24,
        borderBottomWidth: 2,
        borderColor: '#00000030',
        textAlign: 'center',
        color: '#7d53ea',
    },
    focusCell: {
        borderColor: '#7d53ea',
    },
});

export default Login
