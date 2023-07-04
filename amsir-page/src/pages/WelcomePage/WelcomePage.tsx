import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

function WelcomePage() {
	return (
		<div>
			<br />
			<br />
			<br />
			<div>
		  		{/*What is amsir? Join us now!*/}
				<Typography variant='h1'>
					What is AMSIR?
				</Typography>
				<Typography sx={{
					'padding-left': '10%',
					'padding-right': '10%'
				}} variant='body1' align='justify'>
					Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed luctus sed purus sed suscipit. Suspendisse sit amet lacinia risus, non ullamcorper justo. Proin ut lacus erat. Nam porta mattis auctor. Mauris et elit urna. Integer rhoncus metus ac congue suscipit. Cras ornare urna a sodales hendrerit. Ut commodo tellus metus, ultrices efficitur nunc elementum a. Nulla eros enim, elementum nec massa et, porta dignissim dolor. Praesent finibus nisi vitae tortor vestibulum aliquam. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Morbi ut odio sit amet metus sollicitudin condimentum non non magna. Pellentesque ut lacus dolor. Vivamus fermentum, urna vitae tempor pharetra, lectus magna ultricies arcu, ac aliquet erat purus eu mi.
				</Typography>
				<br/>
				<Typography variant='button' color='primary'>
					<Button variant='outlined'>
						Join us now!!
					</Button>
				</Typography>
			</div>
			<div>
		 		{/*Main courses*/}
				<Typography variant='h1'>
					Main courses
				</Typography>
			</div>
			<div>
		  		{/*Allies*/}
				<Typography variant='h1'>
					Allies
				</Typography>
			</div>
		</div>
	);
}

export default WelcomePage;