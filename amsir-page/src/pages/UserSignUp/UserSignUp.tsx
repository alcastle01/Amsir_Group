import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import User from "../../clients/User.d";
import { createUser } from "../../clients/ApiHelper";
import { encrypt } from "../../util/CriptoHelper";
import InputLabel from "@mui/material/InputLabel";

function UserSignUp() {
	function attemptCreateUser(username: HTMLElement | String | any, email: HTMLElement | String | any, password: HTMLElement | String | any) {
		const user: User = {
			username:  username.value,
			email: email.value,
			password: String(encrypt(password.value))
		};

		// todo: validate inputs...
		createUser(user);
	}

	return(
		<>
			<Typography variant="h1">
				Bienvenidos!
			</Typography>

			<Typography variant="body1">
				Gracias por creer en AMSIR!
			</Typography>
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
		</>
	);
}

export default UserSignUp;