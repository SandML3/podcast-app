import { Route, Routes, BrowserRouter } from 'react-router-dom';
import PodcastList from '../pages/podcastList/PodcastList'
import Header from '../components/header/Header'

const Router = () => {

    return ( <BrowserRouter>
        <Header/>
        
        <Routes>
            <Route path='/' element={<PodcastList />}/>
            <Route path='/podcast/:podcastId'/>
            <Route path='/podcast/:podcastId/episode/:episodeId'/>
        </Routes>
    </BrowserRouter>)
}
export default Router;