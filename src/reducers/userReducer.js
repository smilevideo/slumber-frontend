import { parse, differenceInMinutes } from 'date-fns';

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

        case 'CREATE_USER_ERROR':
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

        case 'LOGIN_ERROR':
            return {
                ...state,
                loggingIn: false,
                logInError: true
            }
            
        case 'LOGIN_USER':
            return {
                ...state,
                //Add duration and js date variable versions of begin and end dates as attributes to sleeps array
                currentUser: {
                    ...action.payload,
                    sleeps: [
                        ...action.payload.sleeps.map(sleep => {
                            const startDate = parse(`${sleep.start_day} ${sleep.start_time}`, 'yyyy-MM-dd HH:mm', new Date())
                            const endDate = parse(`${sleep.end_day} ${sleep.end_time}`, 'yyyy-MM-dd HH:mm', new Date())
                            
                            return ({
                                ...sleep,
                                startDate,
                                endDate,
                                duration: `${Math.floor(Math.abs(differenceInMinutes(startDate, endDate)) / 60)}h 
                                    ${Math.abs(differenceInMinutes(startDate, endDate)) % 60}m`
                            })
                        })
                    ]
                },
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