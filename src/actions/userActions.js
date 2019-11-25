import { push } from 'connected-react-router';

const API_URL = 'http://localhost:3001';

//sets user object in store
const logIn = (userObj) => ({
    type: 'LOGIN_USER',
    payload: userObj
});

const failedLogIn = () => ({
    type: 'ERROR_LOGIN_ERROR'
})

const failedSignUp = () => ({
    type: 'ERROR_SIGNUP_ERROR'
})

export const logOutUser = () => {
    return (dispatch) => {
        dispatch({ type: 'LOGOUT_USER' });
        dispatch(push('/'));
    }
}

export const createUser = (userParams) => {
    return (dispatch) => {
        dispatch({ type: 'CREATING_USER' });
        return (
            fetch(`${API_URL}/users`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Accept: 'application/json'
                },
                body: JSON.stringify({
                    user: {
                        username: `${userParams.username}`,
                        password: `${userParams.password}`
                    }
                })
            })
            .then(r => r.json())
            .then(data => {
                if (data.error) {
                    dispatch(failedSignUp());
                }
                else {
                    localStorage.setItem('token', data.jwt)
                    dispatch(logIn(data.user));
                    dispatch(push('/'));
                }
            })
        )
    }
}

export const logInUser = (userParams) => {
    return (dispatch) => {
        dispatch({ type: 'LOGGING_IN' });
        return (
            fetch(`${API_URL}/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Accept: 'application/json'
                },
                body: JSON.stringify({
                    user: {
                        username: `${userParams.username}`,
                        password: `${userParams.password}`
                    }
                })
            })
            .then(r => r.json())
            .then(data => {
                if (data.error) {
                    dispatch(failedLogIn())
                }
                else {
                    localStorage.setItem('token', data.jwt);
                    dispatch(logIn(data.user));
                    dispatch(push('/'));
                }
            })
        )
    }
} 

export const getUser = () => {
    return dispatch => {
        const token = localStorage.token;

        if (token) {
            return (
                fetch(`${API_URL}/user_data`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        Accepts: 'application/json',
                        'Authorization': `Bearer ${token}`
                    }
                })
                .then(r => r.json())
                .then(data => {
                    if (data.error) {
                        console.log('couldn\'t retrieve user data..');
                    }
                    else {
                        dispatch(logIn(data.user))
                    }
                })
            )
        }
    }
}