import { RESOURCE_EN_TO_AR } from './../../constants';
export type GetAuditLogResposne<T> = {
    resource: keyof typeof RESOURCE_EN_TO_AR;
    action: "create" | "update" | "delete";
    details: T;
};



export type GetOpenCoruseRegisterationAuditLogResposne = 
   GetAuditLogResposne<OpenCourseRegisterationAuditLog>;



export type OpenCourseRegisterationAuditLog = {
    course_id: number;
    price_in_usd:  number;
}

export type OpenCourseRegisterationAuditLogWithTitle = {
    title: string;
    course_id: number;
    price_in_usd:  number;
}

export const RESOURCE = {
    "open-course-registeration"
}  
