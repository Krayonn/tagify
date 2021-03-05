import * as actionTypes from './actionTypes';

const initialState = {
    authToken: null,
    refreshToken: null,
    tagSource: '',
    tags: {
        'testTrackid123': {1: 'testTag'}
    },
    tagColours: {
        'testTrackid123': 'green'
    }
};

const retrieveAuthTokens = (state, action) => {
    return {
        ...state,
        authToken: action.authToken,
        refreshToken: action.refreshToken
    }
}

const addTag = (state, action) => {
    const newId = Math.max(Object.keys(state.tags[action.trackId]))+1
    
    const colours = ['red','blue','green','purple','orange'];
    const randTagColour = colours[Math.floor(Math.random() * colours.length)];
    const updatedTagColours = Object.keys(state.tagColours).includes(action.tagName) ? {...state.tagColours} : {...state.tagColours, [action.tagName]: randTagColour}

    const updatedTrackTags = state.tags[action.trackId] ? {...state.tags[action.trackId], [newId]: action.tagName} : {[newId]: action.tagName}
    return {
        ...state,
        tags: {
            ...state.tags,
            [action.trackId]: updatedTrackTags
        },
        tagColours: updatedTagColours
    }
}

const removeTag = (state, action) => {
    console.log('remove tag')
    const updateTagColours = {...state.tagColours}
    console.log('updateTagColours ',updateTagColours)
    delete updateTagColours[state.tags[action.trackId][action.tagId]]

    const updatedTags = state.tags[action.trackId] //.filter(tag => tag !== action.tagName)
    delete updatedTags[action.tagId]
    return {
        ...state,
        tags: {
            ...state.tags,
            [action.trackId]: updatedTags
        },
        tagColours: updateTagColours
    }
}

const updateTag = (state, action) => {
    const updatedTrackTags = {...state.tags[action.trackId], [action.tagId]: action.input}
    
    return {
        ...state,
        tags: {
            ...state.tags,
            [action.trackId]: updatedTrackTags
        }
    }
}

const updateTagSource = (state, action) => {
    return {
        ...state,
        tagSource: action.tagSource
    }
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.RETRIEVE_AUTH_TOKENS: return retrieveAuthTokens(state, action)
        case actionTypes.ADD_TAG: return addTag(state, action)
        case actionTypes.REMOVE_TAG: return removeTag(state, action)
        case actionTypes.UPDATE_TAG: return updateTag(state, action)
        case actionTypes.UPDATE_TAG_SOURCE: return updateTagSource(state, action)
        default: return state;
    }
}

export default reducer;