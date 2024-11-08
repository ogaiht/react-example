import axiosInstance from './api/axiosInstance';

const createUrl = (userId:number, roleId?:number):string => {
    if (roleId) {
        return `users/${userId}/roles/${roleId}`;
    }
    return `users/${userId}/roles`;
}

export const getUserRoles = async (userId:number):Promise<number[]> => {
    const response = await axiosInstance.get<number[]>(createUrl(userId));
    return response.data;
}

export const addRoleToUser = async (userId:number, roleId:number): Promise<void> => {
    await axiosInstance.post(createUrl(userId), { roleId });    
}

export const removeRoleFromUser = async (userId:number, roleId:number): Promise<boolean> => {
    const response = await axiosInstance.delete<boolean>(createUrl(userId, roleId));
    return response.data;
}