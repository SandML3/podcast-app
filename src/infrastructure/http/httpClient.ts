async function get<T> (url: string): Promise<T> {
    const response = await fetch(url)
    return await response.json() as T;  
}

export const http = { get };