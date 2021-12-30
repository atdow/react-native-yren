/*
 * @Author: atdow
 * @Date: 2021-12-26 01:15:37
 * @LastEditors: null
 * @LastEditTime: 2021-12-26 01:53:33
 * @Description: file description
 */
module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    [
      '@babel/plugin-proposal-decorators',
      {
        legacy: true,
      },
    ],
  ],
};
