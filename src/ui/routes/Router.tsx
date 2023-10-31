import { Route, Routes, BrowserRouter } from 'react-router-dom';
import { useState } from 'react';
import PodcastsList from '../pages/podcastsList/PodcastsList'
import Header from '../components/header/Header'

const Router = () => {
    const [isLoadingData, setIsLoadingData] = useState<boolean>(true);

    return ( <BrowserRouter>
        <Header isLoading={ isLoadingData } />
        
        <Routes>
            <Route path='/' element={<PodcastsList setIsLoadingData={setIsLoadingData}/>}/>
            <Route path='/podcast/:podcastId'/>
            <Route path='/podcast/:podcastId/episode/:episodeId'/>
        </Routes>
    </BrowserRouter>)
}
export default Router;