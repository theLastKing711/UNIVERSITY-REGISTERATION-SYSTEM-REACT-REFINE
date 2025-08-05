
export const BASE_URI = 'http://localhost:8000';


export const RESOURSES = {
    admin: "admins",
}

export const ADMIN_ROLE = "admins";

export const ADMIN_URI = BASE_URI + "/" + RESOURSES.admin;

export const ADMIN_ADMIN_URI = ADMIN_ROLE + "/" + RESOURSES.admin;

export const ADMIN_SHOW_URI = BASE_URI + "/" + RESOURSES.admin + "/:id";
