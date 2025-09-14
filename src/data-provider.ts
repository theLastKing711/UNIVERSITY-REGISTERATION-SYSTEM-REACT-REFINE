import { CrudFilter, CrudSort, DataProvider, HttpError, Pagination, ValidationErrors } from "@refinedev/core";
import { apiClient } from "./libs/axios/config";
import { AxiosError } from "axios";

export const dataProvider = (url: string, deartemnt_query_filter?: string): DataProvider => ({
    getList: async ({resource, filters, pagination, sorters, meta}) => {

    // console.log("deartemnt_query_filter", deartemnt_query_filter)
      
    // console.log("sorters", sorters);
    
    // console.log("meta ", meta);

    // console.log("filters" ,filters);

    const filtersQuery = getFiltersQuery(filters);
    
    const paginationQuery =
       meta?.isCursorPagiantion ?  getCursorPaginationQuery(pagination, meta?.queryContext?.pageParam?.cursor) : getPaginationQuery(pagination); 
    
    const sortersQuery = getSortersQuery(sorters);  

    // console.log("sorters after", getSortersQuery(sorters));
    
    const queryQuestionMarkOrEmpty = 
      getQueryQuestionMarkOrEmpty(filtersQuery, paginationQuery, sortersQuery);
  

    const department_id_query_parameter_value = 
      (meta?.department_id || localStorage.getItem('department_id_query_parameter'));

    const department_id_query_parameter_query = 
    department_id_query_parameter_value
      !== 'undefined' 
      ?
      `&department_id=${department_id_query_parameter_value}`
      :
      '';

       const academic_year_semester_id_query_parameter_value = 
      (meta?.academic_year_semester_id || localStorage.getItem('academic_year_semester_id_query_parameter'));

    const academic_year_semester_id_query_parameter_query = 
    academic_year_semester_id_query_parameter_value
      !== 'undefined' 
      ?
      `&academic_year_semester_id=${academic_year_semester_id_query_parameter_value}`
      :
      '';

    const uri = `${url}/${resource}${queryQuestionMarkOrEmpty}${paginationQuery}${filtersQuery}${sortersQuery}${department_id_query_parameter_query}${academic_year_semester_id_query_parameter_query}`;
    
    const response = await apiClient.get(uri);
    
    if (response.status < 200  || response.status > 299) {
      const error: HttpError = {
          message: "حدث خطأ",
          statusCode: 404,
      };
      return Promise.reject(error);
    }

    const data = response.data.data ?? response.data; 
    // in case of pagination response
    //  response.data.data is the array
    // response.data data is the array  

    const total = response.data.total ?? data.length;
     // in case of pagination response
    //  response.data.total is the total in server not in sent to client.
    // data.length in case of response an array of items  

    console.log("datas", response);

    if(meta?.isCursorPagiantion)
      {
        return {
          data,
          total,
          cursor: response?.data.next_cursor
      }
    }

    return {
        data,
        total
    }
  },
  getOne: async ({resource, id, meta}) => {
    const showUrl = `${url}/${resource}/${id}`;

    try {
      const response = await apiClient.get(showUrl);
  
      return {
          data: response.data,
      }
      
    }
    catch(err) {
      
      const errorsList = parseAxiosErrorsToList(err);
        
      const httpError: HttpError = {
        errors: {
          data: errorsList
        },
        message: "حدث خطأ",
        statusCode: 422,
      };
      
      return Promise.reject(httpError);
    }
  
  },

  create: async ({resource, variables}) => {

    console.log("variables", variables);

    const postUrl = `${url}/${resource}`;

    try {
      const response = await apiClient.post(postUrl, variables);
  
      return {
          data: response.data,
          total: 10
      }
      
    }
    catch(err) {
        
      const httpError = getMutationResponseHttpError(err);

      return Promise.reject(httpError);
    }

  },
  update: async ({resource, variables, id}) => {
    const updateUrl = `${url}/${resource}/${id}`;

    try {
      const response = await apiClient.patch(updateUrl, variables);
  
      return {
          data: response.data,
          total: 10
      }
      
    }
    catch(err) {
      
      const httpError = getMutationResponseHttpError(err);

      return Promise.reject(httpError);
    }
  },
  deleteOne: async ({resource, id}) => {
    const deleteUrl = `${url}/${resource}/${id}`;

    try {
      const response = await apiClient.delete(deleteUrl);
  
      return {
          data: response.data,
      }
      
    }
    catch(err) {
      
      const axiosError = err as AxiosError;

      const httpError: HttpError = {
        message: "حدث خطأ",
        statusCode: 422,
      };

      return Promise.reject(httpError);
    }
  },
  custom : async ({url, method, headers, payload, query, filters, sorters, meta}) => {

        const filtersQuery = getFiltersQuery(filters);
    
    
    // console.log("sorters after", getSortersQuery(sorters));
    

  

    const department_id_query_parameter_value = 
      (meta?.department_id || localStorage.getItem('department_id_query_parameter'));

    const department_id_query_parameter_query = 
    department_id_query_parameter_value
      !== 'undefined' 
      ?
      `&department_id=${department_id_query_parameter_value}`
      :
      '';

       const academic_year_semester_id_query_parameter_value = 
      (meta?.academic_year_semester_id || localStorage.getItem('academic_year_semester_id_query_parameter'));

    const academic_year_semester_id_query_parameter_query = 
    academic_year_semester_id_query_parameter_value
      !== 'undefined' 
      ?
      `&academic_year_semester_id=${academic_year_semester_id_query_parameter_value}`
      :
      '';

      const queryQuestionMarkOrEmpty = 
        getQueryQuestionMarkOrEmpty(filtersQuery, department_id_query_parameter_query, academic_year_semester_id_query_parameter_query);

    const uri = `${url}/${queryQuestionMarkOrEmpty}${filtersQuery}${department_id_query_parameter_query}${academic_year_semester_id_query_parameter_query}`;

    const response = 
      await apiClient.get(`${uri}`, 
        {
          headers: {
            'Accept': "application/pdf"
          },
          responseType: 'blob'
        });

      const response_file_name = 
        response.headers['content-disposition'].split("=")[1].replace(/"/g, "");

      console.log("response", response_file_name);

    return {
      data: response.data,
      filename: response_file_name,
      total: 10
    }

  },
  getApiUrl: () => url,
});

const getFiltersQuery = (filters: CrudFilter[] | undefined) => {
    let query = '';
    filters?.forEach((item, index) => {
    
    if(item.value)
    {
      let lastChar = item.field[item.field.length - 1];
      if(Array.isArray(item.value))
      {
        item.value.forEach((listItem, index) => {
          query += '&' + item.field + "=" + listItem;
        });
      }
      else {
        query += '&' + item.field + "=" + item.value;
      }
    }

    })
    return query;
}
const getPaginationQuery = (pagination: Pagination | undefined) => {
  
  let query = '';
  if(pagination)
  {
    const pageNumber = pagination?.current;
    const pageSize = pagination.pageSize;

    query += `&page=${pageNumber}`;
    query += `&perPage=${pageSize}`;
  }
  return query;
}

const getCursorPaginationQuery = (pagination: Pagination | undefined) => {
  
  let query = '';
  if(pagination)
  {
    const pageNumber = pagination.current;
    const pageSize = pagination.pageSize;

    query += `&cursor=${pageNumber}`;
    query += `&perPage=${pageSize}`;
  }

  console.log("query", query);
  
  return query;
}

const getSortersQuery = (sorters: CrudSort[] | undefined) => {

  if(!sorters || sorters?.length === 0)
  {
    return "";
  }

  // console.log("sorters", sorters);
  
  const query = sorters?.reduce(((prev,curr, index) => {
    if(curr.order === "asc")
    {
      return prev + "&sort=" + curr.field + "&dir=asc";
    }
    if(curr.order)
    {
      return prev + "&sort=" + curr.field + "&dir=desc";
    }
  }), "")

  return query;
}


const getQueryQuestionMarkOrEmpty = (...values: string[]) =>
{
  if(values.length === 0)
    {
        return "";
    }
  return values.some(query => query.length > 0) ? "?" : "";
}

const  parseAxiosErrorsToList = (err: unknown) => {
  const axiosError = err as AxiosError;

  // console.log("error", (axiosError.response?.data as any).errors);

  const x:ValidationErrors = {}

  const errorsObject = ((axiosError.response?.data) as any).errors as Record<string, any>
  
  const errorsList = Object.values(errorsObject).flat() as string[];

  return errorsList;
    
}


const getMutationResponseHttpError = (err: unknown) => {

   const httpError: HttpError = {
        errors: {
          // data: errorsList
         ...err.response.data.errors,
          // from: err.response.data.message,

        },
        message: err.response.data.message,
        statusCode: 422,
      };
    return httpError;
  
}