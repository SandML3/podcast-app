import { FilterPodcasts } from "./filterPodcasts";
import { allPodcastsMock } from '../../mocks/allPodcastsMock';

describe('Get all podcasts Use Case', () => {
    
    const usecase = new FilterPodcasts();

    it('should return all podcasts if the search value is empty', () => {
        const searchValue = '';
        const podcasts = allPodcastsMock;
        const filteredPodcasts = usecase.execute(podcasts, searchValue);

        expect(filteredPodcasts).toHaveLength(allPodcastsMock.length);
    });


    it('should return the filtered podcast by title in a case-insensitive way', () => {
        const searchValue = 'horror';
        const podcasts = allPodcastsMock;
        const filteredPodcast = usecase.execute(podcasts, searchValue);

        expect(filteredPodcast).toHaveLength(1);
        expect(filteredPodcast).toEqual([allPodcastsMock[0]]);
        expect(filteredPodcast[0].title).toEqual('Hip Hop Horror Stories');
    });

    it('should return the filtered podcast by author in a case-insensitive way', () => {
        const searchValue = 'audible';
        const podcasts = allPodcastsMock;
        const filteredPodcast = usecase.execute(podcasts, searchValue);

        
        expect(filteredPodcast).toHaveLength(1);
        expect(filteredPodcast).toEqual([allPodcastsMock[1]]);
        expect(filteredPodcast[0].author).toEqual('Audible | Wondery');
    });

})