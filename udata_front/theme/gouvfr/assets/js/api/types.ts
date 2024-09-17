export type PaginatedArray<T> = {
    data: Array<T>;
    next_page: string | null;
    page: number;
    page_size: number;
    previous_page: string | null;
    total: number;
};