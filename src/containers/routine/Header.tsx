import * as React from 'react';
import { connect } from 'react-redux';
import {
  StyleSheet,
  Text,
  View,
  StatusBar,
  TouchableOpacity,
} from 'react-native';
import { AntDesign, Feather } from '@expo/vector-icons';
import {
  toggleCreateScreen,
  toggleSortScreen,
} from '../../actions/routines';
import { RoutineTypes } from './../../common/types';
import Create from './Create';
import Sort from '../../components/modals/Sort';

interface PropTypes {
  createScreenVisible: boolean;
  sortScreenVisible: boolean;
  toggleCreateScreen: (visible: boolean) => { visible: boolean; type: string };
  toggleSortScreen: (visible: boolean) => { visible: boolean; type: string };
}

interface StateTypes {
  _persist: {
    rehydrated: boolean;
    version: number;
  };
  lists: {
    createListVisible: boolean,
    tasks: [],
  };
  routines: {
    headerReducer: {
      createScreenVisible: boolean;
      sortScreenVisible: boolean;
    };
    routineReducer: {
      routines: Array<RoutineTypes>;
      count: number;
      detailModalVisible: boolean;
      inputModalVisible: boolean;
      sortModalVisible: boolean;
      name: string;
      progressModalVisible: boolean;
      selectedRoutine: RoutineTypes;
    };
  };
  users: {
    email: string;
    errorMessage: object;
    isLoading: boolean;
    password: string;
    uid: string;
  };
}

class Header extends React.Component<PropTypes> {
  render() {
    return (
      <View style={styles.headerContainer}>
        <View style={styles.headerLeftContainer}>
          <Text style={styles.title}>Routines</Text>
        </View>
        <View style={styles.headerRightContainer}>
          <TouchableOpacity>
            <AntDesign
              style={styles.icon}
              name="plussquareo"
              size={22}
              color="#ccc"
              onPress={() => this.props.toggleCreateScreen(!this.props.createScreenVisible)}
            />
          </TouchableOpacity>
          <TouchableOpacity>
            <Feather
              style={styles.icon}
              name="filter"
              size={22}
              color="#ccc"
              onPress={() => this.props.toggleSortScreen(!this.props.sortScreenVisible)}
            />
          </TouchableOpacity>
          <TouchableOpacity>
            <Feather
              style={styles.icon}
              name="settings"
              size={22}
              color="#ccc"
            />
          </TouchableOpacity>
        </View>
        <Create visible={this.props.createScreenVisible} />
        <Sort visible={this.props.sortScreenVisible} />
      </View>
    );
  }
}

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

const mapStateToProps = (state: StateTypes) => {
  console.log(state)
  return ({
    createScreenVisible: false,
    sortScreenVisible: false,
  });
};

const mapDispatchToProps = (dispatch: any) => {
  return ({
    toggleCreateScreen: (visible: boolean) => dispatch(toggleCreateScreen(visible)),
    toggleSortScreen: (visible: boolean) => dispatch(toggleSortScreen(visible)),
  });
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);
