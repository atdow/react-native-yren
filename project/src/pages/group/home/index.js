/*
 * @Author: atdow
 * @Date: 2022-01-01 19:50:35
 * @LastEditors: null
 * @LastEditTime: 2022-01-16 02:01:13
 * @Description: file description
 */
import React, { Component } from 'react';
import { View, Text } from 'react-native';
import ScrollableTabView, { DefaultTabBar } from 'react-native-scrollable-tab-view'
import CustomerBar from '../components/CustomerBar'
import Recomment from '../recomment'
import Latest from '../latest'
class Index extends Component {
    render() {
        return (
            <ScrollableTabView
                initialPage={0}
                renderTabBar={() => <CustomerBar />}
            >
                <Recomment tabLabel="推荐"></Recomment>
                <Latest tabLabel="最新"></Latest>
            </ScrollableTabView>
        )
    }
}
export default Index