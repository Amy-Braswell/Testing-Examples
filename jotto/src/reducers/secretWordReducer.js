import { actionTypes } from '../actions'


/**
 * @function secretWordReducer
 * @param {string} state - State before reducer
 * @param {object} action - Action sent to reducer
 * @returns {string} - New state (secret word payload from action)
 */
export default (state = null, action) => {
    // this reducer will get called many times
    // we need to make sure it doesn't null out an existing state
    // so make sure to return state
    switch (action.type) {
        case actionTypes.SET_SECRET_WORD:
            return action.payload
        default: 
            return state
    }
    return state
}