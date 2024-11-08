import axios, { HttpStatusCode } from 'axios';
import { Config } from '../Config';

interface LoginRequest {
    username:string;
    password:string;
}

interface LoginResponse {
    accessToken:string;
    refreshToken:string;
    success:boolean;
    message?:string;
}

interface RefreshAccessTokenRequest {
    token:string;
}

interface RefreshAccessTokenResponse {
    accessToken:string;
    success:boolean;
}

export const login = async (credentials: LoginRequest): Promise<LoginResponse> => {
    const response = await axios.post<LoginResponse>(`${Config.API_URL}/authentication/login`, credentials);
    return response.data;
};

export const refreshAccessToken = async (refreshTokenRequest:RefreshAccessTokenRequest): Promise<RefreshAccessTokenResponse> => {
    const response = await axios.post<RefreshAccessTokenResponse>(`${Config.API_URL}/authentication/refresh`);
    return response.data;
}