import { Episode } from '../models/episode';
import { Podcast } from '../models/podcast';

export interface PodcastsRepository {
    getAllPodcasts (): Promise<Podcast[]>;
    getPodcastEpisodes(podcastId: string): Promise<Episode[]>;
}