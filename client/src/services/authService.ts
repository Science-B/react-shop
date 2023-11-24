import { AxiosResponse } from 'axios';

import httpService from './httpService';

import { AuthResponse, AuthFormData } from '../api/interfaces';
import { AUTH_ENDPOINT } from '../api/consts';

const authService = {
	registration: async (payload: AuthFormData): Promise<AxiosResponse<AuthResponse>> => {
		return httpService.post<AuthResponse>(AUTH_ENDPOINT + 'signUp', payload)
	},

	login: async (payload: AuthFormData): Promise<AxiosResponse<AuthResponse>> => {
		return httpService.post<AuthResponse>(AUTH_ENDPOINT + 'signIn', payload)
	},

	logout: async (): Promise<void> => {
		httpService.post<AuthResponse>(AUTH_ENDPOINT + 'logOut')
	},
};

export default authService;