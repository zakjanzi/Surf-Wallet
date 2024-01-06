import axios from 'axios';
import { getLoggedInUserKey, setLoggedInSessionData } from './localStorage';

export const BASE_URL = 'http://34.254.190.194'
export const apiHandler = axios.create({

  baseURL: BASE_URL,
});

apiHandler.interceptors.request.use(
  async config => {
    await getLoggedInUserKey(
      storedUserToken => {
        if (storedUserToken) {
          let token = storedUserToken?.replace(/"/g, '')
          userToken = `Bearer ${token}`;
          config.headers['Authorization'] = userToken;
        }
      },
      error => console.log('===error====', error),
    );
     console.log('===config===', config);
    return config;
  },
  error => Promise.reject(error),
);

apiHandler.interceptors.response.use(
  response => response,
  async error => {
    const {config, response} = error;
    if (
      response?.data?.error === 'Unauthenticated' ||
      response?.status == 401
    ) {
      try {
        console.log('API Response Unauthenticated');
        await refreshToken();
        //  return apiHandler(config);
      } catch (err) {
        console.log('API => Interceptor => Response',err);
      }
    }
    return Promise.reject(error);
  },
);

export const refreshToken = async () => {
  try {
    const response = await apiHandler.post('/api/auth/refresh');
    const refresh_token = response?.data?.refresh_token;
     await setLoggedInSessionData(refresh_token)
  } catch (error) {
    return Promise.reject(error);
  }
};


