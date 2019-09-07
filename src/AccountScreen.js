import React, { Component   } from "react"
import { View, Text, AsyncStorage, Button } from 'react-native'
import styles from "./styles"
import * as Color from "./config.colors"

class AccountScreen extends Component {
    constructor(props) {
        super(props)
        this.state = {
            user: { }
        }
    }

    async componentDidMount() {
        const user = await AsyncStorage.getItem('user')
      
        this.setState({ user: JSON.parse(user) })
    }

    handleLogout = async () => {
        await AsyncStorage.removeItem('user')
        this.props.navigation.navigate('AuthLoading');
    }

    render() {
        console.disableYellowBox = true;

        const { user } = this.state
        return(
            <View style={styles.body}>
                <View style={{ flex: 2, justifyContent: "center", alignItems: "center", padding: 16 }}>
                    <View style={{ marginVertical: 16, flex: 3, alignItems: "center", justifyContent: "center"}}>
                        <Text style={{ fontSize: 18, color: Color.bodyTextSecondary, marginVertical: 8, }}>Account</Text>
                        <Text style={{ fontSize: 30, color: Color.bodyTextSecondary, marginVertical: 8, color: "green" }}>{user.name}</Text>
                        <View style={{ flexDirection: "row", width: "100%",  }}>
                            <Text style={{ fontSize: 18, color: Color.bodyTextSecondary, marginVertical: 8, }}>username: </Text>
                            <Text style={{ fontSize: 18, color: 'green', marginVertical: 8, }}>{user.username}</Text>
                        </View>
                        <View style={{ flexDirection: "row", width: "100%",  }}>
                            <Text style={{ fontSize: 18, color: Color.bodyTextSecondary, marginVertical: 8, }}>phone: </Text>
                            <Text style={{ fontSize: 18, color: 'green', marginVertical: 8, }}>{user.phone}</Text>
                        </View>
                    </View>
                    <View style={{ width: "100%", marginTop: 16, flex: 2,}} >
                        <Button title="Logout" onPress={this.handleLogout} color="red"  style={{ border: null, backgroundColor: "white" }} />
                    </View> 
                </View>
            </View>
        )
    }
}

export default AccountScreen