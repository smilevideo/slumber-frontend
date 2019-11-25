const initialState = {
    currentUser: {}
}

export default (state = initialState, action) => {
    switch (action.type) {
        case 'CREATING_USER':
            return {
                ...state,
                creatingUser: true,
                signUpError: false
            }

        case 'ERROR_SIGNUP_ERROR':
            return {
                ...state,
                creatingUser: false,
                signUpError: true
            }

        case 'LOGGING_IN':
            return {
                ...state,
                loggingIn: true,
                logInError: false
            }

        case 'ERROR_LOGIN_ERROR':
            return {
                ...state,
                loggingIn: false,
                logInError: true
            }
            
        case 'LOGIN_USER':
            return {
                ...state,
                currentUser: action.payload,
                creatingUser: false,
                loggingIn: false,
                signUpError: false,
                logInError: false
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