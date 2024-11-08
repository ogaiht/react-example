import axiosInstance from './api/axiosInstance';
import { ProfileDto } from './dtos';

export const getMyProfile = async () => {
    const response = await axiosInstance.get<ProfileDto>('profile/mine');
    return response.data;
}