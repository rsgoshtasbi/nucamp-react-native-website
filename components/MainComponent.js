import React, { Component } from "react";
import { Text, View, StyleSheet, SafeAreaView, ScrollView } from "react-native";
import { CAMPSITES } from "../shared/campsites";
import DirectoryComponent from "./DirectoryComponent";

export class MainComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      campsites: CAMPSITES,
    };
  }

  render() {
    return (
      // <ScrollView contentInsetAdjustmentBehavior="automatic">
      //   <SafeAreaView />
      <DirectoryComponent campsites={this.state.campsites} />
      //{/* </SafeAreaView> */}
      //</ScrollView>
      // <View>
      //   <SafeAreaView />
      //   <DirectoryComponent campsites={this.state.campsites} />
      // </View>
    );
  }
}

const styles = StyleSheet.create({
  safeArea: {
    paddingTop: Platform.OS === "android" ? 25 : 0,
  },
});

export default MainComponent;
