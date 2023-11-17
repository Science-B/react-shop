export interface AuthResponse {
	accessToken: string;
	refreshToken: string;
	userId: string;
}

export interface User {
	username: string;
	email: string;
	id: string;
}