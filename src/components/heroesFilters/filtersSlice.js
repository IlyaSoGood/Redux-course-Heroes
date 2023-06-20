import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    filters: [],
    filtersLoadingStatus: 'idle',
    activeFilter: '',
}

const filtersSlice = createSlice({
    name: 'filters',
    initialState,
    //
    reducers: {
        //тут создаются actionCreators и сами действия
        //Механизм точно такой же - библиотека immer.js под капотом => без return
        filtersFetching: state => {state.filtersLoadingStatus = 'loading';},
        filtersFetched: (state, action) => {
                            state.filtersLoadingStatus ='idle';
                            state.filters = action.payload;
                        },
        filtersFetchingError: state => {state.filtersLoadingStatus = 'error';},
        filterChange: (state, action) => {state.activeFilter = action.payload}
    }
});

const {actions, reducer} = filtersSlice;

export default reducer;
export const {
    filtersFetching,
    filtersFetched,
    filtersFetchingError,
    filterChange
} = actions;