// const auditLogProvider = {
//     create: (params: {
//         resource: string;
//         action: string;
//         data?: any;
//         author?: {
//             name?: string;
//             [key: string]: any;
//         };
//         previousData?: any;
//         meta?: Record<string, any>;
//     }) => void;
//     get: (params: {
//         resource: string;
//         action?: string;
//         meta?: Record<string, any>;
//         author?: Record<string, any>;
//     }) => Promise<any>;
//     update: (params: {
//         id: BaseKey;
//         name: string;
//     }) => Promise<any>;
// }

import { AuditLogProvider, HttpError } from "@refinedev/core";
import { ADMIN_ADMIN_URI, ADMIN_ROLE } from "./constants";
import { apiClient } from "./libs/axios/config";
import { data } from "react-router";
import pagination from "antd/es/pagination";
import { url } from "inspector";
import { getFiltersQuery, getCursorPaginationQuery, getPaginationQuery, getSortersQuery, getQueryQuestionMarkOrEmpty } from "./helpers";


const AUDT_LOG_URI = `${ADMIN_ROLE}/audit-logs`; 

export const auditLogProvider: AuditLogProvider = {
  get: async (params) => {
    try {

      const { resource, meta, action, author, metaData, } = params;
      
      // const filtersQuery = getFiltersQuery(filters);
          
      //     const paginationQuery =
      //        meta?.isCursorPagiantion ?  getCursorPaginationQuery(pagination, metaData?.queryContext?.pageParam?.cursor) : getPaginationQuery(pagination); 
          
      //     const sortersQuery = getSortersQuery(sorters);  
      
      //     const queryQuestionMarkOrEmpty = 
      //       getQueryQuestionMarkOrEmpty(filtersQuery, paginationQuery, sortersQuery);
        
      
      //     const department_id_query_parameter_value =  
      //       (meta?.department_id || localStorage.getItem('department_id_query_parameter'));
      
      //     const department_id_query_parameter_query = 
      //     department_id_query_parameter_value
      //       !== 'undefined' 
      //       ?
      //       `&department_id=${department_id_query_parameter_value}`
      //       :
      //       '';
      
      //        const academic_year_semester_id_query_parameter_value = 
      //       (meta?.academic_year_semester_id || localStorage.getItem('academic_year_semester_id_query_parameter'));
      
      //     const academic_year_semester_id_query_parameter_query = 
      //     academic_year_semester_id_query_parameter_value
      //       !== 'undefined' 
      //       ?
      //       `&academic_year_semester_id=${academic_year_semester_id_query_parameter_value}`
      //       :
      //       '';
      
      //     const uri = `${AUDT_LOG_URI}/${resource}${queryQuestionMarkOrEmpty}${paginationQuery}${filtersQuery}${sortersQuery}${department_id_query_parameter_query}${academic_year_semester_id_query_parameter_query}`;

          // const uri = `${AUDT_LOG_URI}/${resource}${queryQuestionMarkOrEmpty}${paginationQuery}${filtersQuery}${sortersQuery}${department_id_query_parameter_query}${academic_year_semester_id_query_parameter_query}`;
          
          const response = await apiClient.get(`${AUDT_LOG_URI}`);
          
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
          data: response.data
         }
        }
        catch(err) {
            
          // const httpError: HttpError = {
          //   errors: {
          //     data: errorsList
          //   },
          //   message: "حدث خطأ",
          //   statusCode: 422,
          // };
          
          return Promise.reject(err);
        }

  },
  create: async (params) => {
    const { resource, meta, action, author,data, } = params;

    const api_resource = resource.split('/')[1];

     await apiClient
        .post(
          `${AUDT_LOG_URI}/${api_resource}?action=${action}`,
          {
            ...data,
            resource: api_resource
          }
        );

    return data;
  },
  update: async (params) => {

     const { resource, meta, action, author,data, } = params;

    const api_resource = resource.split('/')[1];

     await apiClient
        .post(
          `${AUDT_LOG_URI}/${api_resource}?action=${action}`,
          {
            ...data,
            resource: api_resource
          }
        );

    return data;
  },
};