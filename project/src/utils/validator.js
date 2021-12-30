/*
 * @Author: atdow
 * @Date: 2021-12-25 23:24:37
 * @LastEditors: null
 * @LastEditTime: 2021-12-25 23:24:38
 * @Description: file description
 */
export default {
    validatePhone(phone) {
        const reg = /^[1](([3][0-9])|([4][5-9])|([5][0-3,5-9])|([6][5,6])|([7][0-8])|([8][0-9])|([9][1,8,9]))[0-9]{8}$/;
        return reg.test(phone)
    }
}