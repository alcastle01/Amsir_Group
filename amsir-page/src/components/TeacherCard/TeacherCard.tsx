import { Box, Card, CardHeader, Avatar, CardContent, Typography } from "@mui/material";
import { ReactElement, JSXElementConstructor, ReactFragment, ReactPortal } from "react";


function TeacherCard(props: { teacher: string | number | boolean | ReactElement<any, string | JSXElementConstructor<any>> | ReactFragment | ReactPortal | null | undefined; }) {
	return <>
		<Box height='240px' width='240px' >
			<Card sx={{ margin: '10px' }}>
				<CardHeader 
					avatar={<Avatar sx={{ bgcolor: 'violet' }}> U </Avatar>} 
					title={props.teacher} 
					subheader='current course' 
				/>
				<CardContent>
					<Typography variant='body2'>
						Hello from our teacher!
					</Typography>
				</CardContent>
			</Card>
		</Box>
	</>
}

export default TeacherCard;