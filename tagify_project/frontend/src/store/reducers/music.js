
import * as actionTypes from '../actions/actionTypes';

const initialState = {
    typeActive: 'playlists',
    musicData: {},
    pageNumber: 1
};

const setTypeActive = (state, action) => {
    return {
        ...state,
        typeActive: action.musicType,
        pageNumber: 1

    }
}

const saveMusic = (state, action) => {
    return {
        ...state,
        musicData: {
            ...state.musicData,
            [action.musicType]: action.musicData
        }

    }
}

const changePage = (state, action) => {
    return {
        ...state,
        pageNumber: action.pageNumber

    }
}

const clearMusic = (state, action) => {
    return {
        ...state,
        musicData: {}
    }
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.SET_TYPE_ACTIVE: return setTypeActive(state, action)
        case actionTypes.SAVE_MUSIC: return saveMusic(state, action)
        case actionTypes.CLEAR_MUSIC: return clearMusic(state, action)
        case actionTypes.CHANGE_PAGE: return changePage(state, action)
        default: return state;
    }
}

export default reducer;