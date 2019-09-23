import React, { Component } from "react"
import { View, Text, AsyncStorage, Button, Alert, Image, ScrollView, TouchableNativeFeedback, StatusBar } from 'react-native'
import { Avatar, Icon } from "react-native-elements"
import Icon2 from "react-native-vector-icons/dist/FontAwesome5"
import styles from "./styles"
import * as Color from "./config.colors"

class AccountScreen extends Component {
    constructor(props) {
        super(props)
        this.state = {
            user: {},
            ruleAddedView: false,
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

    handleRuleAddScreen = (show) => {
        this.setState({ ruleAddedView: show })
    }

    imageUri = `https://cloudcoach.com/wp-content/uploads/2017/10/CC-Vegas-home-page-background.png`;

    userImageUri = `https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRiasajo6RFSTR2RkHQrezDFvJ9QY85uHTkci7cpPof5hZSvuiq7g`

    render() {
        console.disableYellowBox = true;

        const { user, ruleAddedView } = this.state

        if (ruleAddedView === true) {
            return (
                <RuleAddedView handleRuleAddScreen={this.handleRuleAddScreen} />
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
    const { handleRuleAddScreen } = props
    return (
        <View style={styles.body}>
            <StatusBar backgroundColor="#0E6655" barStyle="light-content" />
            <View style={{ padding: 16, backgroundColor: "#0E6655", flexDirection: "row" }}>
                <TouchableNativeFeedback style={{ padding: 4 }} onPress={() => handleRuleAddScreen(false)} >
                    <Icon2 name="arrow-left" size={22} color={"white"} />
                </TouchableNativeFeedback>
                <Text style={{ fontSize: 22, flex: 1, textAlign: "center", color: "white" }}>New Rule</Text>
            </View>
            <ScrollView contentInsetAdjustmentBehavior="automatic">

            </ScrollView>

        </View>
    )
}

export default AccountScreen