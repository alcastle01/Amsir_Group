import { Card, CardContent, Typography, Rating } from "@mui/material";

function UserReviewCard(props: any) {
	return <Card key={props.key} variant='outlined'>
		<CardContent>
			<Typography variant='h2' sx={{fontSize: 14}} gutterBottom>
				{props.item.username? props.item.username: "anon"}
			</Typography>
			<Rating value={props.item.rating} precision={0.5} readOnly />
			<Typography variant='body2'>
				{props.item.note? props.item.note: undefined}
			</Typography>
		</CardContent>
	</Card>
}

export default UserReviewCard;