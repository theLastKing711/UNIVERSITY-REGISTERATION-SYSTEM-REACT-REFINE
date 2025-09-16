
    import {  ADMIN_URI } from "../../../constants";
    import { useSelect } from "@refinedev/antd";
    
    
    export const useGetClassroomList = () => {
    
    
          const { selectProps: adminsSelectProps } =
            useSelect({
                resource: `${ADMIN_URI}/list`,
                optionValue: "id",
                optionLabel: "name",
            });
    
        return {
            adminsSelectProps
        };
        
    }