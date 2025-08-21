
export type GetExamRequestData = {
    id: number;
    course_id: number;
    teacher_id: number;
    classroom_id: number;
    max_mark: number;
    date: string;
    from: string;
    to: string;
    is_main_exam: boolean;
}

export type CreateExamRequestData = {
    course_id: number;
    teacher_id: number;
    classroom_id: number;
    max_mark: number;
    date: string;
    from: string;
    to: string;
    is_main_exam: boolean;
}