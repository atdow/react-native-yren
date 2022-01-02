/*
 * @Author: atdow
 * @Date: 2022-01-02 18:53:42
 * @LastEditors: null
 * @LastEditTime: 2022-01-02 20:58:50
 * @Description: file description
 */
import React, { cloneElement, Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import IconFont from '../../../../components/IconFont'
import { pxToDp } from '../../../../utils/stylesKits';
import SvgUri from 'react-native-svg-uri'
import { male, female } from '../../../../res/fonts/iconSvg'
import Picker from 'react-native-picker';
import { Slider } from 'react-native-elements'
import CityJson from '../../../../res/citys.json'
import SButton from '@/components/SButton'
import { themeColor } from '@/style/config'
class Index extends Component {
    constructor(props) {
        super(props)
        this.state = {
            ...JSON.parse(JSON.stringify(this.props.params))
        }
    }
    chooseGender = (gender) => {
        this.setState({ gender })
    }
    chooseLastLogin = () => {
        Picker.init({
            pickerData: ["15分钟", "1天", "1小时", "不限制",],
            selectedValue: [this.state.lastLogin],
            wheelFlex: [1, 0, 0],
            pickerConfirmBtnText: "确定",
            pickerCancelBtnText: "取消",
            pickerTitleText: "选择近期登录时间",
            onPickerConfirm: data => {
                this.setState({
                    lastLogin: data[0]
                })
            }
        })
        Picker.show()
    }
    chooseCity = () => {
        Picker.init({
            pickerData: CityJson,
            selectedValue: ["北京", "北京"],
            wheelFlex: [1, 1, 0],
            pickerConfirmBtnText: "确定",
            pickerCancelBtnText: "取消",
            pickerTitleText: "选择居住地",
            onPickerConfirm: data => {
                this.setState({
                    city: data[1]
                })
            }
        })
        Picker.show()
    }
    chooseEducation = () => {
        Picker.init({
            pickerData: ["博士后", "博士", "硕士", "本科", "大专", "高中", "留学", "其他"],
            selectedValue: ["北京"],
            wheelFlex: [1, 0, 0],
            pickerConfirmBtnText: "确定",
            pickerCancelBtnText: "取消",
            pickerTitleText: "选择学历",
            onPickerConfirm: data => {
                this.setState({
                    education: data[0]
                })
            }
        })
        Picker.show()
    }
    handleSubmitFilter = () => {
        this.props.handleSubmitFilter(this.state)
        this.props.onClose()
    }
    render() {
        const { gender, lastLogin, distance, city, education } = this.state
        return (
            <View style={styles.filterPannelContainer}>
                <View style={styles.filterPannelHeader}>
                    <Text></Text>
                    <Text style={styles.filterPannelTitle}>筛选</Text>
                    <IconFont name="iconshibai" onPress={this.props.onClose} style={{ fontSize: pxToDp(30) }}></IconFont>
                </View>
                <View style={styles.filterPannelRow}>
                    <Text style={{ ...styles.filterPannelRowText }}>性别：</Text>
                    <View style={{ justifyContent: "space-around", width: "60%", flexDirection: "row", alignSelf: "center" }}>
                        <TouchableOpacity onPress={this.chooseGender.bind(this, "男")} style={{
                            width: pxToDp(60), height: pxToDp(60), borderRadius: pxToDp(30),
                            backgroundColor: gender === '男' ? themeColor : "#eee", justifyContent: "center", alignItems: "center",

                        }}>
                            <SvgUri svgXmlData={male} width={30} height={30}></SvgUri>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={this.chooseGender.bind(this, "女")} style={{
                            width: pxToDp(60), height: pxToDp(60), borderRadius: pxToDp(30),
                            backgroundColor: gender === '女' ? themeColor : "#eee", justifyContent: "center", alignItems: "center",

                        }}>
                            <SvgUri svgXmlData={female} width={30} height={30}></SvgUri>
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={styles.filterPannelRow}>
                    <Text style={{ ...styles.filterPannelRowText }}>近期登录时间：</Text>
                    <Text onPress={this.chooseLastLogin} style={styles.filterPannelRowText}>{lastLogin || "请选择"}</Text>
                </View>
                <View style={{ marginTop: pxToDp(10) }}>
                    <Text style={{ ...styles.filterPannelRowText }}>距离：{distance || 0}km</Text>
                    <Slider
                        value={distance}
                        minimumValue={0}
                        maximumValue={10}
                        step={0.5}
                        onValueChange={(distance) => this.setState({ distance })}
                        style={{ marginTop: pxToDp(10) }}
                        thumbStyle={{ height: pxToDp(30), width: pxToDp(30), backgroundColor: themeColor }}
                    ></Slider>
                </View>
                <View style={styles.filterPannelRow}>
                    <Text style={{ ...styles.filterPannelRowText }}>居住地：</Text>
                    <Text onPress={this.chooseCity} style={styles.filterPannelRowText}>{city || "请选择"}</Text>
                </View >
                <View style={styles.filterPannelRow}>
                    <Text style={{ ...styles.filterPannelRowText }}>学历：</Text>
                    <Text onPress={this.chooseEducation} style={styles.filterPannelRowText}>{education || "请选择"}</Text>
                </View >
                <SButton
                    onPress={this.handleSubmitFilter}
                    style={styles.submitButton}
                >确认</SButton>
            </View >
        )
    }
}
const styles = StyleSheet.create({
    filterPannelContainer: {
        position: "absolute",
        width: "100%",
        height: "70%",
        left: 0,
        bottom: 0,
        backgroundColor: "white",
        paddingLeft: pxToDp(10),
        paddingRight: pxToDp(10)
    },
    filterPannelHeader: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        height: pxToDp(50)
    },
    filterPannelTitle: {
        color: "#999",
        fontSize: pxToDp(24),
        fontWeight: "bold"
    },
    filterPannelRow: {
        flexDirection: "row",
        alignItems: "center",
        marginTop: pxToDp(10),
        alignItems: "center",
    },
    filterPannelRowText: {
        color: "#777",
        fontSize: pxToDp(18),
    },
    submitButton: {
        width: "100%",
        height: pxToDp(40),
        marginTop: pxToDp(10),
        position: 'absolute',
        left: pxToDp(10),
        bottom: pxToDp(10)
    }
})
export default Index