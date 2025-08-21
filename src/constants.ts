import { DefaultOptionType } from "antd/es/select";
import { DayOfWeek, TimeInterval } from "./types/shared";
import { SelectProps } from "antd/lib";

export const BASE_URI = 'http://localhost:8000';


export const RESOURSES = {
    admins: "admins",
    students: "students",
    departments: "departments",
    academic_year_semesters: "academic-year-semesters", 
    courses: "courses",
    openCourseRegisterations: "open-course-registerations",
    classrooms: 'classrooms',
    teachers: 'teachers',
    classroomCourseTeachers: 'classroom-course-teachers',
    exams: 'exams',
    images: "images"
}

export const ADMIN_ROLE = "admins";

export const ADMIN_URI = BASE_URI + "/" + RESOURSES.admins;

export const ADMIN_ADMIN_URI = ADMIN_ROLE + "/" + RESOURSES.admins;

export const ADMIN_LIST_URI = 
    `/${ADMIN_ADMIN_URI}`;

export const ADMIN_CREATE = 
    `/${ADMIN_ADMIN_URI}/create`;

export const ADMIN_EDIT = 
    `/${ADMIN_ADMIN_URI}/edit/:id`;

export const ADMIN_SHOW = 
    `/${ADMIN_ADMIN_URI}/show/:id`;


export const ADMIN_STUDENT_URI = ADMIN_ROLE + "/" + RESOURSES.students;

export const ADMIN_DEPARTMENT_URI = ADMIN_ROLE + "/" + RESOURSES.departments;

export const ADMIN_ACADEMIC_YEAR_SEMESTER_URI = ADMIN_ROLE + "/" + RESOURSES.academic_year_semesters;

export const ADMIN_ACADEMIC_YEAR_SEMESTER_LIST = 
    `/${ADMIN_ACADEMIC_YEAR_SEMESTER_URI}`;

export const ADMIN_ACADEMIC_YEAR_SEMESTER_CREATE = 
    `/${ADMIN_ACADEMIC_YEAR_SEMESTER_URI}/create`;

export const ADMIN_ACADEMIC_YEAR_SEMESTER_EDIT = 
    `/${ADMIN_ACADEMIC_YEAR_SEMESTER_URI}/edit/:id`;

export const ADMIN_ACADEMIC_YEAR_SEMESTER_SHOW = 
    `/${ADMIN_ACADEMIC_YEAR_SEMESTER_URI}/show/:id`;

export const COURSE_URI =  ADMIN_ROLE + "/" + RESOURSES.courses;

export const COURSE_LIST = 
    `/${COURSE_URI}`;

export const COURSE_CREATE = 
    `/${COURSE_URI}/create`;

export const COURSE_EDIT = 
    `/${COURSE_URI}/edit/:id`;

export const COURSE_SHOW = 
    `/${COURSE_URI}/show/:id`;


export const OPEN_COURSE_REGISTERATION_URI =  ADMIN_ROLE + "/" + RESOURSES.openCourseRegisterations;

export const OPEN_COURSE_REGISTERATION_LIST = 
    `/${OPEN_COURSE_REGISTERATION_URI}`;

export const OPEN_COURSE_REGISTERATION_CREATE = 
    `/${OPEN_COURSE_REGISTERATION_URI}/create`;

export const OPEN_COURSE_REGISTERATION_EDIT = 
    `/${OPEN_COURSE_REGISTERATION_URI}/edit/:id`;

export const OPEN_COURSE_REGISTERATION_SHOW = 
    `/${OPEN_COURSE_REGISTERATION_URI}/show/:id`;
    

export const CLASSROOM_URI =  ADMIN_ROLE + "/" + RESOURSES.classrooms;

export const CLASSROOM_LIST = 
    `/${CLASSROOM_URI}`;

export const CLASSROOM_CREATE = 
    `/${CLASSROOM_URI}/create`;

export const CLASSROOM_EDIT = 
    `/${CLASSROOM_URI}/edit/:id`;

export const CLASSROOM_SHOW = 
    `/${CLASSROOM_URI}/show/:id`;


export const TEACHER_URI =  ADMIN_ROLE + "/" + RESOURSES.teachers;

export const TEACHER_LIST = 
    `/${TEACHER_URI}`;

export const TEACHER_CREATE = 
    `/${TEACHER_URI}/create`;

export const TEACHER_EDIT = 
    `/${TEACHER_URI}/edit/:id`;

export const TEACHER_SHOW = 
    `/${TEACHER_URI}/show/:id`;


export const CLASSROOM_COURSE_TEACHER_URI =  ADMIN_ROLE + "/" + RESOURSES.classroomCourseTeachers;

export const CLASSROOM_COURSE_TEACHER_LIST = 
    `/${CLASSROOM_COURSE_TEACHER_URI}`;

export const CLASSROOM_COURSE_TEACHER_CREATE = 
    `/${CLASSROOM_COURSE_TEACHER_URI}/create`;

export const CLASSROOM_COURSE_TEACHER_EDIT = 
    `/${CLASSROOM_COURSE_TEACHER_URI}/edit/:id`;

export const CLASSROOM_COURSE_TEACHER_SHOW = 
    `/${TEACHER_URI}/show/:id`;



export const EXAMS_URI =  ADMIN_ROLE + "/" + RESOURSES.exams;

export const EXAMS_LIST = 
    `/${EXAMS_URI}`;

export const EXAMS_CREATE = 
    `/${EXAMS_URI}/create`;

export const EXAMS_EDIT = 
    `/${EXAMS_URI}/edit/:id`;

export const EXAMS_SHOW = 
    `/${TEACHER_URI}/show/:id`;
    

export const PER_PAGE = 2;

export const ADMIN_UPLOAD_IMAGE_URI = 
    `${BASE_URI}/${ADMIN_ROLE}/${RESOURSES.images}`


export const DAYS: SelectProps["options"] = [
    {
        value: 0,
        label: "السبت"
    },
    {
        value: 1,
        label: "الأحد"
    },
    {
        value: 2,
        label: "الاثنين"
    },
    {
        value: 3,
        label: "الثلاثاء"
    },
    {
        value: 4,
        label: "الأربعاء"
    },
    {
        value: 5,
        label: "الخمسي"
    },
    {
        value: 6,
        label: "الجمعة"
    },
];

export const getDayOfWeek = (id: number) => {
    return DAYS.find(item => item.value === id)?.label;
}

export const TIME_INTERVALS: TimeInterval[] = [
    {
        id: "08:00:00",
        title: "08:00:00"
    },
    {
        id: "10:00:00",
        title: "10:00:00"
    },
    {
        id: "12:00:00",
        title: "12:00:00"
    },
    {
        id: "14:00:00",
        title: "14:00:00"
    },
    {
        id: "16:00:00",
        title: "16:00:00"
    },
    {
        id: "18:00:00",
        title: "18:00:00"
    },
    {
       id: "18:00:00",
        title: "18:00:00"
    },
]