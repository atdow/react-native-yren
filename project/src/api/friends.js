/*
 * @Author: atdow
 * @Date: 2022-01-01 21:45:11
 * @LastEditors: null
 * @LastEditTime: 2022-01-08 00:24:36
 * @Description: file description
 */
import axios from "./request";

export function getVisitors(parameter) {
    return axios({
        url: '/friends/visitors',
        method: 'get',
        params: parameter
    })
}

export function getTodayBest(parameter) {
    return axios({
        url: '/friends/todayBest',
        method: 'get',
        params: parameter
    })
}

export function getRecommends(parameter) {
    return axios({
        url: '/friends/recommendation',
        method: 'post',
        data: parameter
    })
}

export function getFriendsCards(parameter) {
    return axios({
        url: '/friends/cards',
        method: 'get',
        params: parameter
    })
}

export function setFriendsLike(parameter) {
    return axios({
        url: '/friends/like',
        method: 'post',
        data: parameter
    })
}

export function setSearchNearby(parameter) {
    return axios({
        url: '/friends/search-nearby',
        method: 'get',
        params: parameter
    })
}

export function getTestSoulQuestions(parameter) {
    return axios({
        url: '/friends/questions',
        method: 'get',
        params: parameter
    })
}

export function getTestSoulQuestionSection(parameter) {
    return axios({
        url: '/friends/questionSection',
        method: 'get',
        params: parameter
    })
}

export function submitTestSoulQuestion(parameter) {
    return axios({
        url: '/friends/questionsAnswer',
        method: 'post',
        data: parameter
    })
}

