import * as React from 'react';
import * as ReactShallowRenderer from 'react-test-renderer/shallow';

import { App, getIsFavorite } from '../App';

describe('The App', () => {
    it('Should render', () => {
        const renderer = new ReactShallowRenderer();
        const result = renderer.render(
            <App coffees={[{}]} favorites={{}} />
        );
        expect(result).toBeTruthy();
    });

    it('Should return if it is the favorite', () => {
        const result = getIsFavorite({
            selectedCoffee: 1,
            favorites: {
                [1]: true
            }
        });

        expect(result).toBeTruthy();
    });

    it('Should return if it is not the favorite', () => {
        const result = getIsFavorite({
            selectedCoffee: 1,
            favorites: {
                [1]: false
            }
        });

        expect(result).toBeFalsy();
    });
});