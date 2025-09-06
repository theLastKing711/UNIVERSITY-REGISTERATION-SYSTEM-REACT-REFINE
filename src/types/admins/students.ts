import {  CustomUploadFile } from "../shared";


export type GetStudentsResponseData = {
    department_name: string | null;
    national_id: string | null;
    birthdate: string | null;
    enrollment_date: string | null;
    graduation_date: string | null;
    phone_number: string | null;
    name: string;
};

export type GetStudentRequestData = {
    id: number;
};

export type GetStudentResponseData = {
    department_id: number | null;
    national_id: string | null;
    birthdate: string | null;
    enrollment_date: string | null;
    graduation_date: string | null;
    phone_number: string | null;
    name: string;
    profilePicture: CustomUploadFile | null;
    schoolFiles: CustomUploadFile[];
};

export type GetStudentsFilterData = {
   query: string,
   department_id: number,
   enrollment_date?: any
};

export type GetStudentTransformedResponseData = {
    department_id: number | null;
    national_id: string | null;
    birthdate: string | null;
    enrollment_date: string | null;
    graduation_date: string | null;
    phone_number: string | null;
    name: string;
    profilePicture: CustomUploadFile[];
    schoolFiles: CustomUploadFile[];
};

export type UpdateStudentRequestData = {
    department_id: number | null;
    national_id: string;
    birthdate: string;
    enrollment_date: string | null;
    graduation_date: string | null;
    phone_number: string;
    name: string;
    password: string;
    temporary_profile_picture_id: number | null;
    school_files_ids_to_add: Array<number>;
    school_files_ids_to_delete: Array<number>;
    id: number;
};


export type GraduateStudentRequestData = {
    graduation_date: string;
};


export type RegisterStudentRequestData = {
    department_id: number | null;
    national_id: string;
    birthdate: string;
    enrollment_date: string;
    phone_number: string;
    name: string;
    password: string;
    temporary_profile_picture_id: string | null;
    school_files_ids_to_add: number[];
};


export type UploadStudentProfilePictureRequestData = {
    file: any;
};

export type GetStudentsListResponseData = {
   id: number;
   student_id: number;
   name: string;
};


