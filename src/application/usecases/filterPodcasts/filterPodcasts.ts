import { Podcast } from "../../../domain/models/podcast";

export class FilterPodcasts {

    execute(podcasts: Podcast[], searchValue: string) {
        const lowerCaseSearchValue = searchValue.toLowerCase();
        return podcasts.filter(podcast => {
            return podcast.title.toLowerCase().includes(lowerCaseSearchValue) || podcast.author.toLowerCase().includes(lowerCaseSearchValue);
        });
    }
}