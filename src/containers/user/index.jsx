import React from 'react';
import {
  StyleSheet,
  Button,
  View,
  TextInput,
  StatusBar,
  Text,
} from 'react-native';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  changeLoginEmail,
  changeLoginPassword,
  login,
  signOut,
  signUp,
} from '../../actions/users';

const styles = StyleSheet.create({
  headerContainer: {
    backgroundColor: '#000',
    height: 48,
    width: '100%',
  },
  userContainer: {
    flex: 1,
    paddingTop: StatusBar.currentHeight,
  },
  mainContainer: {
    backgroundColor: '#222',
    flex: 1,
  },
  textInput: {
    color: '#eee',
    width: '100%',
    borderBottomWidth: 1,
    borderBottomColor: '#ff9922',
    fontSize: 18,
    marginTop: 16,
    marginBottom: 16,
    padding: 8,
  },
  buttonContainer: {
    flexDirection: 'row',
  },
  login: {
    flex: 1,
  },
  signup: {
    flex: 1,
  },
  logging: {
    color: '#fafafa',
    paddingTop: 8,
    paddingBottom: 8,
    paddingLeft: 8,
  },
});

class User extends React.Component {
  logIn = (email, password) => {
    const { login: handleLogIn } = this.props;
    handleLogIn(email, password);
  };

  signOut = () => {
    const { signOut: handleSignOut } = this.props;
    handleSignOut();
  };

  signUp = (email, password) => {
    const { signUp: handleSignUp } = this.props;
    handleSignUp(email, password);
  };

  UserScreen = () => {
    const {
      uid,
      email,
      password,
      changeLoginEmail: handleChangeLoginEmail,
      changeLoginPassword: handleChangeLoginPassword,
    } = this.props;
    if (uid) {
      return (
        <View>
          <View style={styles.signOut}>
            <Button color="#222" title="SignOut" onPress={() => this.signOut()} />
          </View>
        </View>
      );
    }

    return (
      <View>
        <TextInput
          value={email}
          placeholder="Email"
          style={styles.textInput}
          onChangeText={value => handleChangeLoginEmail(value)}
        />
        <TextInput
          value={password}
          placeholder="Password"
          style={styles.textInput}
          onChangeText={value => handleChangeLoginPassword(value)}
          secureTextEntry
        />
        <View style={styles.buttonContainer}>
          <View style={styles.login}><Button color="#222" title="Login" onPress={() => this.logIn(email, password)} /></View>
          <View style={styles.login}><Button color="#222" title="SignUp" onPress={() => this.signUp(email, password)} /></View>
        </View>
      </View>
    );
  }

  render() {
    const { isLoading } = this.props;
    if (isLoading) {
      return (
        <View style={styles.userContainer}>
          <View style={styles.headerContainer} />
          <View style={styles.mainContainer}>
            <Text style={styles.logging}>Loading...</Text>
          </View>
        </View>
      );
    }

    return (
      <View style={styles.userContainer}>
        <View style={styles.headerContainer} />
        <View style={styles.mainContainer}>
          {this.UserScreen()}
        </View>
      </View>
    );
  }
}

User.defaultProps = {
  login: null,
  signOut: false,
  signUp: null,
  isLoading: null,
  uid: null,
  email: null,
  password: null,
  changeLoginEmail: null,
  changeLoginPassword: null,
};

User.propTypes = {
  login: PropTypes.func,
  signOut: PropTypes.func,
  signUp: PropTypes.func,
  isLoading: PropTypes.bool,
  uid: PropTypes.string,
  email: PropTypes.string,
  password: PropTypes.string,
  changeLoginEmail: PropTypes.func,
  changeLoginPassword: PropTypes.func,
};

const mapStateToProps = state => ({
  uid: state.users.uid,
  email: state.users.email,
  password: state.users.password,
  isLoading: state.users.isLoading,
});

const mapDispatchToProps = dispatch => ({
  changeLoginEmail: email => dispatch(changeLoginEmail(email)),
  changeLoginPassword: password => dispatch(changeLoginPassword(password)),
  login: (email, password) => dispatch(login(email, password)),
  signOut: () => dispatch(signOut()),
  signUp: (email, password) => dispatch(signUp(email, password)),
});

export default connect(mapStateToProps, mapDispatchToProps)(User);
