import { LocalStorageData } from "../../domain/localStorageData";
import { LocalStorageRepository } from "../../domain/localStorageRepository";
import { Podcast } from "../../domain/podcast";

export const localStorageRepository: LocalStorageRepository = {
    set: function (key: string, value: Podcast[]): void {
        const storageData = {
            storageDate: new Date(),
            data: value
        };
        const jsonValue = JSON.stringify(storageData);
        localStorage.setItem(key, jsonValue);
    },

    get: function (key: string): LocalStorageData | null {
        const json = localStorage.getItem(key);

        if (json) return JSON.parse(json);
        return null;
    },

    remove: function (key: string): void {
        localStorage.removeItem(key);
    },

    getRecent: function (key: string): Podcast[] | null {
        const jsonStorageData = localStorage.getItem(key);

        if (jsonStorageData) {
            const storageData = JSON.parse(jsonStorageData);

            const today = new Date();
            const timeLimit = new Date(today.setHours(today.getHours() - 24)).getTime();
            const storageDate = new Date(storageData.storageDate).getTime();
            
            const areRecentData = storageDate > timeLimit; 

            return areRecentData ?storageData.data :null;
        }

        return null;
    }

}