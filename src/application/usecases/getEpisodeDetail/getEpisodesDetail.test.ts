import { DetailedPodcast } from '../../../domain/models/detailedPodcast';
import { Episode } from '../../../domain/models/episode';
import { LocalStorageKey } from '../../../domain/models/localStorageKey';
import { Podcast } from '../../../domain/models/podcast';
import { httpPodcastsRepository } from '../../../infrastructure/http/httpPodcastsRepository';
import { localStorageRepository } from '../../../infrastructure/localStorage/localStorageRepository';
import { allPodcastsMock } from '../../mocks/allPodcastsMock';
import { episodeMock } from '../../mocks/episodeMock';
import { podcastDetailMock } from '../../mocks/podcastDetailMock';
import { podcastEpisodesMock } from '../../mocks/podcastEpisodesMock';
import { GetEpisodeDetail } from './getEpisodeDetail';


describe('Get episodes detail', () => {
    const usecase = new GetEpisodeDetail(httpPodcastsRepository, localStorageRepository);

    it('should get all podcasts and podcast episodes from http repository when there is no recent data in local storage and return the podcast detail', async () => {
        httpPodcastsRepository.getAllPodcasts = jest.fn(() => Promise.resolve(allPodcastsMock));
        localStorageRepository.getRecent = jest.fn(() => null);
        httpPodcastsRepository.getPodcastEpisodes = jest.fn(() => Promise.resolve(podcastEpisodesMock));

        const podcastId = '1708988449';
        const episodeId = '1000632638275';

        const detailedEpisode: Episode = await usecase.execute(podcastId, episodeId);

        expect(localStorageRepository.getRecent).toHaveBeenCalled();
        expect(httpPodcastsRepository.getAllPodcasts).toHaveBeenCalled();
        expect(httpPodcastsRepository.getPodcastEpisodes).toHaveBeenCalled();

        expect(detailedEpisode).toStrictEqual(episodeMock);
    });

    it('should get podcast detail from local storage repository when there is recent data available', async () => {
        const LS_ALL_PODCASTS_KEY = LocalStorageKey.podcastsList;

        const mockGetRecent = jest.fn((key) => key === LS_ALL_PODCASTS_KEY ?allPodcastsMock :podcastDetailMock);
        (localStorageRepository.getRecent as jest.Mock<Podcast[] | DetailedPodcast>).mockImplementation(mockGetRecent);
        httpPodcastsRepository.getAllPodcasts = jest.fn(() => Promise.resolve(allPodcastsMock));
        httpPodcastsRepository.getPodcastEpisodes = jest.fn(() => Promise.resolve(podcastEpisodesMock));

        const podcastId = '1708988449';
        const episodeId = '1000632638275';

        const detailedEpisode = await usecase.execute(podcastId, episodeId);

        expect(localStorageRepository.getRecent).toHaveBeenCalled();
        expect(httpPodcastsRepository.getAllPodcasts).not.toHaveBeenCalled();
        expect(httpPodcastsRepository.getPodcastEpisodes).not.toHaveBeenCalled();

        expect(detailedEpisode).toMatchObject({
            id: expect.any(Number),
            trackName: 'Maejor x Lil Gotit',
            releaseDate: expect.any(String),
            trackTime: expect.any(String),
            description: "Maejor experiences biblical scripture come to life inside a dirty hotel room. Lil Gotit is the victim of a Cuban curse.\nSee omnystudio.com/listener for privacy information.",
            episodeUrl: expect.any(String)
        });
    });
   
})