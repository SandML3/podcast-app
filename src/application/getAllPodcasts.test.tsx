import { httpPodcastsRepository } from "../infrastructure/http/httpPodcastsRepository";
import { localStorageRepository } from "../infrastructure/localStorage/localStorageRepository";
import { GetAllPodcasts } from "./getAllPodcasts";
import { podcastsHttpMock } from "./mocks/podcastsHttpMock";
import { podcastsLocalStorageMock } from "./mocks/podcastsLocalStorageMock";



describe('Get all podcasts Use Case', () => {
    
    const usecase = new GetAllPodcasts(httpPodcastsRepository, localStorageRepository);

    it('should get all podcasts from http repository when there is no recent qdata in local storage', async () => {
        httpPodcastsRepository.getAllPodcasts = jest.fn(() => Promise.resolve(podcastsHttpMock));
        localStorageRepository.getRecent = jest.fn(() => null);

        const podcast = await usecase.execute();

        expect(podcast).toEqual(podcastsHttpMock);
        expect(podcast).toHaveLength(podcastsHttpMock.length);
    });

    it('should get all podcasts from local storage repository when there is recent data available in local storage', async () => {
        httpPodcastsRepository.getAllPodcasts = jest.fn(() => Promise.resolve(podcastsHttpMock));
        localStorageRepository.getRecent = jest.fn(() => podcastsLocalStorageMock);

        const podcast = await usecase.execute();

        expect(podcast).toEqual(podcastsLocalStorageMock);
        expect(podcast).toHaveLength(podcastsLocalStorageMock.length);
    });
   
})