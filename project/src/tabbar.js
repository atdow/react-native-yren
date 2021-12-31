/*
 * @Author: atdow
 * @Date: 2022-01-01 01:29:43
 * @LastEditors: null
 * @LastEditTime: 2022-01-01 01:40:01
 * @Description: file description
 */
import React, { Component } from 'react';
import { View, Text } from 'react-native';
import TabNavigator from 'react-native-tab-navigator';
import Svg from 'react-native-svg-uri';
import { friend, selectedFriend, group, selectedGroup } from './res/fonts/iconSvg'
class Index extends Component {
    state = {
        selectedTab: "home"
    }
    render() {
        return (
            <View style={{ flex: 1 }}>
                <TabNavigator>
                    <TabNavigator.Item
                        selected={this.state.selectedTab === 'home'}
                        title="Home"
                        renderIcon={() => <Svg width="20" height="20" svgXmlData={friend}></Svg>}
                        renderSelectedIcon={() => <Svg width="20" height="20" svgXmlData={selectedFriend}></Svg>}
                        onPress={() => this.setState({ selectedTab: 'home' })}>
                        <Text>111</Text>
                    </TabNavigator.Item>
                    <TabNavigator.Item
                        selected={this.state.selectedTab === 'profile'}
                        title="Profile"
                        renderIcon={() => <Svg width="20" height="20" svgXmlData={group}></Svg>}
                        renderSelectedIcon={() => <Svg width="20" height="20" svgXmlData={selectedGroup}></Svg>}
                        onPress={() => this.setState({ selectedTab: 'profile' })}>
                        <Text>222</Text>
                    </TabNavigator.Item>
                </TabNavigator >
            </View >
        )
    }
}
export default Index
