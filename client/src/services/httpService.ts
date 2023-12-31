import axios, { InternalAxiosRequestConfig } from 'axios';

import { API_URL } from '../api/consts';

const http = axios.create({
	baseURL: API_URL,
})

http.interceptors.request.use((config: InternalAxiosRequestConfig) => {
	config.headers.Authorization = `Bearer ${localStorage.getItem('token')}`
	return config
})

const httpService = {
	get: http.get,
	post: http.post,
	put: http.put,
	delete: http.delete,
	patch: http.patch,
};

export default httpService;