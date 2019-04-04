import { createStore } from "redux"

// action generators, we use default object to avoid errors trying to get a property off undefined object
const incrementCount = ({ incrementBy = 1 } = {}) => ({
    type: "INCREMENT",
    incrementBy: incrementBy
})

const decrementCount = ({ decrementBy = 1 } = {}) => ({
    type: "DECREMENT",
    decrementBy
})

const setCount = ({ count = 0 } = {}) => ({
    type: "SET",
    count
})

const resetCount = ({ reset = 0 } = {}) => ({
    type: "RESET",
    reset
})

// Reducers are pure functions
// 1. output only determined by the input
// 2. Never change state or action

// create store takes two arguments state, and action
const countReducer = ((state = { count: 0 }, action) => {
    switch (action.type) {
        case 'INCREMENT':
            return {
                count: state.count + action.incrementBy
            }
            break
        case 'DECREMENT':
            return {
                count: state.count - action.decrementBy
            }
            break
        case 'RESET':
            return {
                count: state.count = action.reset
            }
            break
        case 'SET':
            return {
                count: action.count
            }
            break
        default:
            return state

    }
})

const store = createStore(countReducer)

// runs everytime the app changes, useful for updating page
const unsubscribe = store.subscribe(() => {
    console.log(store.getState())
});

// unsubscribe() call when you want to stop watching changes

// Actions - an object that gets sent to the store
// allows us to send of an action object to the store
store.dispatch(incrementCount({ incrementBy: 5 }))

store.dispatch(decrementCount({ decrementBy: 10 }))

store.dispatch(setCount({ count: 101 }))

store.dispatch(resetCount())