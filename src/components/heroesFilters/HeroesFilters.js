import { useEffect } from 'react';

import {useHttp} from '../../hooks/http.hook';
import { useDispatch, useSelector } from 'react-redux';

import { fetchFilters } from '../../actions';
import { filterChange } from './filtersSlice';

import Spinner from '../spinner/Spinner';
import MyButton from "../UI/MyButton/MyButton";

const HeroesFilters = () => {
    const {filters, filtersLoadingStatus, activeFilter} = useSelector(state => state.filters);
    const dispatch = useDispatch();
    const {request} = useHttp();

    useEffect(() => {
        dispatch(fetchFilters(request));

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