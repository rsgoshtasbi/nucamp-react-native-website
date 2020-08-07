import React, { Component } from "react";
import { Text, View, StyleSheet, SafeAreaView, ScrollView } from "react-native";
import DirectoryComponent from "./DirectoryComponent";
import CampsiteInfoComponent from "./CampsiteInfoComponent";
import { CAMPSITES } from "../shared/campsites";

class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {
      campsites: CAMPSITES,
      selectedCampsite: null,
    };
  }

  onCampsiteSelect(campsiteId) {
    this.setState({ selectedCampsite: campsiteId });
  }

  render() {
    return (
      <View style={{ flex: 1 }}>
        <DirectoryComponent
          campsites={this.state.campsites}
          onPress={(campsiteId) => this.onCampsiteSelect(campsiteId)}
        />
        <CampsiteInfoComponent
          campsite={
            this.state.campsites.filter(
              (campsite) => campsite.id === this.state.selectedCampsite
            )[0]
          }
        />
      </View>
    );
  }
}

export default Main;

//       // <ScrollView contentInsetAdjustmentBehavior="automatic">
//       //   <SafeAreaView />
//       <View style={{ flex: 1 }}>
//         <DirectoryComponent
//           campsites={this.state.campsites}
//           onPress={(campsiteId) => this.onCampsiteSelect(campsiteId)}
//         />
//         <CampsiteInfoComponent
//           campsite={
//             this.state.campsites.filter(
//               (campsite) => campsite.id === this.state.selectedCampsite
//             )[0]
//           }
//         />
//       </View>
//       //{/* </SafeAreaView> */}
//       //</ScrollView>
//       // <View>
//       //   <SafeAreaView />
//       //   <DirectoryComponent campsites={this.state.campsites} />
//       // </View>
//     );
//   }
// }
