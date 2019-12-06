import { push } from 'connected-react-router';

const API_URL = 'http://localhost:3001';

//sets user object in store
const logIn = (userObj) => ({
    type: 'LOGIN_USER',
    payload: userObj
});

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
                    dispatch({ type: 'CREATE_USER_ERROR' });
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
                    dispatch({ type: 'LOGIN_ERROR' })
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

export const createSleep = (sleepParams) => {
    const token = localStorage.token; 

    return (dispatch) => {
        dispatch({ type: 'CREATING_SLEEP' });
        return (
            fetch(`${API_URL}/sleeps`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Accept: 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({
                    sleep: sleepParams
                })
            })
            .then(r => r.json())
            .then(data => {
                if (data.error) {
                    dispatch({ type: 'CREATE_SLEEP_ERROR' });
                }
                else {
                    //refetch user data to include new sleep
                    dispatch(getUser());
                    dispatch({ type: 'CREATED_SLEEP' })
                    dispatch(push(`/sleeps/${data.sleep.id}`));
                }
            })
        )
    }
}

export const createDream = (dreamParams) => {
    const token = localStorage.token; 

    return (dispatch) => {
        dispatch({ type: 'CREATING_DREAM' });
        return (
            fetch(`${API_URL}/dreams`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Accept: 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({
                    dream: dreamParams
                })
            })
            .then(r => r.json())
            .then(data => {
                if (data.error) {
                    dispatch({ type: 'CREATE_DREAM_ERROR' });
                }
                else {
                    /* refetch user data to include new dream */
                    dispatch(getUser());
                    dispatch({ type: 'CREATED_DREAM' })
                }
            })
        )
    }
}