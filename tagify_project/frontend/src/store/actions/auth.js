import * as actionTypes from './actionTypes';

export const retrieveAuthTokens = (authToken, refreshToken) => {
    return {
        type: actionTypes.RETRIEVE_AUTH_TOKENS,
        authToken: authToken,
        refreshToken: refreshToken
    };
}

export const login = (userProfile) => {
    console.log('in login red', userProfile)
    return {
        type: actionTypes.LOGIN,
        username: userProfile.id,
        displayName: userProfile.display_name
    }
}


export const logout = () => {
    return {
        type: actionTypes.LOGOUT
    }
}

