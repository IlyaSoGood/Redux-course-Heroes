import { Formik, Form } from 'formik';

import {useHttp} from '../../hooks/http.hook';
import { useDispatch, useSelector } from 'react-redux';
import { addHero, filterApply, filterClear } from '../../actions';


import * as uuid from 'uuid';

import MyTextInput from '../UI/MyTextInput/MyTextInput';
import MySelect from '../UI/MySelect/MySelect';
import Spinner from '../spinner/Spinner';

import validateRules from './validateRules';


// Задача для этого компонента:
// Реализовать создание нового героя с введенными данными. Он должен попадать
// в общее состояние и отображаться в списке + фильтроваться
// Уникальный идентификатор персонажа можно сгенерировать через uiid
// Усложненная задача:
// Персонаж создается и в файле json при помощи метода POST
// Дополнительно:
// Элементы <option></option> желательно сформировать на базе
// данных из фильтров

const HeroesAddForm = () => {
    const {filters, filtersLoadingStatus, activeFilter} = useSelector(state => state);
    const dispatch = useDispatch();
    const {request} = useHttp();

    const renderFilters = (filters, status) => {
        if (status === "loading") {
            return <Spinner/>;
        } else if (status === "error") {
            return <h5 className="text-center mt-5">Ошибка загрузки</h5>
        }  
        return filters.filter(filter => filter.value);

    }


    const onSubmit = (data, actions) => {
        const hero = {
            ...data,
            id: uuid.v4()
        }
        // console.log(JSON.stringify(hero, null, 2))

        request("http://localhost:3001/heroes", "POST", JSON.stringify(hero, null, 2))
            .then(data => console.log(data))
            .then(data => {
                dispatch(addHero(hero));
                if(activeFilter) {
                    dispatch(filterApply())
                } 
                else {
                    dispatch(filterClear())
                }
            })
            .then(actions.resetForm({
                values: {
                    name: '',
                    description: '',
                    element: ''
                }
            }))
            .catch((e) => console.log(e.message))
    }

    return (
        <Formik
            initialValues={{
                name: '',
                description: '',
                element: ''
            }}
            validate = {validateRules}
            onSubmit = {onSubmit}
        >
            <Form className="border p-4 shadow-lg rounded">
                <div className="mb-3">
                    <MyTextInput
                        Component='input'
                        type="text" 
                        name="name" 
                        className="form-control" 
                        id="name" 
                        placeholder="Как меня зовут?"
                        label="Имя нового героя"
                        labelClass="form-label fs-4"
                    />
                </div>

                <div className="mb-3">
                    <MyTextInput
                        Component='textarea'
                        type="text" 
                        name="description" 
                        className="form-control" 
                        id="text" 
                        placeholder="Что я умею?"
                        label="Описание"
                        labelClass="form-label fs-4"
                        style={{"height": '130px'}}
                    />
                </div>

                <div className="mb-3">
                     <MySelect
                        onChange={selected => console.log(selected)}
                        className="form-select"
                        id="element" 
                        name="element"
                        defaultOption="Я владею элементом..."
                        label="Выбрать элемент героя"
                        labelClass="form-label"
                        options={renderFilters(filters, filtersLoadingStatus)}

                    />
                </div>

                <button type="submit" className="btn btn-primary">Создать</button>
            </Form>
        </Formik>
    )
}

export default HeroesAddForm;