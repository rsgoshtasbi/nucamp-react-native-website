import React, { Component } from "react";
import {
  Text,
  View,
  ScrollView,
  FlatList,
  Modal,
  Button,
  StyleSheet,
  SafeAreaView,
} from "react-native";
import { Card, Icon, Rating, Input } from "react-native-elements";
import { connect } from "react-redux";
import { baseUrl } from "../shared/baseUrl";
import { postFavorite, postComment } from "../redux/ActionCreators";

const mapStateToProps = (state) => {
  return {
    campsites: state.campsites,
    comments: state.comments,
    favorites: state.favorites,
    comment: state.comment,
  };
};

const mapDispatchToProps = {
  postFavorite,
  postComment,
};

function RenderCampsite(props) {
  if (props.campsite) {
    const { campsite } = props;

    return (
      <Card
        featuredTitle={campsite.name}
        image={{ uri: baseUrl + campsite.image }}
      >
        <Text style={{ margin: 10 }}>{campsite.description}</Text>
        <View style={styles.cardRow}>
          <Icon
            name={props.favorite ? "heart" : "heart-o"}
            type="font-awesome"
            color="#f50"
            raised
            reverse
            onPress={() =>
              props.favorite
                ? console.log("Already set as a favorite")
                : props.markFavorite()
            }
          />
          <Icon
            name="pencil"
            type="font-awesome"
            color="#5637DD"
            style={styles.cardItem}
            raised
            reverse
            onPress={() => props.onShowModal()}
          />
        </View>
      </Card>
    );
  }
  return <View />;
}

function RenderComments({ comments }) {
  if (comments) {
    const renderCommentItem = ({ item }) => {
      return (
        <View style={{ margin: 10 }}>
          <Text style={{ fontSize: 14 }}>{item.text}</Text>
          {/* <Text style={{ fontSize: 12 }}>{item.rating}</Text> */}
          <Rating
            showRating
            readonly
            startingValue={item.rating}
            imageSize={10}
            style={{ paddingVertical: "5%", alignItems: "flex-start" }}
          />
          <Text
            style={{ fontSize: 12 }}
          >{` -- ${item.author}, ${item.data}`}</Text>
        </View>
      );
    };

    return (
      <Card title="Comments">
        <FlatList
          data={comments}
          renderItem={renderCommentItem}
          keyExtractor={(item) => item.id.toString()}
        />
      </Card>
    );
  }
  return <View />;
}

class CampsiteInfo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // favorite: false,
      showModal: false,
      rating: 5,
      author: "",
      text: "",
    };
  }

  static navigationOptions = {
    title: "Feedback",
  };

  toggleModal() {
    this.setState({ showModal: !this.state.showModal });
  }

  handleComment(campsiteId, author, text, rating) {
    this.props.postComment(campsiteId, author, text, rating);
    this.toggleModal();
  }

  resetForm() {
    this.setState({
      showModal: false,
      rating: 5,
      author: "",
      text: "",
    });
  }

  markFavorite(campsiteId) {
    this.props.postFavorite(campsiteId);
  }

  static navigationOptions = {
    title: "Campsite Information",
  };

  render() {
    const campsiteId = this.props.navigation.getParam("campsiteId");
    const campsite = this.props.campsites.campsites.filter(
      (campsite) => campsite.id === campsiteId
    )[0];
    const comments = this.props.comments.comments.filter(
      (comment) => comment.campsiteId === campsiteId
    );
    return (
      <ScrollView>
        <RenderCampsite
          campsite={campsite}
          favorite={this.props.favorites.includes(campsiteId)}
          markFavorite={() => this.markFavorite(campsiteId)}
          onShowModal={() => this.toggleModal()}
        />
        <RenderComments comments={comments} />
        <Modal
          animationType={"slide"}
          transparent={false}
          visible={this.state.showModal}
          onRequestClose={() => this.toggleModal()}
        >
          <SafeAreaView style={{ flex: 1 }}>
            <View style={styles.modal}>
              <Rating
                showRating
                startingValue={this.state.rating}
                imageSize={40}
                onFinishRating={(rating) => this.setState({ rating: rating })}
                style={{ paddingVertical: 10 }}
              />
              <Input
                placeholder="author"
                leftIcon={{ type: "font-awesome", name: "user-o" }}
                leftIconContainerStyle={{ paddingRight: 10 }}
                onChangeText={(author) => this.setState({ author: author })}
              />
              <Input
                placeholder="comment"
                leftIcon={{ type: "font-awesome", name: "comment-o" }}
                leftIconContainerStyle={{ paddingRight: 10 }}
                onChangeText={(text) => this.setState({ text: text })}
              />
              <View>
                <Button
                  title="Submit"
                  color="#5637DD"
                  onPress={() => {
                    this.handleComment(
                      campsiteId,
                      this.state.author,
                      this.state.text,
                      this.state.rating
                    );
                    this.resetForm();
                  }}
                />
              </View>
              <View style={{ margin: 10 }}>
                <Button
                  onPress={() => {
                    this.toggleModal();
                    this.resetForm();
                  }}
                  color="#808080"
                  title="Cancel"
                />
              </View>
            </View>
          </SafeAreaView>
        </Modal>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  cardRow: {
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
    flexDirection: "row",
    margin: 20,
  },
  cardItem: {
    flex: 1,
    margin: 10,
  },
  modal: {
    justifyContent: "center",
    margin: 20,
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(CampsiteInfo);
