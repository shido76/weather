import Promise from 'es6-promise';
import axios from 'axios';

const api = axios.create({
  baseURL: "https://www.metaweather.com"
});

// per default handle is enabled for all http calls.
// to disable for a specific call:
// api.get('/v2/api-endpoint', { handlerEnabled: false })
const isHandlerEnabled = (config = {}) => {
  return !(config.hasOwnProperty('handlerEnabled') && !config.handlerEnabled);
};

const requestHandler = request => {
  if (isHandlerEnabled(request.config)) {
    // Handle requests
  }
  return request;
};

const errorHandler = error => {
  const originalRequest = error.config;

  if (isHandlerEnabled(originalRequest)) {
    // Handle errors
  }
  return Promise.reject(error);
};

const successHandler = response => {
  if (isHandlerEnabled(response.config)) {
    // Handle responses
  }
  return response;
};

api.interceptors.request.use(request => requestHandler(request));

api.interceptors.response.use(response => successHandler(response), error => errorHandler(error));

export default api;