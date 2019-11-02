import React, { Component } from "react"
import { View, Text, FlatList, TouchableNativeFeedback, Image } from "react-native"
import { Avatar } from "react-native-elements"
import Icon from "react-native-vector-icons/dist/FontAwesome5"
import * as Color from "./config.colors"
import styles from "./styles"
import { ScrollView } from "react-native-gesture-handler";

class HospitalScreen extends Component {
    constructor(props) {
        super(props)
        this.state = {
            isHospitalView: false,
            selectedHospital: {},
            hospitalList: [
                {
                    name: "Mandalay General Hospital",
                    city: "Mandalay",
                    phones: ["0221041",],
                    address: "30 Street, between 74 and 77 Streets in Chanayethazan Township",
                    uri: require("./hospital-img/mandalay-general-hospital.jpg")
                },
                {
                    name: "Mandalay Children Hospital",
                    city: "Mandalay",
                    phones: ["0224917"],
                    address: "Corner of 30 and 74 streets",
                    uri: require("./hospital-img/mandalay-children-hospital.jpeg")
                },
                {
                    name: "City Hospital",
                    city: "Mandalay",
                    phones: ["09797008700"],
                    address: "Theikpan Street,between 65 and 66 streets,Mandalay",
                    uri: require("./hospital-img/city-hospital.jpeg")
                },
                {
                    name: "Pun Hlaing Siloam Hospital",
                    city: "Mandalay",
                    phones: ["09952207"],
                    address: "No.97, 73 Street,Between 31 and 32 Streets ,Chan Aye Tharzan Township,Mandalay",
                    uri: require("./hospital-img/Pun-Hlaing-Siloam-hospital.png")
                },
                {
                    name: "Myat Thukha Hospital",
                    city: "Mandalay",
                    phones: ["09976636226"],
                    address: "30 Street,Between 70 and 71 streets,Mandalay",
                    uri: require("./hospital-img/myat-thukha-hospital.jpeg")
                },
                {
                    name: "Mandalar Hospital",
                    city: "Mandalay",
                    phones: ["09423343640"],
                    address: "33 Street,Between 68 and 69 streets,Mandalay",
                    uri: require("./hospital-img/mandalar-hospital.jpg")
                },
                {
                    name: "Nyein Hospital",
                    city: "Mandalay",
                    phones: ["024065460"],
                    address: "82 Street,Between 29 and 30 streets,Mandalay",
                    uri: require("./hospital-img/nyein-hospital.jpeg")
                },
                {
                    name: "Grand Mandalay Hospital",
                    city: "Mandalay",
                    phones: ["09404090701"],
                    address: "Corner of 30 and 74 streets,Mandalay",
                    uri: require("./hospital-img/grand-mandalay-hospital.jpeg")
                },
                {
                    name: "Royal Hospital",
                    city: "Mandalay",
                    phones: ["024033258"],
                    address: "31 Street,Between 69 and 70 streets,Mandalay",
                    uri: require("./hospital-img/royal-hospital.jpg")
                },
                {
                    name: "300 Bedded Teaching",
                    city: "Mandalay",
                    phones: ["0280959"],
                    address: "31 Street,Between Thazin and Ngu War streets,Mandalay",
                    uri: require("./hospital-img/300-bedded-hospital.jpg")
                },
                {
                    name: "Thit Sar Yarzar Hospital",
                    city: "Mandalay",
                    phones: ["0233423"],
                    address: "29 Street,Between 76 and 77 streets,Mandalay",
                    uri: require("./hospital-img/thitsar-yarzar-hospital.png")
                },
                {
                    name: "Ingyin Phyu Specialist Hospital",
                    city: "Mandalay",
                    phones: ["024072289"],
                    address: "30 Street,Between 63 and 64 streets,Mandalay",
                    uri: require("./hospital-img/ingyin-phyu-specialist-hospital.jpg")
                },
                {
                    name: "Aye Thiri Hospital",
                    city: "Mandalay",
                    phones: ["0232764"],
                    address: "26 Street,Between 72 and 73 streets,Mandalay",
                    uri: require("./hospital-img/aye-thiri-hospital.jpeg")
                },
                {
                    name: "Pan Hlaing Hospital",
                    city: "Mandalay",
                    phones: ["0924069203"],
                    address: "No.97 , 73 Street,Between 31 and 32 streets,Mandalay",
                    uri: require("./hospital-img/Pun-Hlaing-Siloam-hospital.png")
                },
                {
                    name: "Royal Rose Hospital",
                    city: "Mandalay",
                    phones: ["024069487"],
                    address: "No.2 ,Between 76 and 77 streets,Between 31 and 32 streets,Mandalay",
                    uri: require("./hospital-img/royal-rose-hospital.jpeg")
                },
                {
                    name: "Chan Nyein Aung Hospital",
                    city: "Mandalay",
                    phones: ["09779991732"],
                    address: "74 Street,Between 27 and 28 streets,Mandalay",
                    uri: require("./hospital-img/chan-nyein-aung-hospital.jpg")
                },
            ]
        }
    }

