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

          
          const response = await apiClient.get(`${AUDT_LOG_URI}`);
          
          if (response.status < 200  || response.status > 299) {
            const error: HttpError = {
                message: "حدث خطأ",
                statusCode: 404,
            };
            return Promise.reject(error);
          }
      
          const data = response.data.data ?? response.data; 
      
          const total = response.data.total ?? data.length;
      
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

    console.log("params", params)
    
    const { resource, meta, action, author,data, previousData} = params;


    const api_resource = resource.split('/')[1];

    if(params.action === "delete")
    {
      await apiClient
        .post(
          `${AUDT_LOG_URI}/delete`,
          {
            ...data,
            id: meta.id,
            resource: api_resource
          }
        );
        
        return;
    }
    
     await apiClient
        .post(
          `${AUDT_LOG_URI}/${api_resource}?action=${action}`,
          {
            ...data,
            id: meta.id,
            previousData,
            resource: api_resource
          }
        );

    return data;
  },
  update: async (params) => {

     const { resource, meta, action, author,data, } = params;

    const api_resource = resource.split('/')[1];

    console.log("update data", data);

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