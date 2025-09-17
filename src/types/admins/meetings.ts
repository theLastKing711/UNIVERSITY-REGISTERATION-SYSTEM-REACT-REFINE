export type CreateMeetingRequestData = {
    happens_at: string;
    attendances: CreateAttendanceData[]
}


export type CreateAttendanceData = {
    id: number;
}


export type GetMeetingsResponseData = {
    happens_at: string;
    attendances: GetAttendanceDate[]
}

export type GetAttendanceDate = {
    id: number;
    name: string
}