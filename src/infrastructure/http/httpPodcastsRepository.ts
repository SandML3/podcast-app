import { Episode } from '../../domain/models/episode';
import { Podcast } from '../../domain/models/podcast';
import { PodcastsRepository } from '../../domain/repositories/podcastsRepository';
import { http } from './httpClient';
import { PocastDetailDTO } from './podcastDetailDto';
import { Entry, PodcastDTO } from './podcastDto';

export const httpPodcastsRepository: PodcastsRepository = {

    async getAllPodcasts(): Promise<Podcast[]> {
        const response = await http.get<PodcastDTO>('https://itunes.apple.com/us/rss/toppodcasts/limit=100/genre=1310/json');
        // const podcastDto: PodcastDTO = JSON.parse(response.contents as string) as PodcastDTO;

        const podcasts = response.feed.entry;
        return podcasts.map((podcastDto: Entry) => ({
            id: podcastDto.id.attributes['im:id'],
            title: podcastDto['im:name'].label,
            author: podcastDto['im:artist'].label,
            image: podcastDto['im:image'][2].label,
            summary: podcastDto.summary.label
         }) )
    },

    async getPodcastEpisodes(podcastId: string, limit?: number): Promise<Episode[]> {
        const resultsLimit = limit
            ?limit
            :100;
        const response = await http.get<PocastDetailDTO>(`https://itunes.apple.com/lookup?id=${podcastId}&media=podcast&entity=podcastEpisode&limit=${resultsLimit}`);
        // const podcastDetailDto: PocastDetailDTO = JSON.parse(response.contents as string) as PocastDetailDTO;
        
        const episodes: Episode[] = response.results
            .slice(1)
            .map(episode => ({
                trackId: episode.trackId,
                trackName:  episode.trackName,
                releaseDate: episode.releaseDate,
                trackTime: episode.trackTimeMillis?.toString(),
                description: episode.description,
                episodeUrl: episode.episodeUrl
            }))
        
        return episodes;
    }
}