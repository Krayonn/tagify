import * as actionTypes from './actionTypes';
import axios from '../../axios';

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

export const retrieveTagsSuccess = (tags) => {
    return {
        type: actionTypes.RETIREVE_TAGS_SUCCSESS,
        tags: tags
    }
}

export const retrieveTagsFail = (error) => {
    return {
        type: actionTypes.RETIREVE_TAGS_FAIL,
        error: error
    }
}

export const retrieveTags = (username) => {
    return dispatch => {
        axios.get('/api/tagTracks?user='+username)
            .then(resp => {
                let tags = {};
                let count = 0
                for (let track of Object.keys(resp.data)) {
                    let trackTags = JSON.parse(resp.data[track].replaceAll("\'","\""))
                    const colours = ['red', 'blue', 'green', 'purple', 'orange'];
                    const randTagColour = colours[Math.floor(Math.random() * colours.length)];
                    tags[track] = trackTags.map(tag => ({ id: count, value: tag, colour: randTagColour, matchColour: null }));
                    count++;
                }
                dispatch(retrieveTagsSuccess(tags));
            })
            .catch(err => {
                console.log('Something went wrong retrieving tags', err)
                dispatch(retrieveTagsFail(err)
                )
            })
    }
}


