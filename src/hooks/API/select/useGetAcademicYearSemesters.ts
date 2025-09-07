
    import {  ACADEMIC_YEAR_SEMESTER_LIST_LIST, ADMIN_ACADEMIC_YEAR_SEMESTER_URI  } from "../../../constants";
    import { useSelect } from "@refinedev/antd";
    import { GetCoursesListResponseData } from "../../../types/admins/courses";
    
    
    export const useGetAcademicYearSemesters = () => {
    
    
          const { selectProps: academicYearSemestersSelectProps } =
            useSelect<GetCoursesListResponseData>({
                resource: ACADEMIC_YEAR_SEMESTER_LIST_LIST,
            });
    
        return {
            academicYearSemestersSelectProps
        };
        
    }