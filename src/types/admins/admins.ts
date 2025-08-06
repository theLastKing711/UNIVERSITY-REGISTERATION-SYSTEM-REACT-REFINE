export type CreateAdminRequestData = {
    name: string;
    password: string;
};


export type UpdateAdminRequestData = {
    name: string;
    password: string | null;
    id: number;
};


export type GetAdminResponseData = {
    id: number;
    name: string;
};

export type GetAdminsResponseData = {
    id: number;
    name: string;
};

export type GetAdminsResponsePaginationResultData = {
    data: Array<GetAdminsResponseData>;
    current_page: number;
    per_page: number;
    total: number;
};