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

const getFavorites = props => R.tap(
    fetchFavorites()
        .then(props.setFavorites)
);

const getCoffees = props => R.tap(
    fetchCoffees()
        .then(props.setCoffees)
);

const addOrRemove = R.ifElse(
    R.equals(true),
    R.always(removeFromFavorites),
    R.always(addToFavorites)
);

const getSelectedCoffee = R.prop('selectedCoffee');

const toggleIsFavorite = R.curry((props, _e) => {
    const id = getSelectedCoffee(props);
    const isFavorite = R.path(['favorites', id], props);
    const request = addOrRemove(isFavorite);

    return request(id).then(props.setFavorites);
});

export default compose(
    withState('selectedCoffee', 'setSelectedCoffee', null),
    withState('favorites', 'setFavorites', {}),
    withState('coffees', 'setCoffees', []),
    withHandlers({
        toggleIsFavorite
    }),
    componentDidMount(
        compose(
            getFavorites,
            getCoffees
        )
    )
)(App);
