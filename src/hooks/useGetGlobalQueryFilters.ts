
import { useLocation } from 'react-router';

export const useGetGlobalQueryFilters = () => {

    // const {
    //      params
    // } = 
    //     useParsed();

    // console.log("params", params);

    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const department_id_query_parameter = 
        queryParams.get("department_id") 
        || 
        localStorage.getItem('department_id_query_parameter');
        
    const academic_year_semester_query_parameter = queryParams.get("academic_year_semester_id");

    

    //     const location = useLocation();
    // const queryParams = new URLSearchParams(location.search);
    // const department_id_query_parameter = 
    // params?.filters?.find(item => item.field === "department_id")
  
    // const academic_year_semester_query_parameter = params?.academic_year_semester_id || null;

    // console.log("department_id_query_parameter", department_id_query_parameter);
    
    
    // const department_query_value = 
    //     department_id_query_parameter?.value || localStorage.getItem("department_id_query_parameter");


    // const filters = 
    //     useMemo(() => {

    //         const department_crud_filter: CrudFilter|null =
    //         department_id_query_parameter || localStorage.getItem("department_id_query_parameter")
    //         ?
    //         {
    //             field: "department_id",
    //             operator: "eq", 
    //             value: parseInt(department_id_query_parameter?.value || localStorage.getItem("department_id_query_parameter"))
    //         }
    //         :
    //         null;
            
    //     const academic_year_semester_crud_filter: CrudFilter|null = 
    //         academic_year_semester_query_parameter
    //         ?
    //         {
    //             field: "academic_year_semester_id",
    //             operator: "eq", 
    //             value: academic_year_semester_query_parameter
    //         }
    //         :
    //         null;
    //             [department_crud_filter, academic_year_semester_crud_filter]

    //         return [department_crud_filter, academic_year_semester_crud_filter]
    //             .filter(item => item != null);
    //         }
    //     , 
    //     [ 
    //         department_query_value 
    //     ]
    // );


    // console.log("department_id_query_parameter,", )


     
    if(  isNaN(parseInt(department_id_query_parameter)))
    {
        console.log("hello world");
    }

    const x = 
        isNaN(parseInt(department_id_query_parameter)) == true ? undefined : parseInt(department_id_query_parameter); 

    console.log("x", x);

   
    
    return {
         department_id_query_parameter: x
        // department_id_query_parameter,
        // academic_year_semester_query_parameter,
        // filters 
    }
    
}