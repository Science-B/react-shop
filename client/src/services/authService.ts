import { AxiosResponse } from 'axios';

import httpService from './httpService';

import { AuthResponse } from '../api/interfaces';

const authService = {
	registration: async (username: string, email: string, password: string): Promise<AxiosResponse<AuthResponse>> => {
		return httpService.post<AuthResponse>('/signUp', { username, email, password })
	},

	login: async (email: string, password: string): Promise<AxiosResponse<AuthResponse>> => {
		return httpService.post<AuthResponse>('/signIn', { email, password })
	},

	logout: async (): Promise<void> => {
		httpService.post<AuthResponse>('/logOut' )
	},
};

export default authService;