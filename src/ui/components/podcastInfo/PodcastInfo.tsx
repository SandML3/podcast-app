import { Link } from 'react-router-dom';
import { DetailedPodcast } from '../../../domain/models/detailedPodcast';
import { Author, Card, Description, DescriptionLabel, StyledReactLink, Title } from './podcastInfo.styles';

type PodcastInfoProps = {
    podcast: DetailedPodcast;
}

function PodcastInfo({ podcast }: PodcastInfoProps) {

    return <Card id='podcast-info'>  
        <StyledReactLink to={`/podcast/${podcast.id}`}>
            <img alt={ podcast.title } title={ podcast.title } src={ podcast.image } id='podcast-image'/>
        </StyledReactLink>
        <Link to={`/podcast/${podcast.id}`}>
            <Title id='podcast-title'> { podcast.title } </Title>
            <Author id='podcast-author'> by { podcast.author } </Author>
        </Link>
        <Description>
            <DescriptionLabel> Description: </DescriptionLabel>
            <p id='podcast-description'> { podcast.summary } </p>
        </Description>
    </Card>
}

export default PodcastInfo;