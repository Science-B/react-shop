export default class UserDto {
	constructor(model) {
		const { username, email, _id: id } = model;
		this.username = username;
		this.email = email;
		this.id = id;
	}
}
