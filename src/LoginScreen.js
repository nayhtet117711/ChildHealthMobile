import React, { Component } from "react"
import Icon from "react-native-vector-icons/dist/FontAwesome5"
import { View, Text, TextInput, Button, AsyncStorage, TouchableNativeFeedback, StatusBar } from 'react-native'
import styles from "./styles"
import * as Color from "./config.colors"
import {  fetchLogin } from "./api"

class LoginScreen extends Component {
    constructor(props) {
        super(props)
        this.state = {
            username: "",
            password: "",
        }
    }

    handleLogin = async () => {
        const { username, password } = this.state

        if(username.length===0 || password.length===0) 
            alert("Please fill all fields!")
        else {
            fetchLogin(this.state, async (err, data) => {
                if(err) alert(err)
                else if(!data.success) alert(JSON.stringify(data.message)) 
                else {
                    await AsyncStorage.setItem('user', JSON.stringify(data.payload.userAccount));
                    this.props.navigation.navigate('AuthLoading');
                }
            })
        }

        // const realUsername = "mttl"
        // if(realUsername===username) {}
        // await AsyncStorage.setItem('user', 'user125');
      
        // this.props.navigation.navigate('AuthLoading');
    }

    handleGoSignup = () => {
        this.props.navigation.navigate('Signup');
    }

    handleChangeText = (data) => {
        this.setState(data)
    }

    render() {
        console.disableYellowBox = true;

        const { username, password } = this.state
        return(
            <View style={styles.body}>
                <StatusBar backgroundColor="#2E86C1" barStyle="light-content" />
                <View style={{ flex: 2, justifyContent: "center", alignItems: "center", backgroundColor: "#2E86C1" }}>
                    <Icon name="check-circle" size={60} color={"#e5e5f5"} style={{ paddingVertical: 16 }} />
                    <Text style={{ fontSize: 26, color: "white" }}>Login to your Account</Text>
                </View>
                <View style={{ flex: 4, justifyContent: "center", alignItems: "center", padding: 17, backgroundColor: "#45B39D"}}>
                    {/* <Text style={{ fontSize: 22, color: Color.bodyTextSecondary, marginVertical: 4, width: "100%" }}>Username</Text> */}
                    <TextInput style={{ 
                        backgroundColor: "#ffffffaa",
                        borderColor: "white",
                        height: 50, 
                        borderWidth: 1, 
                        width: "100%", 
                        fontSize: 20, 
                        paddingVertical: 8, 
                        paddingHorizontal: 16, 
                        marginBottom: 18, 
                        borderRadius: 24 }} 
                        placeholder="Enter username" 
                        value={username} 
                        onChangeText={text => this.handleChangeText({ username: text })} />
                    
                    {/* <Text style={{ fontSize: 2, color: Color.bodyTextSecondary, marginVertical: 4, width: "100%" }}>Password</Text> */}
                    <TextInput style={{ 
                        backgroundColor: "#ffffffaa",
                        borderColor: "white",
                        height: 50, 
                        borderWidth: 1,
                        width: "100%", 
                        fontSize: 20, 
                        paddingVertical: 8, 
                        paddingHorizontal: 16, 
                        marginBottom: 18, 
                        borderRadius: 24 }} 
                        placeholder="Enter password" 
                        value={password} 
                        onChangeText={text => this.handleChangeText({ password: text })} 
                        secureTextEntry={true} />
                    
                    <View style={{ width: "100%" }}>
                        <TouchableNativeFeedback style={{ padding: 4 }} onPress={this.handleLogin} >
                            <Text style={{ padding: 10, textAlign: "center", fontSize: 20, backgroundColor: "#2E86C1", borderRadius: 20, color: "white" }}>LOGIN</Text>
                        </TouchableNativeFeedback>
                    </View>

                    <View style={{ width: "100%", marginTop: 16 }}>
                        <TouchableNativeFeedback style={{ padding: 4 }} onPress={this.handleGoSignup} >
                            <Text style={{ padding: 10, textAlign: "center", fontSize: 18, borderRadius: 20, color: "#f5f5f5", textDecorationLine: "underline" }}>Don't have accout, create here.</Text>
                        </TouchableNativeFeedback>
                    </View>

                </View>
            </View>
        )
    }
}

export default LoginScreen