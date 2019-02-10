import React from 'react';
import { AsyncStorage, StyleSheet, Button, View, TextInput, StatusBar, Text } from 'react-native';
import * as firebase from 'firebase';

import db from '../../configs/firebase';

export default class User extends React.Component {
  state = {
    email: "",
    password: "",
    uid: null,
    isLoading: true
  };

  handleChangeEmail = (value) => {
    this.setState({
      email: value
    });
  }

  handleChangePassword = (value) => {
    this.setState({
      password: value
    });
  }

  logIn = async (email, password) => {
    firebase.auth().signInWithEmailAndPassword(email, password).then((item) => {
      this.setState({
        uid: item.user.uid
      });
      this.setUserID(item.user.uid);
    }).catch((error) => {
      const { code, message } = error;
      alert(message);
    });
  };

  setUserID = async (uid) => {
    await AsyncStorage.setItem('uid', uid);
  }

  getUserID = async () => {
    await AsyncStorage.getItem('uid');
  }

  signUp = async (email, password) => {
    firebase.auth().createUserWithEmailAndPassword(email, password).catch((error) => {
      const { code, message } = error;
      alert(message);
    });
  };

  signOut = async () => {
    firebase.auth().signOut();
    this.setState({
      uid: null,
      isLoading: false
    });
    await AsyncStorage.removeItem('uid');
    await AsyncStorage.removeItem('routines');
    await AsyncStorage.removeItem('tasks');
  };

  UserScreen = () => {
    if(this.state.uid) {
      return (
        <View>
          <View style={styles.signOut}><Button color="#222" title="SignOut" onPress={ () => this.signOut() } /></View>
        </View>
      )
    } else {
      return (
        <View>
            <TextInput
              value={this.state.name}
              placeholder="Email"
              style={styles.textInput}
              onChangeText={this.handleChangeEmail}
            />
            <TextInput
              value={this.state.name}
              placeholder="Password"
              style={styles.textInput}
              onChangeText={this.handleChangePassword}
              secureTextEntry={true}
            />
            <View style={styles.buttonContainer}>
              <View style={styles.login}><Button color="#222" title="Login" onPress={ () => this.logIn(this.state.email, this.state.password) } /></View>
              <View style={styles.login}><Button color="#222" title="SignUp" onPress={ () => this.signUp(this.state.email, this.state.password) } /></View>
            </View>
        </View>
      )
    }
  }

  async componentWillMount() {
    await AsyncStorage.getItem('uid').then((uid) => {
      if(uid) {
        this.setState({
          uid: uid
        });
      }

      this.setState({
        isLoading: false
      });
    })
  }

  render() {
    if(this.state.isLoading) {
      return (
        <View style={styles.userContainer}>
          <View style={styles.headerContainer}>
          </View>
          <View style={styles.mainContainer}>
          </View>
        </View>
      );
    } else {
      return (
        <View style={styles.userContainer}>
          <View style={styles.headerContainer}>
          </View>
          <View style={styles.mainContainer}>
            {this.UserScreen()}
          </View>
        </View>
      );
    }
  }
}

const styles = StyleSheet.create({
  headerContainer: {
    backgroundColor: "#000",
    height: 48,
    width: "100%",
  },
  userContainer: {
    flex: 1,
    paddingTop: StatusBar.currentHeight
  },
  mainContainer: {
    backgroundColor: "#222",
    flex: 1
  },
  textInput: {
    color: '#eee',
    width: "100%",
    borderBottomWidth: 1,
    borderBottomColor: '#ff9922',
    fontSize: 18,
    marginTop: 16,
    marginBottom: 16,
    padding: 8
  },
  buttonContainer: {
    flexDirection: "row"
  },
  login: {
    flex: 1
  },
  signup: {
    flex: 1
  }
});