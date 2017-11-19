import fetchFavorites from './fetchFavorites';

const removeFromFavorites = coffeeId => {
    return fetchFavorites().then(favorites => {
        delete favorites[coffeeId];

        localStorage.favoriteCoffees = JSON.stringify(favorites);

        return Promise.resolve(favorites);
    });
};

export default removeFromFavorites;