import { Button } from '@mui/material';
import { getUsers } from '../../clients/ApiHelper';

function UsersPage() {
	return(
		<>
			<Button sx={{
				marginTop: "15px"
			}} onClick={() => {alert(getUsers())}}>
				click!
			</Button>
		</>
	);
};

export default UsersPage;