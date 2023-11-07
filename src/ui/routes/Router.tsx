import { useState, Suspense, lazy } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Header from '../components/header/Header';

const Router = () => {
    const [isLoadingData, setIsLoadingData] = useState<boolean>(true);
    const PodcastsList = lazy(() => import('../pages/podcastsList/PodcastsList'));
    const PodcastDetail = lazy(() => import('../pages/podcastDetail/PodcastDetail'));
    const EpisodeDetail = lazy(() => import('../pages/episodeDetail/EpisodeDetail'));

    return ( <BrowserRouter>
        <Header isLoading={ isLoadingData } />

        <Routes>
            <Route path='/' element={ 
                <Suspense fallback={<div>Loading...</div>}>
                   <PodcastsList setIsLoadingData={setIsLoadingData}/>
                </Suspense> } />
            <Route path='/podcast/:podcastId' element={ 
                <Suspense fallback={<div>Loading...</div>}>
                    <PodcastDetail setIsLoadingData={setIsLoadingData}/>
                </Suspense> } />
            <Route path='/podcast/:podcastId/episode/:episodeId' element={ 
                <Suspense fallback={<div>Loading...</div>}>
                    <EpisodeDetail setIsLoadingData={setIsLoadingData}/>
                </Suspense> }/>
        </Routes>
    </BrowserRouter>)
}
export default Router;