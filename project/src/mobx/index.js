/*
 * @Author: atdow
 * @Date: 2021-12-26 01:54:55
 * @LastEditors: null
 * @LastEditTime: 2022-01-01 01:25:13
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
    @observable mobile = '1471111111';
    @observable token = "123";
    @observable userId = "userId2"

    @action
    setUserInfo(mobile, token, userId) {
        this.mobile = mobile;
        this.token = token;
        this.userId = userId;
    }
}
export default new RootStore();
