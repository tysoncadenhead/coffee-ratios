import coffees from '../data/coffees';

const fetchCoffees = () => 
    Promise.resolve(Object.keys(coffees).map(key => coffees[key]));

export default fetchCoffees;