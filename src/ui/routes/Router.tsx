import { Route, Routes, BrowserRouter } from 'react-router-dom';
import PodcastsList from '../pages/podcastsList/PodcastsList'
import Header from '../components/header/Header'

const Router = () => {

    return ( <BrowserRouter>
        <Header/>
        
        <Routes>
            <Route path='/' element={<PodcastsList />}/>
            <Route path='/podcast/:podcastId'/>
            <Route path='/podcast/:podcastId/episode/:episodeId'/>
        </Routes>
    </BrowserRouter>)
}
export default Router;