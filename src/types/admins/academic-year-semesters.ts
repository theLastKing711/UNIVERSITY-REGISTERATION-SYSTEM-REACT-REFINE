import { GetDepartmentData } from "./departments";

export type GetAcademicYearsSemestersResponseData = {
    id: number;
    year: number;
    semester: number;
    departments: GetDepartmentData[];
};


export type GetAcademicYearsSemesterResponseData = {
    id: number;
    year: number;
    semester: number;
    departments: GetDepartmentRegisteratioPeriodsData[];
};


export type GetDepartmentRegisteratioPeriodsData = {
    id: number;
    name: string;
    is_open_for_students: boolean | null;
};