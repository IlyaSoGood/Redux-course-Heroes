import {useHttp} from '../../hooks/http.hook';
import { useEffect, useCallback } from 'react';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import { createSelector } from 'reselect';
import { useDispatch, useSelector } from 'react-redux';

import { heroesFetching, heroesFetched, heroesFetchingError, deleteHero } from '../../actions';
import HeroesListItem from "../heroesListItem/HeroesListItem";
import Spinner from '../spinner/Spinner';

// Задача для этого компонента:
// При клике на "крестик" идет удаление персонажа из общего состояния +
// Усложненная задача:
// Удаление идет и с json файла при помощи метода DELETE

const HeroesList = () => {
    console.log('render')
    const filteredHeroesSelector = createSelector(
        (state) => state.filters.activeFilter,
        (state) => state.heroes.heroes,
        (filter, heroes) => {
            if (filter) {
                return heroes.filter(hero => hero.element === filter)
            } else {
                return heroes;            
            }
        }
    )

    const filteredHeroes = useSelector(filteredHeroesSelector);
    const heroesLoadingStatus = useSelector(state => state.heroes.heroesLoadingStatus);
    const dispatch = useDispatch();
    const {request} = useHttp();

    useEffect(() => {
        dispatch(heroesFetching);
        request("http://localhost:3001/heroes")
            .then(data => dispatch(heroesFetched(data)))
            .catch(() => dispatch(heroesFetchingError()))
        // eslint-disable-next-line
    }, []);
    
    const deleteHeroById = useCallback((id) => {
        request(`http://localhost:3001/heroes/${id}`, "DELETE")
            .then(data => console.log(data))
            .then(dispatch(deleteHero(id)))
            .catch((e) => console.log(e.message))
        // eslint-disable-next-line
    },[request])

    if (heroesLoadingStatus === "loading") {
        return <Spinner/>;
    } else if (heroesLoadingStatus === "error") {
        return <h5 className="text-center mt-5">Ошибка загрузки</h5>
    }



    const renderHeroesList = (arr) => {
        if (arr.length === 0) {
            return (
                <CSSTransition
                    timeout={0}
                    classNames="hero">
                    <h5 className="text-center mt-5">Героев пока нет</h5>
                </CSSTransition>
            )
        }

        return arr.map(({id, ...props}) => {
            return  <CSSTransition
                        key={id}
                        timeout={500}
                        classNames="card"
                    >
                        <HeroesListItem 
                            {...props} 
                            deleteHeroById={() => deleteHeroById(id)} 
                        />
                    </CSSTransition>

        })
    }

    const elements = renderHeroesList(filteredHeroes);
    return (
        <TransitionGroup element='ul'>
            {elements}
        </TransitionGroup>
    )
}

export default HeroesList;