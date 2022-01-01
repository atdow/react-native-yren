/*
 * @Author: atdow
 * @Date: 2022-01-01 01:29:43
 * @LastEditors: null
 * @LastEditTime: 2022-01-01 20:55:37
 * @Description: file description
 */
import React, { Component } from 'react';
import { View, Text } from 'react-native';
import TabNavigator from 'react-native-tab-navigator';
import Svg from 'react-native-svg-uri';
import { friend, selectedFriend, group, selectedGroup, message, selectedMessage, my, selectedMy } from './res/fonts/iconSvg'
import Friend from './pages/friend/home'
import Group from './pages/group/home'
import Message from './pages/message/home'
import My from './pages/my/home'
class Index extends Component {
    state = {
        selectedTab: "friend",
        pages: [
            {
                selected: "friend",
                title: "交友",
                renderIcon: () => <Svg width="20" height="20" svgXmlData={friend}></Svg>,
                renderSelectedIcon: () => <Svg width="20" height="20" svgXmlData={selectedFriend}></Svg>,
                onPress: () => this.setState({ selectedTab: 'friend' }),
                component: <Friend />
            },
            {
                selected: "group",
                title: "圈子",
                renderIcon: () => <Svg width="20" height="20" svgXmlData={group}></Svg>,
                renderSelectedIcon: () => <Svg width="20" height="20" svgXmlData={selectedGroup}></Svg>,
                onPress: () => this.setState({ selectedTab: 'group' }),
                component: <Group />
            },
            {
                selected: "message",
                title: "消息",
                renderIcon: () => <Svg width="20" height="20" svgXmlData={message}></Svg>,
                renderSelectedIcon: () => <Svg width="20" height="20" svgXmlData={selectedMessage}></Svg>,
                onPress: () => this.setState({ selectedTab: 'message' }),
                component: <Message />
            },
            {
                selected: "my",
                title: "我的",
                renderIcon: () => <Svg width="20" height="20" svgXmlData={my}></Svg>,
                renderSelectedIcon: () => <Svg width="20" height="20" svgXmlData={selectedMy}></Svg>,
                onPress: () => this.setState({ selectedTab: 'my' }),
                component: <My />
            },
        ]
    }
    render() {
        const { selectedTab, pages } = this.state
        return (
            <View style={{ flex: 1, backgroundColor: "#fff" }}>
                <TabNavigator>
                    {
                        pages.map((item, index) =>
                            <TabNavigator.Item
                                selected={this.state.selectedTab === item.selected}
                                title={item.title}
                                renderIcon={item.renderIcon}
                                renderSelectedIcon={item.renderSelectedIcon}
                                onPress={item.onPress}
                                selectedTitleStyle={{ color: "#c863b5" }}
                                tabStyle={{
                                    backgroundColor: "#eee", justifyContent: "center"
                                }}
                                key={index}
                            >
                                {item.component}
                            </TabNavigator.Item>
                        )
                    }
                </TabNavigator >
            </View >
        )
    }
}
export default Index
