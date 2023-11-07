import { DetailedPodcast } from '../../../domain/models/detailedPodcast';
import { Episode } from '../../../domain/models/episode';
import { LocalStorageKey } from '../../../domain/models/localStorageKey';
import { Podcast } from '../../../domain/models/podcast';
import { LocalStorageRepository } from '../../../domain/repositories/localStorageRepository';
import { PodcastsRepository } from '../../../domain/repositories/podcastsRepository';

export class GetPodcastDetail {

    constructor (private podcastsRepository: PodcastsRepository, private localStorageRepository: LocalStorageRepository){};

    async execute( podcastId: string ): Promise<DetailedPodcast> {
        const ALL_PODCASTS_KEY = LocalStorageKey.podcastsList;
        const PODCAST_KEY = LocalStorageKey.podcastDetail.concat(podcastId);

        const lsPodcastDetail = this.localStorageRepository.getRecent<DetailedPodcast>(PODCAST_KEY);
        
        if (lsPodcastDetail) return lsPodcastDetail;

        const lsPodcasts = this.localStorageRepository.getRecent<Podcast[]>(ALL_PODCASTS_KEY);
        let podcast;

        if (lsPodcasts && lsPodcasts.length) {
            podcast = this.findPodcast(lsPodcasts, podcastId);
        }

        const podcasts = await this.podcastsRepository.getAllPodcasts();
        this.localStorageRepository.set(ALL_PODCASTS_KEY, podcasts);
        podcast = this.findPodcast(podcasts, podcastId);

        const rawEpisodes: Episode[] = await this.podcastsRepository.getPodcastEpisodes(podcastId);
        const episodes: Episode[] = rawEpisodes.map((episode) => ({
            ...episode, 
            releaseDate: this.formatDate(episode.releaseDate),
            trackTime: this.formatDuration(episode.trackTime),
        }))

        const detailedPodcast = { ...podcast as Podcast, episodes };
        this.localStorageRepository.set(PODCAST_KEY, detailedPodcast);

        return detailedPodcast;
    }

    private findPodcast(podcasts: Podcast[], podcastId: string): Podcast | undefined {
        return podcasts.find(podcast => podcast.id === podcastId);
    }

    private formatDate(date: string) {
        const parsedDate = new Date(date);
        const timeZone = 'Europe/Madrid';

        const dateFormat = new Intl.DateTimeFormat('es-ES', {
            timeZone,
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
            hour12: false,
        });

        return dateFormat.format(parsedDate);
    }

    private formatDuration(trackTime: string) {
        const milliseconds = parseInt(trackTime);
        const timeArray = [];

        const { result: hours, mod: hoursMod } =  this.getResultAndMod( milliseconds, 3600000);
        const { result: minutes, mod: minMod } =  this.getResultAndMod( hoursMod, 60000);
        const { result: seconds } =  this.getResultAndMod( minMod, 1000);

        if (hours) timeArray.push(hours);
        timeArray.push(minutes, seconds);
    
        return timeArray.map(value => value.toString().padStart(2, '0')).join(':');
    }

    private getResultAndMod(dividend: number, divisor: number) {
        return {
            result: Math.floor(dividend / divisor),
            mod: dividend % divisor
        }
    }

}