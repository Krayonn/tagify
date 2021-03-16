
import * as actionTypes from '../actions/actionTypes';

const initialState = {
    typeActive: 'playlists',
    musicData: {}
};

const setTypeActive = (state, action) => {
    return {
        ...state,
        typeActive: action.musicType
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


const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.SET_TYPE_ACTIVE: return setTypeActive(state, action)
        case actionTypes.SAVE_MUSIC: return saveMusic(state, action)
        default: return state;
    }
}

export default reducer;