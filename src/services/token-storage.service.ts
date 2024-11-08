import { storageService } from './storage.service';

const ACCESS_TOKEN_KEY = 'AccessToken';
const REFRESH_TOKEN_KEY = 'RefreshToken';

class TokenStorageService {

    getAccessToken(): string | null {
        return storageService.getItem(ACCESS_TOKEN_KEY);
    }

    setAccessToken(accessToken:string): void {
        storageService.setItem(ACCESS_TOKEN_KEY, accessToken);
    }

    removeAccessToken(): void {
        sessionStorage.removeItem(ACCESS_TOKEN_KEY);
    }

    getRefreshToken(): string | null {
        return storageService.getItem(REFRESH_TOKEN_KEY);
    }

    setRefreshToken(accessToken:string): void {
        storageService.setItem(REFRESH_TOKEN_KEY, accessToken);
    }

    removeRefreshToken(): void {
        sessionStorage.removeItem(REFRESH_TOKEN_KEY);
    }
}

export const tokenStorageService = new TokenStorageService();