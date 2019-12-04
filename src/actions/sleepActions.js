//
/********FILE CURRENTLY NOT IN USE**********/
//should probably eventually split out the actions by backend model
//

// fetch('http://localhost:3000/sleeps', {
//     method: 'POST',
//     headers: {
//         Authorization: `Bearer ${jwt}`,
// 		'Content-Type': 'application/json',
//         Accept: 'application/json'
//     },
//     body: JSON.stringify({
//         sleep: {
//             start_day: 'dadsf',
//             start_time: 'asdf',
//             end_day: 'day2',
//             end_time: 'time2',
//             note: 'test sleep',
//             rating: 5,
// user_id: 5
//         }
//     })
// })
// .then(r => r.json())
// .then(j => console.log(j))

import { push } from 'connected-react-router';

const API_URL = 'http://localhost:3001';

export const createSleep = (sleepParams) => {
    return (dispatch) => {
        dispatch({ type: 'CREATING_SLEEP' });
        return (
            fetch(`${API_URL}/sleeps`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Accept: 'application/json'
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
                    dispatch(push('/sleeps'));
                }
            })
        )
    }
}
