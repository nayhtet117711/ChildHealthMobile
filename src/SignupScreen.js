import React, { Component } from "react"
import { View, Text, TextInput, TouchableNativeFeedback } from 'react-native'
import styles from "./styles"
import * as Color from "./config.colors"
import { ScrollView } from "react-native-gesture-handler";
import { fetchSignup } from "./api"
import Icon from "react-native-vector-icons/dist/FontAwesome5"

class SignupScreen extends Component {

    constructor(props) {
        super(props)
        this.state = {
            username: "",
            name: "",
            phone: "",
            password: "",
            repassword: "",
        }
    }

    handleSignup = async () => {
        const { username, password, name, phone, repassword } = this.state
        if(username.length===0 || name.length===0 || phone.length===0 || password.length===0 || repassword.length===0) 
            alert("Please fill all fields!")
        else if(password!==repassword) 
            alert("Confirm password does not match!")
        else {
            fetchSignup(this.state, (err, data) => {
                if(err) alert("1 "+err)
                else if(!data.success) alert(JSON.stringify(data.message)) 
                else {
                    alert(data.message)
                    this.props.navigation.navigate('AuthLoading');
                }
            })
        }
        
    }

    handleChangeText = (data) => {
        this.setState(data)
    }

    handleBack = () => {
        this.props.navigation.navigate('AuthLoading');
    }

    render() {
        console.disableYellowBox = true;

        const { username, password, repassword, name, phone } = this.state
        return (
            <View style={styles.body}>
                <ScrollView style={{ flex: 1 }}> 
                    <View style={{ flex: 1, flexDirection: "row", justifyContent: "center", alignItems: "center", backgroundColor: "#2E86C1", height: 80, paddingHorizontal: 16 }}>
                        <TouchableNativeFeedback style={{ padding: 4 }} onPress={this.handleBack} >
                            <Icon name="arrow-left" size={22} color={"#e5e5f5"} style={{ paddingVertical: 16 }} />
                        </TouchableNativeFeedback>
                        <Text style={{ flex:1, fontSize: 24, color: "white", textAlign: "center"  }}>Signup a new Account</Text>
                    </View>
                    <View style={{ flex: 4, justifyContent: "center", alignItems: "center", padding: 17, }}>
                        <Text style={{ fontSize: 18, color: Color.bodyTextSecondary, marginVertical: 4, width: "100%" }}>Username</Text>
                        <TextInput style={{ height: 50, borderWidth: 1, borderColor: "lightgray", width: "100%", fontSize: 20, paddingVertical: 8, paddingHorizontal: 16, marginBottom: 8, borderRadius: 22 }} placeholder="Enter username" value={username} onChangeText={text => this.handleChangeText({ username: text })} />

                        <Text style={{ fontSize: 18, color: Color.bodyTextSecondary, marginVertical: 4, width: "100%" }}>Name</Text>
                        <TextInput style={{ height: 50, borderWidth: 1, borderColor: "lightgray", width: "100%", fontSize: 20, paddingVertical: 8, paddingHorizontal: 16, marginBottom: 8, borderRadius: 22 }} placeholder="Enter your name" value={name} onChangeText={text => this.handleChangeText({ name: text })} />

                        <Text style={{ fontSize: 18, color: Color.bodyTextSecondary, marginVertical: 4, width: "100%" }}>Phone</Text>
                        <TextInput style={{ height: 50, borderWidth: 1, borderColor: "lightgray", width: "100%", fontSize: 20, paddingVertical: 8, paddingHorizontal: 16, marginBottom: 8, borderRadius: 22 }} placeholder="Enter phone number" value={phone} onChangeText={text => this.handleChangeText({ phone: text })} />

                        <Text style={{ fontSize: 18, color: Color.bodyTextSecondary, marginVertical: 4, width: "100%" }}>Password</Text>
                        <TextInput style={{ height: 50, borderWidth: 1, borderColor: "lightgray", width: "100%", fontSize: 20, paddingVertical: 8, paddingHorizontal: 16, marginBottom: 8, borderRadius: 22 }} placeholder="Enter password" value={password} onChangeText={text => this.handleChangeText({ password: text })} secureTextEntry={true} />

                        <Text style={{ fontSize: 18, color: Color.bodyTextSecondary, marginVertical: 4, width: "100%" }}>Confirm Password</Text>
                        <TextInput style={{ height: 50, borderWidth: 1, borderColor: "lightgray", width: "100%", fontSize: 20, paddingVertical: 8, paddingHorizontal: 16, marginBottom: 8, borderRadius: 22 }} placeholder="Re-enter password" value={repassword} onChangeText={text => this.handleChangeText({ repassword: text })} secureTextEntry={true} />

                        <View style={{ width: "100%", marginTop: 16 }}>
                            <TouchableNativeFeedback style={{ padding: 4 }} onPress={this.handleSignup} >
                                <Text style={{ padding: 10, textAlign: "center", fontSize: 18, backgroundColor: "#2E86C1", borderRadius: 20, color: "white" }}>SIGNUP</Text>
                            </TouchableNativeFeedback>
                        </View>

                    </View>
                </ScrollView>
            </View>
        )
    }

}

export default SignupScreen