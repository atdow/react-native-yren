/*
 * @Author: atdow
 * @Date: 2021-12-26 01:55:33
 * @LastEditors: null
 * @LastEditTime: 2022-01-03 01:54:27
 * @Description: file description
 */
import React, { Component } from 'react';
import type { Node } from 'react';
import RootStore from './mobx';
import { Provider } from 'mobx-react';
import {
    View,
    Text,
    Button,
    SafeAreaView
} from 'react-native';
// import Btn from './components/Btn';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Login from './pages/account/login'
import UserInfo from './pages/account/userinfo'
import Demo from './pages/demo'
import Tabbar from './tabbar'
import { inject, observer } from 'mobx-react'

const Stack = createStackNavigator();
@inject("RootStore")
@observer
class Nav extends Component {
    constructor(props) {
        super(props)
        this.state = {
            initalRouteName: this.props.RootStore.token ? "Tabbar" : "Login"
        }
    }
    render() {
        const { initalRouteName } = this.state
        return (
            // <SafeAreaView>
            //     <Provider RootStore={RootStore} >
            //         <Btn></Btn>
            //     </Provider>
            // </SafeAreaView>

            <NavigationContainer>
                <Stack.Navigator headerMode='none' initialRouteName={initalRouteName}>
                    <Stack.Screen name='Demo' component={Demo}></Stack.Screen>
                    <Stack.Screen name='Login' component={Login}></Stack.Screen>
                    <Stack.Screen name='UserInfo' component={UserInfo}></Stack.Screen>
                    <Stack.Screen name='Tabbar' component={Tabbar}></Stack.Screen>
                </Stack.Navigator>
            </NavigationContainer>
        );
    }
};

export default Nav;
