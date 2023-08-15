import { Box, Card, CardHeader, Avatar, CardContent, Typography } from "@mui/material";
import Teacher from "./Teacher";

function TeacherCard(props: { teacher: Teacher }) {
	return <>
		<Box height='240px' width='240px' >
			<Card sx={{ margin: '10px' }}>
				<CardHeader 
					avatar={<Avatar sx={{ bgcolor: 'violet' }}> U </Avatar>} 
					title={props.teacher.name} 
					subheader={props.teacher.course} 
				/>
				<CardContent>
					<Typography variant='body2'>
						{props.teacher.bio}
					</Typography>
				</CardContent>
			</Card>
		</Box>
	</>
}

export default TeacherCard;