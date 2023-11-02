import { Podcast } from '../models/podcast';

export type LocalStorageData = {
    storageDate: Date;
    data: Podcast[];
}