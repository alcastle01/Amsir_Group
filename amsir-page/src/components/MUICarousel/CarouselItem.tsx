import { ReactElement, JSXElementConstructor, ReactFragment, ReactPortal } from 'react';
import { Box, Button } from '@mui/material';
import './CarouselItem.css';

function CarouselItem(props: { itemObject: { img: any; name: string | number | boolean | ReactElement<any, string | JSXElementConstructor<any>> | ReactFragment | ReactPortal | null | undefined; description: string | number | boolean | ReactElement<any, string | JSXElementConstructor<any>> | ReactFragment | ReactPortal | null | undefined; }; }) {
    return (
        <Box>
            <h2>{props.itemObject.name}</h2>
            <p>{props.itemObject.description}</p>

	    <br />

	    <img className='sliderImg' src={props.itemObject.img} alt='sliderImg' />

	    <br />

            <Button className="CheckButton">
                Check it out!
            </Button>
	    <br />
        </Box>
    )
}

export default CarouselItem;