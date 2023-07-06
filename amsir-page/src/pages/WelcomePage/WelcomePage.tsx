import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Divider from '@mui/material/Divider';

function WelcomePage() {
	return (
		<div>
			<br />
			<br />
			<br />
			<div>
		  		{/*What is amsir? Join us now!*/}
				<Typography variant='h2'>
					What is AMSIR?
				</Typography>
				<Typography sx={{
					'margin-left': '10%',
					'margin-right': '10%',
					'padding-left': '1.5em',
					'padding-right': '1.5em',
					'border': '5px solid #A084DC',
					'border-radius': '10%',
					':hover': {
						'background-color': '#fce6f9'
					}
				}} variant='body1' align='justify'>
					Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed luctus sed purus sed suscipit. Suspendisse sit amet lacinia risus, non ullamcorper justo. Proin ut lacus erat. Nam porta mattis auctor. Mauris et elit urna. Integer rhoncus metus ac congue suscipit. Cras ornare urna a sodales hendrerit. Ut commodo tellus metus, ultrices efficitur nunc elementum a. Nulla eros enim, elementum nec massa et, porta dignissim dolor. Praesent finibus nisi vitae tortor vestibulum aliquam. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Morbi ut odio sit amet metus sollicitudin condimentum non non magna. Pellentesque ut lacus dolor. Vivamus fermentum, urna vitae tempor pharetra, lectus magna ultricies arcu, ac aliquet erat purus eu mi.
				</Typography>
				<br/>
				<Button sx={{
					'background-color': '#A084DC',
					'margin': '0.5em',
					':hover': {
      					'background-color': '#645CBB',
      					'color': 'white',
    				},
				}} variant='contained' size='large' >
						Join us now!!
				</Button>
				<br/>
			</div>
			<Divider orientation='horizontal' variant='middle' />
			<div>
		 		{/*Main courses*/}
				<Typography variant='h2'>
					Main courses
				</Typography>
				<ul>
					<li>
						<p>Curso 1</p>
					</li>
					<li>
						<p>Curso 2</p>
					</li>
					<li>
						<p>Curso 3</p>
					</li>
					<li>
						<p>Curso 4</p>
					</li>
					<li>
						<p>Curso 5</p>
					</li>
				</ul>
			</div>
			<Divider orientation='horizontal' variant='middle' />
			<div>
		  		{/*Allies*/}
				<Typography variant='h3'>
					Our Allies
				</Typography>
				<br/>
				<Grid container spacing={2} direction='row' justifyContent='center' sx={{
					'margin': '10px'
				}} >
					<Grid item xs={2}>
						<Typography sx={{
							'border': '3px solid #A084DC'
						}} >
							Pepito1
						</Typography>
					</Grid>
					<Grid item xs={2}>
						<Typography sx={{
							'border': '3px solid #A084DC'
						}} >
							Pepito1
						</Typography>
					</Grid>
					<Grid item xs={2}>
						<Typography sx={{
							'border': '3px solid #A084DC'
						}} >
							Pepito1
						</Typography>
					</Grid>
					<Grid item xs={2}>
						<Typography sx={{
							'border': '3px solid #A084DC'
						}} >
							Pepito1
						</Typography>
					</Grid>
				</Grid>
			</div>
			<Divider orientation='horizontal' variant='fullWidth' />
		</div>
	);
}

export default WelcomePage;