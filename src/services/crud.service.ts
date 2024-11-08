
import { createQueryString } from '../common/querystring-helper';
import axiosInstance from './api/axiosInstance';
import { PagedResultDto, Pagination } from './dtos';

export class CrudService<TDto> {
    constructor(private readonly serviceUri: string) {

    }

    async list<TFilter extends Pagination>(filter?:TFilter): Promise<PagedResultDto<TDto>> {
        const queryString = createQueryString({...filter, offset:0, limit:10});
        const response = await axiosInstance.get<PagedResultDto<TDto>>(`${this.serviceUri}${queryString}`);
        return response.data;
    }

    async get(id:number): Promise<TDto> {
        const response = await axiosInstance.get<TDto>(`${this.serviceUri}/${id}`);
        return response.data;
    }

    async create(dto:Omit<TDto, 'id'>):Promise<number> {
        const response = await axiosInstance.post<number>(this.serviceUri, dto);
    return response.data;
    }

    async update(id:number, dto:Omit<TDto, 'id'>): Promise<boolean> {
        const response = await axiosInstance.patch<boolean>(`${this.serviceUri}/${id}`, dto);
        return response.data;
    }

    async delete(id:number): Promise<boolean> {
        const response = await axiosInstance.delete(`${this.serviceUri}/${id}`);
        return response.data;
    }
}