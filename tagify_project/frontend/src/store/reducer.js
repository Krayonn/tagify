import * as actionTypes from './actionTypes';

const initialState = {
    authCode: null
};

const retrieveAuthCode = (state, action) => {
    return {
        ...state,
        authCode: action.authCode
    }
}

const reducer = (state=initialState, action) => {
    switch ( action.type ) {
        case actionTypes.RETRIEVE_AUTH_CODE: return retrieveAuthCode(state, action)
        default: return state;
    }
}

export default reducer;