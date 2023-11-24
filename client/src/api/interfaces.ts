export interface AuthResponse {
	accessToken: string;
	refreshToken: string;
	user: User;
}

export interface AuthFormData {
	username?: string;
	email: string;
	password: string;
}

export interface User {
	username: string;
	email: string;
	id: string;
}

export interface Product {
	picture: string,
	name: string,
	description: string,
	price: number,
	discount: number,
}