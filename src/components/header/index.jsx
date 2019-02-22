import React from 'react';
import PropTypes from 'prop-types';
import {
  AntDesign,
  Feather,
} from '@expo/vector-icons';
import {
  StyleSheet,
  Text,
  View,
  StatusBar,
  TouchableOpacity,
} from 'react-native';

const styles = StyleSheet.create({
  headerContainer: {
    backgroundColor: '#000',
    height: 56,
    width: '100%',
    paddingTop: 10,
    paddingBottom: 10,
    flexDirection: 'row',
  },
  headerLeftContainer: {
    flex: 1,
    paddingTop: 6,
    paddingLeft: 8,
  },
  title: {
    color: '#fafafa',
    fontSize: 20,
  },
  headerRightContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    paddingTop: 8,
    paddingRight: 16,
  },
  time: {
    color: '#777',
    fontSize: 11,
  },
  icon: {
    marginLeft: 24,
  },
  homeContainer: {
    flex: 1,
    paddingTop: StatusBar.currentHeight,
  },
  mainContainer: {
    backgroundColor: '#222',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  listContainer: {
    width: '100%',
  },
});

const Header = props => (
  <View style={styles.headerContainer}>
    <View style={styles.headerLeftContainer}>
      <Text style={styles.title}>Routines</Text>
    </View>
    <View style={styles.headerRightContainer}>
      <TouchableOpacity>
        <AntDesign style={styles.icon} name="plussquareo" size={22} color="#ccc" onPress={() => props.setInputModalVisible(!props.inputModalVisible)} />
      </TouchableOpacity>
      <TouchableOpacity>
        <Feather style={styles.icon} name="filter" size={22} color="#ccc" onPress={() => props.setSortModalVisible(!props.sortModalVisible)} />
      </TouchableOpacity>
      <TouchableOpacity>
        <Feather style={styles.icon} name="settings" size={22} color="#ccc" />
      </TouchableOpacity>
    </View>
  </View>
);

Header.defaultProps = {
  setInputModalVisible: null,
  inputModalVisible: false,
  setSortModalVisible: null,
  sortModalVisible: null,
};

Header.propTypes = {
  setInputModalVisible: PropTypes.func,
  setSortModalVisible: PropTypes.func,
  inputModalVisible: PropTypes.bool,
  sortModalVisible: PropTypes.bool,
};

export default Header;
