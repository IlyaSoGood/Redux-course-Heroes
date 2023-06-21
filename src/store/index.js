import { configureStore } from '@reduxjs/toolkit';

import filters from '../components/heroesFilters/filtersSlice';
import { apiSlice } from '../api/apiSlice';

const stringMiddleWare = () => (next) => (action) => {
    if (typeof action === 'string') {
        return next({
            type: action
        })
    }
    return next(action)
}

const store = configureStore({
    reducer: {filters, 
                [apiSlice.reducerPath]: apiSlice.reducer},
    //Для работы RTK понадобится еще 1 middleware
    middleware: getDefaultMiddleware => getDefaultMiddleware().concat(stringMiddleWare, apiSlice.middleware),
    devTools: process.env.NODE_ENV !== 'production',
    
})

export default store;

// !!! 
// 1. В reducer стараться не передавать больше 1 поля, все действия стараться делать в actionCreator
// 2. В actionCreator передавать только строки первым аргументом
// 3. Для сложенных actionCreators есть extraReducers и createAsyncThunk