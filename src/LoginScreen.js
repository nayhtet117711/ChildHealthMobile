import React, { Component } from "react"
import { View, Text, TextInput, Button, AsyncStorage } from 'react-native'
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
                <View style={{ flex: 2, justifyContent: "center", alignItems: "center", backgroundColor: "#e5efef" }}>
                    <Text style={{ fontSize: 24, color: Color.bodyTextSecondary }}>Login to your Account</Text>
                </View>
                <View style={{ flex: 4, justifyContent: "center", alignItems: "center", padding: 17, }}>
                    <Text style={{ fontSize: 18, color: Color.bodyTextSecondary, marginVertical: 4, width: "100%" }}>Username</Text>
                    <TextInput style={{ height: 40, borderWidth: 1, borderColor: "lightgray", width: "100%", fontSize: 16, padding: 8, marginBottom: 16 }} placeholder="Enter username" value={username} onChangeText={text => this.handleChangeText({ username: text })} />
                    
                    <Text style={{ fontSize: 18, color: Color.bodyTextSecondary, marginVertical: 4, width: "100%" }}>Password</Text>
                    <TextInput style={{ height: 40, borderWidth: 1, borderColor: "lightgray", width: "100%", fontSize: 16, padding: 8, marginBottom: 16 }} placeholder="Enter password" value={password} onChangeText={text => this.handleChangeText({ password: text })} secureTextEntry={true} />
                    
                    <View style={{ width: "100%" }}>
                        <Button title="LOGIN" onPress={this.handleLogin} />
                    </View>

                    <View style={{ width: "100%", marginTop: 16 }}>
                        <Button title="Don't have accout, create here." onPress={this.handleGoSignup} color="green"  style={{ border: null, backgroundColor: "white" }} />
                    </View>

                </View>
            </View>
        )
    }
}

export default LoginScreen