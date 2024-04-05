const COOKIE_TOKEN = "token"; // key to be used in cookies for token [httpOnly]
const COOKIE_TOKEN_SET = "tokenSet"; // secondary key to be used in the cookies 
const MINUTES = 60; // minutes for the session to expire

/**
 * Sets a cookie with a given [name] and [value]. Optionally set HttpOnly flag
 * @param name string
 * @param value string
 * @param httpOnly default=false
 */
function setCookie(name:string, value: string, httpOnly = false) {
	const date = new Date();
	date.setTime(date.getTime() + MINUTES * 60 * 1000)
	let cookieString = `${name}=${value}; expires=${date.toUTCString()}; path=/;`;
	if (httpOnly) cookieString.concat(" HttpOnly=true;")
	document.cookie = cookieString;
}

/**
 * Returns true if a given cookie [name] is found in the actual browser coookies
 * @param name string
 * @returns boolean
 */
function cookieExists(name: string) {
	console.log(document.cookie);
	console.log(typeof document.cookie);

	if (document.cookie.includes(name)) {
		return true;
	}

	return false;
}

/**
 * Assigns an empty value to the cookie
 * @param name cookie's which new value will be empty
 */ 
function deleteCookie(name: string) {
	if (cookieExists(name)) {
		document.cookie = `${name}=; path=/;`;
	}
}

export { setCookie, cookieExists, deleteCookie, COOKIE_TOKEN, COOKIE_TOKEN_SET }