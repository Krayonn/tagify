import * as actionTypes from './actionTypes';

export const retrieveAuthCode = (authCode) => {
    return {
        type: actionTypes.RETRIEVE_AUTH_CODE,
        authCode: authCode
    };
}