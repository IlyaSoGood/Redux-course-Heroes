import { createReducer } from '@reduxjs/toolkit';
import {
    heroesFetching,
    heroesFetched,
    heroesFetchingError,
    deleteHero,
    addHero
} from '../actions';

const initialState = {
    heroes: [],
    heroesLoadingStatus: 'idle',
}

//ВИЗУАЛЬНО НЕИММУТАБЕЛЬНЫЙ код, но внутри используется immer.js, поэтому все равно иммутабельность применяется
// const heroes = createReducer(initialState, builder => {
//     builder
//         .addCase(heroesFetching, state => {
//             //именно такая запись БЕЗ return !!! ЛИБО return но самостоятельно забодится об иммутабельности
//             state.heroesLoadingStatus = 'loading';
//         })
//         .addCase(heroesFetched, (state, action) => {
//             state.heroesLoadingStatus ='idle';
//             state.heroes = action.payload;
//         })
//         .addCase(heroesFetchingError, state => {
//             state.heroesLoadingStatus = 'error'
//         })
//         .addCase(addHero, (state, action) => {
//             state.heroes.push(action.payload);
//         })
//         .addCase(deleteHero, (state, action) => {
//             state.heroes = state.heroes.filter(hero => hero.id !== action.payload);
//         })
//         .addDefaultCase(() => {});
// })

//2ой ВАРИАНТ createReducer: короче, но работает только в JS, в TS работать не будет!
const heroes = createReducer(initialState, {
        [heroesFetching]: state => {state.heroesLoadingStatus = 'loading';},
        [heroesFetched]: (state, action) => {
                            state.heroesLoadingStatus ='idle';
                            state.heroes = action.payload;
                        },
        [heroesFetchingError]: state => {state.heroesLoadingStatus = 'error';},
        [addHero]: (state, action) => {state.heroes.push(action.payload);},
        [deleteHero]: (state, action) => {state.heroes = state.heroes.filter(hero => hero.id !== action.payload);}
    },
    [],
    state => state
)

// const heroes = (state = initialState, action) => {
//     switch (action.type) {
//         case 'HEROES_FETCHING':
//             return {
//                 ...state,
//                 heroesLoadingStatus: 'loading'
//             }
//         case 'HEROES_FETCHED':
//             return {
//                 ...state,
//                 heroes: action.payload,
//                 heroesLoadingStatus: 'idle'
//             }
//         case 'HEROES_FETCHING_ERROR':
//             return {
//                 ...state,
//                 heroesLoadingStatus: 'error'
//             }

//         case 'DELETE_HERO':
//             return {
//                 ...state,
//                 heroes: state.heroes.filter(hero => hero.id !== action.payload),
//             }
//         case 'ADD_HERO':
//             return {
//                 ...state,
//                 heroes: [...state.heroes, action.payload]
//             }

//         default: return state
//     }
// }

export default heroes;