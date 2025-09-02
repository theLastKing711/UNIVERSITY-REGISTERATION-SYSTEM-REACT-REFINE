import { AccessControlProvider, CanParams, CanResponse, IAccessControlContext } from "@refinedev/core";
import { apiClient } from "../libs/axios/config";
import { GetUserRoleResponseData } from "../types/admins/admins";

export const accessControlProvider: AccessControlProvider = {
  //it get called autmatically for every sider item for actiosn(list, create)
  //when route changed always, even when cached or stale time is active
  //when we enter sider menu item
  //for every table item (show,delete, edit) can gets called only first time
  //if staleTime is active
  can: async ({
    resource,
    action,
    params,
  }: CanParams): Promise<CanResponse> => {


    if(action === "edit")
    {
      // alert("hello world")
    }
        
    console.log("resourses", resource);

    console.log("action", action);

    console.log("params", params);

    

    if(localStorage.getItem("is_authenticated") !== "true")
    {
      return { 
        can: false
      };
    }

    // if(resource === undefined)
    // {

    //   console.log("hello world");
      
    //     return {
    //         can: true
    //     }
        
    // }

    const route = 
      `admins/admins/role?resourse=${resource}&action=${action}`;

    console.log("route", route)

    const { data } = 
        await apiClient.get<GetUserRoleResponseData>(
            // `admins/admins/role?resourse=admins/admins&action=list`,
            route
        );


    const user_has_required_permissions = data.can_access;

    // localStorage.setItem("role", role);
    console.log("datas", user_has_required_permissions);


    return { 
      can: user_has_required_permissions,
    }
    
  },
  options: {
    // buttons: {
    //   enableAccessControl: false,
    //   hideIfUnauthorized: false,
    // },
    queryOptions: {
      // ... query options for this can method
      //data get shown immediatly if it is cached(within cachetime duration)
      // and a request is sent to api in background to validae it if staleTime has not passed
      //default is 0 which means data is served from cache (if within cachetime duration)
      // and a request is always sent to api in background to validate it
      // we can increase it to make validation request only after staletime has passed
      staleTime: 1000 * 5 * 60,
      //data served from cache for cachetime duration
      // once expired a request is made to server for fresh data 
      // when component which uses it loads
      //default is 5 minutes
      cacheTime: 1000 * 5 * 60,
      // refetchOnWindowFocus: false,

    },
  },
};