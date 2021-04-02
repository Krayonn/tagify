
import * as actionTypes from '../actions/actionTypes';

const initialState = {
    typeActive: 'albums',
    musicData: {
        albums: [
            {
                page: 1,
                id: '23jJjnLWnkYfK7E50Kmbcm',
                name: 'Hill Climber',
                artist: 'Vulfpeck',
                release_date: '2018-12-07',
                tracks: [
                  {
                    id: '1ggfAFVIaxcjjjJr9YnzB4',
                    title: 'Half of the Way',
                    track_number: 1,
                    artists: [
                      'Vulfpeck',
                      'Theo Katzman'
                    ]
                  },
                  {
                    id: '5JVccMKbfvFUYqb6DmbfQn',
                    title: 'Darwin Derby',
                    track_number: 2,
                    artists: [
                      'Vulfpeck',
                      'Theo Katzman',
                      'Antwaun Stanley'
                    ]
                  },
                  {
                    id: '6RKgqBMel196p8kmL2kZNN',
                    title: 'Lonely Town',
                    track_number: 3,
                    artists: [
                      'Vulfpeck',
                      'Theo Katzman'
                    ]
                  },
                  {
                    id: '2vHiqt9sSVgHLz2DTD0byv',
                    title: 'Love is a Beautiful Thing',
                    track_number: 4,
                    artists: [
                      'Vulfpeck',
                      'Theo Katzman',
                      'Monica Martin'
                    ]
                  },
                  {
                    id: '4stF6tTdUuJ3KSe6uZeMSc',
                    title: 'For Survival',
                    track_number: 5,
                    artists: [
                      'Vulfpeck',
                      'Mike Viola'
                    ]
                  },
                  {
                    id: '3Piyti0wHblUYUgAxMDYqh',
                    title: 'Soft Parade',
                    track_number: 6,
                    artists: [
                      'Vulfpeck'
                    ]
                  },
                  {
                    id: '1hQTxQYFkRVrsOx6HUcrwf',
                    title: 'Lost My Treble Long Ago',
                    track_number: 7,
                    artists: [
                      'Vulfpeck'
                    ]
                  },
                  {
                    id: '0mkfxNKr0w5aVBU237RAwf',
                    title: 'Disco Ulysses (Instrumental)',
                    track_number: 8,
                    artists: [
                      'Vulfpeck'
                    ]
                  },
                  {
                    id: '7uX7ACWLrHgMYoKAsRJbsV',
                    title: 'The Cup Stacker',
                    track_number: 9,
                    artists: [
                      'Vulfpeck'
                    ]
                  },
                  {
                    id: '59vHASOlLPZ6M3kFVoS6I5',
                    title: 'It Gets Funkier IV',
                    track_number: 10,
                    artists: [
                      'Vulfpeck',
                      'Louis Cole'
                    ]
                  }
                ],
                images: [
                  {
                    height: 640,
                    url: 'https://i.scdn.co/image/ab67616d0000b27347fc9a4dd73f3a28ee278d7c',
                    width: 640
                  },
                  {
                    height: 300,
                    url: 'https://i.scdn.co/image/ab67616d00001e0247fc9a4dd73f3a28ee278d7c',
                    width: 300
                  },
                  {
                    height: 64,
                    url: 'https://i.scdn.co/image/ab67616d0000485147fc9a4dd73f3a28ee278d7c',
                    width: 64
                  }
                ]
              }
        ]
    },
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