import { Podcast } from './podcast';

export interface PodcastsRepository {
    getAllPodcasts (): Promise<Podcast[]>;
}