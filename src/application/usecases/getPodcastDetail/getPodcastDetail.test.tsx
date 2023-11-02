import { DetailedPodcast } from '../../../domain/models/detailedPodcast';
import { LocalStorageKey } from '../../../domain/models/localStorageKey';
import { Podcast } from '../../../domain/models/podcast';
import { httpPodcastsRepository } from '../../../infrastructure/http/httpPodcastsRepository';
import { localStorageRepository } from '../../../infrastructure/localStorage/localStorageRepository';
import { allPodcastsMock } from '../../mocks/allPodcastsMock';
import { podcastDetailMock } from '../../mocks/podcastDetailMock';
import { podcastEpisodesMock } from '../../mocks/podcastEpisodes';
import { GetPodcastDetail } from './getPodcastDetail';

describe('Get podcast detail', () => {
    const usecase = new GetPodcastDetail(httpPodcastsRepository, localStorageRepository);

    it('should get all podcasts and podcast episodes from http repository when there is no recent data in local storage and return the podcast detail', async () => {
        httpPodcastsRepository.getAllPodcasts = jest.fn(() => Promise.resolve(allPodcastsMock));
        localStorageRepository.getRecent = jest.fn(() => null);
        httpPodcastsRepository.getPodcastEpisodes = jest.fn(() => Promise.resolve(podcastEpisodesMock));

        const podcastId = '1708988449';

        const detailedPodcast: DetailedPodcast = await usecase.execute(podcastId);

        expect(localStorageRepository.getRecent).toHaveBeenCalled();
        expect(httpPodcastsRepository.getAllPodcasts).toHaveBeenCalled();
        expect(httpPodcastsRepository.getPodcastEpisodes).toHaveBeenCalled();
        expect(detailedPodcast).toStrictEqual(podcastDetailMock);
    });

    it('should get podcast detail from local storage repository when there is recent data available', async () => {
        const LS_ALL_PODCASTS_KEY = LocalStorageKey.podcastsList;

        const mockGetRecent = jest.fn((key) => key === LS_ALL_PODCASTS_KEY ?allPodcastsMock :podcastDetailMock);
        (localStorageRepository.getRecent as jest.Mock<Podcast[] | DetailedPodcast>).mockImplementation(mockGetRecent);
        httpPodcastsRepository.getAllPodcasts = jest.fn(() => Promise.resolve(allPodcastsMock));
        httpPodcastsRepository.getPodcastEpisodes = jest.fn(() => Promise.resolve(podcastEpisodesMock));

        const podcastId = '1708988449';
        const detailedPodcast = await usecase.execute(podcastId);

        expect(localStorageRepository.getRecent).toHaveBeenCalled();
        expect(httpPodcastsRepository.getAllPodcasts).not.toHaveBeenCalled();
        expect(httpPodcastsRepository.getPodcastEpisodes).not.toHaveBeenCalled();

        expect(detailedPodcast).toStrictEqual(podcastDetailMock);
    });
   
})