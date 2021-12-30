/*
 * @Author: atdow
 * @Date: 2021-12-26 17:03:29
 * @LastEditors: null
 * @LastEditTime: 2021-12-26 17:42:26
 * @Description: file description
 */
import React, { Component, useState } from 'react';
import { SafeAreaView, Text, StyleSheet } from 'react-native';

import {
    CodeField,
    Cursor,
} from 'react-native-confirmation-code-field';

const styles = StyleSheet.create({
    root: { flex: 1, padding: 20 },
    title: { textAlign: 'center', fontSize: 30 },
    codeFieldRoot: { marginTop: 20 },
    cell: {
        width: 40,
        height: 40,
        lineHeight: 38,
        fontSize: 24,
        borderBottomWidth: 2,
        borderColor: '#00000030',
        textAlign: 'center',
        color: '#7d53ea',
    },
    focusCell: {
        borderColor: '#7d53ea',
    },
});

class App extends Component {
    state = {
        vcodeTxt: ""
    }
    onVcodeChangeTxt = (vcodeTxt) => {
        this.setState({ vcodeTxt })
    }
    render() {
        return (
            <SafeAreaView style={styles.root}>
                <CodeField
                    value={this.state.vcodeTxt}
                    onChangeText={this.onVcodeChangeTxt}
                    cellCount={6}
                    rootStyle={styles.codeFieldRoot}
                    keyboardType="number-pad"
                    textContentType="oneTimeCode"
                    renderCell={({ index, symbol, isFocused }) => (
                        <Text
                            key={index}
                            style={[styles.cell, isFocused && styles.focusCell]}
                        >
                            {symbol || (isFocused ? <Cursor /> : null)}
                        </Text>
                    )}
                />
            </SafeAreaView>
        )
    }
}


export default App;