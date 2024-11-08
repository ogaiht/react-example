import axios, { HttpStatusCode, InternalAxiosRequestConfig } from 'axios';
import { Config } from '../../Config';
import { tokenStorageService } from '../token-storage.service';

interface FailedQueueItem {
    resolve: (token: string) => void;
    reject: (error: any) => void;
};

let isRefreshing = false;

let failedQueue: Array<FailedQueueItem> = [];

const processQueue = (error: any, token: string | null = null) => {
    failedQueue.forEach((prom) => {
        if(token) {
            prom.resolve(token);
        } else {
            prom.reject(error);
        }
    });
    failedQueue = [];
};

const axiosInstance = axios.create({
    baseURL: Config.API_URL,
    timeout: 10000
});

axiosInstance.interceptors.request.use(
    (config: InternalAxiosRequestConfig) => {
        const token = tokenStorageService.getAccessToken();
        if (token && config.headers) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.resolve(error);
    }
);

axiosInstance.interceptors.response.use(
    async (response) => {
        if (response.status === HttpStatusCode.Unauthorized) {
            console.log('Request is not authorized');
        }
        return response;
    },
    async (error) => {
        if (error.response?.status === HttpStatusCode.Unauthorized) {
            console.log('Request is not authorized');            
            window.location.href = '/login';
        } else if (error.response?.status === HttpStatusCode.Forbidden) {
            console.log('Request is forbidden');
            window.location.href = '/forbidden';
        }
        return error;
    }
);

// axiosInstance.interceptors.response.use(
//     (response) => response,
//     async (error) => {
//         const originalRequest = error.config;

//         if (error.response?.status === 401 && originalRequest._retry) {
//             if (isRefreshing) {
//                 return new Promise((resolve, reject) => {
//                     failedQueue.push({resolve, reject});
//                 })
//                 .then((token) => {
//                     originalRequest.headers.Authorization = `Bearer ${token}`;
//                     return axiosInstance(originalRequest);
//                 })
//                 .catch((error) => Promise.reject(error));
//             }
//         }

//         originalRequest._retry = true;
//         isRefreshing = true;

//         try {
//             const refreshToken = tokenStorageService.getRefreshToken();
//             const response = await axiosInstance.post('authentication/refresh-token', {refreshToken});
//             const newAccesstoken = response.data.accessToken;
//             tokenStorageService.setAccessToken(newAccesstoken);            
//             processQueue(null, newAccesstoken);
//             originalRequest.headers.Authorization = `Bearer ${newAccesstoken}`;
//             return axiosInstance(originalRequest);
//         } catch (refreshError) {
//             processQueue(refreshError);
//             tokenStorageService.removeAccessToken();
//             tokenStorageService.removeRefreshToken();            
//             return Promise.reject(refreshError);
//         } finally {
//             isRefreshing = false;
//         }
//     }    
// );

export default axiosInstance;