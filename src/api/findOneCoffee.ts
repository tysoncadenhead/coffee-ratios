import coffees from '../data/coffees';

const findOneCoffee = id => 
    Promise.resolve(coffees[id]);

export default findOneCoffee;