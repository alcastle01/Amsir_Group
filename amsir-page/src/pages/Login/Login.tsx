import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import { userLogin } from "../../clients/ApiHelper";
import { encrypt } from "../../util/CriptoHelper";
import LoginInfo from "../../clients/LoginInfo";
import TokenData from "../../clients/TokenData";
import { Box, FormControl, Typography } from "@mui/material";

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
			<Box sx={{
				padding: '3%',
			}}>
				<Typography variant="h2" color="#A084DC">
					Bienvenid@ de vuelta!
				</Typography>
			</Box>
			<br />
			<Stack spacing={2} direction='column'>
				<form>
					<FormControl sx={{
						border: "1px solid",
						padding: "15px",
					}}>
						<Typography variant="body1">
							Como te llamamos?
						</Typography>
						<br />
						<TextField variant='standard' id='username' label='Nombre de usuario' required />
						<br />

						<Typography variant="body1">
							Cual es tu contrasena?
						</Typography>
						<br />

						<TextField type="password" variant='standard' id='password' label='Password' required autoComplete="off" />
						<br />
						<br />

						<Button sx={{
							margin:  '10%'
						}} variant="contained" onClick={() => {
								attemptLogin(
									document.getElementById('username'),
									document.getElementById('password')) 
							}}>
							Login
						</Button>
					</FormControl>
				</form>
			</Stack>
		</>
	)
}

export default Login;