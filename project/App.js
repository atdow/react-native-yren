/*
 * @Author: atdow
 * @Date: 2021-12-26 01:15:37
 * @LastEditors: null
 * @LastEditTime: 2022-01-03 01:54:50
 * @Description: file description
 */
import React, { Component } from 'react';
import {
  View,
  AsyncStorage
} from 'react-native';
import Nav from './src/nav'
import Geo from './src/utils/Geo';
import RootStore from './src/mobx';
import { Provider } from 'mobx-react'
import JMessage from 'jmessage-react-plugin';

class App extends Component {
  state = {
    isInitGeo: false
  }
  async componentDidMount() {
    const strUserInfo = await AsyncStorage.getItem("userInfo")
    const userInfo = strUserInfo ? JSON.parse(strUserInfo) : {}
    if (userInfo.token) {
      RootStore.setUserInfo(userInfo.mobile, userInfo.token, userInfo.userId)
      JMessage.init() // 有token就先初始化极光
    }
    await Geo.initGeo()
    this.setState({ isInitGeo: true })
  }
  render() {
    return (
      <View style={{ flex: 1 }}>
        <Provider RootStore={RootStore}>
          {this.state.isInitGeo ? <Nav></Nav> : <></>}
        </Provider>
      </View>
    );
  }
};
export default App;