
    import {  COURSE_URI } from "../../../constants";
    import { useSelect } from "@refinedev/antd";
    import { GetCoursesListResponseData } from "../../../types/admins/courses";
    
    
    export const useGetCourses = () => {
    
    
          const { selectProps: coursesSelectProps } =
          useSelect<GetCoursesListResponseData>({
            resource: `${COURSE_URI}/list`,
            optionValue: "id",
            optionLabel: "name",
          });
    
        return {
            coursesSelectProps
        };
        
    }