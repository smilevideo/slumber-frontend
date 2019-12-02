const initialState = {
    creatingDream: false,
    createDreamError: false
};

export default (state = initialState, action) => {
    switch (action.type) {
        case 'CREATING_DREAM':
            return {
                ...state,
                creatingDream: true,
                createDreamError: false
            }

        case 'CREATE_DREAM_ERROR':
            return {
                ...state,
                creatingDream: false,
                createDreamError: true
            }

        case 'CREATED_DREAM':
            return {
                ...state,
                creatingDream: false,
                createDreamError: false
            }

        default: 
            return state;
    }
}