import reducer from '../../src/reducers/routines'
import * as types from '../../src/consistants/actionTypes'

const initialState = {
  routines: [],
  inputModalVisible: false,
  detailModalVisible: false,
  selectedRoutine: null,
  name: "",
  count: 1
};


describe('routines reducer', () => {

  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual(initialState)
  })

  it('should handle ADD_ROUTINE', () => {
    expect(
      reducer(initialState, {
        type: types.ADD_ROUTINE
      })
    ).toEqual(initialState)
  })

  it('should handle DELETE_ROUTINE', () => {
    expect(
      reducer(initialState, {
        type: types.DELETE_ROUTINE
      })
    ).toEqual(initialState)
  })

  it('should handle DELETE_ROUTINE', () => {
    expect(
      reducer(initialState, {
        type: types.CHANGE_ROUTINE_TITLE,
        name: 'name'
      })
    ).toEqual({
      ...initialState,
      name: 'name'
    })
  })

})