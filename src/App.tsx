import * as R from 'ramda';
import * as React from 'react';

import { compose, withHandlers, withState } from 'recompose';

import AppWrapper from './styles/AppWrapper';
import Coffee from './components/Coffee';
import Thumbnail from './components/Thumbnail';
import Thumbnails from './styles/Thumbnails'
import addToFavorites from './api/addToFavorites';
import { componentDidMount } from 'react-functional-lifecycle';
import fetchCoffees from './api/fetchCoffees';
import fetchFavorites from './api/fetchFavorites';
import removeFromFavorites from './api/removeFromFavorites';

const App = props => (
    <AppWrapper>
        <Thumbnails>
            {props.coffees.map(coffee => (
                <Thumbnail 
                    id={coffee.id} 
                    key={coffee.id} 
                    isFavorite={props.favorites[
                        coffee.id
                    ]}
                    selectedCoffee={props.selectedCoffee} 
                        onClick={() => {
                        props.setSelectedCoffee(coffee.id)
                    }} />
            ))}
        </Thumbnails>
        <Coffee 
            id={props.selectedCoffee} 
            key={props.selectedCoffee}
            isFavorite={props.favorites[
                props.selectedCoffee
            ]}
            toggleIsFavorite={props.toggleIsFavorite}
        />
    </AppWrapper>
);

const getFavorites = props =>
    fetchFavorites()
        .then(props.setFavorites);

const getCoffees = props =>
    fetchCoffees()
        .then(props.setCoffees);

const toggleIsFavorite = R.curry((props, _e) => {
    const id = props.selectedCoffee;
    const isFavorite = props.favorites[id];
    const request = R.ifElse(
        R.equals(true),
        R.always(removeFromFavorites),
        R.always(addToFavorites)
    )(isFavorite);

    return request(id).then(props.setFavorites);
});

export default compose(
    withState('selectedCoffee', 'setSelectedCoffee', null),
    withState('favorites', 'setFavorites', {}),
    withState('coffees', 'setCoffees', []),
    componentDidMount(
        compose(
            R.tap(getCoffees),
            R.tap(getFavorites)    
        )
    ),
    withHandlers({
        toggleIsFavorite
    })
)(App);
