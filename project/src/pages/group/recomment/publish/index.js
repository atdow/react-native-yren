/*
 * @Author: atdow
 * @Date: 2022-01-19 21:25:11
 * @LastEditors: null
 * @LastEditTime: 2022-01-24 23:32:03
 * @Description: file description
 */
import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, ScrollView, Image } from 'react-native';
import SNav from '../../../../components/SNav'
import IconFont from '../../../../components/IconFont'
import { pxToDp } from '../../../../utils/stylesKits';
import Geo from '../../../../utils/Geo'
import Toast from '../../../../utils/Toast'
import ImagePicker from 'react-native-image-picker';
import { ActionSheet } from 'teaset'
class Index extends Component {
    constructor() {
        super();
        this.inputRef = React.createRef()
        this.state = {
            textContent: "",
            longitute: "",
            latitude: "",
            location: "",
            imageCotent: [],
            tmpImgList: []
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
    chooseImage = () => {
        const options = {
            title: '选择图片',
            cancelButtonTitle: "取消",
            takePhotoButtonTitle: "拍照",
            chooseFromLibraryButtonTitle: "相册",
            storageOptions: {
                skipBackup: true,
                path: 'images',
            },
        };
        ImagePicker.showImagePicker(options, (response) => {
            // console.log('Response = ', response);

            if (response.didCancel) {
                console.log('User cancelled image picker');
            } else if (response.error) {
                console.log('ImagePicker Error: ', response.error);
            } else if (response.customButton) {
                console.log('User tapped custom button: ', response.customButton);
            } else {
                const { tmpImgList } = this.state
                if (tmpImgList.length >= 9) {
                    Toast.message("图片的数量不能大于9")
                }
                tmpImgList.push(response)
                this.setState({ tmpImgList })
                // const source = { uri: response.uri };

                // this.setState({
                //     avatarSource: source,
                // });
            }
        });
    }
    removeImage = (index) => {
        const imgDelete = () => {
            console.log("触发")
            let { tmpImgList } = this.state
            tmpImgList.splice(index, 1)
            this.setState({ tmpImgList })
        }
        const opts = [
            { title: "删除", onPress: imgDelete }
        ]
        ActionSheet.show(opts, { title: "取消" })
    }
    render() {
        const { textContent, location, tmpImgList } = this.state
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
                <View style={{ paddingTop: pxToDp(5), paddingBottom: pxToDp(5) }}>
                    <ScrollView horizontal>
                        {tmpImgList.map((tmpImgListItem, tmpImgListIndex) => <TouchableOpacity
                            key={tmpImgListIndex}
                            onLongPress={this.removeImage.bind(this, tmpImgListIndex)}
                            style={{ marginLeft: pxToDp(5), marginRight: pxToDp(5), }}
                        >
                            <Image
                                source={{ uri: tmpImgListItem.uri }}
                                style={{ width: pxToDp(50), height: pxToDp(50) }}
                            >
                            </Image>
                        </TouchableOpacity>)}
                    </ScrollView>
                </View>
                <View style={{ height: pxToDp(50), flexDirection: "row", alignItems: "center", backgroundColor: "#eee" }}>
                    <TouchableOpacity
                        onLongPress={this.chooseImage}
                        style={{ marginLeft: pxToDp(20), marginRight: pxToDp(20) }}>
                        <IconFont name="icontupian" style={{ fontSize: pxToDp(30), color: "#666" }}></IconFont>
                    </TouchableOpacity>
                    <TouchableOpacity style={{ marginLeft: pxToDp(20), marginRight: pxToDp(20) }}>
                        <IconFont name="iconbiaoqing" style={{ fontSize: pxToDp(30), color: "#666" }}></IconFont>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }
}
const styles = StyleSheet.create({
})
export default Index