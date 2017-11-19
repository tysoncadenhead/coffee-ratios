import * as React from 'react';
import * as ReactShallowRenderer from 'react-test-renderer/shallow';

import App from '../App';

describe('The App', () => {
    it('Should render', () => {
        const renderer = new ReactShallowRenderer();
        const result = renderer.render(
            <App />
        );
        expect(result).toBeTruthy();
    });
});