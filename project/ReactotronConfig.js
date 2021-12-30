/*
 * @Author: atdow
 * @Date: 2021-12-21 23:32:16
 * @LastEditors: null
 * @LastEditTime: 2021-12-26 02:15:51
 * @Description: file description
 */
import Reactotron, { networking } from 'reactotron-react-native';
Reactotron.configure().useReactNative(networking()).connect();
