
    import {  CLASSROOM_URI  } from "../../../constants";
    import { useSelect } from "@refinedev/antd";
    
    
    export const useGetClassroomList = () => {
    
    
          const { selectProps: classroomsSelectProps } =
            useSelect({
                resource: `${CLASSROOM_URI}/list`,
                optionValue: "id",
                optionLabel: "name",
            });
    
        return {
            classroomsSelectProps
        };
        
    }