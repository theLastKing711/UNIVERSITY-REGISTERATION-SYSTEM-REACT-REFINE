import { TEACHER_URI } from "../../../constants";
import { useSelect } from "@refinedev/antd";


export const useGetTeachers = () => {


      const { selectProps: teachersSelectProps } =
          useSelect({
            resource: `${TEACHER_URI}/list`,
            optionValue: "id",
            optionLabel: "name",
          });

    return {
        teachersSelectProps
    };
    
}