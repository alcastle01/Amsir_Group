import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import { userLogin } from "../../clients/ApiHelper";
import { encrypt } from "../../util/CriptoHelper";
import { setCookie } from "../../util/CookieHelper";
import LoginInfo from "../../clients/LoginInfo";
import TokenData from "../../clients/TokenData";
import { Box, FormControl, Modal, Paper, Typography } from "@mui/material";
import React from "react";

function Login() {
	const [openSuccess, setOpenSuccess] = React.useState(false);
	const handleCloseSuccess = () => setOpenSuccess(false);
	const [openError, setOpenError] = React.useState(false);
	const handleCloseError = () => setOpenError(false);

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
				if ('ok' in result) {
					setOpenError(true);
				}
				if ('accessToken' in result && result?.accessToken.length > 0) {
					const tokenData: TokenData = {
						tokenType: result.tokenType,
						accessToken: result.accessToken,
					}
					setCookie("token", tokenData.accessToken, true);
					setCookie("tokenSet", "true");
					setOpenSuccess(true);
				}
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

			{openSuccess &&
				<Modal
				open={openSuccess}
				onClose={handleCloseSuccess}
				aria-labelledby="modal-modal-title"
				aria-describedby="modal-modal-description">
					<Box sx={{
						paddingLeft: '10%',
						paddingRight: '10%',
					}} alignSelf="center" alignContent="center" alignItems="center">
						<Typography id="modal-modal-title" color="#A084DC" variant="h5" component="h2">
						Login exitoso!
						</Typography>
						<Paper elevation={5}>
							<Typography id="modal-modal-description" sx={{ paddingLeft: '2.5%', mt: 2 }}>
							Gracias por visitarnos de vuelta!
							</Typography>
						</Paper>
						<br />
						<Button variant="contained" href="/" >
							OK!
						</Button>
					</Box>
				</Modal> 
			}

			{openError &&
				<Modal
				open={openError}
				onClose={handleCloseError}
				aria-labelledby="modal-modal-title"
				aria-describedby="modal-modal-description">
					<Box sx={{
						paddingLeft: '10%',
						paddingRight: '10%',
					}} alignSelf="center" alignContent="center" alignItems="center">
						<Typography id="modal-modal-title" color="#A084DC" variant="h5" component="h2">
						Login errado!
						</Typography>
						<Paper elevation={5}>
							<Typography id="modal-modal-description" sx={{ paddingLeft: '2.5%', mt: 2 }}>
							Usuario o contraseña errados, por favor validar informacion.
							</Typography>
						</Paper>
						<br />
						<Button variant="contained" onClick={handleCloseError}>
							OK!
						</Button>
					</Box>
				</Modal> 
			}
			
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

			<Box>
				<Typography variant="caption">
					Buscando el 
					<Button variant='text' href='/signup'>
						registro
					</Button>
					?
				</Typography>
			</Box>
		</>
	)
}

export default Login;
