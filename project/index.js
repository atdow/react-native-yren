/*
 * @Author: atdow
 * @Date: 2021-12-26 01:15:37
 * @LastEditors: null
 * @LastEditTime: 2021-12-26 12:01:06
 * @Description: file description
 */
import { AppRegistry } from 'react-native';
import App from './App';
import { name as appName } from './app.json';

AppRegistry.registerComponent(appName, () => App);


console.ignoredYellowBox = ["warning: BackAndroid is deprecated. Please use BackHandler instead.",
    "source.uri should not be an empty string",
    "Invalid props.style key"]
console.disableYellowBox = true;// 关闭全部黄色警告

//注意此处文件路径改为自己项目中的相对路径
if (__DEV__) {
    import('./ReactotronConfig.js').then(() => {
        // console.log('Reactotron Configured')
    });
}
