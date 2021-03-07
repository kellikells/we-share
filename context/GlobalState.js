import React, { createContext, useReducer } from 'react';
import AppReducer from './AppReducer';

// --------------------------------
// initial state
// >>any "initial state" would go inside this object, in this case only "items"

const initialState = {
    items: [
        { id: 1, itemName: 'corn', itemQuantity: 2 },
        { id: 2, itemName: 'mustard', itemQuantity: -1 },
        { id: 3, itemName: 'hamburger', itemQuantity: 3 },
        { id: 4, itemName: 'cheeseburger', itemQuantity: 10 },
        { id: 5, itemName: 'cheese', itemQuantity: 50 },

    ]
}

// --------------------------------
// creating context
// >>it is exported for use in other components, that's the whole purpose
export const GlobalContext = createContext(initialState);

// --------------------------------
// provider component
// >>this is what wraps the components so they can access it
// >>children (by destructuring): the props we give GlobalProvider which are, (the components)
// >>dispatch: used to call (useReducer)
// >>useReducer: takes in: wherever our reducer is, and initial state
// --------------------------------
export const GlobalProvider = ({ children }) => {
    const [state, dispatch] = useReducer(AppReducer, initialState);


    // Actions
    // >>Make calls to reducer
    // >>payload: any data we want to send to it, in this case 'id'
    function deleteItem(id) {
        dispatch({
            type: 'DELETE_ITEM',
            payload: id
        });
    }

    function addItem(item) {
        dispatch({
            type: 'ADD_ITEM',
            payload: item
        });
    }

    return (

        // provider component, with a <value> prop of <state.items>   ** so we can access it from context
        // >>provider provides: state, and actions to whatever it is wrapped around
        // >>whatever gets wrapped = children, and in this case it's the compoents in App.js
        <GlobalContext.Provider value={{
            items: state.items,
            deleteItem,
            addItem
        }}>

            {children}

        </GlobalContext.Provider>);
        
}