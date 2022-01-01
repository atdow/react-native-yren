/*
 * @Author: atdow
 * @Date: 2022-01-01 19:50:00
 * @LastEditors: null
 * @LastEditTime: 2022-01-01 21:14:44
 * @Description: file description
 */
import React, { Component } from 'react';
import { View, Text, TouchableOpacity, StatusBar } from 'react-native';
import HeaderImageScrollView, { TriggeringView } from 'react-native-image-header-scroll-view';
import { pxToDp } from '../../../utils/stylesKits'
import FriendHead from './components/FriendHead'
class Index extends Component {
    render() {
        return (
            <HeaderImageScrollView
                maxHeight={pxToDp(130)}
                minHeight={pxToDp(44)}
                headerImage={require("../../../res/headfriend.png")}
                renderForeground={() => (
                    <View style={{ height: pxToDp(130), justifyContent: "center", alignItems: "center" }} >
                        <StatusBar backgroundColor={"transparent"} translucent={true}></StatusBar>
                        <FriendHead />
                    </View>
                )}
            >
                <View style={{ height: 4000 }}>
                    <Text>99999</Text>
                </View>
            </HeaderImageScrollView >
        )
    }
}
export default Index