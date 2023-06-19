
import { useEffect } from 'react';

import {useHttp} from '../../hooks/http.hook';
import { useDispatch, useSelector } from 'react-redux';
import { filtersFetching, filtersFetched, filtersFetchingError, filterChange, filterClear } from '../../actions';

import Spinner from '../spinner/Spinner';
import MyButton from "../UI/MyButton/MyButton";

// Задача для этого компонента:
// Фильтры должны формироваться на основании загруженных данных
// Фильтры должны отображать только нужных героев при выборе
// Активный фильтр имеет класс active
// Изменять json-файл для удобства МОЖНО!
// Представьте, что вы попросили бэкенд-разработчика об этом

const HeroesFilters = () => {
    const {filters, filtersLoadingStatus, activeFilter} = useSelector(state => state);
    const dispatch = useDispatch();
    const {request} = useHttp();

    useEffect(() => {
        dispatch(filtersFetching());
        request("http://localhost:3001/filters")
            .then(data => dispatch(filtersFetched(data)))
            .catch(() => dispatch(filtersFetchingError()))

        // eslint-disable-next-line
    }, []);

    if (filtersLoadingStatus === "loading") {
        return <Spinner/>;
    } else if (filtersLoadingStatus === "error") {
        return <h5 className="text-center mt-5">Ошибка загрузки</h5>
    }

    const changeFilter = (value) => {
        if (value) {
            dispatch(filterChange(value));            
        } else {
            dispatch(filterClear());
        }
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