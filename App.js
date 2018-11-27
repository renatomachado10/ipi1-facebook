import React, { Component } from 'react';
import { Text, TouchableOpacity, ScrollView, View, StyleSheet } from 'react-native';
import Expo, { Constants } from 'expo';

export default class App extends Component {
  state = {
    responseJSON: null,
  };
  callGraph = async token => {
    const response = await fetch(
      `https://graph.facebook.com/me?access_token=${token}&fields=id,name,email,about,picture`
    );
    const responseJSON = JSON.stringify(await response.json());
    this.setState({ responseJSON });
  };

  login = async () => {
    const {
      type,
      token,
    } = await Expo.Facebook.logInWithReadPermissionsAsync('YOUR_ID_HERE :)', {
      permissions: ['public_profile', 'email', 'user_friends'],
    });

    if (type === 'success') {
      this.callGraph(token);

      this.firebaseLogin(token);
    }
  };

  firebaseLogin = token => {};

  renderButton = () => (
    <TouchableOpacity onPress={() => this.login()}>
      <View
        style={{
          width: '80%',
          alignSelf: 'center',
          borderRadius: 4,
          padding: 24,
          backgroundColor: '#3B5998',
        }}>
        <Text style={{ color: 'white', fontWeight: 'bold' }}>
          Entrar no Facebook
        </Text>
      </View>
    </TouchableOpacity>
  );
  renderValue = value => (
    <Text key={value} style={styles.paragraph}>{value}</Text>
  );
  render() {
    return (
      <ScrollView style={styles.container}>
        {this.state.responseJSON &&
          this.renderValue('User data : ' + this.state.responseJSON)}

        {this.renderButton()}
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingTop: Constants.statusBarHeight,
    backgroundColor: 'black',
  },
  paragraph: {
    margin: 24,
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#34495e',
  },
});
