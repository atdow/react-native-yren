/*
 * @Author: atdow
 * @Date: 2022-01-19 21:25:11
 * @LastEditors: null
 * @LastEditTime: 2022-01-19 22:03:45
 * @Description: file description
 */
import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput } from 'react-native';
import SNav from '../../../../components/SNav'
import IconFont from '../../../../components/IconFont'
import { pxToDp } from '../../../../utils/stylesKits';
import Geo from '../../../../utils/Geo'
import Toast from '../../../../utils/Toast'
class Index extends Component {
    constructor() {
        super();
        this.inputRef = React.createRef()
        this.state = {
            textContent: "",
            longitute: "",
            latitude: "",
            location: "",
            imageCotent: []
        }
    }
    setInputFocus = () => {
        if (!this.inputRef.isFocused()) {
            this.inputRef.focus()
        }
    }
    onChangeText = (text) => {
        this.setState({ textContent: text })
    }
    getCurrentPosition = () => {
        Toast.showLoading("定位中...")
        Geo.getCityByLocation()
            .then(res => {
                // console.log("res:", res)
                const { province, city, district, township, streetNumber } = res.regeocode.addressComponent
                this.setState({
                    location: province + city + district + township,
                    longitute: streetNumber.location.split(",")[0],
                    latitude: streetNumber.location.split(",")[1]
                })
            })
            .catch((err) => { })
            .finally(() => {
                Toast.hideLoading()
            })
    }
    render() {
        const { textContent, location } = this.state
        return (
            <View style={{ flex: 1, backgroundColor: "white" }}>
                <SNav
                    title="发动态"
                    rightText="发帖"
                    onRightTextPress={() => console.log("1111")}
                ></SNav>
                <TouchableOpacity
                    onPress={this.setInputFocus}
                    style={{ height: "40%" }}
                >
                    <TextInput
                        ref={ref => this.inputRef = ref}
                        placeholder='请填写动态（140字以内）'
                        multiline
                        value={textContent}
                        onChangeText={this.onChangeText}
                    ></TextInput>
                </TouchableOpacity>
                <View style={{ alignItems: "flex-end", height: pxToDp(40), justifyContent: "center" }}>
                    <TouchableOpacity
                        onPress={this.getCurrentPosition}
                        style={{ flexDirection: "row", alignItems: "center" }}>
                        <IconFont name="iconlocation" style={{ color: "#666", fontSize: pxToDp(16) }}></IconFont>
                        <Text style={{ fontSize: pxToDp(12), color: "#aaa", marginLeft: pxToDp(5), marginRight: pxToDp(5) }}>{location || '你在哪里？'}</Text>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }
}
const styles = StyleSheet.create({
})
export default Index