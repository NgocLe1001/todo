// import node_modules
import {Alert} from 'react-native';
import axios, {AxiosResponse, AxiosError, AxiosRequestConfig} from 'axios';
import _ from 'lodash';

const customAxios = () => {
  const axiosInstance = axios.create({
    baseURL: 'https://61b14b863c954f001722a895.mockapi.io/api/v1/',
    timeout: 30000,
    headers: {},
  });

  const requestHandler = (request: AxiosRequestConfig) => {
    return request;
  };
  const responseHandler = (response: AxiosResponse) => {
    return response;
  };

  const errorHandler = (error: AxiosError) => {
    if (error?.response?.status === 404) {
      return;
    }
    if (error.response) {
      Alert.alert(
        'Error',
        _.get(error, 'response.data.error', 'Please try again later !'),
      );
    }
  };

  axiosInstance.interceptors.request.use(
    request => requestHandler(request),
    error => errorHandler(error),
  );

  axiosInstance.interceptors.response.use(
    response => responseHandler(response),
    error => errorHandler(error),
  );

  return axiosInstance;
};

export default customAxios;
