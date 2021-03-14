import React, { createContext, useReducer } from 'react';
import AppReducer from './AppReducer';
import axios from 'axios';

// --------------------------------
// initial state
// >>any "initial state" would go inside this object, in this case only "items"

const initialState = {
    items: [],
    error: null,
    loading: true
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

    async function getItems() {
        try {
            const res = await axios.get('/api/items');

            dispatch({
                type: 'GET_ITEMS',
                payload: res.data.data
            });

        } catch (err) {
            dispatch({
                type: 'ITEM_ERROR',
                payload: err.response.data.error
            });
        }
    }


    function useOne(id) {
        dispatch({
            type: 'USE_ONE',
            payload: id
        });
    }

    function useAll(id) {
        dispatch({
            type: 'USE_ALL',
            payload: id
        });
    }

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
            error: state.error,
            loading: state.loading,
            getItems,
            useOne,
            useAll,
            deleteItem,
            addItem
        }}>

            {children}

        </GlobalContext.Provider>);

}