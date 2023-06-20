import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    heroes: [],
    heroesLoadingStatus: 'idle',
}

const heroesSlice = createSlice({
    name: 'heroes',
    initialState,
    //
    reducers: {
        //тут создаются actionCreators и сами действия
        //Механизм точно такой же - библиотека immer.js под капотом => без return
        heroesFetching: state => {state.heroesLoadingStatus = 'loading';},
        heroesFetched: (state, action) => {
                            state.heroesLoadingStatus ='idle';
                            state.heroes = action.payload;
                        },
        heroesFetchingError: state => {state.heroesLoadingStatus = 'error';},
        addHero: (state, action) => {state.heroes.push(action.payload);},
        deleteHero: (state, action) => {state.heroes = state.heroes.filter(hero => hero.id !== action.payload);}
    }
});

const {actions, reducer} = heroesSlice;

export default reducer;
export const {
    heroesFetching,
    heroesFetched,
    heroesFetchingError,
    addHero,
    deleteHero
} = actions;