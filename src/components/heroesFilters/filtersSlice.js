import { createSlice, createAsyncThunk, createEntityAdapter } from '@reduxjs/toolkit';
import {useHttp} from '../../hooks/http.hook'

const filtersAdapter = createEntityAdapter();

const initialState = filtersAdapter.getInitialState({
    filtersLoadingStatus: 'idle',
    activeFilter: ''
});

export const fetchFilters = createAsyncThunk(
    //задаем имя после /
    'filters/fetchFilters',
    //Вторым аргументов идет Promise! Либо синхронная ф-ия но с обязательной обработкой ошибки
    //тут тоже 2 аргумента :-) Но в данном случае они не нужны
    async () => {
        const {request} = useHttp();
        return await request("http://localhost:3001/filters")
    }
);

const filtersSlice = createSlice({
    name: 'filters',
    initialState,
    reducers: {
        //тут создаются actionCreators и сами действия
        //Механизм точно такой же - библиотека immer.js под капотом => без return
        filterChange: (state, action) => {state.activeFilter = action.payload}
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchFilters.pending, state => {state.filtersLoadingStatus = 'loading';})
            .addCase(fetchFilters.fulfilled, (state, action) => {
                        state.filtersLoadingStatus ='idle';
                        filtersAdapter.setAll(state, action.payload)
                    })
            .addCase(fetchFilters.rejected, state => {state.filtersLoadingStatus = 'error';})
            .addDefaultCase(() => {})
    }
});

const {actions, reducer} = filtersSlice;

export default reducer;

export const {selectAll} = filtersAdapter.getSelectors(state => state.filters);

export const {
    filtersFetching,
    filtersFetched,
    filtersFetchingError,
    filterChange
} = actions;