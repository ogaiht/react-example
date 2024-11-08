import { createQueryString } from '../common/querystring-helper';
import axiosInstance from './api/axiosInstance';
import { CrudService } from './crud.service';
import { PagedResultDto, UserDto, UserFilter } from './dtos';

const API_URI = 'users';

export const userService = new CrudService<UserDto>(API_URI);

export const getUsers = async (filter?:UserFilter): Promise<PagedResultDto<UserDto>> => {
    const queryString = createQueryString({...filter, offset:0, limit:10});
    const response = await axiosInstance.get<PagedResultDto<UserDto>>(`${API_URI}${queryString}`);
    return response.data;
};

export const getUser = async (id:number): Promise<UserDto> => {
    const response = await axiosInstance.get<UserDto>(`${API_URI}/${id}`);
    return response.data;
};

export const createUser = async (user: Omit<UserDto, 'id'>): Promise<number> => {
    const response = await axiosInstance.post<number>(API_URI, user);
    return response.data;
};

export const updateUser = async (id:number, user:Omit<UserDto, 'id'>): Promise<boolean> => {
    const response = await axiosInstance.patch(`${API_URI}/${id}`, user);
    return response.data;
};

export const deleteUser = async (id:number): Promise<boolean> => {
    const response = await axiosInstance.delete(`${API_URI}/${id}`);
    return response.data;
};