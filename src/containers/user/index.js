import React from 'react';
import { AsyncStorage, StyleSheet, Button, View, TextInput, StatusBar, Text } from 'react-native';
import * as firebase from 'firebase';
import { connect } from 'react-redux';

import { changeLoginEmail, changeLoginPassword, login, signOut, isLoggedin } from '../../actions/users'

class User extends React.Component {
  state = {
    email: "",
    password: "",
    uid: null,
    isLoading: true
  };

  logIn = async (email, password) => {
    this.props.login(email, password);
  };

  signUp = async (email, password) => {
    firebase.auth().createUserWithEmailAndPassword(email, password).catch((error) => {
      const { code, message } = error;
      alert(message);
    });
  };

  signOut = async () => {
    this.props.signOut();
  };

  UserScreen = () => {
    if(this.props.uid) {
      return (
        <View>
          <View style={styles.signOut}><Button color="#222" title="SignOut" onPress={ () => this.signOut() } />
          </View>
        </View>
      )
    } else {
      return (
        <View>
            <TextInput
              value={this.props.email}
              placeholder="Email"
              style={styles.textInput}
              onChangeText={(value) => this.props.changeLoginEmail(value)}
            />
            <TextInput
              value={this.props.password}
              placeholder="Password"
              style={styles.textInput}
              onChangeText={(value) => this.props.changeLoginPassword(value)}
              secureTextEntry={true}
            />
            <View style={styles.buttonContainer}>
              <View style={styles.login}><Button color="#222" title="Login" onPress={ () => this.logIn(this.props.email, this.props.password) } /></View>
              <View style={styles.login}><Button color="#222" title="SignUp" onPress={ () => this.signUp(this.props.email, this.props.password) } /></View>
            </View>
        </View>
      )
    }
  }

  async componentWillMount() {
    this.props.isLoggedin()
  }

  render() {
    if(this.props.isLoading) {
      return (
        <View style={styles.userContainer}>
          <View style={styles.headerContainer}>
          </View>
          <View style={styles.mainContainer}>
            <Text  style={styles.logging}>Loading...</Text>
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
  },
  logging: {
    color: "#fafafa",
    paddingTop: 8,
    paddingBottom: 8,
    paddingLeft: 8,
  }
});

const mapStateToProps = state => ({
  uid: state.users.uid,
  email: state.users.email,
  password: state.users.password,
  isLoading: state.users.isLoading
});

const mapDispatchToProps = dispatch => ({
  changeLoginEmail: (email) => dispatch(changeLoginEmail(email)),
  changeLoginPassword: (password) => dispatch(changeLoginPassword(password)),
  login: (email, password) => dispatch(login(email, password)),
  signOut: () => dispatch(signOut()),
  isLoggedin: () => dispatch(isLoggedin()),
});

export default connect(mapStateToProps, mapDispatchToProps)(User)