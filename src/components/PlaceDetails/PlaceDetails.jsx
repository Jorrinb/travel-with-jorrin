import React from 'react'
import useStyles from './styles';
import { Typography, Box, Button, Card, CardMedia, CardContent, CardActions, Chip } from '@material-ui/core';
import  LocationOn from '@material-ui/icons/LocationOnOutlined';
import { Rating } from '@material-ui/lab';
const PlaceDetails = ({place, selected, refProp}) => {
    const classes = useStyles();

    if(selected) refProp?.current?.scrollIntoView({behavior:"smooth", block: "start"})

    return (
        <div>
            <Card elevation={6}>
            <CardMedia
        style={{ height: 350 }}
        image={place.photo ? place.photo.images.large.url : 'https://www.foodserviceandhospitality.com/wp-content/uploads/2016/09/Restaurant-Placeholder-001.jpg'}
        title={place.name}
      />
                <CardContent>
                <Rating name="read-only" value={Number(place.rating)} readOnly />
          <Typography component="legend">{place.num_reviews} review{place.num_reviews > 1 && 's'}</Typography>
                    <Typography gutterBottom variant="h5">{place.name}</Typography>
                    <Box display="flex" justifyContent="space-between">
                        <Typography variant="subtitle1" gutterBottom >{place.price_level}</Typography>
                        <Typography variant="subtitle1" gutterBottom >{place.ranking}</Typography>
                    </Box>
                    {place?.cuisine?.map(({ name }) => (
          <Chip key={name} size="small" label={name} className={classes.chip} />
                 ))}
                    {place?.address &&(
                        <Typography gutterBottom variant="body2" color="textSecondary" className={classes.subtitle}>
                            <LocationOn/> {place.address}
                        </Typography>
                    )}
                    {place?.phone &&(
                        <Typography gutterBottom variant="body2" color="textSecondary" className={classes.subtitle}>
                             {place.phone}
                        </Typography>
                    )}
                    <CardActions>
                        <Button size="small" color="primary" onClick={()=>window.open(place.website,'__blank')}>
                        Website
                        </Button>
                    </CardActions>
                </CardContent>
                </Card>   
        </div>
    )
}

export default PlaceDetails
