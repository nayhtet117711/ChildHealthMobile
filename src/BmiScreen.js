import React, { Component } from "react"
import { View, Text } from 'react-native'
import styles from "./styles"
import * as Color from "./config.colors"

class BmiScreen extends Component {

    render() {
        return(
            <View style={styles.body}>
                <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
                    <Text style={{ fontSize: 18, color: Color.bodyTextSecondary }}>BMI Calculator</Text>
                </View>
            </View>
        )
    }
}

export default BmiScreen