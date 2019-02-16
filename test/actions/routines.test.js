import * as actions from '../../src/actions/routines'
import * as types from '../../src/consistants/actionTypes'

describe('actions', () => {
  it('should create an action to add a routine', () => {
    const name = 'Finish docs'
    const count = [];
    const expectedAction = {
      type: types.ADD_ROUTINE,
      name,
      count
    }
    expect(actions.addRoutine(name, count)).toEqual(expectedAction);
  })
})