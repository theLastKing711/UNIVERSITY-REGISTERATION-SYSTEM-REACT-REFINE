import {  DataProvider, HttpError } from "@refinedev/core";
import { apiClient } from "./libs/axios/config";
import { AxiosError } from "axios";
import { getSortersQuery, getQueryQuestionMarkOrEmpty, parseAxiosErrorsToList, getMutationResponseHttpError, getCursorPaginationQuery, getFiltersQuery, getPaginationQuery } from "./helpers";

export const dataProvider = (url: string, deartemnt_query_filter?: string): DataProvider => ({
    getList: async ({resource, filters, pagination, sorters, meta}) => {

    const filtersQuery = getFiltersQuery(filters);
    
    const paginationQuery =
       meta?.isCursorPagiantion ?  getCursorPaginationQuery(pagination, meta?.queryContext?.pageParam?.cursor) : getPaginationQuery(pagination); 
    
    const sortersQuery = getSortersQuery(sorters);  

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

        console.log("total", total);

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
    const updateUrl = id != "-1" ? `${url}/${resource}/${id}` : `${url}/${resource}`;

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

