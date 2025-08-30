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
    
    console.log("resourse", resource);

    console.log("action", action);

    const { data } = 
        await apiClient.get<GetUserRoleResponseData>(
            `admins/admins/role?resourse=${resource}`
        );

    console.log("data", data);

    const role = data.name;

    localStorage.setItem("role", role);

    console.log("role", role);
    

    return {
      can: true
    };

    if(role.includes("admin"))
    {
        return {
            can: true
        }
    }
        
    // if(role.includes("student") && resource?.includes("student"))
    // {
    //     return {can: true};
    // }

    return { can: false}
    
  },
  options: {
    buttons: {
      enableAccessControl: true,
      hideIfUnauthorized: false,
    },
    queryOptions: {
      // ... default global query options
    },
  },
};