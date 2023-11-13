import React from 'react';
import EpisodesList from './EpisodesList';
import { render, screen, fireEvent } from '@testing-library/react';
import { podcastDetailMock } from '../../../../application/mocks/podcastDetailMock';
import { MemoryRouter } from 'react-router-dom';

const mockedUsedNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
   useNavigate: () => mockedUsedNavigate, 
 }));


describe('Espisodes list component test', () => {

    it('should render episodes list component', () => {
        const podcastMock = podcastDetailMock;
 
       render(<MemoryRouter>
                <EpisodesList podcast={podcastMock}/>
            </MemoryRouter>
        );
      
        const episodesNames = screen.getAllByTestId('episode-name');
        const episodesDate = screen.getAllByTestId('episode-date');
        const episodesDuration = screen.getAllByTestId('episode-duration');

        const firstEpisodeName = screen.getByText(podcastDetailMock.episodes[0].trackName);
        const firstEpisodeDate = screen.getByText(podcastDetailMock.episodes[0].releaseDate);
        const firstEpisodeDuration = screen.getByText(podcastDetailMock.episodes[0].trackTime);
     
        expect(episodesNames).toHaveLength(podcastDetailMock.episodes.length);
        expect(episodesDate).toHaveLength(podcastDetailMock.episodes.length);
        expect(episodesDuration).toHaveLength(podcastDetailMock.episodes.length);

        expect(firstEpisodeName).toBeInTheDocument();
        expect(firstEpisodeDate).toBeInTheDocument();
        expect(firstEpisodeDuration).toBeInTheDocument();
    });    


    it('should navigate to the correct episode when clicked', () => {
        const podcastMock = podcastDetailMock;
 
       render(<MemoryRouter>
                <EpisodesList podcast={podcastMock}/>
            </MemoryRouter>
        );
      
        const firstEpisodeName = screen.getByText(podcastDetailMock.episodes[0].trackName);
        fireEvent.click(firstEpisodeName);
        
        expect(mockedUsedNavigate).toHaveBeenCalledWith(`episode/${podcastDetailMock.episodes[0].id}`);
    });    
})