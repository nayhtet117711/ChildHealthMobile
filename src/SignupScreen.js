import React, { Component } from "react"
import { View, Text, TextInput, Button } from 'react-native'
import styles from "./styles"
import * as Color from "./config.colors"
import { ScrollView } from "react-native-gesture-handler";
import { fetchSignup } from "./api"

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

    render() {
        console.disableYellowBox = true;

        const { username, password, repassword, name, phone } = this.state
        return (
            <View style={styles.body}>
                <ScrollView style={{ flex: 1 }}> 
                    <View style={{ flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "#e5efef", height: 100 }}>
                        <Text style={{ fontSize: 24, color: Color.bodyTextSecondary }}>Signup a new Account</Text>
                    </View>
                    <View style={{ flex: 4, justifyContent: "center", alignItems: "center", padding: 17, }}>
                        <Text style={{ fontSize: 18, color: Color.bodyTextSecondary, marginVertical: 4, width: "100%" }}>Username</Text>
                        <TextInput style={{ height: 40, borderWidth: 1, borderColor: "lightgray", width: "100%", fontSize: 16, padding: 8, marginBottom: 16 }} placeholder="Enter username" value={username} onChangeText={text => this.handleChangeText({ username: text })} />

                        <Text style={{ fontSize: 18, color: Color.bodyTextSecondary, marginVertical: 4, width: "100%" }}>Name</Text>
                        <TextInput style={{ height: 40, borderWidth: 1, borderColor: "lightgray", width: "100%", fontSize: 16, padding: 8, marginBottom: 16 }} placeholder="Enter your name" value={name} onChangeText={text => this.handleChangeText({ name: text })} />

                        <Text style={{ fontSize: 18, color: Color.bodyTextSecondary, marginVertical: 4, width: "100%" }}>Phone</Text>
                        <TextInput style={{ height: 40, borderWidth: 1, borderColor: "lightgray", width: "100%", fontSize: 16, padding: 8, marginBottom: 16 }} placeholder="Enter phone number" value={phone} onChangeText={text => this.handleChangeText({ phone: text })} />

                        <Text style={{ fontSize: 18, color: Color.bodyTextSecondary, marginVertical: 4, width: "100%" }}>Password</Text>
                        <TextInput style={{ height: 40, borderWidth: 1, borderColor: "lightgray", width: "100%", fontSize: 16, padding: 8, marginBottom: 16 }} placeholder="Enter password" value={password} onChangeText={text => this.handleChangeText({ password: text })} secureTextEntry={true} />

                        <Text style={{ fontSize: 18, color: Color.bodyTextSecondary, marginVertical: 4, width: "100%" }}>Confirm Password</Text>
                        <TextInput style={{ height: 40, borderWidth: 1, borderColor: "lightgray", width: "100%", fontSize: 16, padding: 8, marginBottom: 16 }} placeholder="Re-enter password" value={repassword} onChangeText={text => this.handleChangeText({ repassword: text })} secureTextEntry={true} />

                        <View style={{ width: "100%" }}>
                            <Button title="SIGNUP" onPress={this.handleSignup} />
                        </View>

                    </View>
                </ScrollView>
            </View>
        )
    }

}

export default SignupScreen