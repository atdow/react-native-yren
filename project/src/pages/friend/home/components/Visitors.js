/*
 * @Author: atdow
 * @Date: 2022-01-01 21:41:18
 * @LastEditors: null
 * @LastEditTime: 2022-01-01 22:20:49
 * @Description: file description
 */
import React, { Component } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { getVisitors } from '../../../../api/friends'
import { pxToDp } from '../../../../utils/stylesKits';
class Index extends Component {
    state = {
        visitors: []
    }

    componentDidMount() {
        getVisitors().then(res => {
            console.log(333)
            if (res.code != 200) {
                return
            }
            this.setState({ visitors: res.data })
        })
    }
    render() {
        const { visitors } = this.state
        return (
            <View style={styles.visitors}>
                <Text style={styles.visitorsRemider}>最近有{visitors.length}人来访，快去查看...</Text>
                <View style={styles.visitorsImageContainer}>
                    {
                        visitors.map((item, index) =>
                            <Image style={styles.visitorsImage}
                                source={{ uri: item.header }}
                            ></Image>
                        )
                    }
                </View>
                <Text style={{ fontSize: pxToDp(20), color: "#777" }}>&gt;</Text>
            </View >
        )
    }
}
const styles = StyleSheet.create({
    visitors: {
        flexDirection: "row",
        marginTop: pxToDp(20),
        alignItems: "center",
        paddingLeft: pxToDp(5),
        paddingRight: pxToDp(5)
    },
    visitorsRemider: {
        flex: 1,
        color: "#777",
        fontSize: pxToDp(12)
    },
    visitorsImageContainer: {
        flexDirection: "row",
        flex: 1,
        alignItems: "center"
    },
    visitorsImage: {
        width: pxToDp(40),
        height: pxToDp(40),
        borderRadius: pxToDp(25)
    }

})
export default Index