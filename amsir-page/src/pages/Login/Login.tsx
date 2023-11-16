import Button from "@mui/material/Button";
import InputLabel from "@mui/material/InputLabel";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import { userLogin } from "../../clients/ApiHelper";
import { encrypt } from "../../util/CriptoHelper";

function Login() {
	function attemptLogin(username: HTMLElement | String | any , password: HTMLElement | String | any) {
		const loginInfo: LoginInfo = {
			usernameOrEmail: username.value,
			password: String(encrypt(password.value)),
		}

		// todo: other valildations?
		if (loginInfo?.password == null) {
			alert(`Null password field, please fix`);
		} else {
			userLogin(loginInfo)
			.then((result) => {
				// todo: securely store tokenData in localstorage
				const tokenData: TokenData = {
					tokenType: result.tokenType,
					accessToken: result.accessToken,
				}
				alert(tokenData.accessToken);
				return result;
			});
		}
	}

	return(
		<>
			<Stack spacing={2} direction='column'>
				<form>
					<InputLabel>
						Como te llamamos?
					</InputLabel>
					<br />
					<TextField id='username' required />
					<br />

					<InputLabel>
						Dame tu contrasena?
					</InputLabel>
					<br />

					<TextField id='password' required autoComplete="off" security="" />
					<br />
					<br />

					<Button variant="contained" onClick={() => {
							attemptLogin(
								document.getElementById('username'),
								document.getElementById('password')) 
						}}>
						Login
					</Button>
				</form>
			</Stack>
		</>
	)
}

export default Login;