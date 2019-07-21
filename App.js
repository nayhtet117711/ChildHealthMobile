import React from "react";
import { createAppContainer, createBottomTabNavigator } from "react-navigation";
import Icon from 'react-native-vector-icons/dist/FontAwesome5';
import HospitalScreen from "./src/HospitalScreen"
import ExpertScreen from "./src/ExpertScreen"
import BmiScreen from "./src/BmiScreen"
import * as Color from "./src/config.colors"

const TabScreens = createBottomTabNavigator(
  {
    Hospital: {
      screen: HospitalScreen,
      navigationOptions: ({ navigation }) => ({
        title: "Hospitals",
      }),
    },
    Bmi: {
      screen: BmiScreen,
      navigationOptions: ({ navigation }) => ({
        title: "BMI",
      }),
    },
    Expert: {
      screen: ExpertScreen,
      navigationOptions: ({ navigation }) => ({
        title: "Expert",
      }),
    },
  },
  {
    defaultNavigationOptions: ({ navigation }) => ({
      tabBarIcon: ({ focused, horizontal, tintColor }) => {
        const { routeName } = navigation.state;
        const iconName = routeName==="Hospital" ? "clinic-medical" 
          : routeName==="Bmi" ? "calculator"
          : routeName==="Expert" ? "user-md"
          : "question-circle"
        return <Icon name={iconName} size={24} color={tintColor} />
      },
    }),
    tabBarOptions: {
      activeTintColor: Color.tabTextSelected,
      inactiveTintColor: Color.tabText,
      labelStyle: {
        fontSize: 12,
      },
      tabStyle: {
        backgroundColor: Color.tabBackground,
      },
      keyboardHidesTabBar: true
    },
  }
);

const App = createAppContainer(TabScreens)

export default App;
