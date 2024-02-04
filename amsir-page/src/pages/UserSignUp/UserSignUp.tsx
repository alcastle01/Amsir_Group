import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import User from "../../clients/User.d";
import { createUser } from "../../clients/ApiHelper";
import { encrypt } from "../../util/CriptoHelper";
import React from "react";
import { Modal } from "@mui/base";
import { Box } from "@mui/system";
import { FormControl, Grid, Paper } from "@mui/material";
import './UserSignUp.css';

function UserSignUp() {
	const [open, setOpen] = React.useState(false);
	const handleClose = () => setOpen(false);

	function attemptCreateUser(username: HTMLElement | String | any, email: HTMLElement | String | any, password: HTMLElement | String | any) {
		const user: User = {
			username:  username.value,
			email: email.value,
			password: String(encrypt(password.value))
		};

		// todo: validate inputs...
		createUser(user).then((responseJson) => {
			if (responseJson != null) {
				console.log(typeof(responseJson));
				console.log(responseJson);
				if (responseJson == null) {
					console.log("print error");
				} else {
					setOpen(true);
				}
				// todo: add feedback
			}
		});
	}

	return(
		<>
			<Typography variant="h2" color="#A084DC">
					Bienvenid@!
			</Typography>

			<Typography variant="h5">
				Gracias por creer en AMSIR!
			</Typography>
			{open &&
				<Modal
				open={open}
				onClose={handleClose}
				aria-labelledby="modal-modal-title"
				aria-describedby="modal-modal-description">
					<Box sx={{
						paddingLeft: '10%',
						paddingRight: '10%',
					}} alignSelf="center" alignContent="center" alignItems="center">
						<Typography id="modal-modal-title" color="#A084DC" variant="h5" component="h2">
						Usuario creado!
						</Typography>
						<Paper elevation={5}>
							<Typography id="modal-modal-description" sx={{ paddingLeft: '2.5%', mt: 2 }}>
							Usuario creado, por favor hacer login.
							</Typography>
						</Paper>
						<br />
						<Button variant="contained" href="/login" >
							OK!
						</Button>
					</Box>
				</Modal> 
			}

			{!open && 
				<Box alignContent='center' justifyContent='center'>
					<Grid container sx={{
						marginTop: "3%",
						alignContent: "center"
					}} spacing={2} direction='column'>
						<form>
							<Grid item xs={12}>
								<FormControl sx={{
									border: "1px solid",
									padding: "15px",
								}}>
									<Typography variant="body1">
										Como te llamamos?
									</Typography>
									<br />
									<br />
									<TextField variant='standard' id='username' label='Nombre de usuario' required />
									<br />
									<br />
									<Typography variant="body1">
										Cual es tu email?
									</Typography>
									<br />
									<br />
									<TextField variant='standard' id='email' label='Email' required />
									<br />
									<br />
									<Typography variant="body1">
										Asigna tu nueva contrasena:
									</Typography>
									<br />
									<TextField type="password" variant='standard' id='password' label='Password' required autoComplete="off" />
									<br />
									<br />

									<Button sx={{
										margin:  '10%'
									}} variant="contained" onClick={() => {
											attemptCreateUser(
												document.getElementById('username'), 
												document.getElementById('email'), 
												document.getElementById('password')) 
										}}>
										Crear usuario!
									</Button>
								</FormControl>
							</Grid>
						</form>
					</Grid>
				</Box>
			}
		</>
	);
}

export default UserSignUp;