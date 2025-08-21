
    import {  OPEN_COURSE_REGISTERATION_URI } from "../../../constants";
    import { useSelect } from "@refinedev/antd";
import { GetOpenCourseRegisterationListResponseData } from "../../../types/admins/open-course-registerations";
    
    
    export const useGetOpenCourseRegisterations = () => {
    
          const { selectProps: openCourseRegisterationssSelectProps } =
          useSelect<GetOpenCourseRegisterationListResponseData>({
            resource: `${OPEN_COURSE_REGISTERATION_URI}/list`,
            optionValue: "id",
            optionLabel: "name",
          });
    
        return {
            openCourseRegisterationssSelectProps
        };
        
    }