import * as actionTypes from './actionTypes';

const initialState = {
    authToken: null,
    refreshToken: null,
    tagSource: '',
    tags: {
        'testTrackid123': [{ id: 1, value: 'testTag', colour: 'green', matchColour: 'green' }]
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
    const newId = state.tags[action.trackId] ? Math.max(...state.tags[action.trackId].map(t => t.id)) + 1 : 1;
    const colours = ['red', 'blue', 'green', 'purple', 'orange'];
    const randTagColour = colours[Math.floor(Math.random() * colours.length)];
    
    let matchingTag = null;
    for (let [trackId, tags] of Object.entries(state.tags)) {
        console.log('entries',trackId, tags)
        matchingTag = tags.find(tag => tag.value === action.tagName)
        if (matchingTag) break
    }
    const matchColour = matchingTag ? matchingTag.colour : null

    const updatedTrackTags = state.tags[action.trackId] ? [...state.tags[action.trackId], { id: newId, value: action.tagName, colour: randTagColour, matchColour: matchColour }] : [{ id: newId, value: action.tagName, colour: randTagColour, matchColour: matchColour }]


    return {
        ...state,
        tags: {
            ...state.tags,
            [action.trackId]: updatedTrackTags
        }
    }
}

const removeTag = (state, action) => {
    const updatedTags = state.tags[action.trackId].filter(tag => tag.id !== action.tagId)

    return {
        ...state,
        tags: {
            ...state.tags,
            [action.trackId]: updatedTags
        }
    }
}

const updateTag = (state, action) => {
    const updatedTrackTags = [...state.tags[action.trackId]]
    const updatedTag = updatedTrackTags[updatedTrackTags.findIndex(t => t.id === action.tagId)]
    updatedTag.value = action.input

    let matchingTag = null;
    for (let [trackId, tags] of Object.entries(state.tags)) {
        console.log('entries',trackId, tags)
        matchingTag = tags.find(tag => tag.value === action.input && trackId !== action.trackId)
        if (matchingTag) {
            updatedTag.matchColour = matchingTag.matchColour ? matchingTag.matchColour : matchingTag.colour
            break
        }
    }
    console.log('matchingTag', matchingTag)
    if (!matchingTag) updatedTag.matchColour = null

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