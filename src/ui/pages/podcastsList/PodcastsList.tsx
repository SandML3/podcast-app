import { useEffect, useState } from 'react';
import { GetAllPodcasts } from '../../../application/getAllPodcasts';
import { Podcast } from '../../../domain/podcast';
import { httpPodcastsRepository } from '../../../infrastructure/http/httpPodcastsRepository';
import { localStorageRepository } from '../../../infrastructure/localStorage/localStorageRepository';
import PodcastItem from './podcastItem/PodcastItem';
import { Form, NumberOfResults, PodcastsListUl, SearchSection } from './podcastsList.styles';

function PodcastsList() {
    const [ allPodcasts, setAllPodcasts ]  = useState<Podcast[]>([]);
    const [ searchValue, setSearchValue ]  = useState('');

    const getPodcasts = async () => {
        const podcasts = await new GetAllPodcasts(httpPodcastsRepository, localStorageRepository).execute();
        setAllPodcasts(podcasts);
    }

    useEffect(() => { 
       getPodcasts();
    }, [])

    const podcastList = allPodcasts.filter(podcast => podcast.title.includes(searchValue) || podcast.author.includes(searchValue)).map(podcast => <PodcastItem podcast={ podcast } key={ podcast.id }/>);

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