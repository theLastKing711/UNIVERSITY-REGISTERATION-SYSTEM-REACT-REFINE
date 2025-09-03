import { ADMIN_TEACHER_URI } from "../../../constants";
import { useSelect } from "@refinedev/antd";


export const useGetTeachers = (course_id?: number) => {


      const course_id_query_parameter = 
        course_id 
        ?
        `?course_id=${course_id}`
        :
        '';


      const { selectProps: teachersSelectProps } =
          useSelect({
            resource: `${ADMIN_TEACHER_URI}/list`,
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
        teachersSelectProps
    };
    
}