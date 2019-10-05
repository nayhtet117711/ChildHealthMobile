import React, { Component } from "react"
import { View, Text, AsyncStorage, Button, Alert, Image, ScrollView, TouchableNativeFeedback, TouchableOpacity, StatusBar, TextInput } from 'react-native'
import { Avatar, Icon, CheckBox } from "react-native-elements"
import Icon2 from "react-native-vector-icons/dist/FontAwesome5"
import styles from "./styles"
import * as Color from "./config.colors"
import { fetchDiseaseList, fetchSaveDisease } from "./api"


class AccountScreen extends Component {
    constructor(props) {
        super(props)
        this.state = {
            user: {},
            ruleAddedView: false,
            diseaseName: "",
            newRuleList: [], 
            items: [],
            oitems: [],
            factName: "",
            newFactList: [],
            
            age1: false,
            age2: false,
            age3: false,
            age4: false,
        }
    }

    async componentDidMount() {
        const user = await AsyncStorage.getItem('user')

        fetchDiseaseList((error, data) => {
            if (error) console.log(error)
            else if (!data.success) alert(data.message)
            else {
                this.setState({ oitems: data.payload })
            }
        })

        this.setState({ user: JSON.parse(user) })
    }

    handleLogout = async () => {
        Alert.alert(
            'You are going to logout. Are you sure?',
            null,
            [
                {
                    text: 'Cancel',
                    style: 'cancel',
                },
                {
                    text: 'OK',
                    onPress: async () => {
                        await AsyncStorage.removeItem('user')
                        this.props.navigation.navigate('AuthLoading');
                    }
                },
            ],
            { cancelable: true },
        );

    }

    handleRuleAddScreen = (show) =>  {
        this.setState({ ruleAddedView: show })
    }

    handleAddDisease = () => {
        const ag = [
            "1_to_28_days",
            "1_to_12_months",
            "1_to_3_years",
            "3_to_12_years"
        ]
        const { diseaseName, newFactList, age1, age2, age3, age4 } = this.state
        if(diseaseName.length>0 && newFactList.length>0) {
            const ageListBool = [ age1, age2, age3, age4 ]
            const childAge = ageListBool.reduce((r, c, i) => {
                if(c) return r.length>0 ? r+","+ag[i] : r+ag[i]
                else return r
            }, "")
            fetchSaveDisease({ diseaseName, factList: newFactList, childAge}, (error, data) => {
                if (error) console.log(error)
                else if (!data.success) alert(data.message)
                else {
                    alert(data.message+"")
                    this.setState({ diseaseName: "", newFactList: [], newRuleList: [], age1: false, age2: false, age3: false, age4: false, items: [] })
                }
            } )
            // console.log(this.state.diseaseName, childAge, this.state.newFactList)

        } else {
            alert("Please select or enter disease name. And enter new fact items.")
        }
    }

    handleChangeText = stateData => {
        this.setState(stateData)
    }

    handleSearchTextChanged = text => {
        const items = text.length ===0 ? [] : this.state.oitems.filter(v => v.toLocaleLowerCase().includes(text.toLocaleLowerCase()))
        this.setState({ items })
    }

    imageUri = `https://cloudcoach.com/wp-content/uploads/2017/10/CC-Vegas-home-page-background.png`;

    userImageUri = `https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRiasajo6RFSTR2RkHQrezDFvJ9QY85uHTkci7cpPof5hZSvuiq7g`

