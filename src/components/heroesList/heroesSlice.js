import { createSlice, createAsyncThunk, createEntityAdapter, createSelector } from '@reduxjs/toolkit';
import {useHttp} from '../../hooks/http.hook';

const heroesAdapter = createEntityAdapter();

// const initialState = {
//     heroes: [],
//     heroesLoadingStatus: 'idle',
// }

const initialState = heroesAdapter.getInitialState({
    heroesLoadingStatus: 'idle'
});


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
    reducers: {
        //тут создаются actionCreators и сами действия
        //Механизм точно такой же - библиотека immer.js под капотом => без return
        addHero: (state, action) => {
            heroesAdapter.addOne(state, action.payload);
        },
        deleteHero: (state, action) => {
            heroesAdapter.removeOne(state, action.payload);
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchHeroes.pending, state => {state.heroesLoadingStatus = 'loading';})
            .addCase(fetchHeroes.fulfilled, (state, action) => {
                        state.heroesLoadingStatus ='idle';
                        heroesAdapter.setAll(state, action.payload)
                    })
            .addCase(fetchHeroes.rejected, state => {state.heroesLoadingStatus = 'error';})
            .addDefaultCase(() => {})
    }
});

const {actions, reducer} = heroesSlice;

export default reducer;

const {selectAll} = heroesAdapter.getSelectors(state => state.heroes);

export const filteredHeroesSelector = createSelector(
    (state) => state.filters.activeFilter,
    selectAll,
    (filter, heroes) => {
        if (filter) {
            return heroes.filter(hero => hero.element === filter)
        } else {
            return heroes;            
        }
    }
)


export const {
    heroesFetching,
    heroesFetched,
    heroesFetchingError,
    addHero,
    deleteHero
} = actions;