
    import {  ADMIN_ACADEMIC_YEAR_SEMESTER_URI  } from "../../../constants";
    import { useSelect } from "@refinedev/antd";
    import { GetCoursesListResponseData } from "../../../types/admins/courses";
    
    
    export const useGetAcademicYearSemesters = () => {
    
    
          const { selectProps: academicYearSemestersSelectProps } =
            useSelect<GetCoursesListResponseData>({
                resource: `${ADMIN_ACADEMIC_YEAR_SEMESTER_URI}/list`,
            });
    
        return {
            academicYearSemestersSelectProps
        };
        
    }