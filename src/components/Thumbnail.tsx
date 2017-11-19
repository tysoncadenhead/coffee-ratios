import * as R from 'ramda';
import * as React from 'react';

import { CoffeeCup, Container, Ingredient } from '../styles/ThumbnailStyles';
import { compose, withHandlers, withState } from 'recompose';

import { componentDidMount } from 'react-functional-lifecycle';
import findOneCoffee from '../api/findOneCoffee';
import findOneIngredient from '../api/findOneIngredient';

const Thumbnail = props => {
    if (!props.coffee) {
        return null;
    }
    
    return (
        <Container 
            onMouseDown={props.startHovering}
            onMouseUp={props.endHovering}
            onClick={() => props.setSelectedCoffee(props.id)}
            style={{
                backgroundColor: props.isFavorite ? '#ffe500' : 'rgb(60, 26, 17)',
                borderColor: props.isFavorite ? '#FFFFFF' : 'transparent',
                opacity: props.id === props.selectedCoffee ? 1 : 0.5
            }}
        >
            <CoffeeCup>
                {props.coffee.ingredients.map(ingredient => (
                    <Ingredient key={ingredient.id} style={{
                        backgroundColor: ingredient.color,
                        color: ingredient.textColor || '#000000',
                        height: ingredient.oz * 50
                    }} />
                ))}
            </CoffeeCup>
        </Container>
    )
};

export default compose(
    withState('coffee', 'setCoffee', null),
    withState('hovering', 'setHovering', false),
    withHandlers({
        startHovering: R.curry((props, _e) => {
            props.setHovering(true)
        }),
        endHovering: R.curry((props, _e) => {
            props.setHovering(false)
        })
    }),
    componentDidMount(props => {
        findOneCoffee(props.id)
            .then(coffee => {

                props.setCoffee(coffee);

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
                    props.setCoffee(coffee);
                });
            });
    })
)(Thumbnail);