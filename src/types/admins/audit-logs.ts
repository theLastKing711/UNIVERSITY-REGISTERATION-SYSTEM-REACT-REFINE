import { RESOURCE_EN_TO_AR } from './../../constants';
export type GetAuditLogResposne<T = unknown> = {
    resource: keyof typeof RESOURCE_EN_TO_AR;
    action: "create" | "update" | "delete";
    details: T;
};



export type GetOpenCoruseRegisterationAuditLogResposne = 
   GetAuditLogResposne<OpenCourseRegisterationAuditLog>;



export type OpenCourseRegisterationAuditLog = {
    id: number;
    course_id: number;
    price_in_usd:  number;

    teachers: OpenCourseRegisterationTeacherAuditLog[];
}

export type OpenCourseRegisterationUpdateAuditLog = OpenCourseRegisterationAuditLog & {
    id: number;
    updated_course_id: number;
    updated_price_in_usd: number;
    updated_teachers: OpenCourseRegisterationTeacherAuditLog[];
}


export type OpenCourseRegisterationDeleteAuditLog = {
     title: string;
    id: number;
}

type OpenCourseRegisterationTeacherAuditLog = {
    id: number;
    name: string;
    is_main_teacher: boolean;
}


export type TeacherAuditLog = {
    id: number;
    title: string;
    department_id: number;
    name:  string;
}


export type TeacherUpdateAuditLog = TeacherAuditLog & {
    updated_name?: string;
    updated_department_id?: number;
}

export type TeacherDeleteAuditLog = {
    title: string;
    id: number;
}


export type OpenCourseRegisterationAuditLogWithTitle = {
    title: string;
    course_id: number;
    price_in_usd:  number;
}

export const RESOURCE = {
    "open-course-registeration"
}  
