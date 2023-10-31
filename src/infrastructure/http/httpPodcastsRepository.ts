import { Podcast } from '../../domain/podcast';
import { PodcastsRepository } from '../../domain/podcastsRepository';
import { http } from './httpClient';
import { Entry, PodcastDTO } from './podcastDto';

export const httpPodcastsRepository: PodcastsRepository = {

    async getAllPodcasts(): Promise<Podcast[]> {
        const response = await http.get<PodcastDTO>('https://itunes.apple.com/us/rss/toppodcasts/limit=100/genre=1310/json');

        const podcasts = response.feed.entry;
        return podcasts.map((podcastDto: Entry) => ({
            id: podcastDto.id.attributes['im:id'],
            title: podcastDto['im:name'].label,
            author: podcastDto['im:artist'].label,
            image: podcastDto['im:image'][2].label,
         }) )
    }
}