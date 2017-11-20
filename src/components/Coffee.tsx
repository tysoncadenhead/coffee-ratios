import * as React from 'react';
import * as classnames from 'classnames';

import { CoffeeCup, CoffeeDescription, CoffeeName, Container, CupHandle, Favorite, Ingredient } from '../styles/CoffeeStyles';
import { compose, withState } from 'recompose';

import { componentDidMount } from 'react-functional-lifecycle';
import findOneCoffee from '../api/findOneCoffee';
import findOneIngredient from '../api/findOneIngredient';

const Coffee = props => {
    if (!props.coffee) {
        return (
            <Container>
                <CoffeeName>Coffee Maker</CoffeeName>
                <CoffeeCup>
                    <CupHandle />
                </CoffeeCup>
            </Container>
        );
    }
    
    return (
        <Container>
            <CoffeeName><Favorite 
                onClick={props.toggleIsFavorite}
                style={{
                    color: R.ifElse(
                        R.equals(true),
                        R.always('#ffe500')
                        R.always('#FFFFFF')
                    )(props.isFavorite)
                }}
                className={classnames({
                    'fa': true,
                    'fa-heart': props.isFavorite,
                    'fa-heart-o': !props.isFavorite
                })}
            /> {props.name}</CoffeeName>
            <CoffeeCup>
                <CupHandle />
                {props.coffee.ingredients.map(ingredient => (
                    <Ingredient key={ingredient.id} style={{
                        backgroundColor: ingredient.color,
                        color: ingredient.textColor || '#000000',
                        height: ingredient.oz * 50
                    }}>{ingredient.name}</Ingredient>
                ))}
            </CoffeeCup>
            <CoffeeDescription>{props.coffee.description}</CoffeeDescription>
        </Container>
    );
};

const getCoffee = props => {
    if (!props.id) {
        return;
    }

    findOneCoffee(props.id)
        .then(coffee => {

            props.setCoffee(
                coffee
            );

            const ingredientPromises = coffee.ingredients.map((ingredient, key) => {
                return findOneIngredient(ingredient.id)
                    .then(res => {
                        coffee.ingredients[key] = {
                            ...ingredient,
                            ...res
                        };
                    });
            });

            return Promise.all(ingredientPromises).then(() => {
                props.setCoffee(
                    coffee
                );
            });
        });
}

export default compose(
    withState('coffee', 'setCoffee', null),
    componentDidMount(getCoffee)
)(Coffee);