const initialState = {
    currentUser: {}
}

export default (state = initialState, action) => {
    switch (action.type) {
        case 'CREATING_USER':
            return {
                ...state,
                creatingUser: true,
                errorMessage: ''
            }

        case 'ERROR_SIGNUP_ERROR':
            return {
                ...state,
                creatingUser: false,
                errorMessage: 'Username already exists, try again',
            }

        case 'LOGGING_IN':
            return {
                ...state,
                loggingIn: true,
                errorMessage: ''
            }

        case 'ERROR_LOGIN_ERROR':
            return {
                ...state,
                loggingIn: false,
                errorMessage: 'Invalid username or password, try again'
            }
            
        case 'LOGIN_USER':
            return {
                ...state,
                currentUser: action.payload,
                creatingUser: false,
                loggingIn: false,
                errorMessage: ''
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