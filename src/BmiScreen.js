import React, { Component } from "react"
import { View, Text, ScrollView, TouchableNativeFeedback, TextInput, Dimensions } from 'react-native'
import styles from "./styles"
import * as Color from "./config.colors"
import Icon from "react-native-vector-icons/dist/FontAwesome5"
import { Image } from  "react-native-elements"

class BmiScreen extends Component {

    constructor(props) {
        super(props)
        this.state = {
            resultShow: false,
            weight: "",
            height: "",
            gender: "",
            bmi: 0,
            result: "",
        }
    }

    handleChangeText = stateData => this.setState(stateData)

    handleBack = () => {
        this.setState({ resultShow: false })
    }

    handleCalculate = () => {
        const { weight, height } = this.state
        if (weight.length > 0 && height.length > 0) {
            const bmi = weight / (height * height) * 703
            const result = bmi < 5 ? "Underweight" :
                (bmi >= 5 && bmi < 85) ? "Healthy Weight" :
                    (bmi > 85 && bmi < 95) ? "Overweight" :
                        "Obse"

            this.setState({ resultShow: true, bmi, result })
        } else {
            alert("Input weight and height of child!")
        }
    }

    render() {
        console.disableYellowBox = true;
        const { resultShow } = this.state

        if (resultShow) return this.bmiResult()
        else return this.bmiInput()

    }

    bmiInput = () => {
        const { weight, height, gender } = this.state

        return (
            <View style={{ ...styles.body, backgroundColor: "#0E6655", }}>
                {/* <ScrollView contentInsetAdjustmentBehavior="automatic" style={{ flex: 1, backgroundColor: "red" }}> */}
                <View style={{ flexDirection: "row", justifyContent: "center", alignItems: "center", height: 120, paddingHorizontal: 16, backgroundColor: "#0E6655" }}>
                    <Text style={{ flex: 1, fontSize: 24, color: "white", textAlign: "center" }}>Child's BMI Calculator</Text>
                </View>
                {/* <View style={{ height: 400, width: "100%", transform: [{ scaleX: 1.6 }], backgroundColor: "red",  borderTopLeftRadius:  Dimensions.get("window").width, borderTopRightRadius:  Dimensions.get("window").width/1.4 }}></View> */}

                <View style={{ flexGrow: 1, justifyContent: "flex-start", alignItems: "center", alignSelf: "stretch", flexDirection: "column", padding: 16, backgroundColor: "#f5f5f5", paddingTop: 0, transform: [{ scaleX: 1.6 }], borderTopLeftRadius: Dimensions.get("window").width, borderTopRightRadius: Dimensions.get("window").width / 1.4 }}>

                    <Text style={{ fontSize: 18, color: Color.bodyTextSecondary, paddingTop: 64, paddingBottom: 16, transform: [{ scaleX: 0.6 }] }}>Please input the following fields</Text>

                    <View style={{ marginVertical: 4, width: "100%", padding: 8, transform: [{ scaleX: 0.6 }] }}>
                        <TextInput style={{
                            backgroundColor: "#0E665522",
                            borderColor: "#0E6655",
                            height: 50,
                            borderWidth: 1,
                            width: "100%",
                            fontSize: 20,
                            paddingVertical: 8,
                            paddingHorizontal: 16,
                            marginBottom: 18,
                            borderRadius: 24
                        }}
                            placeholder="Enter weight of child (pounds)"
                            value={weight}
                            onChangeText={text => this.handleChangeText({ weight: text })} />
                    </View>

                    <View style={{ marginVertical: 4, width: "100%", padding: 8, transform: [{ scaleX: 0.6 }] }}>
                        <TextInput style={{
                            backgroundColor: "#0E665522",
                            borderColor: "#0E6655",
                            height: 50,
                            borderWidth: 1,
                            width: "100%",
                            fontSize: 20,
                            paddingVertical: 8,
                            paddingHorizontal: 16,
                            marginBottom: 18,
                            borderRadius: 24
                        }}
                            placeholder="Enter height of child (inches)"
                            value={height}
                            onChangeText={text => this.handleChangeText({ height: text })} />
                    </View>

                    <View style={{ flexDirection: "row", justifyContent: "center", alignItems: "center", padding: 8, transform: [{ scaleX: 0.6 }] }}>
                        <TouchableNativeFeedback style={{}} onPress={this.handleCalculate} >
                            <View style={{ width: "100%", flexDirection: "row", justifyContent: "center", alignItems: "center", backgroundColor: "#0E6655", height: 50, borderRadius: 50 }}>
                                <Text style={{ fontSize: 20, color: "white", textAlign: "center" }}>Calculate</Text>
                                <Icon name="check" size={22} color={"#e5e5f5"} style={{ paddingHorizontal: 16 }} />
                            </View>
                        </TouchableNativeFeedback>

                    </View>
                </View>
                {/* </ScrollView> */}
            </View>
        )
    }

    bmiResult = () => {
        const { bmi, result } = this.state

        return (
            <View style={{...styles.body}, {  }}>
                {/* <ScrollView contentInsetAdjustmentBehavior="automatic" contentContainerStyle={{alignItems: 'center'}} style={{ width: "100%" }} > */}
                    <View style={{ flexDirection: "row", justifyContent: "center", alignItems: "center", backgroundColor: "#0E6655", paddingHorizontal: 16 }}>
                        <TouchableNativeFeedback style={{ padding: 4 }} onPress={this.handleBack} >
                            <Icon name="arrow-left" size={22} color={"#e5e5f5"} style={{ paddingVertical: 16 }} />
                        </TouchableNativeFeedback>
                        <Text style={{ flex: 1, fontSize: 24, color: "white", textAlign: "center" }}>Child's BMI Calculator</Text>
                    </View>

                    <View style={{ justifyContent: "center", paddingTop: 10, flexDirection: "column" }}>
                        <View style={{marginVertical: 2 }}>
                            <Image source={require("./bmi-chart-children-usa.png")} style={{ width: 420, height: 400}}/>
                        </View>
                        <View style={{ justifyContent: "center", padding: 10, height: 100 }}>
                            <Text style={{ flex: 1, fontSize: 24, color: "#454554", textAlign: "center" }}>BMI : {bmi.toFixed()} Percentiles</Text>
                            <Text style={{ flex: 1, fontSize: 26, color: "green", textAlign: "center", fontWeight: "bold" }}>{result}</Text>
                        </View>
                    </View>

                {/* </ScrollView> */}
            </View>
        )
    }

}

export default BmiScreen