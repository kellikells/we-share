import React, { createContext, useReducer } from 'react';
import AppReducer from './AppReducer';
import axios from 'axios';

// --------------------------------
// initial state
// >>any "initial state" would go inside this object, in this case only "items"
const initialState = {
    
    items: [],
    error: null,
    loading: true,
    creatingUser: false,
    loggedIn: false,
    currentUser: []
    
    // showButtons: false

}
// const initialState = {
//     items: [],
//     error: null,
//     loading: true
// }

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
    // --------------------------------------------------------------
    //                   .find() user by email 
    // --------------------------------------------------------------
    async function getUsers(email) {
        try {
            const res = await axios.get('http://localhost:3000/api/users')

            const resArray = res.data.data;

            resArray.map((user => {
                if (user.email == email) {
                    console.log(`ERROR: email already exists`);
                    dispatch({
                        type: 'USER_ERROR',
                        payload: err.response.data.error
                    });
                }
                else {
                    console.log(`SUCCESS: ${email} does not exist in database`);
                    dispatch({
                        type: 'INITIALIZE_CREATE_USER',
                        payload: true
                    })
                }
            }))

        } catch (err) {
            dispatch({
                type: 'USER_ERROR',
                payload: err.response.data.error
            });
        }
    }


    // --------------------------------------------------------------
    //                        add NEW USER  
    // --------------------------------------------------------------

    async function addUser(newUser) {

        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }

        try {
            const res = await axios.post('http://localhost:3000/api/users', newUser, config);

            dispatch({
                type: 'ADD_USER',
                payload: res.data.data
            });
        } catch (err) {
            dispatch({
                type: 'USER_ERROR',
                payload: err.response.data.error
            });
        }
    }






    // --------------------------------------------------------------
    //                     USER LOGIN verification
    // --------------------------------------------------------------



    // --------------------------------------------------------------
    //                          
    // --------------------------------------------------------------




    // --------------------------------------------------------------
    //                          get all items
    // --------------------------------------------------------------


    async function getItems() {
        try {
            const res = await axios.get('http://localhost:3000/api/items');

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


    // --------------------------------------------------------------
    //                          add new item
    // --------------------------------------------------------------

    async function addItem(item) {

        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }

        try {
            const res = await axios.post('http://localhost:3000/api/items', item, config);

            dispatch({
                type: 'ADD_ITEM',
                payload: res.data.data
            });
        } catch (err) {
            dispatch({
                type: 'ITEM_ERROR',
                payload: err.response.data.error
            });
        }
    }
    // --------------------------------------------------------------
    //                           use 1 item
    // --------------------------------------------------------------

    async function useOne(id, itemName, itemQuantity) {
        const config = {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        }
        const item = {
            itemName: itemName,
            itemQuantity: itemQuantity - 1
        }

        try {
            await axios.put(`http://localhost:3000/api/items/${id}`, item, config);
            dispatch({
                type: 'USE_ONE',
                payload: id
            });

        } catch (err) {
            dispatch({
                type: 'ITEM_ERROR',
                payload: err.response.data.error
            });
        }
    }

    // --------------------------------------------------------------
    //                          use ALL item
    // --------------------------------------------------------------


    async function useAll(id, itemName) {
        const config = {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        }
        const item = {
            itemName: itemName,
            itemQuantity: 0
        }
        try {
            await axios.put(`http://localhost:3000/api/items/${id}`, item, config);

            dispatch({
                type: 'USE_ONE',
                payload: id
            });

        } catch (err) {
            dispatch({
                type: 'ITEM_ERROR',
                payload: err.response.data.error
            });
        }
    }
    // --------------------------------------------------------------
    //                         DELETE item
    // --------------------------------------------------------------


    async function deleteItem(id) {
        try {
            await axios.delete(`http://localhost:3000/api/items/${id}`);

            dispatch({
                type: 'DELETE_ITEM',
                payload: id
            });
        } catch (err) {
            dispatch({
                type: 'ITEM_ERROR',
                payload: err.response.data.error
            });
        }
    }




    // async function toggleShowButtons(id) {
    //     dispatch({
    //         type: 'TOGGLE_BUTTONS',
    //         payload:id
    //     });

    // }




    return (

        // provider component, with a <value> prop of <state.items>   ** so we can access it from context
        // >>provider provides: state, and actions to whatever it is wrapped around
        // >>whatever gets wrapped = children, and in this case it's the compoents in App.js
        <GlobalContext.Provider value={{
            items: state.items,
            error: state.error,
            loading: state.loading,
            creatingUser: state.creatingUser,
            loggedIn: state.loggedIn,
            currentUser: state.currentUser,

            // showButtons: state.showButtons,
            // toggleShowButtons,
            // findUserEmail,
            getUsers,
            addUser,

            getItems,
            useOne,
            useAll,
            deleteItem,
            addItem
        }}>

            {children}

        </GlobalContext.Provider>);
}

