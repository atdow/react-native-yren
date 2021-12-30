/*
 * @Author: atdow
 * @Date: 2021-12-25 19:18:34
 * @LastEditors: null
 * @LastEditTime: 2021-12-25 19:21:45
 * @Description: file description
 */
import { Dimensions } from "react-native";
// 设计稿的宽度 /元素的宽度 =手机屏幕/手机中元素的宽度
// 手机中元素的宽度 = 手机屏慕 * 元素的宽度 / 设计稿的宽度 375

export const screenWidth = Dimensions.get("window").width;
export const screenHeight = Dimensions.get("window").height;
/**
 * px转pd
 * @param {*} elePx
 * @returns
 */
export const pxToDp = (elePx) => screenWidth * elePx / 375;
