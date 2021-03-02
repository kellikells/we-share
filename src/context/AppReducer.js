export default (state, action) => {
    switch (action.type) {
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
        default:
            return state;
    }
}