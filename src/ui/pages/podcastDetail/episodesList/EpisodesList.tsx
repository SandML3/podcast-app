import { useNavigate } from "react-router-dom";
import { DetailedPodcast } from "../../../../domain/models/detailedPodcast";
import { Container, EpisodeDate, EpisodeDuration, EpisodeName, NumberOfEpisodes, Table, TableRow, TableTitle, TableWrapper } from "./episodesList.styles";

type EpisodesListProps = {
    podcast: DetailedPodcast;
}

function EpisodesList({ podcast }: EpisodesListProps) {
    const navigate = useNavigate();

    const episodesTableInfo = podcast.episodes.map((episode, index) => {
        const isEven = index % 2 === 0;
        
        return (<TableRow key={episode.id} $even={isEven} onClick={() => navigate(`episode/${episode.id}`)}>
                <EpisodeName data-testid="episode-name" id='episode-title'>{episode.trackName}</EpisodeName>
                <EpisodeDate data-testid="episode-date"  id='episode-date'>{episode.releaseDate}</EpisodeDate>
                <EpisodeDuration data-testid="episode-duration"  id='episode-duration'>{episode.trackTime}</EpisodeDuration>
            </TableRow>
        )
    });

    return <Container>
        <NumberOfEpisodes id='episodes-number'>Episodes: {podcast.episodes.length}</NumberOfEpisodes>
        <TableWrapper  id='episodes-list'>
            <Table>
                <tbody>
                    <TableTitle>
                        <th>Title</th>
                        <th>Date</th>
                        <th>Duration</th>
                    </TableTitle>
                    {episodesTableInfo}
                </tbody>
            </Table>
        </TableWrapper>
    </Container>
}

export default EpisodesList;