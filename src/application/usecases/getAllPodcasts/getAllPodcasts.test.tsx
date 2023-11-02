import { httpPodcastsRepository } from '../../../infrastructure/http/httpPodcastsRepository';
import { localStorageRepository } from '../../../infrastructure/localStorage/localStorageRepository';
import { allPodcastsMock } from '../../mocks/allPodcastsMock';
import { GetAllPodcasts } from './getAllPodcasts';

describe('Get all podcasts Use Case', () => {
    
    const usecase = new GetAllPodcasts(httpPodcastsRepository, localStorageRepository);

    it('should get all podcasts from http repository when there is no recent data in local storage', async () => {
        httpPodcastsRepository.getAllPodcasts = jest.fn(() => Promise.resolve(allPodcastsMock));
        localStorageRepository.getRecent = jest.fn(() => null);

        const podcast = await usecase.execute();

        expect(podcast).toEqual(allPodcastsMock);
        expect(podcast).toHaveLength(allPodcastsMock.length);
    });

    it('should get all podcasts from local storage repository when there is recent data available in local storage', async () => {
        httpPodcastsRepository.getAllPodcasts = jest.fn(() => Promise.resolve(allPodcastsMock));
        const mockGetRecent = jest.fn(() => allPodcastsMock);
        (localStorageRepository.getRecent as jest.Mock).mockImplementation(mockGetRecent);

        const podcast = await usecase.execute();

        expect(podcast).toEqual(allPodcastsMock);
        expect(podcast).toHaveLength(allPodcastsMock.length);
    });
   
})