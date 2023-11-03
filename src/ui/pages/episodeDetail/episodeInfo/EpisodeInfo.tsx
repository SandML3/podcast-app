import DOMPurify from 'dompurify';
import { DetailedPodcast } from '../../../../domain/models/detailedPodcast';
import { Audio, EpisodeDescription, EpisodeTitle, EspisodeCard } from './episodeInfo.styles';

type EpisodeInfoProps = {
    podcast: DetailedPodcast;
}

function EpisodeInfo({ podcast }: EpisodeInfoProps) {
    const episode = podcast.episodes[0];
    const sanitizedHtml = DOMPurify.sanitize(episode.description);

    return <EspisodeCard>  
        <EpisodeTitle>{episode.trackName}</EpisodeTitle>
        <EpisodeDescription dangerouslySetInnerHTML={{__html: sanitizedHtml}}></EpisodeDescription>
        <Audio controls>
            <source src={episode.episodeUrl} type="audio/mpeg"></source>
        </Audio>
    </EspisodeCard>
}

export default EpisodeInfo;