import React, { Component } from "react"
import { View, Text, ScrollView, Switch, TouchableNativeFeedback, TextInput, CheckBox } from 'react-native'
import Icon from "react-native-vector-icons/dist/FontAwesome5"
import styles from "./styles"
import * as Color from "./config.colors"
import { fetchSymptomList, fetchExpertSystem } from "./api"
import { throwStatement } from "@babel/types";
class ExpertScreen extends Component {

    constructor(props) {
        super(props)
        this.state = {
            isExpertResultView: false,
            symptomList: [],
            symptomListPaged: [],
            currentPage: 0,
            expertResult: {}
        }
    }

    componentDidMount() {
        fetchSymptomList((error, data) => {
            if (error) alert(error)
            else if (!data.success) alert(data.message)
            else {
                const symptomList = data.payload.filter((v,i,arr)=>arr.findIndex(e=>e.name===v.name)===i)
                const symptomListPaged = this.initSymptomListPaged(symptomList)
                this.setState({ symptomList, symptomListPaged })
            }
        })
    }

    initSymptomListPaged = symptomList => {
        return symptomList.reduce((r, c, i) => {
            const cc = { name: c.name, type: c.type, value: c.type === "integer" ? 0 : false }
            if (i % 10 === 0) return [...r, [cc]]
            else {
                const rr = [...r]
                rr[rr.length - 1].push(cc)
                return rr
            }
        }, [])
    }

    render() {
        const { isExpertResultView } = this.state
        if (isExpertResultView)
            return this._renderExpertResult()
        else
            return this._renderSymptomChooser()
    }

    _renderExpertResult = () => {
        const { expertResult } = this.state
        return (
            <View style={styles.body}>
                <View style={{ flexDirection: "row", padding: 8, elevation: 1 }}>
                    <TouchableNativeFeedback style={{ padding: 4 }} onPress={this.onBackFromExpertResult} >
                        <Icon.Button name="arrow-left" size={16} color={Color.bodyBackground}>Back</Icon.Button>
                    </TouchableNativeFeedback>
                </View>
                <View style={{ flex: 1, padding: 8, justifyContent: "center", alignItems: "center" }}>
                    {
                        expertResult === null
                            ? <Text style={{ fontSize: 20, color: Color.background, fontWeight: "bold" }}>Everything is okay.</Text>
                            : <View style={{ alignItems: "center" }}>
                                <Text style={{ paddingVertical: 8, fontSize: 20, color: Color.tabTextSelected, fontWeight: "bold" }}>{expertResult.name} stage {expertResult.stage}</Text>
                                {
                                    expertResult.emergency
                                        ? <View style={{ paddingVertical: 24, paddingHorizontal: 8 }}>
                                            <Text style={{ padding: 8, fontSize: 16, color: Color.bodyBackground, backgroundColor: Color.tabTextSelected, borderRadius: 8 }}>{expertResult.emergency}</Text>
                                        </View>
                                        : <Text style={{ paddingVertical: 8, fontSize: 18, color: Color.background, fontWeight: "bold" }}>{expertResult.advice}</Text>
                                }

                            </View>
                    }
                </View>
            </View>
        )
    }

    _renderSymptomChooser = () => {
        const { currentPage, symptomListPaged } = this.state
        return (
            <View style={styles.body}>
                {/* <StatusBar barStyle="light-content" /> */}
                <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between", paddingHorizontal: 8, paddingVertical: 8, borderBottomColor: Color.listDivider, elevation: 1 }}>
                    {currentPage > 0
                        ? <TouchableNativeFeedback style={{ padding: 4 }} onPress={this.onPageBack} >
                            <Icon name="arrow-left" size={22} color={Color.bodyTextSecondary} />
                        </TouchableNativeFeedback>
                        : <View />
                    }
                    <View style={{ flexDirection: "column", alignItems: "center" }}>
                        <Text style={{ fontSize: 18, color: Color.bodyText, fontWeight: "700" }}>Symptoms</Text>
                        <Text style={{ fontSize: 13, color: Color.bodyTextSecondary, paddingHorizontal: 4 }}>page-{currentPage + 1} of {symptomListPaged.length}</Text>
                    </View>
                    {currentPage < symptomListPaged.length - 1
                        ? <TouchableNativeFeedback style={{ padding: 4 }} onPress={this.onPageNext} >
                            <Icon name="arrow-right" size={22} color={Color.bodyTextSecondary} />
                        </TouchableNativeFeedback>
                        : <View />
                    }
                </View>
                <ScrollView contentInsetAdjustmentBehavior="automatic">
                    <Text style={{ padding: 8, fontSize: 15, color: Color.bodyTextSecondary }}>Choose the symptom(s) of you kid below.</Text>
                    {this._renderSymptomInput()}
                </ScrollView>
                <View style={{ position: "absolute", bottom: 14, left: "50%" }}>
                    <TouchableNativeFeedback onPress={this.onSubmitToExpert} background={TouchableNativeFeedback.Ripple(Color.bodyBackground, false)} style={{ borderRadius: 20 }}>
                        <View style={{ flex: 1, justifyContent: "center", alignItems: "center", position: "relative", left: "-50%", elevation: 6, backgroundColor: Color.background, width: 50, height: 50, borderRadius: 25 }}>
                            <Icon name="check" size={24} color={Color.bodyBackground} />
                        </View>
                    </TouchableNativeFeedback>
                </View>
            </View>
        )
    }

