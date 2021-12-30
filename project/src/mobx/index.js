/*
 * @Author: atdow
 * @Date: 2021-12-26 01:54:55
 * @LastEditors: null
 * @LastEditTime: 2021-12-30 20:43:29
 * @Description: file description
 */
import {
    observable, action,
    // makeAutoObservable
} from 'mobx';
class RootStore {
    // mobx 6.0以后的写法，更加好用
    // constructor() {
    //     makeAutoObservable(this)
    // }
    @observable mobile = '';
    @observable token = "";
    @observable userId = ""

    @action
    setUserInfo(mobile, token, userId) {
        this.mobile = mobile;
        this.token = token;
        this.userId = userId;
    }
}
export default new RootStore();
