
export type ResponseDTO<T> = {
    contents: T | string;
    status: Status;
};

export type Status = {
    url: string;
    content_length: number;
    content_type: string;
    http_code: number;
    response_time: number
};
