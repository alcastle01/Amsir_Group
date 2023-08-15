import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Divider from '@mui/material/Divider';
import Stack from '@mui/material/Stack';

import InstagramIcon from '@mui/icons-material/Instagram';

import TeacherCard from './../../components/TeacherCard/TeacherCard';
import Carousel from 'react-material-ui-carousel';

import logoIEEE from './../../static/logo-ieee-white.svg';
import logoSurvivalMed from './../../static/survival-med-logo.png';
import logoSumaeUnam from './../../static/SUMAe-UNAM.jpg';
import sample1 from './../../static/sample-1.jpg';
import sample2 from './../../static/sample-2.jpg';
import sample3 from './../../static/sample-3.jpg';

import ItemObject from '../../components/MUICarousel/ItemObject';
import CarouselItem from '../../components/MUICarousel/CarouselItem';

class Ally {
	name: string;
	logoImg: any;
	url: string;

	constructor(name:string, logoImg: any, url: string) {
		this.name = name;
		this.logoImg = logoImg;
		this.url = url;
	}
}

const IEEE = new Ally("IEEE", logoIEEE, "https://edu.ieee.org/co-unemb/rama-estudiantil-ieee/");
const SUR_MED = new Ally("Survival Med", logoSurvivalMed, "https://survivalmedonline.org/courses/wfa-16-hr/?gad=1&gclid=Cj0KCQjw756lBhDMARIsAEI0AgludooHx2qbYK1v0nX4kOd91ZJVYl-p4Zs39SbPG-ButSR63z13de4aAtiYEALw_wcB");
const SUMAE_UNAM = new Ally("SUMAe-UNAM", logoSumaeUnam, "https://sites.google.com/view/sumae-unam/p%C3%A1gina-principal");
const PYASMA = new Ally("PYASMA", null, "https://www.instagram.com/pyasmassociation/");
const CYDONIA = new Ally("CYDONIA", null, "https://www.instagram.com/fundcydonia/");

const allies = [IEEE, SUR_MED, SUMAE_UNAM, PYASMA, CYDONIA];

const teachers = ["pablo", "juan", "katherine"];

const carouselItems: ItemObject[] = [
	{
		name: 'First Item',
		description: "I'm the first item!",
		img: sample1,
	},
	{
		name: 'Second Item',
		description: "I'm the 2nd item!",
		img: sample2,
	},
	{
		name: 'Third Item',
		description: "I'm the 3rd item!",
		img: sample3,
	},
];

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
					marginLeft: '10%',
					marginRight: '10%',
					paddingLeft: '1.5em',
					paddingRight: '1.5em',
					border: '5px solid #A084DC',
					borderRadius: '10%',
					':hover': {
						'background-color': '#fce6f9'
					}
				}} variant='body1' align='justify'>
					Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed luctus sed purus sed suscipit. Suspendisse sit amet lacinia risus, non ullamcorper justo. Proin ut lacus erat. Nam porta mattis auctor. Mauris et elit urna. Integer rhoncus metus ac congue suscipit. Cras ornare urna a sodales hendrerit. Ut commodo tellus metus, ultrices efficitur nunc elementum a. Nulla eros enim, elementum nec massa et, porta dignissim dolor. Praesent finibus nisi vitae tortor vestibulum aliquam. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Morbi ut odio sit amet metus sollicitudin condimentum non non magna. Pellentesque ut lacus dolor. Vivamus fermentum, urna vitae tempor pharetra, lectus magna ultricies arcu, ac aliquet erat purus eu mi.
				</Typography>
				<br/>
				<Button sx={{
					backgroundColor: '#A084DC',
					margin: '0.5em',
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
				<Carousel height={480} fullHeightHover={false} navButtonsAlwaysVisible={true} autoPlay={false} >
					{
						carouselItems.map((item, i) => <CarouselItem key={i} itemObject={item} />)
					}
				</Carousel>
			</div>
			<Divider orientation='horizontal' variant='middle' />
			<div>
				{/*Teachers/Instructors*/}
				<Grid spacing={2} container direction='row' justifySelf='center' justifyContent='center' alignItems='center'>
					{teachers.map((teacher) => {
						return <>
							<Grid item>
								<TeacherCard teacher={teacher} />
							</Grid>
						</>
					})}
				</Grid>
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
					{allies.map((ally) => {
						return <>
							<Grid item xs={2}>
								<Typography sx={{
									backgroundColor: '#A084DC',
									padding: '0.5em',
									maxWidth: '50%',
									borderRadius: '10%',
									':hover': {
										'background-color': '#645CBB',
										'color': 'white',
								      	}
								}} >
									<a href={ally.url}>
										{ally.logoImg ?
											<img src={ally.logoImg} alt={ally.name} />
											: <Stack alignItems='center' spacing={2}>
												<InstagramIcon />
												<p>{ally.name}</p>
											</Stack>}
									</a>
								</Typography>
							</Grid>
						</>
					})}
				</Grid>
			</div>
			<Divider orientation='horizontal' variant='fullWidth' />
		</div>
	);
}

export default WelcomePage;