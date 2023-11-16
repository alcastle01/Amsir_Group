import User from "./User.d";

const BASE_URL = 'http://localhost:8080';

let getUsers = async function() {
	const usersEndpoint = '/api/user';
	const url = `${BASE_URL}${usersEndpoint}`;
	await fetch(url)
		.then(response => {
			if (!response.ok) {
				console.log(response);
			}
			console.log(response.json());
			return response.json();
	});
};

let userLogin = async function(loginInfo: LoginInfo) {
	const loginEndpoint = '/api/login';
	const url = `${BASE_URL}${loginEndpoint}`;
	const response = await fetch(url,
		{
			method: 'POST',
			body: JSON.stringify({
				usernameOrEmail: loginInfo.usernameOrEmail,
				password: loginInfo.password
			}),
			headers: { 'Content-Type': 'application/json' }
		});
	return await response.json();
}

let createUser = function(user: User) {
	const createUserEndpoint = '/api/user/signup';
	const url = `${BASE_URL}${createUserEndpoint}`;
	fetch(url, 
		{ 
			method: 'POST', 
			body: JSON.stringify(user), 
			headers: {'Content-Type': 'application/json'} 
		}
	).then(response => {
		if (!response.ok) {
			console.log(response);
			alert("Error al invocar createUser [ApiHelper]");
		}
		return response;
	});
}

export { getUsers, userLogin, createUser };