export interface ResApi {
    data: any;
    meta: ResApiMeta;
    status: number;
    message: string;
    metadata: number;
}

export interface ResApiMeta {
    error_code: number;
    status: number;
    error_message: string;
    message: string;
}