    render() {
        const { isHospitalView } = this.state
        if (isHospitalView) return this._rendHospitalView()
        else return this._renderHospitalListView()
    }

    _renderHospitalListView = () => {
        const { hospitalList } = this.state
        return (
            <View style={styles.body}>
                <FlatList
                    data={hospitalList}
                    keyExtractor={(d, index) => d.name + index}
                    renderItem={item => this._renderHospitalItem({ ...item })}
                />
            </View>
        )
    }

    _rendHospitalView = () => {
        const { selectedHospital } = this.state
        return (
            <View style={styles.body}>
                <ScrollView contentInsetAdjustmentBehavior="automatic">
                    <View style={{ borderBottomColor: Color.listDivider, borderBottomWidth: 1 }}>
                        <Image resizeMode="cover" style={{ width: "100%", height: 300 }} source={{ uri: selectedHospital.uri }} />
                        <View style={{ position: "absolute", top: 0, bottom: 0, left: 0, right: 0, backgroundColor: "#247554dd" }} />
                        <View style={{ position: "absolute", bottom: 10, left: 10, flexDirection: "row", alignItems: "center" }}>
                            <Avatar rounded size="medium" source={{ uri: selectedHospital.uri }} />
                            <Text style={{ paddingHorizontal: 16, fontSize: 20, color: Color.bodyBackground, fontWeight: "bold" }}>{selectedHospital.name}</Text>
                        </View>
                    </View>

                    <TouchableNativeFeedback onPress={() => null}>
                        <View>
                            <View style={{ padding: 16, paddingBottom: 8, paddingRight: 24, flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
                                <Text style={{ fontSize: 16, color: Color.bodyText }}>{selectedHospital.city}</Text>
                                <View style={{ justifyContent: "center", alignItems: "center", width: 32, height: 32, borderColor: Color.listDivider, borderWidth: 1, borderRadius: 16, }}>
                                    <Icon name="map-marker-alt" color={Color.tabTextSelected} size={20} />
                                </View>
                            </View>
                            <View style={{ paddingHorizontal: 16, paddingVertical: 12}}>
                                <View style={styles.divider} />
                                <Text style={{ paddingTop: 8, fontSize: 13, color: Color.bodyTextSecondary }}>{selectedHospital.address}</Text>
                            </View>
                        </View>
                    </TouchableNativeFeedback>
                    <View style={styles.divider} />

                    {selectedHospital.phones.map((phone, k) => (
                        <View key={k}>
                            <TouchableNativeFeedback onPress={() => null} >
                                <View style={{ padding: 16, paddingRight: 24, flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
                                    <Text style={{ fontSize: 16, color: Color.bodyText }}>{phone}</Text>
                                    <View style={{ justifyContent: "center", alignItems: "center", width: 32, height: 32, borderColor: Color.listDivider, borderWidth: 1, borderRadius: 16, }}>
                                        <Icon name="phone" color={Color.tabTextSelected} size={20} />
                                    </View>
                                </View>
                            </TouchableNativeFeedback>
                            <View style={styles.divider} />
                        </View>
                    ))}

                </ScrollView>

                <View style={{ flexDirection: "row", margin: 0, position: "absolute", top: 0, right: -2, left: -2, backgroundColor: "#f5fff522", padding: 8, elevation: 2, borderColor: "white" }}>
                    <TouchableNativeFeedback style={{ padding: 4 }} onPress={this.onBackFromHospitalView} >
                        <Icon name="arrow-left" size={24} color={Color.bodyBackground} />
                    </TouchableNativeFeedback>
                </View>
            </View>
        )
    }

    _renderHospitalItem = ({ item, index }) => {
        return (
            <TouchableNativeFeedback onPress={() => this.onClickedHospital(item)}>
                <View style={styles.listItemContainer}>
                    {index > 0 && <View style={styles.divider} />}
                    <View style={[styles.listItem, { paddingLeft: 8 }]}>
                        <Avatar rounded size="medium" source={item.uri} />
                        <View style={{ flexGrow: 1, paddingLeft: 8 }}>
                            <Text style={{ fontSize: 16, color: Color.bodyText, fontWeight: "600" }}>{item.name}</Text>
                            <Text style={{ fontSize: 13, color: Color.bodyTextSecondary, fontWeight: "100" }}>{item.city}</Text>
                        </View>
                        <View style={{ paddingRight: 8 }}>
                            <Icon name="angle-right" size={16} color={Color.listDivider} />
                        </View>
                    </View>
                </View>
            </TouchableNativeFeedback>
        )
    }

    onClickedHospital = selectedHospital => {
        this.setState({ isHospitalView: true, selectedHospital })
    }

    onBackFromHospitalView = () => {
        this.setState({ isHospitalView: false, selectedHospital: {} })
    }

}

export default HospitalScreen