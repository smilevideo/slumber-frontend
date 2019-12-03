const initialState = {
    creatingSleep: false,
    createSleepError: false
};

export default (state = initialState, action) => {
    switch (action.type) {
        case 'CREATING_SLEEP':
            return {
                ...state,
                creatingSleep: true,
                createSleepError: false
            }

        case 'CREATE_SLEEP_ERROR':
            return {
                ...state,
                creatingSleep: false,
                createSleepError: true
            }

        case 'CREATED_SLEEP':
            return {
                ...state,
                creatingSleep: false,
                createSleepError: false
            }

        default: 
            return state;
    }
}