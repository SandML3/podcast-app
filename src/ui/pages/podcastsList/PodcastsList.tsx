import { useCallback, useEffect, useState } from 'react';
import { FilterPodcasts } from '../../../application/usecases/filterPodcasts/filterPodcasts';
import { GetAllPodcasts } from '../../../application/usecases/getAllPodcasts/getAllPodcasts';
import { Podcast } from '../../../domain/models/podcast';
import { httpPodcastsRepository } from '../../../infrastructure/http/httpPodcastsRepository';
import { localStorageRepository } from '../../../infrastructure/localStorage/localStorageRepository';
import PodcastItem from './podcastItem/PodcastItem';
import { Form, NumberOfResults, PodcastsListUl, SearchSection } from './podcastsList.styles';

type PodcastsListProps = {
    setIsLoadingData(value: boolean): void;
}

function PodcastsList({setIsLoadingData}: PodcastsListProps) {
    const [ allPodcasts, setAllPodcasts ]  = useState<Podcast[]>([]);
    const [ searchValue, setSearchValue ]  = useState('');

    const getPodcasts = useCallback( async () => {
        const podcasts = await new GetAllPodcasts(httpPodcastsRepository, localStorageRepository).execute();
        setAllPodcasts(podcasts);
        setIsLoadingData(false)    
    }, [setIsLoadingData]);

    useEffect(() => { 
       getPodcasts();
    }, [getPodcasts])

    const filteredPodcasts = new FilterPodcasts().execute(allPodcasts, searchValue);
    const podcastList =  filteredPodcasts.map(podcast => <PodcastItem podcast={ podcast } key={ podcast.id }/>);

    return <>

        <SearchSection>
            <NumberOfResults>{ podcastList.length }</NumberOfResults>
            <Form>
                <input type='text' placeholder='Filter podcasts...' value={ searchValue } onChange={ (e) => setSearchValue(e.currentTarget.value) }/>
            </Form>
        </SearchSection>

        <PodcastsListUl>
            {podcastList}
        </PodcastsListUl>
    </>
}

export default PodcastsList;