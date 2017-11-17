import * as React from 'react';

import findOneCoffee from '../api/findOneCoffee';
import findOneIngredient from '../api/findOneIngredient';
import styled from 'styled-components';

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
                <CoffeeName>{this.state.coffee.name}</CoffeeName>
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
        )
    }

}

const CoffeeName = styled.div`
    font-family: Roboto;
    color: #FFFFFF;
    font-size: 22px;
    text-transform: uppercase;
    padding-bottom: 24px;
`;

const CoffeeDescription = styled.div`
    font-family: Roboto;
    color: rgb(36, 15, 4);
    font-size: 12px;
    padding-top: 24px;
`;

const Container = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    padding: 52px;
`;

const Ingredient = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    font-family: Roboto;
    font-size: 14px;
`;

const CoffeeCup = styled.div`
    width: 200px;
    height: 350px;
    background-color: #EEEEEE;
    display: flex;
    justify-content: flex-end;
    flex-direction: column;
    padding: 18px;
    position: relative;
`;

const CupHandle = styled.div`
    position: absolute;
    right: -54px;
    border-width: 29px;
    border-color: #EEEEEE;
    border-style: solid;
    border-radius: 27px;
    z-index: -1;
    top: 100px;
    height: 150px;
    width: 40px;
`;

export default Coffee;