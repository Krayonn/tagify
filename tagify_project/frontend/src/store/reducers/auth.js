import * as actionTypes from '../actions/actionTypes';

const initialState = {
    tokens: {
        authToken: null,
        refreshToken: null
    },
    authenticated: false,
    username: null,
    displayName: null
};

const retrieveAuthTokens = (state, action) => {
    return {
        ...state,
        tokens: {
            authToken: action.authToken,
            refreshToken: action.refreshToken
        }
    }
}

const login = (state, action) => {
    return {
        ...state,
        authenticated: true,
        username: action.username,
        displayName: action.displayName
    }
}

const logout = (state, action) => {
    return {
        ...state,
        tokens: {
            authToken: null,
            refreshToken: null
        },
        authenticated: false,
        username: null
    }
}


const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.RETRIEVE_AUTH_TOKENS: return retrieveAuthTokens(state, action)
        case actionTypes.LOGIN: return login(state, action)
        case actionTypes.LOGOUT: return logout(state, action)
        default: return state;
    }
}

export default reducer;