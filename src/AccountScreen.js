import React, { Component } from "react"
import { View, Text, AsyncStorage, Button, Alert, Image, ScrollView, TouchableNativeFeedback } from 'react-native'
import { Avatar, Icon } from "react-native-elements"
import styles from "./styles"
import * as Color from "./config.colors"

class AccountScreen extends Component {
    constructor(props) {
        super(props)
        this.state = {
            user: {}
        }
    }

    async componentDidMount() {
        const user = await AsyncStorage.getItem('user')

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

    imageUri = `https://cloudcoach.com/wp-content/uploads/2017/10/CC-Vegas-home-page-background.png`;

    userImageUri = `https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRiasajo6RFSTR2RkHQrezDFvJ9QY85uHTkci7cpPof5hZSvuiq7g`

    render() {
        console.disableYellowBox = true;

        const { user } = this.state
        return (
            <View style={styles.body}>
            
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
                    <View style={{ }}>
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
                        <TouchableNativeFeedback onPress={this.handleLogout} >
                            <View style={{ padding: 12, flexDirection: "row", justifyContent: "center", alignItems: "center", backgroundColor: Color.tabTextSelected, borderRadius: 8}}>
                                {/* <Icon name="logout" color={Color.tabBackground} size={30} style={{ paddingHorizontal: 8}} /> */}
                                <Text style={{ fontSize: 22, color: Color.bodyText, color: Color.tabBackground, paddingHorizontal: 8 }}>Logout</Text>
                            </View>
                        </TouchableNativeFeedback>
                    </View>                   
                </ScrollView>
                
            </View>
        )
    }
}

export default AccountScreen