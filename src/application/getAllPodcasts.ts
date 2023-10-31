import { PodcastsRepository } from '../domain/podcastsRepository';

export class GetAllPodcasts {

    constructor (private podcastsRepository: PodcastsRepository){};

    async execute() {
        const podcasts = await this.podcastsRepository.getAllPodcasts();
        return podcasts;
    }
}