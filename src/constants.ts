
export const BASE_URI = 'http://localhost:8000';


export const RESOURSES = {
    admins: "admins",
    students: "students",
    departments: "departments",
    images: "images"
}

export const ADMIN_ROLE = "admins";

export const ADMIN_URI = BASE_URI + "/" + RESOURSES.admins;

export const ADMIN_ADMIN_URI = ADMIN_ROLE + "/" + RESOURSES.admins;

export const ADMIN_STUDENT_URI = ADMIN_ROLE + "/" + RESOURSES.students;

export const ADMIN_DEPARTMENT_URI = ADMIN_ROLE + "/" + RESOURSES.departments;

export const ADMIN_SHOW_URI = BASE_URI + "/" + RESOURSES.admins + "/:id";



export const PER_PAGE = 2;





export const ADMIN_UPLOAD_IMAGE_URI = 
    `${BASE_URI}/${ADMIN_ROLE}/${RESOURSES.images}`

