import { useCallback, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { GetPodcastDetail } from '../../../application/usecases/getPodcastDetail/getPodcastDetail';
import { DetailedPodcast } from '../../../domain/models/detailedPodcast';
import { httpPodcastsRepository } from '../../../infrastructure/http/httpPodcastsRepository';
import { localStorageRepository } from '../../../infrastructure/localStorage/localStorageRepository';
import PodcastInfo from '../../components/podcastInfo/PodcastInfo';
import EpisodesInfo from './episodesInfo/EpisodesInfo';
import { Container } from './podcastDetail.styles';

type PodcastDetailProps = {
    setIsLoadingData(value: boolean): void;
}

function PodcastDetail({ setIsLoadingData }: PodcastDetailProps) {
    const [ podcast, setPodcast ] = useState<DetailedPodcast>();
    const { podcastId } = useParams();

    const getPodcastDetail = useCallback( async () => {
        const usecase = new GetPodcastDetail(httpPodcastsRepository, localStorageRepository);
        const podcast = await usecase.execute(podcastId!);
        if (podcast) setPodcast(podcast);
        setIsLoadingData(false)    
    }, [podcastId, setIsLoadingData]);

    
    useEffect( () => {
       setIsLoadingData(true);    
       getPodcastDetail();
    }, [getPodcastDetail, setIsLoadingData]);
    
    return <Container>
       {podcast && <>
            <PodcastInfo podcast={ podcast }/>
            <EpisodesInfo podcast={ podcast }/>
        </>}
    </Container>;
};

export default PodcastDetail;