    _renderSymptomInput = () => {
        if (this.state.symptomListPaged.length === 0) return null
        const currentPageOfSymptoms = this.state.symptomListPaged[this.state.currentPage]
        return currentPageOfSymptoms.map((symptom, i) => {
            return (
                <View key={i} style={{ paddingBottom: i === currentPageOfSymptoms.length - 1 ? 56 : 0 }}>
                    {i > 0 && <View style={styles.divider} />}
                    <TouchableNativeFeedback onPress={()=>symptom.type==="boolean" && this.onInputChanged(!symptom.value, i, symptom.type)}>
                        <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center", paddingVertical: 16, paddingHorizontal: 16, paddingRight: 8 }}>
                            <Text style={{ flex: 8, fontSize: 16, color: Color.bodyText }}>{symptom.name}?</Text>
                            {
                                symptom.type === "boolean"
                                    ? <CheckBox style={{ paddingHorizontal: 8, flex: 1 }} onValueChange={value => this.onInputChanged(value, i, symptom.type)} value={symptom.value} />
                                    : symptom.type === "integer"
                                        ? <TextInput returnKeyType="done" keyboardType="number-pad" onChangeText={value => this.onInputChanged(value, i, symptom.type)} value={symptom.value.toString()} style={{ flex:1, height: 32, paddingVertical: 2, paddingHorizontal: 16, borderWidth: 1, borderColor: Color.inputBorder }} />
                                        : null  
                            }
                        </View>
                    </TouchableNativeFeedback>
                </View>
            )
        })
    }

    onInputChanged = (value, index, type) => {
        if (type === "integer" && isNaN(value)) return
        const symptomListPagedCopied = [...this.state.symptomListPaged]
        symptomListPagedCopied[this.state.currentPage][index].value = type === "boolean" ? value : type === "integer" && value !== "" ? parseInt(value) : value
        this.setState({ symptomListPaged: symptomListPagedCopied })
    }

    onSubmitToExpert = () => {
        const symptomListSubmitted = this.state.symptomListPaged.reduce((rr, cc) => {
            const symptoms = cc.reduce((r, c) => {
                const value = c.type === "integer"
                    ? c.value === "" ? 0 : c.value
                    : c.type === "boolean"
                        ? c.value
                        : null
                if (value !== 0 && value !== false) return [...r, { name: c.name, value }]
                else return r
            }, [])
            return [...rr, ...symptoms]
        }, [])
        if (symptomListSubmitted.length > 0) {
            fetchExpertSystem({ symptoms: symptomListSubmitted }, (error, data) => {
                if (error) alert(error)
                else if (!data.success) alert(data.message)
                else {
                    const resultFromExpert = data.payload
                    this.setState({ isExpertResultView: true, expertResult: resultFromExpert.result })
                }
            })
        }
    }

    onPageBack = e => {
        this.setState(prev => (
            { currentPage: prev.currentPage > 0 ? prev.currentPage - 1 : prev.currentPage }
        ))
    }

    onPageNext = e => {
        this.setState(prev => (
            { currentPage: prev.currentPage < prev.symptomListPaged.length - 1 ? prev.currentPage + 1 : prev.currentPage }
        ))
    }

    onBackFromExpertResult = () => {
        this.setState({ 
            isExpertResultView: false,
            currentPage: 0,
            symptomListPaged: this.initSymptomListPaged(this.state.symptomList)
        })
    }
}

export default ExpertScreen