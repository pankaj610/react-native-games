import React, { Component } from "react";
import { StyleSheet, Text, View } from "react-native";  

class Home extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {}

  componentWillUnmount() {}

  render() {
    return (
      <View style={styles.container}>
        <Text>Devotees List</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

// const mapStateToProps = (state) => ({
//   isSignedIn: state.appReducer.isSignedIn,
// });

// const mapDispatchToProps = {
//   signOut,
// };

export default Home;
