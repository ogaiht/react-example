export interface PagedResultDto<T> {
    data:T[];
    offset:number;
    limit:number;
    total:number;
}