    render() {
        console.disableYellowBox = true;

        const { user, ruleAddedView, items } = this.state

        if (ruleAddedView === true) {
            return (
                <RuleAddedView 
                    handleRuleAddScreen={this.handleRuleAddScreen} 
                    state={this.state} 
                    handleChangeText={this.handleChangeText} 
                    items={items}
                    handleSearchTextChanged={this.handleSearchTextChanged}
                    handleAddDisease={this.handleAddDisease} />
            )
        }
        else {
            return (
                <View style={styles.body}>
                    <StatusBar backgroundColor="#0E6655" barStyle="light-content" />
                    <ScrollView contentInsetAdjustmentBehavior="automatic">
                        <View style={{ borderBottomColor: Color.listDivider, borderBottomWidth: 1 }}>
                            <Image resizeMode="cover" style={{ width: "100%", height: 340 }} source={{ uri: this.imageUri }} />
                            <View style={{ position: "absolute", top: 0, bottom: 0, left: 0, right: 0, backgroundColor: "#247554dd" }} />
                            <View style={{ position: "absolute", bottom: 120, left: 0, right: 0, justifyContent: "center", flexDirection: "row", alignItems: "center" }}>
                                <Avatar rounded size="large" source={{ uri: this.userImageUri }} />
                            </View>
                            <View style={{ position: "absolute", bottom: 20, left: 0, right: 0, justifyContent: "center", flexDirection: "column", alignItems: "center" }}>
                                <Text style={{ paddingHorizontal: 16, fontSize: 32, color: Color.bodyBackground, fontWeight: "bold" }}>{user.name}</Text>
                                <Text style={{ paddingHorizontal: 24, fontSize: 24, color: Color.tabText }}>{user.username}</Text>
                            </View>
                        </View>
                        <View style={{}}>
                            <TouchableNativeFeedback onPress={() => null} >
                                <View style={{ padding: 16, paddingRight: 24, flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
                                    <Text style={{ fontSize: 22, color: Color.bodyText, fontWeight: "bold" }}>{user.phone}</Text>
                                    <View style={{ justifyContent: "center", alignItems: "center", width: 60, height: 60, borderColor: Color.listDivider, borderWidth: 1, borderRadius: 30, }}>
                                        <Icon name="phone" color={Color.tabTextSelected} size={30} />
                                    </View>
                                </View>
                            </TouchableNativeFeedback>
                            <View style={styles.divider} />
                        </View>
                        <View style={{ padding: 16 }}>
                            {user.role === "admin" &&
                                <TouchableNativeFeedback onPress={() => this.handleRuleAddScreen(true)} >
                                    <View style={{ padding: 12, flexDirection: "row", justifyContent: "center", alignItems: "center", backgroundColor: "#2874A6", borderRadius: 8, marginVertical: 8, borderRadius: 22 }}>
                                        <Text style={{ fontSize: 20, color: Color.bodyText, color: "white", paddingHorizontal: 8 }}>Add Rule</Text>
                                    </View>
                                </TouchableNativeFeedback>
                            }
                            <TouchableNativeFeedback onPress={this.handleLogout} >
                                <View style={{ padding: 12, flexDirection: "row", justifyContent: "center", alignItems: "center", backgroundColor: "#d5a543", borderRadius: 8, marginVertical: 8, borderRadius: 22 }}>
                                    <Text style={{ fontSize: 20, color: Color.bodyText, color: "white", paddingHorizontal: 8 }}>Logout</Text>
                                </View>
                            </TouchableNativeFeedback>
                        </View>
                    </ScrollView>

                </View>
            )
        }
    }

}

const RuleAddedView = props => {
    const { handleRuleAddScreen, state, handleAddDisease, handleChangeText, items, handleSearchTextChanged } = props
    return (
        <View style={{ ...styles.body, ...{ backgroundColor: "#d5d5e0" } }}>
            <StatusBar backgroundColor="#0E6655" barStyle="light-content" />
            <View style={{ padding: 16, backgroundColor: "#0E6655", flexDirection: "row" }}>
                <TouchableNativeFeedback style={{ padding: 4 }} onPress={() => handleRuleAddScreen(false)} >
                    <Icon2 name="arrow-left" size={22} color={"white"} />
                </TouchableNativeFeedback>
                <Text style={{ fontSize: 22, flex: 1, textAlign: "center", color: "white" }}>New Rule</Text>
            </View>
            <ScrollView contentInsetAdjustmentBehavior="automatic">
                <View style={{ backgroundColor: "#2E86C1", margin: 8, marginTop: 20, borderRadius: 6, borderColor: "#a5a5a5", borderWidth: 1 }}>
                    <View style={{ padding: 16 }} >
                        <Text style={{ fontSize: 18, color: "#d5d5d5" }}>DISEASE NAME</Text>
                    </View>
                    <View style={{ paddingHorizontal: 16, paddingBottom: 16 }} >
                        <TextInput style={{
                            backgroundColor: "#ffffff",
                            borderColor: "#0E6655",
                            height: 50,
                            borderWidth: 1,
                            width: "100%",
                            fontSize: 20,
                            paddingVertical: 8,
                            paddingHorizontal: 16,
                            marginBottom: 4,
                            borderRadius: 4
                        }}
                            placeholder="Enter disease name"
                            value={state.diseaseName}
                            onChangeText={text => { 
                                    handleChangeText({ diseaseName: text });
                                    handleSearchTextChanged(text);
                                } 
                            } 
                            secureTextEntry={false} />
                       
                        { items.length>0 && <View style={{ borderRadius: 4, elevation: 1, padding: 1, paddingBottom: 0, position: "relative"}}>
                            {
                                items.map((v,k) => {
                                    return (
                                        <TouchableOpacity 
                                            key={k}
                                            style={{ padding: 8, backgroundColor: "#fefefe", borderTopWidth: k>0 ? 1 : 0, borderColor: "#c5c5c9" }} 
                                            onPress={() => handleChangeText({ diseaseName: v, items: [] })} >
                                            <Text style={{ padding: 4, color: "#343434", fontSize: 18, }} numberOfLines={1} >{v}</Text>
                                        </TouchableOpacity>
                                    )
                                })
                            }
                        </View> }                        
                    </View>

                </View>

                <Text style={{ fontSize: 18, color: "#767677", padding: 16, paddingBottom: 4 }}>AGE OF CHILD</Text>

                <View style={{ padding: 0 }} >
                    <CheckBox
                        title='1_to_28_days'
                        checked={state.age1}
                        onPress={()=>handleChangeText({ age1 : !state.age1 })}
                        />
                    <CheckBox
                        title='1 to 12 months'
                        checked={state.age2}
                        onPress={()=>handleChangeText({ age2 : !state.age2 })}
                        />
                    <CheckBox
                        title='1 to 3 years'
                        checked={state.age3}
                        onPress={()=>handleChangeText({ age3 : !state.age3 })}
                        />
                    <CheckBox
                        title='3 to 12 years'
                        checked={state.age4}
                        onPress={()=>handleChangeText({ age4 : !state.age4 })}
                        />
                </View>

                <Text style={{ fontSize: 18, color: "#767677", padding: 16, paddingBottom: 0 }}>FACT LIST IN RULE</Text>

                <View style={{ flex: 1, flexDirection: "row", justifyContent: "space-between", backgroundColor: "white", margin: 8, borderRadius: 6, borderColor: "#a5a5a5", borderWidth: 1, flexGrow: 1 }}>
                    <View style={{ 
                        backgroundColor: "#ffffff", borderRadius:6, }}>
                        <TextInput style={{  
                                height: 50,
                                width: "100%",
                                fontSize: 20,
                                paddingVertical: 8,
                                paddingHorizontal: 16,
                                marginBottom: 4,
                            }}
                            placeholder="Enter fact name to fact list"
                            value={state.factName}
                            onChangeText={text => { 
                                    handleChangeText({ factName: text });
                                    // handleSearchTextChanged(text);
                                } 
                            } 
                            secureTextEntry={false} />
                    </View>
                    <TouchableOpacity style={{ }} onPress={() => {
                        if(state.factName.length>0) {
                            handleChangeText({ newFactList: [...state.newFactList, state.factName ], factName: "" })
                        }
                    }} >
                        <Text style={{ padding: 10, paddingHorizontal: 16, textAlign: "center", fontSize: 24, fontWeight: "bold", color: "#232425", backgroundColor: "#d5d5d5", borderLeftColor: "#a5a5a5", borderLeftWidth: 1, borderTopRightRadius: 6, borderBottomEndRadius: 6 }}>+</Text>
                    </TouchableOpacity>
                </View>

                <View style={{ paddingHorizontal: 4, flex: 1, flexDirection: "column", }}>
                    {
                        state.newFactList.map((v,k) => {
                            return (
                                <Text key={k} style={{ padding: 10, margin: 4, backgroundColor: "#eeeeef", borderWidth: 1, borderColor: "#a5a5a5", borderRadius: 8, fontSize: 16, }}>{ v }</Text>
                            )
                        })
                    }
                </View>

                <View style={{ marginHorizontal: 10, marginVertical: 20, borderRadius: 6, padding: 1, borderColor: "#a5a5a5", borderWidth: 1, backgroundColor: "#0E6655", borderRadius: 8, }}>
                    <TouchableNativeFeedback style={{ padding: 4 }} onPress={handleAddDisease} >
                        <Text style={{ padding: 10, textAlign: "center", fontSize: 20, color: "white" }}>Add Rule</Text>
                    </TouchableNativeFeedback>
                </View>

            </ScrollView>

        </View>
    )
}


export default AccountScreen