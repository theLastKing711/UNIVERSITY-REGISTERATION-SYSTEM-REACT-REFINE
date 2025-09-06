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

export type GetCoursesMarksThisSemesterResponseData = {
        id: number,
        course: CourseItemData,
        academic_year_semester_id: number,
        final_mark?: number,
        exam_mark: number,
}

export type CourseItemData = {
    id: number,
    name: string,
    code: string,
    credits: number,
}


export type GetCoursesMarksResponseData = {
    id: number,
    course: CourseItemData,
    academic_year_semester_id: number,
    final_mark?: number,
    exam_mark: number,
}

export type GetCoursesMarksRequestData = {
    query?: string;
}