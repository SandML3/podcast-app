import { render, screen } from '@testing-library/react';
import Spinner from './Spinner';

describe('Spinner component test', () => {

    it('should render spinner component', () => {

        render(
            <Spinner/>
        );

        const spinner =   screen.getByTestId('spinner');
        expect(spinner).toBeInTheDocument();
    });
})