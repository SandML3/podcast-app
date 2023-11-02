
import { Episode } from './episode';
import { Podcast } from './podcast';

export interface DetailedPodcast extends Podcast  {
    episodes: Episode[];
}