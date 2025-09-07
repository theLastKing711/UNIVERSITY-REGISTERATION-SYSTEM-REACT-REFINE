import { DEPARTMENT_LIST_LIST } from "../../../constants";
import { GetDepartmentsResponseData } from "../../../types/admins/departments";
import { useSelect } from "@refinedev/antd";


export const useGetDepratments = () => {


      const { selectProps: departmentSelectProps } =
          useSelect<GetDepartmentsResponseData>({
            resource: DEPARTMENT_LIST_LIST,
            optionValue: "id",
            optionLabel: "name",
          });

    return {
        departmentSelectProps
    };
    
}