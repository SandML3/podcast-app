import { render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { episodeMock } from '../../../application/mocks/episodeMock';
import { podcastDetailMock } from '../../../application/mocks/podcastDetailMock';
import EpisodeDetail from './EpisodeDetail';

jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
   useParams: () => ({podcastId : 1708988449, episodeId: 1000632638275}), 
 }));

 const mockDetailedPodcast = podcastDetailMock;
 const mockDetailedEpisode = episodeMock;

 jest.mock('../../../application/usecases/getPodcastDetail/getPodcastDetail', () => ({
    ...jest.requireActual('../../../application/usecases/getPodcastDetail/getPodcastDetail'),
    execute:jest.fn(() => mockDetailedPodcast)
 }));

 jest.mock('../../../application/usecases/getEpisodeDetail/getEpisodeDetail', () => ({
    ...jest.requireActual('../../../application/usecases/getEpisodeDetail/getEpisodeDetail'),
    execute: jest.fn(() => mockDetailedEpisode)
 }));

describe('Episode detail component test', () => {

    it('should render episode detail component', async () => {
        const setIsLoadingDataMock = jest.fn();

        render(
            <MemoryRouter>
                <EpisodeDetail setIsLoadingData={setIsLoadingDataMock}/>
            </MemoryRouter>
        );

        const episodeName = await screen.findByText(episodeMock.trackName);
        expect(episodeName).toBeInTheDocument();

        const episodeDescription = await screen.findByText((_, element) => element?.textContent === episodeMock.description);
        expect(episodeDescription).toBeInTheDocument();
    });

    it('should set setIsLoadingData to false', async() => {
        const setIsLoadingDataMock = jest.fn();

        render(
            <MemoryRouter>
                <EpisodeDetail setIsLoadingData={setIsLoadingDataMock}/>
            </MemoryRouter>
        );

        await waitFor(() => expect(setIsLoadingDataMock).toBeCalledTimes(2));
        await waitFor(() => expect(setIsLoadingDataMock).toHaveBeenLastCalledWith(false));
    });
    
})