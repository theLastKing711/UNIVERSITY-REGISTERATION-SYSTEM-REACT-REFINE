
export const BASE_URI = 'http://localhost:8000';


export const RESOURSES = {
    admins: "admins",
    students: "students",
    departments: "departments",
    academic_year_semesters: "academic-year-semesters", 
    courses: "courses",
    openCourseRegisterations: "open-course-registerations",
    classrooms: 'classrooms',
    images: "images"
}

export const ADMIN_ROLE = "admins";

export const ADMIN_URI = BASE_URI + "/" + RESOURSES.admins;

export const ADMIN_ADMIN_URI = ADMIN_ROLE + "/" + RESOURSES.admins;

export const ADMIN_STUDENT_URI = ADMIN_ROLE + "/" + RESOURSES.students;

export const ADMIN_DEPARTMENT_URI = ADMIN_ROLE + "/" + RESOURSES.departments;

export const ADMIN_SHOW_URI = BASE_URI + "/" + RESOURSES.admins + "/:id";

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


export const PER_PAGE = 2;





export const ADMIN_UPLOAD_IMAGE_URI = 
    `${BASE_URI}/${ADMIN_ROLE}/${RESOURSES.images}`

