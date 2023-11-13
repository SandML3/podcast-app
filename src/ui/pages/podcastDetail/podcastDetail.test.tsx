import { render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { podcastDetailMock } from '../../../application/mocks/podcastDetailMock';
import { GetPodcastDetail } from '../../../application/usecases/getPodcastDetail/getPodcastDetail';
import PodcastDetail from './PodcastDetail';

jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
   useParams: () => ({podcastId : 1708988449}), 
 }));

 const mockPodcast = podcastDetailMock;

 jest.mock('../../../application/usecases/getPodcastDetail/getPodcastDetail', () => ({
    ...jest.requireActual('../../../application/usecases/getPodcastDetail/getPodcastDetail'),
    execute: jest.fn(() => mockPodcast)
 }));


describe('Podcast detail component test', () => {

    it('should render podcast detail component', async () => {
        const setIsLoadingDataMock = jest.fn();
    
       render(<MemoryRouter>
                <PodcastDetail setIsLoadingData={setIsLoadingDataMock}/>
            </MemoryRouter>
        );
      
        const podcastTitle = await screen.findByText(/Hip Hop Horror Stories/);

        expect(podcastTitle).toBeInTheDocument();
    });    

    it('should set isLoadingData', async () => {
        const setIsLoadingDataMock = jest.fn();

        const getPodcastDetailSpy = jest.spyOn(GetPodcastDetail.prototype, 'execute');
        const mockGetPodcastDetail = jest.fn(() => Promise.resolve(podcastDetailMock));

        getPodcastDetailSpy.mockImplementation(mockGetPodcastDetail);

    
       render(<MemoryRouter>
                <PodcastDetail setIsLoadingData={setIsLoadingDataMock}/>
            </MemoryRouter>
        );

        expect(setIsLoadingDataMock).toHaveBeenCalled();
      
        await waitFor(() => expect(setIsLoadingDataMock).toHaveBeenCalledTimes(2));
        await waitFor(() => expect(setIsLoadingDataMock).toHaveBeenLastCalledWith(false));
    });   
})