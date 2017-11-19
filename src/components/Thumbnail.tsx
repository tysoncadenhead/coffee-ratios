import * as React from 'react';

import { CoffeeCup, Container, Ingredient } from '../styles/ThumbnailStyles';

import findOneCoffee from '../api/findOneCoffee';
import findOneIngredient from '../api/findOneIngredient';

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
                onClick={() => this.props.setSelectedCoffee(this.props.id)} 
                style={{
                    backgroundColor: this.props.isFavorite ? '#ffe500' : 'rgb(60, 26, 17)',
                    borderColor: this.props.isFavorite ? '#FFFFFF' : 'transparent',
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



export default Thumbnail;