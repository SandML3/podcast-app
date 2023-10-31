import { LocalStorageData } from "./localStorageData";
import { Podcast } from "./podcast";

export interface LocalStorageRepository {
    set(key: string, value: Podcast[]): void;
    get(key: string): LocalStorageData | null;
    remove(key: string): void;
    getRecent (key: string): Podcast[] | null;
}