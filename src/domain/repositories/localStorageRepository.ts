import { DetailedPodcast } from "../models/detailedPodcast";
import { Podcast } from "../models/podcast";
import { LocalStorageData } from "./localStorageData";

export interface LocalStorageRepository {
    set(key: string, value: Podcast[] | DetailedPodcast): void;
    get(key: string): LocalStorageData | null;
    remove(key: string): void;
    getRecent <T>(key: string): T | null;
}