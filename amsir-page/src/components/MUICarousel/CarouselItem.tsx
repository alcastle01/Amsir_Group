import { ReactElement, JSXElementConstructor, ReactFragment, ReactPortal } from 'react';
import { Box, Button, Grid, Paper, Typography } from '@mui/material';
import './CarouselItem.css';

function CarouselItem(props: { itemObject: { img: any; name: string | number | boolean | ReactElement<any, string | JSXElementConstructor<any>> | ReactFragment | ReactPortal | null | undefined; description: string | number | boolean | ReactElement<any, string | JSXElementConstructor<any>> | ReactFragment | ReactPortal | null | undefined; }; }) {
    return (
        <Box>
            <Grid
            container
            direction="row"
            justifyContent="center"
            alignItems="center"
            >
                <Grid item xs={6}>
                    <img className='sliderImg' src={props.itemObject.img} alt='sliderImg' />

                    <br />

                        <Button className="CheckButton">
                            ¡Más info aquí!
                        </Button>
                </Grid>
                <Grid item xs={6}>
                    <Paper elevation={0} square>
                        <Typography variant='h5'>{props.itemObject.name}</Typography>
                        <Typography variant='body2'>{props.itemObject.description}</Typography>
                    </Paper>
                </Grid>
            </Grid>
        </Box>
    )
}

export default CarouselItem;