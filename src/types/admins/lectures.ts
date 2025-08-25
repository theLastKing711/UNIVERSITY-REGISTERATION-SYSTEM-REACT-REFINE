
export type CreateLectureRequestData = {
    happened_at: string;
    course_id: number;
    teacher_id: number;
    course_attendance: CourseAttendanceData;
};

export type CourseAttendanceData = {
    student_id: number;
    is_student_present: boolean;
};