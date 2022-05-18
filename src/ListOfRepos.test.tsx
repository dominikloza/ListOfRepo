import { render } from '@testing-library/react';
import React from 'react';
import ListOfRepos from './ListOfRepos';

describe('ListOfRepos Component', () => {

    it('rendered Repos list', () => {
        const {getByTestId} = render(<ListOfRepos sortType="name"/>)
        const list = getByTestId('list');
        expect(list).toBeTruthy();
    })

    it('rendered button load more', () => {
        const {getByTestId} = render(<ListOfRepos sortType="name"/>)
        const button = getByTestId('button-more');
        expect(button).toBeTruthy();
    })

})


