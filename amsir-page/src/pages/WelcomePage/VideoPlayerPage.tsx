import VideoPlayer from './../../components/VideoPlayer/VideoPlayer';
import VideoInterface from '../../components/VideoPlayer/VideoMetadata';
import { Box, Divider, Grid, Paper, Stack, Typography } from '@mui/material';

var videoUrl = 'https://amsirgrouppruebas150523.s3.amazonaws.com/performance_soundtrack_lightmotion_spanish_xxx_16x9_15s_v2.mp4';

var video: VideoInterface = {
	src: videoUrl,
	name: 'Demo Video',
	poster: undefined,
	autoplay: false,
}

var playlist = ['reco1', 'reco2'];

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
		<Box alignContent='left' justifyContent='left'>
			<Grid container spacing={2}>
				<Grid spacing={2} item xs={9}>
					<div>
						<VideoPlayer video={video} />
					</div>
				</Grid>
				<Grid spacing={2} item xs={2}>
					<Stack spacing={2} direction='column'>
						{playlist.map(item => {
							return <>
								<Paper elevation={2}>
									{item}
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