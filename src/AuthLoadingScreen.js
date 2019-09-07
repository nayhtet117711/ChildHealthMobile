import React, { Component } from "react"
import { View, Text, AsyncStorage, } from 'react-native'
import styles from "./styles"
import * as Color from "./config.colors"

class AuthLoadingScreen extends Component {

    componentDidMount() {
        this._bootstrapAsync();
      }
    
      _bootstrapAsync = async () => {
        const user = await AsyncStorage.getItem('user');
        
        // alert(user)
        this.props.navigation.navigate(user ? 'App' : 'Auth');
      };

    render() {
        console.disableYellowBox = true;
        
        return(
            <View style={styles.body}>
                <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
                    <Text style={{ fontSize: 18, color: Color.bodyTextSecondary }}>Loading ...</Text>
                </View>
            </View>
        )
    }
}

export default AuthLoadingScreen