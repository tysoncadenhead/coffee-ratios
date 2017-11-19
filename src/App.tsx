import * as React from 'react';

import AppWrapper from './styles/AppWrapper';
import Coffee from './components/Coffee';
import Thumbnail from './components/Thumbnail';
import Thumbnails from './styles/Thumbnails'
import addToFavorites from './api/addToFavorites';
import fetchCoffees from './api/fetchCoffees';
import fetchFavorites from './api/fetchFavorites';
import removeFromFavorites from './api/removeFromFavorites';

class App extends React.Component <any, any> {

    constructor (props: any) {
        super(props);

        this.setSelectedCoffee = this.setSelectedCoffee.bind(this);
        this.toggleIsFavorite = this.toggleIsFavorite.bind(this);

        this.state = {
            selectedCoffee: null,
            favorites: {},
            coffees: []
        };
    }

    setSelectedCoffee (selectedCoffee) {
        this.setState({
            selectedCoffee
        });
    }

    getFavorites () {
        fetchFavorites()
            .then(favorites => {
                this.setState({
                    favorites
                });
            });
    }

    getCoffees () {
        fetchCoffees()
            .then(coffees => {
                this.setState({
                    coffees
                });
            });
    }

    componentDidMount () {
        this.getCoffees();
        this.getFavorites();
    }

    toggleIsFavorite () {
        const id = this.state.selectedCoffee;
        const isFavorite = this.state.favorites[id];

        if (isFavorite) {
            return removeFromFavorites(id)
                .then(favorites => {
                    this.setState({
                        favorites
                    })
                });
        } else {
            return addToFavorites(id)
                .then(favorites => {
                    this.setState({
                        favorites
                    })
                });
        }
    }

    render() {
        return (
            <AppWrapper>
                <Thumbnails>
                    {this.state.coffees.map(coffee => (
                        <Thumbnail 
                            id={coffee.id} 
                            key={coffee.id} 
                            isFavorite={this.state.favorites[
                                coffee.id
                            ]}
                            selectedCoffee={this.state.selectedCoffee} 
                                onClick={() => {
                                this.setSelectedCoffee(coffee.id)
                            }} />
                    ))}
                </Thumbnails>
                <Coffee 
                    id={this.state.selectedCoffee} 
                    key={this.state.selectedCoffee}
                    isFavorite={this.state.favorites[
                        this.state.selectedCoffee
                    ]}
                    toggleIsFavorite={this.toggleIsFavorite}
                />
            </AppWrapper>
        );
    }
}

export default App;
