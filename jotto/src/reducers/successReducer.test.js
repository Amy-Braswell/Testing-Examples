// These are unit tests that test the action creator
// and the reducer separately 

// fyi, index.test.js is an integration test that tests both the 
// action creator & the reducer the action creator will retrieve the 
// response word the reducer will add the response word to the state


import { actionTypes } from '../actions'
import successReducer from './successReducer'

test('returns default initial state of false when no action is passed', () => {
    const newState = successReducer(undefined, {})
    expect (newState).toBe(false)
})
test('returns state of true upon receiving an action of type `CORRECT_GUESS`', () => {
    const newState = successReducer(undefined, { type: actionTypes.CORRECT_GUESS })
    expect(newState).toBe(true)
})