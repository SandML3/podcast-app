import { DetailedPodcast } from '../../../domain/models/detailedPodcast';
import { Episode } from '../../../domain/models/episode';
import { LocalStorageKey } from '../../../domain/models/localStorageKey';
import { Podcast } from '../../../domain/models/podcast';
import { LocalStorageRepository } from '../../../domain/repositories/localStorageRepository';
import { PodcastsRepository } from '../../../domain/repositories/podcastsRepository';

export class GetEpisodeDetail {

    constructor (private podcastsRepository: PodcastsRepository, private localStorageRepository: LocalStorageRepository){};

    async execute( podcastId: string, episodeId: string ): Promise<Episode> {
        const ALL_PODCASTS_KEY = LocalStorageKey.podcastsList;
        const PODCAST_KEY = LocalStorageKey.podcastDetail.concat(podcastId);

        const lsPodcastDetail = this.localStorageRepository.getRecent<DetailedPodcast>(PODCAST_KEY);
        
        if (lsPodcastDetail) return  this.findItem<Episode>(lsPodcastDetail.episodes, episodeId) as Episode;

        const lsPodcasts = this.localStorageRepository.getRecent<Podcast[]>(ALL_PODCASTS_KEY);
        let podcast;

        if (lsPodcasts && lsPodcasts.length) {
            podcast = this.findItem<Podcast>(lsPodcasts, podcastId);
        }

        const podcasts = await this.podcastsRepository.getAllPodcasts();
        this.localStorageRepository.set(ALL_PODCASTS_KEY, podcasts);
        podcast = this.findItem(podcasts, podcastId);

        const rawEpisodes: Episode[] = await this.podcastsRepository.getPodcastEpisodes(podcastId);
        const episodes: Episode[] = rawEpisodes.map((episode) => ({
            ...episode, 
        }))

        const detailedPodcast = { ...podcast as Podcast, episodes };
        this.localStorageRepository.set(PODCAST_KEY, detailedPodcast);

        const episode = this.findItem<Episode>(detailedPodcast.episodes, episodeId) as Episode

        return episode;
    }

    private findItem<T extends {id: string | number}>(collection: T[], id: string): T | undefined {
        return collection.find((item) => item.id.toString() === id.toString());
    }
}