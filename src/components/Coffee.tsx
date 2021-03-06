import * as React from 'react';
import * as classnames from 'classnames';

import { CoffeeCup, CoffeeDescription, CoffeeName, Container, CupHandle, Favorite, Ingredient } from '../styles/CoffeeStyles';

import findOneCoffee from '../api/findOneCoffee';
import findOneIngredient from '../api/findOneIngredient';

class Coffee extends React.Component <any, any> {

    constructor (props) {
        super(props);

        this.state = {
            coffee: null
        };
    }

    componentDidMount () {
        if (!this.props.id) {
            return;
        }
    
        findOneCoffee(this.props.id)
            .then(coffee => {

                this.setState({
                    coffee
                });

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
                    this.setState({
                        coffee
                    });
                });
            });
    }

    render () {
        if (!this.state.coffee) {
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
                    onClick={this.props.toggleIsFavorite}
                    style={{
                        color: this.props.isFavorite ? '#ffe500' : '#FFFFFF'
                    }}
                    className={classnames({
                        'fa': true,
                        'fa-heart': this.props.isFavorite,
                        'fa-heart-o': !this.props.isFavorite
                    })}
                /> {this.state.coffee.name}</CoffeeName>
                <CoffeeCup>
                    <CupHandle />
                    {this.state.coffee.ingredients.map(ingredient => (
                        <Ingredient key={ingredient.id} style={{
                            backgroundColor: ingredient.color,
                            color: ingredient.textColor || '#000000',
                            height: ingredient.oz * 50
                        }}>{ingredient.name}</Ingredient>
                    ))}
                </CoffeeCup>
                <CoffeeDescription>{this.state.coffee.description}</CoffeeDescription>
            </Container>
        );
    }

}

export default Coffee;