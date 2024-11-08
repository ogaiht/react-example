class StorageService {
    setItem(key:string, value:string): void {
        sessionStorage.setItem(key, value);
    }

    getItem(key:string): string | null {
        return sessionStorage.getItem(key);
    }

    clear(): void {
        sessionStorage.clear();        
    }
}

export const storageService = new StorageService();