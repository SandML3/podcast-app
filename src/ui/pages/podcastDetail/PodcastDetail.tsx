import { useCallback, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { GetPodcastDetail } from '../../../application/usecases/getPodcastDetail/getPodcastDetail';
import { DetailedPodcast } from '../../../domain/models/detailedPodcast';
import { httpPodcastsRepository } from '../../../infrastructure/http/httpPodcastsRepository';
import { localStorageRepository } from '../../../infrastructure/localStorage/localStorageRepository';
import PodcastInfo from '../../components/podcastInfo/PodcastInfo';
import EpisodesList from './episodesList/EpisodesList';
import { Container } from './podcastDetail.styles';

type PodcastDetailProps = {
    setIsLoadingData(value: boolean): void;
}

function PodcastDetail({ setIsLoadingData }: PodcastDetailProps) {
    const [ podcast, setPodcast ] = useState<DetailedPodcast>();
    const { podcastId } = useParams();

    const getPodcastDetail = useCallback( async () => {
        setIsLoadingData(true); 
        const usecase = new GetPodcastDetail(httpPodcastsRepository, localStorageRepository);
        const podcast = await usecase.execute(podcastId!);
        if (podcast) setPodcast(podcast);
        setIsLoadingData(false)    
    }, [podcastId, setIsLoadingData]);

    
    useEffect( () => {   
       getPodcastDetail();
    }, [getPodcastDetail, setIsLoadingData]);
    
    return <Container>
       {podcast && <>
            <PodcastInfo podcast={ podcast }/>
            <EpisodesList podcast={ podcast }/>
        </>}
    </Container>;
};

export default PodcastDetail;