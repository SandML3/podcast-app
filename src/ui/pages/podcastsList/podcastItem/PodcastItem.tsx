import { useNavigate } from 'react-router-dom';
import { Podcast } from '../../../../domain/models/podcast';
import { PodcastAuthor, PodcastContainer, PodcastImage, PodcastTitle } from './podcastItem.styles';

interface PodcastItemProps {
    podcast: Podcast;
}

function PodcastItem({ podcast }: PodcastItemProps) {
    const navigate = useNavigate();
    return (<PodcastContainer onClick={() => navigate(`/podcast/${ podcast.id }`)} id='podcast-item'>
        <PodcastImage alt={ podcast.title } title={ podcast.title } src={ podcast.image } id='podcast-image'/>
        <PodcastTitle id='podcast-title'>{ podcast.title }</PodcastTitle>
        <PodcastAuthor id='podcast-author'> Author: { podcast.author }</PodcastAuthor>
    </PodcastContainer>);
}

export default PodcastItem;