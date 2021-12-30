/*
 * @Author: atdow
 * @Date: 2021-12-29 21:06:09
 * @LastEditors: null
 * @LastEditTime: 2021-12-29 22:53:11
 * @Description: file description
 */
import { PermissionsAndroid, Platform } from 'react-native'
import { init, Geolocation } from "react-native-amap-geolocation"
import axios from 'axios'
class Geo {
    async initGeo() {
        if (Platform.OS === "android") {
            await PermissionsAndroid.requestMultiple([
                PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
                PermissionsAndroid.PERMISSIONS.ACCESS_COARSE_LOCATION,
            ])
        }
        await init({
            // 来自 高德地图android应用key
            // ios: "d0d49938f5a6648cc316fb1eca420cb6",
            android: "9a8136d9d1a8ae4ddc8458efc99bc636"
        })
        return Promise.resolve();
    }
    async getCurrentPosition() {
        return new Promise((resolve, reject) => {
            // console.log("开始定位")
            Geolocation.getCurrentPosition(({ coords }) => {
                // console.log("coords:", coords)
                resolve(coords)
            }, reject);
        })
    }
    async getCityByLocation() {
        // await this.initGeo();
        const { longitude, latitude } = await this.getCurrentPosition();
        // console.log("longitude, latitude:", longitude, latitude)
        const res = await axios.get("https://restapi.amap.com/v3/geocode/regeo", {
            // 高德地图 web key
            params: { location: `${longitude},${latitude}`, key: "78fea5907d81be574ec34527053727fe" }
        })
        // console.log("res1:", res)
        return Promise.resolve(res.data)
    }
}

export default new Geo();