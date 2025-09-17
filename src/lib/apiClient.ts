import axios from 'axios';

// Get the backend API URL from environment variables.
// This allows you to use different URLs for development and production.
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000/api';

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  // This is crucial for sending cookies (if you use them for auth)
  // and for handling CORS correctly with a separate backend.
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
});

/**
 * Axios request interceptor.
 * This function will be called before every request is sent.
 * Since we're using HTTP-only cookies for authentication, we don't need to
 * manually add tokens to headers - the browser will automatically include
 * the cookies with the request.
 */
// apiClient.interceptors.request.use(
//   (config) => {
//     // No need to manually add tokens since we're using HTTP-only cookies
//     // The browser will automatically include the auth_token cookie
//     return config;
//   },
//   (error) => {
//     return Promise.reject(error);
//   }
// );

/**
 * Axios response interceptor.
 * This function can be used to handle global API errors, like a 401 Unauthorized
 * response, which could trigger a global logout action.
 */
// apiClient.interceptors.response.use(
//   (response) => {
//     // If the response is successful, just return it.
//     return response;
//   },
//   (error) => {
//     // If the error is a 401, it means the user's authentication cookie is invalid or expired.
//     // Since we're using HTTP-only cookies, we can't clear them from the frontend.
//     // The AuthProvider will handle the authentication state based on the 401 response.
//     if (error.response && error.response.status === 401) {
//       // The cookie will be automatically cleared by the browser or backend
//       // No need to manually clear anything since we're using HTTP-only cookies
//       console.log('Authentication failed - cookie may be invalid or expired');
//     }
//     return Promise.reject(error);
//   }
// );

export default apiClient;

