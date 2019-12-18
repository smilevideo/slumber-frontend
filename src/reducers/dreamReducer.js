const initialState = {
    addingDream: false,
    creatingDream: false,
    createDreamError: false
};

export default (state = initialState, action) => {
    switch (action.type) {
        case 'ADDING_DREAM':
            return {
                ...state,
                addingDream: true
            }

        case 'CANCEL_ADD_DREAM':
            return {
                ...state,
                addingDream: false
            }

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
                createDreamError: false,
                addingDream: false
            }

        default: 
            return state;
    }
}