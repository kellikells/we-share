import { useState, useEffect, useReducer, createContext } from "react";
import { useRouter } from 'next/router';
import AppReducer from './AppReducer';
import axios from 'axios';

// --------------------------------
// initial state
// >>any "initial state" would go inside this object, in this case only "items"


// const initialState = {};
const initialState = {
    loading: false,
    error: null,
    userRegisterSuccess: false,
    loggedIn: false,
    user: {},
    items: [],
    globalItems: []
}



// --------------------------------
// creating context
// >>it is exported for use in other components, that's the whole purpose
export const GlobalContext = createContext({});
// export const GlobalContext = createContext(initialState);

// --------------------------------
// provider component
// >>this is what wraps the components so they can access it
// >>children (by destructuring): the props we give GlobalProvider which are, (the components)
// >>dispatch: used to call (useReducer)
// >>useReducer: takes in: wherever our reducer is, and initial state
// --------------------------------
export const GlobalProvider = ({ children }) => {
    const router = useRouter();
    const [state, dispatch] = useReducer(AppReducer, initialState);

    // Actions
    // >>Make calls to reducer
    // >>payload: any data we want to send to it, in this case 'id'


    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [userRegisterSuccess, setUserRegisterSuccess] = useState(false);
    const [loggedIn, setLoggedIn] = useState(false);
    const [user, setUser] = useState({});
    const [globalItems, setGlobalItems] = useState([{ num: 1 }, { num: 2 }, { num: 3 }]);

    // --------------------------------------------------------------
    //                        add NEW USER  
    // --------------------------------------------------------------

    async function addUser(name, email, password) {

        const config = {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        }
        const newUser = {
            name: name,
            email: email,
            password: password
        }

        try {
            const res = await axios.post('/api/users/register', newUser, config);
            // const res = await axios.post('/api/users', newUser, config);

            dispatch({
                type: 'ADD_USER',
                payload: res.data.data
            });
            router.push('/login');
        }
        catch (err) {
            console.log(`line 79: global state: user error: ${err.response.data.error}`);

            dispatch({
                type: 'USER_ERROR',
                payload: err.response.data.error
            });
        }
    }

    // --------------------------------------------------------------
    //                     USER LOGIN verification
    // --------------------------------------------------------------
    async function getUser(email, password) {
        // async function getUser(user) {
        const config = {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        }
        const returningUser = {
            email: email,
            password: password
        }

        try {
            const userData = await axios.put('/api/users/login', returningUser, config);
            // await axios.put('/api/users/login', returningUser, config);
            console.log(`globalState 99- userData: ${userData.data.name}`);

            dispatch({
                type: 'GET_USER',
                payload: userData.data.email,
                // payload: returningUser,
                loggedIn: true,
                problems: userData
            });

            router.push('/inventory');

        } catch (error) {

            dispatch({
                type: 'USER_ERROR',
                payload: 'fucking error',
            });
        }
    }


    // --------------------------------------------------------------
    //                           USER LOGOUT              
    // --------------------------------------------------------------

    async function logout(id, email) {
        // async function getUser(user) {
        const config = {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        }
        const logoutUser = {
            id: id,
            email: email
        }

        try {
            await axios.put('/api/users/logout', logoutUser, config);

            dispatch({
                type: 'LOGOUT',
                payload: false
            });

            router.push('/');

        } catch (err) {
            if (err) throw err;
            // dispatch({
            //     type: 'USER_ERROR',
            //     payload: err.response.data.error
            // });
        }
    }

    // --------------------------------------------------------------
    //                          get all items
    // --------------------------------------------------------------

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
            const res = await axios.post('/api/items', item, config);

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
            await axios.put(`/api/items/${id}`, item, config);
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
            await axios.put(`/api/items/${id}`, item, config);

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
            await axios.delete(`/api/items/${id}`);

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

    return (
        // provider component, with a <value> prop of <state.items>   ** so we can access it from context
        // >>provider provides: state, and actions to whatever it is wrapped around
        // >>whatever gets wrapped = children, and in this case it's the compoents in App.js
        <GlobalContext.Provider value={{
            // loading: state.loading,
            // error: state.error,
            // userRegisterSuccess: state.userRegisterSuccess,
            // loggedIn: state.loggedIn,
            // user: state.currentUser,
            items: state.items,
            // globalItems: state.globalItems,

            addUser,
            getUser,
            logout,

            getItems,
            useOne,
            useAll,
            deleteItem,
            addItem,

            loading,
            setLoading,

            error,
            setError,

            userRegisterSuccess,
            setUserRegisterSuccess,

            loggedIn,
            setLoggedIn,

            user,
            setUser,

            globalItems,
            setGlobalItems
        }}>
            {children}
        </GlobalContext.Provider>
    );
}


