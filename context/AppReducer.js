
// export default (state, action) => {
const AppReducer = (state, action) => {

    switch (action.type) {

        
        case 'ADD_USER':
            return {
                ...state,
                currentUser: action.payload
            }


        case 'USER_ERROR':
            return {
                ...state,
                error: action.payload,
                message: 'user error '
            }

        // -------------------------------------------
        //                ITEM CASES 
        // -------------------------------------------
        case 'GET_ITEMS':
            return {
                ...state,
                loading: false,
                items: action.payload
            }

        case 'DELETE_ITEM':
            return {
                ...state,
                items: state.items.filter(item => item._id !== action.payload)
            }

        case 'ADD_ITEM':
            return {
                ...state,
                items: [...state.items, action.payload]
            }

        case 'USE_ONE':
            return {
                ...state,
                items: state.items.map(item => (item._id == action.payload ? { id: item._id, itemName: item.itemName, itemQuantity: item.itemQuantity -= 1 }
                    : item))
            }

        case 'USE_ALL':
            return {
                ...state,
                items: state.items.map(item => (item._id == action.payload ? { id: item.id, itemName: item.itemName, itemQuantity: 0 }
                    : item))
            }

        case 'ITEM_ERROR':
            return {
                ...state,
                error: action.payload,
                message: 'item error'
            }


        // case 'TOGGLE_BUTTONS':
        //     return {
        //         ...state,
        //         items: state.items.map(item => (item._id == action.payload ? {
        //             id: item._id, itemName: item.itemName, itemQuantity: item.itemQuantity,
        //             showButtons: !state.showButtons
        //         }
        //             : item))
        //     }


        default:
            return state;
    }
}

// items: state.items.filter(item => item._id !== action.payload)


export default AppReducer;