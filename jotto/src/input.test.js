import React from 'react'
import { shallow } from 'enzyme'

import { findByTestAttr, storeFactory } from '../test/testUtils'
import Input from './Input'

/** Factory function to create a ShallowWrapper for the Congrats component
 * @function setup
 * @param  {object} initialState- Initial state for this setup
 * @returns {ShallowWrapper}
 */
const setup = (initialState={}) => {
    const store = storeFactory(initialState)
    // The .dive() method allows you to move inside the wrapper to get to
    // the contents of the children (with one .dive())
    // or the contents of the grandchildren (with two .dive()'s)
    // etc.
    const wrapper = shallow(<Input store={store}/>).dive().dive()
    return wrapper
    // You can see what is in the wrapper by using
    // console.log(wrapper.debug())
}

setup()

describe('render', () => {
  describe('word has not been guessed', () => {
    let wrapper
    beforeEach(() => {
       const initialState = { success: false } 
       wrapper = setup(initialState)
    })
    test('renders component without error', () => {
        const component = findByTestAttr(wrapper, 'component-input')
        expect(component.length).toBe(1)
    })
    test('renders input box', () => {
        const inputBox = findByTestAttr(wrapper, 'input-box')
        expect(inputBox.length).toBe(1)
    })
    test('renders submit button', () => {
        const submitButton = findByTestAttr(wrapper, 'submit-button')
        expect(submitButton.length).toBe(1)
    })
  }) 
  describe('word has been guessed', () => {
    let wrapper
    beforeEach(() => {
        const initialState = { success: true }
        wrapper = setup(initialState)
    })
    test('renders component without error', () => {
        const component = findByTestAttr(wrapper, 'component-input')
        expect(component.length).toBe(1)
    })
    test('does not render input box', () => {
        const component = findByTestAttr(wrapper, 'input-box')
        expect(component.length).toBe(0)
    })
    test('does not render submit button', () => {
        const component = findByTestAttr(wrapper, 'submit-button')
        expect(component.length).toBe(0)
    } )
  }) 
})

describe('redux props', () => {
    test('has success piece of state as prop', () => {
        const success = true
        const wrapper = setup({ success })
        const successProp = wrapper.instance().props.success
        expect(successProp).toBe(true)
      })
    test('`guessWord` action creator is a function prop', () => {
        // don't need to pass any state to the wrapper, only props
        const wrapper = setup()
        const guessWordProp = wrapper.instance().props.guessWord
        expect(guessWordProp).toBeInstanceOf(Function)
    })
})