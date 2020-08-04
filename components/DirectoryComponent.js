import React, { Component } from "react";
import { Text, View } from "react-native";
import { FlatList } from "react-native";
import { ListItem } from "react-native-elements";

export class DirectoryComponent extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const renderDirectoryItem = ({ item }) => {
      return (
        <ListItem
          title={item.name}
          subtitle={item.description}
          leftAvatar={{ source: require("./images/react-lake.jpg") }}
        />
      );
    };

    return (
      <FlatList
        data={this.props.campsites}
        renderItem={renderDirectoryItem}
        keyExtractor={(item) => item.id.toString()}
      />
    );
  }
}

export default DirectoryComponent;
