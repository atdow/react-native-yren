/*
 * @Author: atdow
 * @Date: 2022-01-06 22:23:41
 * @LastEditors: null
 * @LastEditTime: 2022-01-15 23:22:37
 * @Description: file description
 */
import {
    observable, action,
} from 'mobx';
class UserStore {
    @observable user = {
        id: "userId1",
        username: "userId1",
        distance: 0,
        address: "广州市天河区",
        age: 18,
        amout: null,
        birthday: "2000-01-01",
        city: "广州",
        email: null,
        gender: "男",
        guid: null,
        lat: "23.12933",
        lng: "113.42782",
        marry: "单身",
        mobile: 14716111111,
        nick_name: "atdow",
        education: "本科",
        header: "https://pics1.baidu.com/feed/6d81800a19d8bc3ed7f42a8e549efe18a9d34595.jpeg?token=d3993bd6594eb3e4db794aca449aa813&s=94D3CA23442301156CADE09F0100C083",
    };

    @action
    setUser(user) {
        this.user = user
    }
}
export default new UserStore();