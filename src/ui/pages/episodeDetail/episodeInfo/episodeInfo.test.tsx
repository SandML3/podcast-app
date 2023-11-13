import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { episodeMock } from '../../../../application/mocks/episodeMock';
import EpisodeInfo from './EpisodeInfo';


describe('Episode info component test', () => {

    it('should render episode info component', () => {
        render(
            <MemoryRouter>
                <EpisodeInfo episode={ episodeMock }/>
            </MemoryRouter>
        );
 
        const episodeName = screen.getByText(episodeMock.trackName);
        const episodeDescription = screen.getByText((_, element) => element?.textContent === episodeMock.description);

        expect(episodeName).toBeInTheDocument();
        expect(episodeDescription).toBeInTheDocument();    
    });    
})