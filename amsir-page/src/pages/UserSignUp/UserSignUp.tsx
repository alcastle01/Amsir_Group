import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import User from "../../clients/User.d";
import { createUser } from "../../clients/ApiHelper";
import { encrypt } from "../../util/CriptoHelper";
import InputLabel from "@mui/material/InputLabel";
import React from "react";
import { Modal } from "@mui/base";
import { Box } from "@mui/system";
import { Paper } from "@mui/material";

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
			<Typography variant="h1">
				Bienvenidos!
			</Typography>

			<Typography variant="body1">
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
				<Stack spacing={2} direction='column'>
					<form>
						<InputLabel>
							Como te llamamos?
						</InputLabel>
						<br />
						<TextField id='username' required />
						<br />
						<InputLabel>
							Cual es tu email?
						</InputLabel>
						<br />

						<TextField id='email' required />
						<br />

						<InputLabel>
							Dame tu contrasena?
						</InputLabel>
						<br />

						<TextField id='password' required autoComplete="off" security="" />
						<br />
						<br />

						<Button variant="contained" onClick={() => {
								attemptCreateUser(
									document.getElementById('username'), 
									document.getElementById('email'), 
									document.getElementById('password')) 
							}}>
							Crear usuario!
						</Button>
					</form>
				</Stack>
			}
		</>
	);
}

export default UserSignUp;