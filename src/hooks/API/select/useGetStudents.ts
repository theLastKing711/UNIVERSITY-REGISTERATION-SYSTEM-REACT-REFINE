
    import {  ADMIN_STUDENT_URI } from "../../../constants";
    import { useSelect } from "@refinedev/antd";
import { GetStudentsListResponseData } from "../../../types/admins/students";
    
    
    export const useGetStudents = (course_id?: number) => {
    
    
          const { selectProps: studentsSelectProps } =
          useSelect<GetStudentsListResponseData>({
            resource: `${ADMIN_STUDENT_URI}/list`,
            optionValue: "id",
            optionLabel: "name",
             filters: [
              {
                field: "course_id",
                operator: "eq",
                value: course_id
              }
            ]
          });
    
        return {
            studentsSelectProps
        };
        
    }