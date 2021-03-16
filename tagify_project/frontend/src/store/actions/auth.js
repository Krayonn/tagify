import * as actionTypes from './actionTypes';

export const retrieveAuthTokens = (authToken, refreshToken) => {
    return {
        type: actionTypes.RETRIEVE_AUTH_TOKENS,
        authToken: authToken,
        refreshToken: refreshToken
    };
}

export const login = (username) => {
    return {
        type: actionTypes.LOGIN,
        username: username
    }
}

export const logout = () => {
    return {
        type: actionTypes.LOGOUT
    }
}

