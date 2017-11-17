import * as React from 'react';

import findOneCoffee from '../api/findOneCoffee';
import findOneIngredient from '../api/findOneIngredient';
import styled from 'styled-components';

class Thumbnail extends React.Component <any, any> {

    constructor (props) {
        super(props);

        this.startHovering = this.startHovering.bind(this);
        this.endHovering = this.endHovering.bind(this);

        this.state = {
            coffee: null,
            hovering: false
        };
    }

    startHovering () {
        this.setState({
            hovering: true
        });
    }

    endHovering () {
        this.setState({
            hovering: false
        });
    }

    componentDidMount () {
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
            return null;
        }
        
        return (
            <Container 
                onMouseDown={this.startHovering}
                onMouseUp={this.endHovering}
                onClick={this.props.onClick} 
                style={{
                    opacity: this.props.id === this.props.selectedCoffee ? 1 : 0.5
                }}
            >
                <CoffeeCup>
                    {this.state.coffee.ingredients.map(ingredient => (
                        <Ingredient key={ingredient.id} style={{
                            backgroundColor: ingredient.color,
                            color: ingredient.textColor || '#000000',
                            height: ingredient.oz * 50
                        }} />
                    ))}
                </CoffeeCup>
            </Container>
        )
    }

}

const Container = styled.button`
    background-color: rgb(60, 26, 17);
    border: none;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    padding: 12px;
    border-radius: 84px;
    width: 100px;
    height: 100px;
    margin: 7px;
    outline: none;
    cursor: pointer;

    &:focus {
        padding: 22px;
    }
`;

const Ingredient = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    font-family: Roboto;
`;

const CoffeeCup = styled.div`
    width: 40px;
    height: 56px;
    background-color: #EEEEEE;
    display: flex;
    justify-content: flex-end;
    flex-direction: column;
    padding: 5px;
    position: relative;
`;

export default Thumbnail;