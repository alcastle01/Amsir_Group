import VideoPlayer from './../../components/VideoPlayer/VideoPlayer';
import VideoInterface from '../../components/VideoPlayer/VideoMetadata';
import { Container, Box, Divider, Grid, Paper, Stack, Typography, Button } from '@mui/material';

var videoUrl = 'https://amsirgrouppruebas150523.s3.amazonaws.com/performance_soundtrack_lightmotion_spanish_xxx_16x9_15s_v2.mp4';

var video: VideoInterface = {
	src: videoUrl,
	name: 'Demo Video',
	poster: undefined,
	autoplay: false,
}

var playlist = ['video 1', 'video 2', 'video 3', 'video 4', 'video 5', 'video 6'];

function VideoPlayerPage() {
	return <>
		<br />
		<Box alignContent='center' justifyContent='center'>
			<Typography variant='h2' color='#A084DC'>
				{video.name}
			</Typography>
		</Box>
		<Divider variant='fullWidth' />
		<br />
		<Box alignContent='center' justifyContent='center'>
			<Grid container spacing={2}>
				<Grid spacing={2} item xs={9}>
					<Container disableGutters={true}>
						<VideoPlayer video={video} />
					</Container>
				</Grid>
				<Grid spacing={2} item xs={2}>
					<Box alignContent='center' alignItems='center'>
						<Grid container>
							<Grid item xs={5} >
								<Button variant='contained'>
									Anterior
								</Button>
							</Grid>
							<hr />
							<Grid item xs={5}>
								<Button variant='contained'>
									Siguiente
								</Button>
							</Grid>
						</Grid>
					</Box>
					<br />
					<Typography variant='h5' color='#A084DC'>
						Lista de reproduccion
					</Typography>
					<br />
					<Stack spacing={2} direction='column'>
						{playlist.map(item => {
							return <>
								<Paper elevation={4}>
									<Button>
										{item}
									</Button>
								</Paper>
							</>
						})}
					</Stack>
				</Grid>
			</Grid>
		</Box>
	</>
}

export default VideoPlayerPage;