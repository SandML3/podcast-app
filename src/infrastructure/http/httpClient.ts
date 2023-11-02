import { ResponseDTO } from "./responseDto";

async function get<T> (url: string): Promise<T> {
    const allOriginsUrl = `https://api.allorigins.win/get?url=${encodeURIComponent(url)}`;
    // const response = await fetch(url);

    // return await response.json() as Promise<T>;
    // if (response) return await response.json() as Promise<T>;

    const allOriginsResponse = await fetch(allOriginsUrl);
    const responseJson: ResponseDTO<T> = await allOriginsResponse.json();
    
    return JSON.parse(responseJson.contents as string) as Promise<T>;  
}

export const http = { get };