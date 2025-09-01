import { AccessControlProvider, CanParams, CanResponse, IAccessControlContext } from "@refinedev/core";
import { apiClient } from "../libs/axios/config";
import { GetUserRoleResponseData } from "../types/admins/admins";

export const accessControlProvider: AccessControlProvider = {
  can: async ({
    resource,
    action,
    params,
  }: CanParams): Promise<CanResponse> => {

    

    if(localStorage.getItem("is_authenticated") !== "true")
    {
      return { 
        can: false
      };
    }

    if(resource === undefined)
    {
        return {
            can: true
        }
        
    }
    
    console.log("resourses", resource);

    console.log("action", action);

    console.log("params", params);

    const { data } = 
        await apiClient.get<GetUserRoleResponseData>(
            `admins/admins/role?resourse=${resource}&action=${action}`
        );


    const user_has_required_permissions = data.can_access;

    // localStorage.setItem("role", role);
    console.log("datas", user_has_required_permissions);


    return { 
      can: user_has_required_permissions,
    }
    
  },
  options: {
    buttons: {
      enableAccessControl: false,
      hideIfUnauthorized: false,
    },
    queryOptions: {
      // ... default global query options
    },
  },
};