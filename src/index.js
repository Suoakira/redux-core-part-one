import { createStore, combineReducers } from 'redux';
import uuid from 'uuid';

// ADD_EXPENSE
const addExpense = (
    {
        description = '',
        note = '',
        amount = 0,
        createdAt = 0
    } = {}
) => ({
    type: 'ADD_EXPENSE',
    expense: {
        id: uuid(),
        description,
        note,
        amount,
        createdAt
    }
});

// REMOVE_EXPENSE
const removeExpense = ({ id } = {}) => ({
    type: 'REMOVE_EXPENSE',
    id
});

// EDIT_EXPENSE
const editExpense = (id, updates) => ({
    type: "EDIT_EXPENSE",
    id,
    updates
})

// SET_TEXT_FILTER
const setTextFilter = (text = { text: "" }) => ({
    type: "SET_TEXT_FILTER",
    text
})
// SORT_BY_DATE
const sortByDate = () => ({
    type: "SET_DATE_FILTER",
    sortBy: "date"
})

// SORT_BY_AMOUNT 
const sortByAmount = () => ({
    type: "SET_AMOUNT_FILTER",
    sortBy: "amount"
})
// SET_START_DATE
const setStartDate = (startDate = undefined) => ({
    type: "SET_START_DATE",
    startDate: startDate,
})
// SET_END_DATE
const setEndDate = (endDate = undefined) => ({
    type: "SET_END_DATE",
    endDate: endDate,
})

// Expenses Reducer

const expensesReducerDefaultState = [];

const expensesReducer = (state = expensesReducerDefaultState, action) => {
    switch (action.type) {
        case 'ADD_EXPENSE':
            return [
                ...state,
                action.expense
            ];
        case 'REMOVE_EXPENSE':
            return state.filter((expense) => expense.id !== action.id)
        case "EDIT_EXPENSE":
            return state.map((expense) => {
                if (expense.id === action.id) {
                    return {
                        ...expense,
                        ...action.updates
                    }
                } else {
                    expense
                }
            })

        default:
            return state;
    }
};

// Filters Reducer

const filtersReducerDefaultState = {
    text: '',
    sortBy: 'date',
    startDate: undefined,
    endDate: undefined
};

const filtersReducer = (state = filtersReducerDefaultState, action) => {
    switch (action.type) {
        case "SET_TEXT_FILTER":
            return {
                ...state,
                ...action.text
            }
        case "SET_DATE_FILTER":
            return {
                ...state,
                ...action
            }
        case "SET_AMOUNT_FILTER":
            return {
                ...state,
                ...action
            }
        case "SET_START_DATE":
            return {
                ...state,
                startDate: action.startDate
            }
        case "SET_END_DATE":
            return {
                ...state,
                endDate: action.endDate
            }
        default:
            return state;
    }
};

// Store creation

const store = createStore(
    combineReducers({
        expenses: expensesReducer,
        filters: filtersReducer
    })
);

store.subscribe(() => {
    console.log(store.getState());
});

// stores the action object, returned from expense
const expenseOne = store.dispatch(addExpense({ description: 'Rent', amount: 100 }));
const expenseTwo = store.dispatch(addExpense({ description: 'Coffee', amount: 300 }));

store.dispatch(removeExpense({ id: expenseOne.expense.id }))
store.dispatch(editExpense(expenseTwo.expense.id, { amount: 500 }))
store.dispatch(setTextFilter({ text: "hello" }))
store.dispatch(setTextFilter())

store.dispatch(sortByAmount())
store.dispatch(sortByDate())

store.dispatch(setStartDate(125))
store.dispatch(setEndDate(125))

store.dispatch(setStartDate())
store.dispatch(setEndDate())



const demoState = {
    expenses: [{
        id: 'poijasdfhwer',
        description: 'January Rent',
        note: 'This was the final payment for that address',
        amount: 54500,
        createdAt: 0
    }],
    filters: {
        text: 'rent',
        sortBy: 'amount', // date or amount
        startDate: undefined,
        endDate: undefined
    }
}

const user = {
    name: "Jan",
    age: 24
}

console.log({
    ...user,
    location: "London",
    age: 18
})