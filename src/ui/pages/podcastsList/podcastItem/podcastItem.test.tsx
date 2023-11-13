import { fireEvent, render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { podcastDetailMock } from '../../../../application/mocks/podcastDetailMock';
import PodcastItem from './PodcastItem';

const mockedUsedNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
   useNavigate: () => mockedUsedNavigate, 
 }));


describe('Podcast item component test', () => {
    const podcastMock = podcastDetailMock;

    it('should render podcast item component', () => {

       render(<MemoryRouter>
                <PodcastItem podcast={podcastMock}/>
            </MemoryRouter>
        );
      
        const author = screen.getByText('Author: iHeartPodcasts and Audio UP, Inc.');
        const title = screen.getByText('Hip Hop Horror Stories');
        const image = screen.getByAltText('Hip Hop Horror Stories');

        expect(author).toBeInTheDocument();
        expect(title).toBeInTheDocument();
        expect(image).toBeInTheDocument();
    });    

    it('should navigate to the correct podcast detail when clicked', () => {
 
       render(<MemoryRouter>
                <PodcastItem podcast={podcastMock}/>
            </MemoryRouter>
        );
      
        const author = screen.getByText('Author: iHeartPodcasts and Audio UP, Inc.');
        fireEvent.click(author);
        
        expect(mockedUsedNavigate).toHaveBeenCalledWith(`/podcast/${podcastDetailMock.id}`);
    });    
})