import { useNavigate } from 'react-router-dom';
import { Podcast } from '../../../../domain/podcast';
import { PodcastAuthor, PodcastContainer, PodcastImage, PodcastTitle } from './podcastItem.styles';

interface PodcastItemProps {
    podcast: Podcast;
}

function PodcastItem({ podcast }: PodcastItemProps) {
    const navigate = useNavigate();
    return (<PodcastContainer onClick={() => navigate(`/podcast/${ podcast.id }`)}>
        <PodcastImage alt={ podcast.title } title={ podcast.title } src={ podcast.image }/>
        <PodcastTitle>{ podcast.title }</PodcastTitle>
        <PodcastAuthor> Author: { podcast.author }</PodcastAuthor>
    </PodcastContainer>);
}

export default PodcastItem;