export default (state, action) => {
    switch (action.type) {
        case 'GET_ITEMS':
            return {
                ...state,
                loading: false,
                items: action.payload
            }




        case 'USE_ONE':
            return {
                ...state,
                items: state.items.map(item => (item.id == action.payload ? { id: item.id, itemName: item.itemName, itemQuantity: item.itemQuantity -= 1 }
                    : item))
            }
        case 'USE_ALL':
            return {
                ...state,
                items: state.items.map(item => (item.id == action.payload ? { id: item.id, itemName: item.itemName, itemQuantity: 0 }
                    : item))
            }
        case 'DELETE_ITEM':
            return {
                ...state,
                items: state.items.filter(item => item.id !== action.payload)
            }
        case 'ADD_ITEM':
            return {
                ...state,
                items: [action.payload, ...state.items]
            }

        case 'ITEM_ERROR':
            return {
                ...state,
                error: action.payload
            }

        default:
            return state;
    }
}