import DOMPurify from 'dompurify';
import { Episode } from '../../../../domain/models/episode';
import { Audio, EpisodeDescription, EpisodeTitle, EspisodeCard } from './episodeInfo.styles';

type EpisodeInfoProps = {
    episode: Episode;
}

function EpisodeInfo({ episode }: EpisodeInfoProps) {
    const sanitizedHtml = DOMPurify.sanitize(episode.description);

    return <EspisodeCard id="episode-detail">  
        <EpisodeTitle id="episode-title">{episode.trackName}</EpisodeTitle>
        <EpisodeDescription id="episode-description" dangerouslySetInnerHTML={{__html: sanitizedHtml}}></EpisodeDescription>
        <Audio id="episode-audio" controls>
            <source src={episode.episodeUrl} type="audio/mpeg"></source>
        </Audio>
    </EspisodeCard>
}

export default EpisodeInfo;