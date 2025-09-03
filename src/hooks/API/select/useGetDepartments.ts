import { GetDepartmentsResponseData } from "../../../types/admins/departments";
import { ADMIN_DEPARTMENT_URI } from "../../../constants";
import { useSelect } from "@refinedev/antd";


export const useGetDepratments = () => {


      const { selectProps: departmentSelectProps } =
          useSelect<GetDepartmentsResponseData>({
            resource: `${ADMIN_DEPARTMENT_URI}/list`,
            optionValue: "id",
            optionLabel: "name",
          });

    return {
        departmentSelectProps
    };
    
}