export type GetNotificationsResponseData = {
    id: number;
    data: {
        message: string;
        link: string;
    };
    read_at: string | null;
}