export type GetOpenCoursesThisSemesterRequestData = {
    query: string;
}

export type GetOpenCoursesThisSemesterResponseData = {
    id: number;
    name: string;
    code: string;
    credits: string;
    price: number;
    is_student_registered_in_open_coruse: boolean;
}

export type GetStudentRegisteredOpenCoursesThisSemesterResponseData = {
    id: number;
    course: {
        name: string;
        code: string;
        credits: string;
        price: number;
    }
}

export type RegisterInOpenCourseRequestData = {
    id: number;
}