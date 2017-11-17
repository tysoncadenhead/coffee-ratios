import * as React from 'react';

import AppWrapper from './components/AppWrapper';
import Coffee from './components/Coffee';
import Thumbnail from './components/Thumbnail';
import Thumbnails from './components/Thumbnails'
import fetchCoffees from './api/fetchCoffees';

class App extends React.Component <any, any> {

    constructor (props: any) {
        super(props);

        this.setSelectedCoffee = this.setSelectedCoffee.bind(this);

        this.state = {
            selectedCoffee: null,
            coffees: []
        };
    }

    setSelectedCoffee (selectedCoffee) {
        
        this.setState({
            selectedCoffee
        });
    }

    componentDidMount () {
        fetchCoffees()
            .then(coffees => {
                this.setState({
                    coffees
                });
            });
    }

    render() {
        return (
            <AppWrapper>
                <Thumbnails>
                    {this.state.coffees.map(coffee => (
                        <Thumbnail id={coffee.id} key={coffee.id} selectedCoffee={this.state.selectedCoffee} onClick={() => {
                            this.setSelectedCoffee(coffee.id)
                        }} />
                    ))}
                </Thumbnails>
                <Coffee id={this.state.selectedCoffee} key={this.state.selectedCoffee} />
            </AppWrapper>
        );
    }
}

export default App;
