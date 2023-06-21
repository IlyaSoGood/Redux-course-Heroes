import { Formik, Form } from 'formik';

import {  useSelector } from 'react-redux';

import { useCreateHeroMutation } from '../../api/apiSlice';

import * as uuid from 'uuid';

import MyTextInput from '../UI/MyTextInput/MyTextInput';
import MySelect from '../UI/MySelect/MySelect';
import Spinner from '../spinner/Spinner';

import validateRules from './validateRules';
import { selectAll } from '../heroesFilters/filtersSlice';
import store from '../../store';

const HeroesAddForm = () => {
    //тоже работает, но неизвестно правильно ли...
    // const filters  = useSelector(selectAll);
    
    const filters = selectAll(store.getState())

    const [createHero, { isLoading, isError }] = useCreateHeroMutation();

    const { filtersLoadingStatus } = useSelector(state => state.filters);

    const renderFilters = (filters, status) => {
        if (isLoading) {
            return <Spinner/>;
        } else if (isError) {
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

        createHero(hero).unwrap();
        
        actions.resetForm({
            values: {
                name: '',
                description: '',
                element: ''
            }
        })
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