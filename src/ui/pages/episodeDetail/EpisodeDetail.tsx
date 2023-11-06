import { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { GetPodcastDetail } from "../../../application/usecases/getPodcastDetail/getPodcastDetail";
import { DetailedPodcast } from "../../../domain/models/detailedPodcast";
import { Episode } from "../../../domain/models/episode";
import { httpPodcastsRepository } from "../../../infrastructure/http/httpPodcastsRepository";
import { localStorageRepository } from "../../../infrastructure/localStorage/localStorageRepository";
import PodcastInfo from "../../components/podcastInfo/PodcastInfo";
import { Container } from "./episodeDetail.styles";
import EpisodeInfo from "./episodeInfo/EpisodeInfo";

type EpisodeDetailProps = {
    setIsLoadingData(value: boolean): void;
}
export function EpisodeDetail({setIsLoadingData}: EpisodeDetailProps) {
    const [ podcast, setPodcast ] = useState<DetailedPodcast>();
    const [ episode, setEpisode ] = useState<Episode>();

    const { podcastId, episodeId } = useParams();

    const getPodcastDetail = useCallback( async () => {
        setIsLoadingData(true);  
        const usecase = new GetPodcastDetail(httpPodcastsRepository, localStorageRepository);
        const podcast = await usecase.execute(podcastId!);
        if (podcast) setPodcast(podcast);
        const episode = podcast.episodes.find(episode => episode.id?.toString() === episodeId);
        setEpisode(episode);
        setIsLoadingData(false)

    }, [episodeId, podcastId, setIsLoadingData]);
    
    useEffect( () => {
       getPodcastDetail();
    }, [getPodcastDetail, setIsLoadingData]);

    return <>
        {podcast && episode && <Container>
            <PodcastInfo podcast={ podcast }/>
            <EpisodeInfo episode={ episode } />
        </Container>}
    </>
}

export default EpisodeDetail;