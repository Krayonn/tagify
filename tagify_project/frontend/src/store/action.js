import * as actionTypes from './actionTypes';

export const retrieveAuthTokens = (authToken, refreshToken) => {
    return {
        type: actionTypes.RETRIEVE_AUTH_TOKENS,
        authToken: authToken,
        refreshToken: refreshToken
    };
}

export const addTag = (trackId, tagName) => {
    return {
        type: actionTypes.ADD_TAG,
        trackId: trackId,
        tagName: tagName
    };
}

export const removeTag = (trackId, tagId) => {
    return {
        type: actionTypes.REMOVE_TAG,
        trackId: trackId,
        tagId: tagId
    };
}

export const updateTag = (trackId, tagId, input) => {
    return {
        type: actionTypes.UPDATE_TAG,
        trackId: trackId,
        tagId: tagId,
        input: input
    }
}

export const updateTagSource = (input) => {
    return {
        type: actionTypes.UPDATE_TAG_SOURCE,
        tagSource: input
    }
}
