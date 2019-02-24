import { call, put, take } from 'redux-saga/effects';
import { Alert } from 'react-native';
import moment from 'moment';
import {
  successAddRoutine,
  successDeleteRoutine,
  successUpdateProgress,
  failureAddRoutine,
  failureDeleteRoutine,
  failureUpdateProgress,
} from '../actions/routines';

import db from '../configs/firebase';

const addRoutine = async (name, count, key, uid) => {
  try {
    if (uid) {
      const routine = {
        name,
        count,
        progress: [],
        key,
        createdAt: moment().format(),
      };

      db.ref(`Users/${uid}/routines/`).push(routine)
        .catch((error) => { throw new Error(error); });
    }

    return { result: 'OK' };
  } catch (error) {
    return { error };
  }
};

export function* handleSetRoutine() {
  while (true) {
    const action = yield take('ADD_ROUTINE');
    const { result, error } = yield call(
      addRoutine,
      action.name,
      action.count,
      action.key,
      action.uid,
    );
    if (result === 'OK' && !error) {
      yield put(successAddRoutine(result));
    } else {
      yield put(failureAddRoutine(error));
    }
  }
}

const AsyncAlert = async () => (
  new Promise((resolve) => {
    Alert.alert(
      'Alert Title',
      'Are you sure to delete this routine?',
      [
        { text: 'NO', onPress: () => { resolve('NO'); } },
        { text: 'YES', onPress: () => { resolve('YES'); } },
      ],
    );
  })
);

const deleteRoutine = async (key, uid) => {
  try {
    const response = await AsyncAlert();
    if (response === 'YES') {
      if (uid) {
        db.ref(`Users/${uid}/routines`).once('value').then((snapshot) => {
          let targetKey = '';
          snapshot.forEach((childSnapshot) => {
            if (childSnapshot.child('key').val() === key) {
              targetKey = childSnapshot.key;
            }
          });
          db.ref(`Users/${uid}/routines`).child(targetKey).remove();
        });
      }
    }
    return { key };
  } catch (error) {
    return { error };
  }
};

export function* handleDeleteRoutine() {
  while (true) {
    const action = yield take('DELETE_ROUTINE');
    const { key, error } = yield call(deleteRoutine, action.key, action.uid);
    if (key && !error) {
      yield put(successDeleteRoutine(key));
    }
    if (error) {
      yield put(failureDeleteRoutine(error));
    }
  }
}

const updateProgress = async (key, date, routines, uid) => {
  try {
    if (uid) {
      let updatedProgress = null;
      routines.map((routine) => {
        if (routine.key === key) {
          updatedProgress = routine.progress;
        }
        return routine;
      });

      db.ref(`Users/${uid}/routines`).once('value').then((snapshot) => {
        let targetKey = '';
        snapshot.forEach((childSnapshot) => {
          if (childSnapshot.child('key').val() === key) {
            targetKey = childSnapshot.key;
          }
        });
        db.ref(`Users/${uid}/routines`).child(targetKey).child('progress').set(updatedProgress);
      });
    }
    return { result: 'OK' };
  } catch (error) {
    return { error };
  }
};

export function* handleUpdateProgress() {
  while (true) {
    const action = yield take('UPDATE_PROGRESS');
    const { result, error } = yield call(
      updateProgress,
      action.key,
      action.date,
      action.routines,
      action.uid,
    );
    if (result === 'OK' && !error) {
      yield put(successUpdateProgress(result));
    } else {
      yield put(failureUpdateProgress(error));
    }
  }
}
