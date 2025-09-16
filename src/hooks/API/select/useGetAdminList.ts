
    import {  ADMIN_ADMIN_URI } from "../../../constants";
    import { useSelect } from "@refinedev/antd";
    
    
    export const useGetAdminList = () => {
    
    
          const { selectProps: adminsSelectProps } =
            useSelect({
                resource: `${ADMIN_ADMIN_URI}/list`,
                optionValue: "id",
                optionLabel: "name",
            });
    
        return {
            adminsSelectProps
        };
        
    }