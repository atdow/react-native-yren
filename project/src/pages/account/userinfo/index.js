/*
 * @Author: atdow
 * @Date: 2021-12-26 18:05:09
 * @LastEditors: null
 * @LastEditTime: 2022-01-01 01:25:32
 * @Description: file description
 */
import React, { Component } from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import { pxToDp } from '../../../utils/stylesKits';
import SvgUri from 'react-native-svg-uri'
import { male, female } from '../../../res/fonts/iconSvg'
import { Input } from 'react-native-elements'
import DataPicker from 'react-native-datepicker'
import Geo from '../../../utils/Geo';
import Picker from 'react-native-picker';
import CityJson from '../../../res/citys.json'
import SButton from '../../../components/SButton'
import Toast from '../../../utils/Toast';
import ImagePicker from 'react-native-image-crop-picker'
import { Overlay } from 'teaset'
import { inject, observer } from 'mobx-react'
import request from '../../../utils/request';
import { ACCOUNT_CHECKHEADIMAGE } from '../../../utils/pathMap';
import { uploadImg, registerUserInfo } from '../../../api/user'
import JMessage from '../../../utils/JMessage';

@inject("RootStore")
@observer
class Index extends Component {
    state = {
        nickName: "",
        gender: "男",
        birthday: "",
        city: "",
        header: "",
        lng: "",
        lat: "",
        address: ""
    }
    async componentDidMount() {
        // console.log("this.props.RootStore:", this.props.RootStore)
        const res = await Geo.getCityByLocation();
        try {
            const address = res.regeocode.formatted_address
            const city = res.regeocode.addressComponent.city.replace("市", "")
            const lng = res.regeocode.addressComponent.streetNumber.location.split(",")[0]
            const lat = res.regeocode.addressComponent.streetNumber.location.split(",")[1]
            this.setState({ address, city, lng, lat })
        } catch (error) { }
        JMessage.init()
    }
    chooseGender = (gender) => {
        this.setState({ gender })
    }
    showCityPicker = () => {
        Picker.init({
            pickerData: CityJson,
            selectedValue: ["北京", "北京"],
            wheelFlex: [1, 1, 0], // 显示省市
            pickerConfirmBtnText: "确定",
            pickerCancelBtnText: "取消",
            pickerTitleText: "选择城市",
            onPickerConfirm: data => {
                // data = [广东，广州，天河]
                this.setState({
                    city: data[1]
                })
            }
        })
        Picker.show()
    }
    chooseHeadImg = async () => {
        const { nickName, birthday, city } = this.state
        if (!nickName || !birthday || !city) {
            Toast.sad("请完善信息", 2000, "center")
            return
        }
        const image = await ImagePicker.openPicker({
            width: 300,
            height: 400,
            cropping: true
        })
        let overlayViewRef = null
        let overlayView = (
            <Overlay.View
                style={{ flex: 1, backgroundColor: "#000" }}
                modal={true}
                overlayOpacity={0}
                ref={v => overlayViewRef = v}
            >
                <View
                    style={{
                        marginTop: pxToDp(30),
                        alignSelf: "center",
                        width: pxToDp(334),
                        height: pxToDp(334),
                        position: "relative",
                        justifyContent: "center",
                        alignItems: "center"
                    }}
                >
                    <Image
                        source={require("../../../res/scan.gif")}
                        style={{
                            width: "100%", height: "100%", position: "absolute", left: 0, top: 0, zIndex: 100
                        }}
                    ></Image>
                    <Image source={{ uri: image.path }} style={{ width: "60%", height: "60%" }}></Image>
                </View>
            </Overlay.View>
        )
        Overlay.show(overlayView)

        const res0 = await this.uploadHeaderImg(image)
        if (res0.code !== 200) {
            overlayViewRef.close()
            return
        }

        let params = { ...this.state }
        params.header = res0.data.uri
        const res1 = await registerUserInfo(params)
        if (res1.code !== 200) {
            overlayViewRef.close()
            return
        }

        await this.jgBusiness(this.props.RootStore.userId, this.props.RootStore.mobile).then(res2 => {
            Toast.smile("恭喜 操作成功", 2000, "center")
            setTimeout(() => {
                alert("跳转页面 交友页面")
            }, 2000);
        }).catch(err => {

        }).finally(() => {
            overlayViewRef.close()
        })
    }
    jgBusiness = (username, password) => {
        return JMessage.register(username, password)
    }

