import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import EnzymeAdapter from 'enzyme-adapter-react-16';

import App from './App';

Enzyme.configure({ adapter: new EnzymeAdapter() });

/**  
* Factory function to create a shallow wrapper for the App component
* @function setup
* @param {object} props - Component props specific to this setup.
* @param {any} state - Initial state for setup.
* @returns {ShallowWrapper}
*/
const setup = (props={}, state=null) => {
  const wrapper = shallow(<App {...props} />)
  if (state) wrapper.setState(state)
  return wrapper
} 

/**
 * 
 * @param {ShallowWrapper} wrapper - Enzyme shallow wrapper to search within.
 * @param {string} val - Value of data-test attribute for search.
 * @returns {ShallowWrapper}
 */
const findByTestAttr = (wrapper, val) => {
  return wrapper.find(`[data-test="${val}"]`)
}


test('renders without error', () => {
    const wrapper = setup()
    const appComponent = findByTestAttr(wrapper, 'component-app')
    expect(appComponent.length).toBe(1)
})

describe('Decrement', () => {
    test('renders decrement button', () => {
        const wrapper = setup()
        const button = findByTestAttr(wrapper, 'decrement-button')
        expect(button.length).toBe(1)
    })

    test('clicking button decrements counter display', () => {
        const counter = 7
        const wrapper = setup(null, { counter})

        // find button and click
        const button = findByTestAttr(wrapper, 'decrement-button')
        button.simulate('click')

        // find display and test value
        const counterDisplay = findByTestAttr(wrapper, 'counter-display')
        expect(counterDisplay.text()).toContain(counter - 1)
    })

})

describe('Increment', () => {
    test('renders increment button', () => {
        const wrapper = setup()
        const button = findByTestAttr(wrapper, 'increment-button')
        expect(button.length).toBe(1)
    })

    test('clicking button increments counter display', () => {
        const counter = 7
        const wrapper = setup(null, { counter })

        // find button and click
        const button = findByTestAttr(wrapper, 'increment-button')
        button.simulate('click')
        wrapper.update()

        // find display and test value
        const counterDisplay = findByTestAttr(wrapper, 'counter-display') 
        expect(counterDisplay.text()).toContain(counter + 1)
    })
})

describe('counter display', () => {
    test('renders counter display', () => {
        const wrapper = setup()
        const counterDisplay = findByTestAttr(wrapper, 'counter-display')
        expect(counterDisplay.length).toBe(1)
    })

    test('counter starts at 0', () => {
        const wrapper = setup()
        const initialCounterState = wrapper.state('counter')
        expect(initialCounterState).toBe(0)
    })
    
    // using a describe so "beforeEach" can be called for shared setup
    describe('counter is zero when decrement is clicked', () => {
        // limiting the scope for the wrapper to this describe method
        let wrapper

        beforeEach(() => {
        // no need to set counter value here as a default value of 0 is desirable
        wrapper = setup()

        // find button and click
        const button = findByTestAttr(wrapper, 'decrement-button')
        button.simulate('click')
        wrapper.update()
        })

        test('error shows', () => {
            // check the class of the error message
            const errorDiv = findByTestAttr(wrapper, 'error-message')
            const errorHasHiddenClass = errorDiv.hasClass('hidden')
            expect(errorHasHiddenClass).toBe(false)
        })
        test('counter still displays 0', () => {
            const counterDisplay = findByTestAttr(wrapper, 'counter-display')
            expect(counterDisplay.text()).toContain(0)
        })
        test('clicking increment clears the error', () => {
            // find and click the increment button
            const button = findByTestAttr(wrapper, 'increment-button')
            button.simulate('click')
            
            // check the class of the error message
            const errorDiv = findByTestAttr(wrapper, 'error-message')
            const errorHasHiddenClass = errorDiv.hasClass('hidden')
            expect(errorHasHiddenClass).toBe(true)
        })
        test('error does not show unless it is needed', () => {
            // error message is implemented in app using a "hidden" class for the error div
            // data-test value 'error-message' will display on the error div
            const wrapper = setup()
            const errorDiv = findByTestAttr(wrapper, 'error-message')

            // using Enzyme's ".hasClass()" method
            const errorHasHiddenClass = errorDiv.hasClass('hidden')
            expect(errorHasHiddenClass).toBe(true)
        })
    })

})
