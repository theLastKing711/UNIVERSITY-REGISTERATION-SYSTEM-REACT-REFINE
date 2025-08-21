

export type CreateClassroomToCourseTeacherRequestData = {
    classroom_id: number;
    course_id: number;
    teacher_id: number;
    from : string;
    to: string
    day: number;
}