import { LocalStorageRepository } from '../domain/localStorageRepository';
import { PodcastsRepository } from '../domain/podcastsRepository';

export class GetAllPodcasts {

    constructor (private podcastsRepository: PodcastsRepository, private localStorageRepository: LocalStorageRepository){};

    async execute() {
        const localStorageData = this.localStorageRepository.getRecent('Podcasts');

        if (localStorageData && localStorageData.length) {
            return localStorageData;
        }
        const podcasts = await this.podcastsRepository.getAllPodcasts();
        this.localStorageRepository.set('Podcasts', podcasts);
        return podcasts;
    }
}