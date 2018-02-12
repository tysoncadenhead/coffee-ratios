import * as R from 'ramda';
import * as React from 'react';

import { withHandlers, withState } from 'recompose';

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
                    isFavorite={R.path(['favorites', coffee.id], props)}
                    selectedCoffee={props.selectedCoffee} 
                        onClick={R.compose(
                            props.setSelectedCoffee,
                            R.always(coffee.id)
                        )} />
            ))}
        </Thumbnails>
        <Coffee 
            id={props.selectedCoffee} 
            key={props.selectedCoffee}
            isFavorite={R.path(['favorites', props.selectedCoffee], props)}
            toggleIsFavorite={props.toggleIsFavorite}
        />
    </AppWrapper>
);

const getId = R.prop('selectedCoffee');

const toggleIsFavorite = props => {
    const id = getId(props);
    const isFavorite = R.path(['favorites', id])(props);

    const toggleFavorite = R.ifElse(
        R.equals(true),
        R.always(removeFromFavorites),
        R.always(addToFavorites)
    )(isFavorite);

    return toggleFavorite(id)
        .then(props.setFavorites);
};

const getFavorites = props =>
    fetchFavorites()
        .then(props.setFavorites);

const getCoffees = props =>
    fetchCoffees()
        .then(props.setCoffees);

export default R.compose(
    withState('selectedCoffee', 'setSelectedCoffee', null),
    withState('favorites', 'setFavorites', {}),
    withState('coffees', 'setCoffees', []),
    withHandlers({
        toggleIsFavorite,
        getFavorites,
        getCoffees
    }),
    componentDidMount(R.compose(
        R.tap(getCoffees),
        R.tap(getFavorites)
    ))
)(App);
