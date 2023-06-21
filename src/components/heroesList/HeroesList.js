import { useCallback, useMemo } from 'react';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import { useSelector } from 'react-redux';

import { useGetHeroesQuery, useDeleteHeroMutation } from '../../api/apiSlice';

import HeroesListItem from "../heroesListItem/HeroesListItem";
import Spinner from '../spinner/Spinner';

const HeroesList = () => {
    const {
        //добавляем значение heroes по умолчанию
        data: heroes = [],
        //isLoading срабатывает только при 1 запросе
        isLoading,
        isError,
    } = useGetHeroesQuery();

    const [deleteHero] = useDeleteHeroMutation();

    const activeFilter = useSelector(state => state.filters.activeFilter);

    const filteredHeroes = useMemo(() => {
        const filteredHeroes = heroes.slice();

        if (activeFilter) {
            return filteredHeroes.filter(hero => hero.element === activeFilter)
        } else {
            return filteredHeroes;            
        }
    }, [heroes, activeFilter])
   
    const deleteHeroById = useCallback((id) => {
        deleteHero(id)
        // eslint-disable-next-line
    },[])

    if (isLoading) {
        return <Spinner/>;
    } else if (isError) {
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