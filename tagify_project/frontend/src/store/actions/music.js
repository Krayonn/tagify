import * as actionTypes from './actionTypes';

export const setTypeActive = (musicType) => {
    return {
        type: actionTypes.SET_TYPE_ACTIVE,
        musicType: musicType
    }
}

export const saveMusic = (musicType, musicData) => {
    return {
        type: actionTypes.SAVE_MUSIC,
        musicType: musicType,
        musicData: musicData
    }
}

