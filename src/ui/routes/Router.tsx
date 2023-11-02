import { useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Header from '../components/header/Header';
import PodcastDetail from '../pages/podcastDetail/PodcastDetail';
import PodcastsList from '../pages/podcastsList/PodcastsList';

const Router = () => {
    const [isLoadingData, setIsLoadingData] = useState<boolean>(true);

    return ( <BrowserRouter>
        <Header isLoading={ isLoadingData } />
        
        <Routes>
            <Route path='/' element={<PodcastsList setIsLoadingData={setIsLoadingData}/>}/>
            <Route path='/podcast/:podcastId' element={ <PodcastDetail setIsLoadingData={setIsLoadingData}/> } />
            <Route path='/podcast/:podcastId/episode/:episodeId'/>
        </Routes>
    </BrowserRouter>)
}
export default Router;