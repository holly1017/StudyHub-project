import axios, { AxiosInstance } from 'axios';

const createApiClient = (): AxiosInstance => {
    return axios.create({
        baseURL: 'https://cjy951213.duckdns.org:3131', // 원복하세요
        // baseURL: 'http://localhost:8080', // 원복하세요
        headers: {
            'Content-Type': 'application/json', 
        },
        withCredentials: true,
    });
};

const createMultiPartApiClient = (): AxiosInstance => {
    return axios.create({
        baseURL: 'https://cjy951213.duckdns.org:3131', // 원복하세요
        // baseURL: 'http://localhost:8080', // 원복하세요
        headers: {
            'Content-Type': 'multipart/form-data',
        },
        withCredentials: true,
    });
};

export const getData = async (endpoint: string): Promise<any> => {
    const apiClient = createApiClient();
    try {
        const response = await apiClient.get(endpoint);
        return response.data;
    } catch (error) {
        console.error('GET 요청 중 오류 발생:', error);
        throw error;
    }
};

export const postData = async (endpoint: string, data: any): Promise<any> => {
    const apiClient = createApiClient();
    try {
        const response = await apiClient.post(endpoint, data);

        return response.data;
    } catch (error) {
        console.error('POST 요청 중 오류 발생:', error);
        throw error;
    }
};

export const getMultiPartData = async (endpoint: string): Promise<any> => {
    const apiClient = createMultiPartApiClient();
    try {
        const response = await apiClient.get(endpoint);
        return response.data;
    } catch (error) {
        console.error('GET 요청 중 오류 발생:', error);
        throw error;
    }
};

export const postMultiPartData = async (endpoint: string, data: any): Promise<any> => {
    const apiClient = createMultiPartApiClient();
    try {
        const response = await apiClient.post(endpoint, data);
        return response.data;
    } catch (error) {
        console.error('POST 요청 중 오류 발생:', error);
        throw error;
    }
};