import { useEffect } from 'react';

import { useDispatch, useSelector } from 'react-redux';

import { filterChange, fetchFilters, selectAll } from './filtersSlice';
import store from '../../store';

import Spinner from '../spinner/Spinner';
import MyButton from "../UI/MyButton/MyButton";

const HeroesFilters = () => {
    //тоже работает, но неизвестно правильно ли...
    // const filters = useSelector(selectAll);
    
    const filters = selectAll(store.getState())

    const { filtersLoadingStatus, activeFilter } = useSelector(state => state.filters);
    
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchFilters());
        // eslint-disable-next-line
    }, []);

    if (filtersLoadingStatus === "loading") {
        return <Spinner/>;
    } else if (filtersLoadingStatus === "error") {
        return <h5 className="text-center mt-5">Ошибка загрузки</h5>
    }

    const changeFilter = (value) => {
        dispatch(filterChange(value));     
    }

    const renderBtns = (arr) => {
        if (arr.length === 0) {
            return <h5 className="text-center mt-5">Фильтры не найдены</h5>
        }

        return filters.map(filter => {
            return (
                <MyButton
                    filter={filter}
                    onChange={value => {
                        changeFilter(value)
                    }}
                    key={filter.id}
                    selectedFilter={activeFilter}
                />
            )
        })
    }


    return (
        <div className="card shadow-lg mt-4">
            <div className="card-body">
                <p className="card-text">Отфильтруйте героев по элементам</p>
                <div className="btn-group">
                    {renderBtns(filters)}
                </div>
            </div>
        </div>
    )
}

export default HeroesFilters;