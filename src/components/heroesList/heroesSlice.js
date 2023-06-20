import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import {useHttp} from '../../hooks/http.hook';

const initialState = {
    heroes: [],
    heroesLoadingStatus: 'idle',
}

export const fetchHeroes = createAsyncThunk(
    //задаем имя после /
    'heroes/fetchHeroes',
    //Вторым аргументов идет Promise! Либо синхронная ф-ия но с обязательной обработкой ошибки
    //тут тоже 2 аргумента :-) Но в данном случае они не нужны
    async () => {
        const {request} = useHttp();
        return await request("http://localhost:3001/heroes")
    }
);

const heroesSlice = createSlice({
    name: 'heroes',
    initialState,
    //
    reducers: {
        //тут создаются actionCreators и сами действия
        //Механизм точно такой же - библиотека immer.js под капотом => без return
        addHero: (state, action) => {state.heroes.push(action.payload);},
        deleteHero: (state, action) => {state.heroes = state.heroes.filter(hero => hero.id !== action.payload);}
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchHeroes.pending, state => {state.heroesLoadingStatus = 'loading';})
            .addCase(fetchHeroes.fulfilled, (state, action) => {
                        state.heroesLoadingStatus ='idle';
                        state.heroes = action.payload;
                    })
            .addCase(fetchHeroes.rejected, state => {state.heroesLoadingStatus = 'error';})
            .addDefaultCase(() => {})
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