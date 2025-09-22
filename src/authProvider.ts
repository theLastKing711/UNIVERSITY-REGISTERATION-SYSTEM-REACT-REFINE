

import { AuthProvider } from "@refinedev/core";
import { apiClient } from "./libs/axios/config";
import { ADMIN_URI } from "./constants";
import { AxiosError } from "axios";

export const authProvider: AuthProvider = {
  login: async ({ name, password }) => {
    const result = await apiClient.get("sanctum/csrf-cookie");

    const LOGIN_END_POINT = ADMIN_URI + "/auth/login";

    try {
        const { data } = 
          await apiClient
            .post<{id: number, name: string, redirect_to: string}>(
              LOGIN_END_POINT,
              {
                name,
                password
              }
            );

        localStorage.setItem("is_authenticated", "true");

        localStorage.setItem("username", data.name);

        localStorage.setItem("user_id", JSON.stringify(data.id));

        return {
            success: true,
            redirectTo: data.redirect_to
        };
        
    }
    catch(error){

        const axiosError = error as AxiosError;
        
        console.log("error", axiosError.status);

        return {
            success: false,
            error: {
              message: "خطأ في عملية تسجيل الدخول",
              name: "اسم المستخدم أو كلمة المرور غير صحيحة",
            },
        };
    }


  },
  check: async () => {

    console.log("value", localStorage.getItem("is_authenticated"))

    if(localStorage.getItem("is_authenticated") === "true")
    {
      return Promise.resolve({
        authenticated: true
      })
    }

    console.log("checking")


    return Promise.resolve({
        authenticated: false
      });

  },
  logout: async () => {

    const LOGOUT_OUTPOINT = ADMIN_URI + "/auth/logout";

    try {
        const data = await apiClient.post(LOGOUT_OUTPOINT);
        
        localStorage.removeItem("is_authenticated");

        return {
          success:  true,
          // redirectTo: "\\login"
        };
    }
    catch(error){

        const axiosError = error as AxiosError;
        
        console.log("error", axiosError.status);
        return {
            success: false,
            // redirectTo: "/login",
            error: {
              message: "خطأ في عملية تسجيل الخروج",
              name: "تسجيل الخروج",
              
            },
        };
    }
    
    
  }
};



// import type { AuthProvider } from "@refinedev/core";

// export const TOKEN_KEY = "refine-auth";

// export const authProvider: AuthProvider = {
//   login: async ({ username, email, password }) => {
//     if ((username || email) && password) {
//       localStorage.setItem(TOKEN_KEY, username);
//       return {
//         success: true,
//         redirectTo: "/",
//       };
//     }

//     return {
//       success: false,
//       error: {
//         name: "LoginError",
//         message: "Invalid username or password",
//       },
//     };
//   },
//   logout: async () => {
//     localStorage.removeItem(TOKEN_KEY);
//     return {
//       success: true,
//       redirectTo: "/login",
//     };
//   },
//   check: async () => {
//     const token = localStorage.getItem(TOKEN_KEY);
//     if (token) {
//       return {
//         authenticated: true,
//       };
//     }

//     return {
//       authenticated: false,
//       redirectTo: "/login",
//     };
//   },
//   getPermissions: async () => null,
//   getIdentity: async () => {
//     const token = localStorage.getItem(TOKEN_KEY);
//     if (token) {
//       return {
//         id: 1,
//         name: "John Doe",
//         avatar: "https://i.pravatar.cc/300",
//       };
//     }
//     return null;
//   },
//   onError: async (error) => {
//     console.error(error);
//     return { error };
//   },
// };
