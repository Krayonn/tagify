import * as actionTypes from './actionTypes';
import { clearMusic } from './music';

export const retrieveAuthTokens = (authToken, refreshToken) => {
    return {
        type: actionTypes.RETRIEVE_AUTH_TOKENS,
        authToken: authToken,
        refreshToken: refreshToken
    };
}

export const login = (userProfile) => {
    return {
        type: actionTypes.LOGIN,
        username: userProfile.id,
        displayName: userProfile.display_name
    }
}

export const authLogout = () => {
    return {
        type: actionTypes.LOGOUT
    }
}

export const logout = () => {
    console.log('logging out')
    
    return dispatch => {
        dispatch(authLogout())
        dispatch(clearMusic())
    }
}

