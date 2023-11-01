export function handleError(code, message) {
	return {
		error: {
			message: message,
			code: code,
		},
	};
}
