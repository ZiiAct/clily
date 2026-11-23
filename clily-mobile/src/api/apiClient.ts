import axios from 'axios';
import { ENV } from '../config/env';

export const apiClient = axios.create({
  baseURL: ENV.API_BASE_URL,
  timeout: ENV.API_TIMEOUT_MS,
  headers: {
    Accept: 'application/json',
  },
});

apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      const serverMessage = error.response.data?.message || 'Terjadi kesalahan pada server.';
      return Promise.reject(new Error(serverMessage));
    }
    if (error.request) {
      return Promise.reject(
        new Error(
          `Tidak dapat terhubung ke server (${ENV.API_BASE_URL}). Pastikan clily-backend sedang berjalan dan IP sudah sesuai.`
        )
      );
    }
    return Promise.reject(error);
  }
);

