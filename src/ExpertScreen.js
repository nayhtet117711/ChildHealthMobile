import React, { Component } from "react"
import { View, Text, ScrollView, Button, TouchableNativeFeedback, TextInput, CheckBox, Picker, StatusBar } from 'react-native'
import Icon from "react-native-vector-icons/dist/FontAwesome5"
import Dialog from "react-native-dialog";
import styles from "./styles"
import * as Color from "./config.colors"
import { fetchSymptomList, fetchExpertSystem } from "./api"

class ExpertScreen extends Component {

    constructor(props) {
        super(props)
        this.state = {
            isExpertResultView: false,
            symptomList: [],
            symptomListPaged: [],
            currentPage: 0,
            expertResult: {},
            childAge: "1_to_28_days",
            childAgeAdded: false
        }
    }

    componentDidMount() {
        
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

    handleChangeText = data => {
        this.setState(data)
    }

    handleSetChildAge = () => {
        if(this.state.childAge.length>0) {
            this.setState({ childAgeAdded: true }, () => {
                fetchSymptomList(this.state.childAge, (error, data) => {
                    if (error) alert(error)
                    else if (!data.success) alert(data.message)
                    else {
                        const symptomList = data.payload.filter((v,i,arr)=>arr.findIndex(e=>e.name===v.name)===i)
                        const symptomListPaged = this.initSymptomListPaged(symptomList)
                        this.setState({ symptomList, symptomListPaged })
                    }
                })
            })
        }
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
                <StatusBar backgroundColor="#0E6655" barStyle="light-content" />
                <View style={{ flexDirection: "row", paddingVertical: 8, paddingHorizontal:16, elevation: 1, backgroundColor: "#0E6655" }}>
                    <TouchableNativeFeedback style={{ padding: 4 }} onPress={this.onBackFromExpertResult} >
                        <Icon name="arrow-left" size={22} color={Color.bodyBackground} />
                    </TouchableNativeFeedback>
                </View>
                <View style={{ flex: 1, padding: 8, backgroundColor: "#0E6655" }}>
                    {
                        expertResult === null
                            ? <Text style={{ fontSize: 24, color: "white", fontWeight: "bold" }}>Everything is okay.</Text>
                            : <View style={{ flex: 1, flexDirection: "row", justifyContent: "center", alignItems: "center" }}>
                                <Text style={{ padding: 8, fontSize: 24, color: "white", fontWeight: "bold" }}>{expertResult.name}</Text>
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
                <View style={{ flex: 4, padding: 8, flexDirection: "column", backgroundColor: "#f5f9fa", borderTopWidth: 1, borderTopColor: "#0E6655" }}>
                    <Text style={{ fontSize: 18, color: "gray", paddingVertical: 8 }}>The following symptoms </Text>
                    {
                        expertResult.fact.map( (v, k) => (
                            <Text key={k} style={{ fontSize: 20, color: Color.bodyText, fontWeight: "bold", padding: 8 }}>{k+1}.&nbsp;{v.name}</Text>
                        ))
                    }
                </View>
            </View>
        )
    }

    _renderSymptomChooser = () => {
        const { currentPage, symptomListPaged, childAge, childAgeAdded } = this.state
        if(!childAgeAdded) {
            return (
                <View style={{ flex: 1, justifyContent: "center", alignItems: "center", padding: 16 }}>
                    <StatusBar backgroundColor="#0E6655" barStyle="light-content" />
                    <Text style={{ fontSize: 18, color: Color.bodyTextSecondary, padding: 16 }}>Select child's age</Text>
                    <View style={{height: 50, width: "100%", backgroundColor: "#5DADE2", borderRadius: 22 }}>
                        <Picker
                            selectedValue={childAge}
                            style={{ fontSize: 22 }}
                            onValueChange={(itemValue, itemIndex) =>this.handleChangeText({ childAge: itemValue })}>
                            <Picker.Item label="1 to 28 days" value="1_to_28_days" />
                            <Picker.Item label="1 to 12 months" value="1_to_12_months" />
                            <Picker.Item label="1 to 3 years" value="1_to_3_years" />
                            <Picker.Item label="3 to 12 years" value="  " />    
                        </Picker>
                    </View>
                    <View style={{ width: "100%", paddingVertical: 16 }}>
                        <TouchableNativeFeedback onPress={this.handleSetChildAge} >
                            <View style={{ padding: 12, flexDirection: "row", justifyContent: "center", alignItems: "center", backgroundColor: Color.inputBorder, borderRadius: 22}}>
                                {/* <Icon name="logout" color={Color.tabBackground} size={30} style={{ paddingHorizontal: 8}} /> */}
                                <Text style={{ fontSize: 18, color: Color.bodyText, color: Color.tabBackground, paddingHorizontal: 8, }}>OKAY</Text>
                            </View>
                        </TouchableNativeFeedback>
                        {/* <Button title="OKAY" onPress={this.handleSetChildAge} /> */}
                    </View>
                </View>
            )
        }
        else if(symptomListPaged.length===0) return null;
        return (
            <View style={styles.body}>
                {/* <StatusBar barStyle="light-content" /> */}
                <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between", paddingHorizontal: 16, paddingVertical: 10, backgroundColor: "#0E6655" }}>
                    <Text style={{ fontSize: 18, color: "white" }}>Selected child's age:</Text>
                    <TouchableNativeFeedback style={{ padding: 4 }} onPress={() => this.setState({ childAgeAdded: false })}  >
                        <Text style={{ fontSize: 18, color: "#232323", borderWidth: 1, borderColor: "white", backgroundColor: "white", borderRadius: 8, paddingVertical: 4, paddingHorizontal: 16 }}>{ childAge }</Text>
                    </TouchableNativeFeedback>
                </View>
                <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between", paddingHorizontal: 8, paddingVertical: 8, borderBottomColor: Color.listDivider, elevation: 1, backgroundColor: "#0E6655" }}>
                    {currentPage > 0
                        ? <TouchableNativeFeedback style={{ padding: 4 }} onPress={this.onPageBack} >
                            <Icon name="arrow-left" size={22} color={"#e5e5e5"} />
                        </TouchableNativeFeedback>
                        : <View />
                    }
                    <View style={{ flexDirection: "column", alignItems: "center" }}>
                        <Text style={{ fontSize: 20, color: "white", fontWeight: "700" }}>Symptoms</Text>
                        <Text style={{ fontSize: 16, color: "#e5e5e5", paddingHorizontal: 4 }}>page-{currentPage + 1} of {symptomListPaged.length}</Text>
                    </View>
                    {currentPage < symptomListPaged.length - 1
                        ? <TouchableNativeFeedback style={{ padding: 4 }} onPress={this.onPageNext} >
                            <Icon name="arrow-right" size={22} color={"#e5e5e5"} />
                        </TouchableNativeFeedback>
                        : <View />
                    }
                </View>
                <ScrollView contentInsetAdjustmentBehavior="automatic" >
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
        // <TextInput style={{ height: 40, borderWidth: 1, borderColor: "lightgray", width: "100%", fontSize: 16, padding: 8, marginBottom: 16 }} placeholder="Enter username" value={childAge} onChangeText={text => this.handleChangeText({ childAge: text })} />
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
            fetchExpertSystem(this.state.childAge, { symptoms: symptomListSubmitted }, (error, data) => {
                if (error) alert(error)
                else if (!data.success) alert(data.message)
                else {
                    const resultFromExpert = data.payload
                    // console.log(resultFromExpert)
                    // this.setState({ isExpertResultView: true, expertResult: resultFromExpert.result })
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