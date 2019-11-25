const initialState = {
    currentUser: {}
}

export default (state = initialState, action) => {
    switch (action.type) {
        case 'CREATING_USER':
            return {
                ...state,
                creatingUser: true
            }

        case 'LOGGING_IN':
            return {
                ...state,
                loggingIn: true
            }
            
        case 'LOGIN_USER':
            return {
                ...state,
                currentUser: action.payload,
                creatingUser: false,
                loggingIn: false
            }

        case 'LOGOUT_USER':
            return {
                ...state,
                currentUser: {}
            }

        default:
            return state;
    }
}