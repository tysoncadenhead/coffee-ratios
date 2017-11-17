import ingredients from '../data/ingredients';

const findOneIngredient = id => 
    Promise.resolve({
        id,
        ...ingredients[id]
    });

export default findOneIngredient;