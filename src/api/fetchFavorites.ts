const fetchFavorites = () => {
    const favorites = JSON.parse(localStorage.favoriteCoffees || '{}');
    
    return Promise.resolve(favorites);
};

export default fetchFavorites;