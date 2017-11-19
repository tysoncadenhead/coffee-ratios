import fetchFavorites from './fetchFavorites';

const addToFavorites = coffeeId => {
    return fetchFavorites().then(favorites => {
        favorites[coffeeId] = true;

        localStorage.favoriteCoffees = JSON.stringify(favorites);

        return Promise.resolve(favorites);
    });
};

export default addToFavorites;