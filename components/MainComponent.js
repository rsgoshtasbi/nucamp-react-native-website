import React, { Component } from "react";
import { View, Platform } from "react-native";
import { createStackNavigator } from "react-navigation";
import Directory from "./DirectoryComponent";
import CampsiteInfo from "./CampsiteInfoComponent";

const DirectoryNavigator = createStackNavigator(
  {
    Directory: { screen: Directory },
    CampsiteInfo: { screen: CampsiteInfo },
  },
  {
    initialRouteName: "Directory",
    navigationOptions: {
      headerStyle: {
        backgroundColor: "#5637DD",
      },
      headerTintColor: "#fff",
      headerTitleStyle: {
        color: "#fff",
      },
    },
  }
);

class Main extends Component {
  render() {
    return (
      <View
        style={{
          flex: 1,
          paddingTop:
            Platform.OS === "ios" ? 0 : Expo.Constants.statusBarHeight,
        }}
      >
        <DirectoryNavigator />
      </View>
    );
  }
}

export default Main;
