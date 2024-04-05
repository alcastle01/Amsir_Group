import { COOKIE_TOKEN, COOKIE_TOKEN_SET, cookieExists, deleteCookie } from "../util/CookieHelper";
import LoginInfo from "./LoginInfo";
import User from "./User.d";

const BASE_URL = 'http://localhost:8080';

const getUsers = async function() {
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

const userLogin = async function(loginInfo: LoginInfo) {
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
	if (response.ok) {
		return response.json();
	}
	return response;
}

const createUser = async function(user: User) {
	const createUserEndpoint = '/api/user/signup';
	const url = `${BASE_URL}${createUserEndpoint}`;
	const response = fetch(url, 
		{ 
			method: 'POST', 
			body: JSON.stringify(user), 
			headers: {'Content-Type': 'application/json'} 
		}
	).then(response => {
		if (!response.ok) {
			console.log(response);
			alert("Error al invocar createUser [ApiHelper]");
			return response;
		}
		return response;
	});
	return await response;
}

const userLogout = function() {
	deleteCookie(COOKIE_TOKEN_SET);
}

// todo: finish implementation
const isUserSessionValid = function() {
	if (cookieExists(COOKIE_TOKEN) && cookieExists(COOKIE_TOKEN_SET)) {
		// todo: check if dates are valid
		return true;
	}

	return false;
}

export { getUsers, userLogin, createUser, userLogout, isUserSessionValid };