import { configureStore } from '@reduxjs/toolkit';
import heroes from '../components/heroesList/heroesSlice';
import filters from '../components/heroesFilters/filtersSlice';

const stringMiddleWare = () => (next) => (action) => {
    if (typeof action === 'string') {
        return next({
            type: action
        })
    }
    return next(action)
}

const store = configureStore({
    reducer: {heroes, filters},
    middleware: getDefaultMiddleware => getDefaultMiddleware().concat(stringMiddleWare),
    devTools: process.env.NODE_ENV !== 'production',
    
})

export default store;

// !!! 
// 1. В reducer стараться не передавать больше 1 поля, все действия стараться делать в actionCreator
// 2. В actionCreator передавать только строки первым аргументом
// 3. Сложенные actionCreators пока не трогаем, для них в rt есть отдельный фун-ал.