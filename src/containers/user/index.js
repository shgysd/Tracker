import React from 'react';
import { AsyncStorage, StyleSheet, Button, View, TextInput, StatusBar } from 'react-native';
import * as firebase from 'firebase';
import { connect } from 'react-redux';

import { changeLoginEmail, changeLoginPassword, login } from '../../actions/users'

class User extends React.Component {
  state = {
    email: "",
    password: "",
    uid: null,
    isLoading: true
  };

  logIn = async (email, password) => {
    // firebase.auth().signInWithEmailAndPassword(email, password).then((item) => {
    //   console.log(item);
    //   this.setState({
    //     uid: item.user.uid
    //   });
    //   this.setUserID(item.user.uid);
    // }).catch((error) => {
    //   const { code, message } = error;
    //   alert(message);
    // });
    this.props.login(email, password);
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
    console.log(this.props.uid);
    if(this.props.uid) {
      return (
        <View>
          <View style={styles.signOut}><Button color="#222" title="SignOut" onPress={ () => this.signOut() } /></View>
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

const mapStateToProps = state => ({
  uid: state.users.uid,
  email: state.users.email,
  password: state.users.password
});

const mapDispatchToProps = dispatch => ({
  changeLoginEmail: (email) => dispatch(changeLoginEmail(email)),
  changeLoginPassword: (password) => dispatch(changeLoginPassword(password)),
  login: (email, password) => dispatch(login(email, password)),
});

export default connect(mapStateToProps, mapDispatchToProps)(User)