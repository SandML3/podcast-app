import { ResponseDTO } from "./responseDto";

async function get<T> (url: string): Promise<T> {
    try {
        const response = await fetch(url);
        return response.json() as Promise<T>;

    } catch(error) {
        console.log(error);
        const allOriginsUrl = `https://api.allorigins.win/get?url=${encodeURIComponent(url)}`; 
    
        const allOriginsResponse = await fetch(allOriginsUrl);
        const responseJson: ResponseDTO<T> = await allOriginsResponse.json();
        
        
        return JSON.parse(responseJson.contents as string) as Promise<T>;
    }
}

export const http = { get };