const initialState = {
    currentUser: {}
}

export default (state = initialState, action) => {
    switch (action.type) {
        case 'CREATING_USER':
            return state;

        case 'LOGGING_IN':
            return state;
            
        case 'LOGIN_USER':
            return {
                ...state,
                currentUser: action.payload
            }

        default:
            return state;
    }
}