import Header from './Header';
import { MemoryRouter } from 'react-router-dom';
import { render, screen } from '@testing-library/react';

describe('Header component test', () => {

    it('Render header component', () => {
        render(
            <MemoryRouter>
                <Header/>
            </MemoryRouter>
        );
        const headerElement = screen.getByText(/Podcaster/i);
        expect(headerElement).toBeInTheDocument();
    });
   
})