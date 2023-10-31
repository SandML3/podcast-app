import { useEffect, useState } from 'react';
import { GetAllPodcasts } from '../../../application/getAllPodcasts';
import { httpPodcastsRepository } from '../../../infrastructure/http/httpPodcastsRepository';
import { Form, NumberOfResults, SearchSection } from './podcastList.styles';
import { Podcast } from '../../../domain/podcast';

function PodcastList() {
    const [ allPodcasts, setAllPodcasts ]  = useState<Podcast[]>([]);
    // const [ searchValue, setSearchValue ]  = useState('');

    const getPodcasts = async () => {
        const podcasts = await new GetAllPodcasts(httpPodcastsRepository).execute();
        setAllPodcasts(podcasts);
    }

    useEffect(() => { 
       getPodcasts();
    }, [])

    return <>

        <SearchSection>
            <NumberOfResults>100</NumberOfResults>
            <Form>
                <input type='text' placeholder='Filter podcasts...'/>
            </Form>
        </SearchSection>

        <ul>
            Podcasts items list
        </ul>
    </>
}

export default PodcastList;