/**
 * Sets a cookie with a given [name] and [value]. Optionally set HttpOnly flag
 * @param name string
 * @param value string
 * @param httpOnly default=false
 */
function setCookie(name:string, value: string, httpOnly = false) {
	let cookieString = `${name}=${value}; path=/;`;
	if (httpOnly) cookieString.concat(" HttpOnly")
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

export { setCookie, cookieExists }