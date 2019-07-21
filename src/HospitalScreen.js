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
                { name: "Hospital1", city: "Mandalay", phones: ["0944335564", "0969847363", "0134343"], uri: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTvKTSduZckztjiCGCI3rGrL2dw7VhJZMjXMTz0hJviDg2WhG-jXw" },
                { name: "Hospital2", city: "Mandalay", phones: ["0944335564", "0969847363", "0134343"], uri: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTvKTSduZckztjiCGCI3rGrL2dw7VhJZMjXMTz0hJviDg2WhG-jXw" },
                { name: "Hospital3", city: "Mandalay", phones: ["0944335564", "0969847363", "0134343"], uri: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTvKTSduZckztjiCGCI3rGrL2dw7VhJZMjXMTz0hJviDg2WhG-jXw" },
                { name: "Hospital4", city: "Mandalay", phones: ["0944335564", "0969847363", "0134343"], uri: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTvKTSduZckztjiCGCI3rGrL2dw7VhJZMjXMTz0hJviDg2WhG-jXw" },
                { name: "Hospital5", city: "Mandalay", phones: ["0944335564", "0969847363", "0134343"], uri: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTvKTSduZckztjiCGCI3rGrL2dw7VhJZMjXMTz0hJviDg2WhG-jXw" },
                { name: "Hospital6", city: "Mandalay", phones: ["0944335564", "0969847363", "0134343"], uri: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTvKTSduZckztjiCGCI3rGrL2dw7VhJZMjXMTz0hJviDg2WhG-jXw" },
                { name: "Hospital7", city: "Mandalay", phones: ["0944335564", "0969847363", "0134343"], uri: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTvKTSduZckztjiCGCI3rGrL2dw7VhJZMjXMTz0hJviDg2WhG-jXw" },
                { name: "Hospital8", city: "Mandalay", phones: ["0944335564", "0969847363", "0134343"], uri: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTvKTSduZckztjiCGCI3rGrL2dw7VhJZMjXMTz0hJviDg2WhG-jXw" },
                { name: "Hospital9", city: "Mandalay", phones: ["0944335564", "0969847363", "0134343"], uri: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTvKTSduZckztjiCGCI3rGrL2dw7VhJZMjXMTz0hJviDg2WhG-jXw" },
                { name: "Hospital10", city: "Mandalay", phones: ["0944335564", "0969847363", "0134343"], uri: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTvKTSduZckztjiCGCI3rGrL2dw7VhJZMjXMTz0hJviDg2WhG-jXw" },
                { name: "Hospital11", city: "Mandalay", phones: ["0944335564", "0969847363", "0134343"], uri: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTvKTSduZckztjiCGCI3rGrL2dw7VhJZMjXMTz0hJviDg2WhG-jXw" },
                { name: "Hospital12", city: "Mandalay", phones: ["0944335564", "0969847363", "0134343"], uri: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTvKTSduZckztjiCGCI3rGrL2dw7VhJZMjXMTz0hJviDg2WhG-jXw" },
                { name: "Hospital13", city: "Mandalay", phones: ["0944335564", "0969847363", "0134343"], uri: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTvKTSduZckztjiCGCI3rGrL2dw7VhJZMjXMTz0hJviDg2WhG-jXw" },
                { name: "Hospital14", city: "Mandalay", phones: ["0944335564", "0969847363", "0134343"], uri: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTvKTSduZckztjiCGCI3rGrL2dw7VhJZMjXMTz0hJviDg2WhG-jXw" },
                { name: "Hospital15", city: "Mandalay", phones: ["0944335564", "0969847363", "0134343"], uri: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTvKTSduZckztjiCGCI3rGrL2dw7VhJZMjXMTz0hJviDg2WhG-jXw" },
                { name: "Hospital16", city: "Mandalay", phones: ["0944335564", "0969847363", "0134343"], uri: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTvKTSduZckztjiCGCI3rGrL2dw7VhJZMjXMTz0hJviDg2WhG-jXw" },
                { name: "Hospital17", city: "Mandalay", phones: ["0944335564", "0969847363", "0134343"], uri: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTvKTSduZckztjiCGCI3rGrL2dw7VhJZMjXMTz0hJviDg2WhG-jXw" },
                { name: "Hospital18", city: "Mandalay", phones: ["0944335564", "0969847363", "0134343"], uri: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTvKTSduZckztjiCGCI3rGrL2dw7VhJZMjXMTz0hJviDg2WhG-jXw" },
                { name: "Hospital19", city: "Mandalay", phones: ["0944335564", "0969847363", "0134343"], uri: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTvKTSduZckztjiCGCI3rGrL2dw7VhJZMjXMTz0hJviDg2WhG-jXw" },
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
                        <Image resizeMode="cover" style={{ width: "100%", height: 200 }} source={{ uri: selectedHospital.uri }} />
                        <View style={{ position: "absolute", top: 0, bottom: 0, left: 0, right: 0, backgroundColor: "#247554dd" }} />
                        <View style={{ position: "absolute", bottom: 10, left: 10, flexDirection: "row", alignItems: "center" }}>
                            <Avatar rounded size="medium" source={{ uri: selectedHospital.uri }} />
                            <Text style={{ paddingHorizontal: 16, fontSize: 20, color: Color.bodyBackground, fontWeight: "bold" }}>{selectedHospital.name}</Text>
                        </View>
                    </View>
                    
                    <TouchableNativeFeedback onPress={()=>null}>
                        <View style={{ padding: 16, paddingRight: 24, flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
                            <Text style={{ fontSize: 16, color: Color.bodyText }}>{selectedHospital.city}</Text>
                            <View style={{ justifyContent: "center", alignItems: "center", width: 32, height: 32, borderColor: Color.listDivider, borderWidth: 1, borderRadius: 16, }}>
                                <Icon name="map-marker-alt" color={Color.tabTextSelected} size={20} />
                            </View>
                        </View>
                    </TouchableNativeFeedback>
                    <View style={styles.divider} />
                    
                    {selectedHospital.phones.map((phone, k) => (
                        <View key={k}>
                            <TouchableNativeFeedback onPress={()=>null}>
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
                        <Avatar rounded size="medium" source={{ uri: item.uri }} />
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