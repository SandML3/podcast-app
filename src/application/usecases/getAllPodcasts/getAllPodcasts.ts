import { LocalStorageKey } from '../../../domain/models/localStorageKey';
import { Podcast } from '../../../domain/models/podcast';
import { LocalStorageRepository } from '../../../domain/repositories/localStorageRepository';
import { PodcastsRepository } from '../../../domain/repositories/podcastsRepository';

export class GetAllPodcasts {

    constructor (private podcastsRepository: PodcastsRepository, private localStorageRepository: LocalStorageRepository){};

    async execute() {
        const LOCAL_STORAGE_KEY = LocalStorageKey.podcastsList;
        const localStorageData = this.localStorageRepository.getRecent<Podcast[]>(LOCAL_STORAGE_KEY);

        if (localStorageData && localStorageData.length) {
            return localStorageData;
        }
        const podcasts = await this.podcastsRepository.getAllPodcasts();
        this.localStorageRepository.set(LOCAL_STORAGE_KEY, podcasts);
        return podcasts;
    }
}