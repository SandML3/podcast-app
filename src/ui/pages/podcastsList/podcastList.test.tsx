import { render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { allPodcastsMock } from '../../../application/mocks/allPodcastsMock';
import PodcastsList from "./PodcastsList";

 const mockPodcasts = allPodcastsMock;

 jest.mock('../../../application/usecases/getAllPodcasts/getAllPodcasts', () => ({
    ...jest.requireActual('../../../application/usecases/getAllPodcasts/getAllPodcasts'),
    execute: jest.fn(() => mockPodcasts)
 }));


describe('Podcasts list component test', () => {

    it('should render podcasts list component', async () => {
        const setIsLoadingDataMock = jest.fn();
        render(
            <MemoryRouter>
                <PodcastsList setIsLoadingData={setIsLoadingDataMock}/>
            </MemoryRouter>
        )

        const podcastsList = screen.getByTestId('podcasts-list')

        expect(podcastsList).toBeInTheDocument();
    });

    it('should set setIsLoadingData to false', async() => {
        const setIsLoadingDataMock = jest.fn();
        render(
            <MemoryRouter>
                <PodcastsList setIsLoadingData={setIsLoadingDataMock}/>
            </MemoryRouter>
        );

        await waitFor(() => {
            expect(setIsLoadingDataMock).toBeCalled();

        });
        await waitFor(() => {
            expect(setIsLoadingDataMock).toHaveBeenLastCalledWith(false);
        });
    });
})