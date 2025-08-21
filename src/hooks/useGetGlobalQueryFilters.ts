
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
        
    const department_id_query = 
        isNaN(parseInt(department_id_query_parameter)) == true ? undefined : parseInt(department_id_query_parameter); 


    const academic_year_semester_id_query_parameter = 
    queryParams.get("academic_year_semester_id") 
    || 
    localStorage.getItem('academic_year_semester_id_query_parameter');
        
    const academic_year_semester_id_query = 
        isNaN(parseInt(academic_year_semester_id_query_parameter)) == true ? undefined : parseInt(academic_year_semester_id_query_parameter); 
    
    
    return {
         department_id_query_parameter: department_id_query,
         academic_year_semester_id_query_parameter: academic_year_semester_id_query
    }
    
}