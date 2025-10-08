import axios from "axios";
import { BASE_URI } from "../../constants";

export const apiClient = 
    axios
        .create({
            baseURL: BASE_URI,
            withCredentials: true,
            timeout: 20000,
            withXSRFToken: true,
            xsrfCookieName: "XSRF-TOKEN",
            xsrfHeaderName: "X-XSRF-TOKEN",
        });


    apiClient
        .interceptors
        .response
        .use(
            (response) => {
                // If the response is successful, simply return it
                return response;
            },
            (error) => {

                // Check if the error response has a 401 status code
                if (error.response && (error.response.status === 401 || error.response.status === 419)) {
                    console.log("unauthenticated");
                // Handle 401 error:
                // 1. Clear authentication data (e.g., token from localStorage or cookies)
                localStorage.removeItem('is_authenticated'); // Example for token in localStorage
                // 2. Redirect the user to the login page or trigger a token refresh
                window.location.href = '/login'; // Example for redirection
                }
                // Re-throw the error to ensure subsequent .catch() blocks are executed if needed
                return Promise.reject(error);
            }
        );
