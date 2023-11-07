import { ResponseDTO } from "./responseDto";

async function get<T> (url: string): Promise<T> {
    try {
        const response = await fetch(url);

        if (response) return response.json() as Promise<T>;
        
        const allOriginsUrl = `https://api.allorigins.win/get?url=${encodeURIComponent(url)}`; 
    
        const allOriginsResponse = await fetch(allOriginsUrl);
        const responseJson: ResponseDTO<T> = await allOriginsResponse.json();
        
        
        return JSON.parse(responseJson.contents as string) as Promise<T>;

    } catch(error) {
        console.log(error);
        return Promise.reject(error);
    }
}

export const http = { get };