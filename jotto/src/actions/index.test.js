// this is an integration test that tests both the action creator & the reducer
// the action creator will retrieve the response word
// the reducer will add the response word to the state

// fyi, the successReducer uses unit tests to test the action creator
// and the reducer separately 

import moxios from 'moxios'

import { storeFactory } from '../../test/testUtils'
import { getSecretWord } from './'

describe('getSecretWord action creator', () => {
    beforeEach(() => {
        moxios.install()
    })
    afterEach(() => {
        moxios.uninstall()
    })
    // is the response word added to state?
    test('adds response word to state', () => {
        const secretWord = 'party'
        const store = storeFactory()

        moxios.wait(() => {
            const request = moxios.requests.mostRecent()
            request.respondWith({
                status: 200,
                response: secretWord,
            })
        })

        return store.dispatch(getSecretWord())
            .then(() => {
                const newState = store.getState()
                expect(newState.secretWord).toBe(secretWord)
            })
    })
})  