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
                    {...props}
                    id={coffee.id} 
                    key={coffee.id} 
                    isFavorite={props.favorites[
                        coffee.id
                    ]}
                    selectedCoffee={props.selectedCoffee}
                />
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

const getFavorites = R.tap(props =>
    fetchFavorites()
        .then(props.setFavorites)
);

const getCoffees = R.tap(props =>
    fetchCoffees()
        .then(props.setCoffees)
);

const toggleFavoriteMethod = R.ifElse(
    R.equals(true),
    R.always(removeFromFavorites),
    R.always(addToFavorites)
);

const getSelectedCoffeeId = R.prop('selectedCoffee');

const getFavoriteRequest = props => {
    const id = getSelectedCoffeeId(props);
    const isFavorite = R.path(['favorites', id])(props);
    return toggleFavoriteMethod(isFavorite);
};

export default compose(
    withState('favorites', 'setFavorites', {}),
    withState('selectedCoffee', 'setSelectedCoffee'),
    withState('coffees', 'setCoffees', []),
    withHandlers({
        toggleIsFavorite: R.curry((props, _e) => {
            const request = getFavoriteRequest(props);
            const id = getSelectedCoffeeId(props);
            
            return request(id).then(favorites => {
                props.setFavorites(favorites);
            });
        })
    }),
    componentDidMount(
        compose(
            getCoffees,
            getFavorites
        )
    )
)(App);