    uploadHeaderImg = (image) => {
        let formData = new FormData();
        formData.append("headPhoto", {
            uri: image.path,
            type: image.mime,
            name: image.path.split("/").pop()
        })
        return uploadImg(formData)
    }

    render() {
        const { gender, nickName, birthday, city } = this.state
        const dataNow = new Date();
        const cureentData = `${dataNow.getFullYear()}-${dataNow.getMonth() + 1}-${dataNow.getDate()}`
        return (
            <View style={{ backgroundColor: "#fff", flex: 1, padding: pxToDp(20) }}>
                <Text style={{ fontSize: pxToDp(20), color: "#666", fontWeight: "bold" }}>填写资料</Text>
                <Text style={{ fontSize: pxToDp(20), color: "#666", fontWeight: "bold" }}>提升我的魅力</Text>
                <View style={{ marginTop: pxToDp(20) }}>
                    <View style={{ justifyContent: "space-around", width: "60%", flexDirection: "row", alignSelf: "center" }}>
                        <TouchableOpacity onPress={this.chooseGender.bind(this, "男")} style={{
                            width: pxToDp(60), height: pxToDp(60), borderRadius: pxToDp(30),
                            backgroundColor: gender === '男' ? "red" : "#eee", justifyContent: "center", alignItems: "center"
                        }}>
                            <SvgUri svgXmlData={male} width={30} height={30}></SvgUri>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={this.chooseGender.bind(this, "女")} style={{
                            width: pxToDp(60), height: pxToDp(60), borderRadius: pxToDp(30),
                            backgroundColor: gender === '女' ? "red" : "#eee", justifyContent: "center", alignItems: "center"
                        }}>
                            <SvgUri svgXmlData={female} width={30} height={30}></SvgUri>
                        </TouchableOpacity>
                    </View>
                </View>
                <Input
                    value={nickName}
                    placeholder="设置昵称"
                    onChangeText={(nickName) => { this.setState({ nickName }) }}
                ></Input>
                <DataPicker
                    androidMode="spinner"
                    style={{ width: "100%" }}
                    date={birthday}
                    mode="date"
                    placeholder="设置生日"
                    format="YYYY-MM-DD"
                    minDate="1900-06-01"
                    maxDate={cureentData}
                    confirmBtnText="确定"
                    cancelBtnText="取消"
                    customStyles={{
                        dateIcon: {
                            display: "none"
                        },
                        dateInput: {
                            marginLeft: pxToDp(10),
                            borderWidth: 0,
                            borderBottomWidth: pxToDp(1.1),
                            alignItems: "flex-start",
                            paddingLeft: pxToDp(4)
                        },
                        placeholderText: {
                            fontSize: pxToDp(18),
                            color: "#afafaf"
                        }
                    }}
                    onDateChange={(birthday) => { this.setState({ birthday }) }}
                ></DataPicker>
                <View style={{ marginTop: pxToDp(20) }}>
                    <TouchableOpacity onPress={this.showCityPicker}>
                        <Input
                            value={"当前定位:" + city}
                            inputStyle={{ color: "#666" }}
                            disabled={true}
                        ></Input>
                    </TouchableOpacity>
                </View>
                <SButton
                    onPress={this.chooseHeadImg}
                    style={{
                        height: pxToDp(40),
                        borderRadius: pxToDp(20),
                        alignSelf: "center"
                    }}
                >设置头像</SButton>
            </View>
        )
    }
}
export default Index