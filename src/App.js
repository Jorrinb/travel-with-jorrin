import React, {useEffect, useState} from 'react';
import Header from './components/Header/Header';
import Map from './components/Map/Map';
import List from './components/List/List';
import{ CssBaseline, Grid} from '@material-ui/core';
import {getPlacesData} from './api'

function App() {
 const [type, setType]= useState('restaurants');
 const [rating, setRating]= useState('');
 const [places, setPlaces]= useState([]);
 const [filteredplaces, setFilteredPlaces]= useState([]);
 const [coordinates, setCoordinates]= useState({});
 const [bounds, setBounds]= useState(null);
 const [childClicked, setChildClicked] = useState(null);
 const [isLoading, setIsLoading]= useState(false);


 useEffect(() => {
   
  navigator.geolocation.getCurrentPosition(({ coords: { latitude, longitude} }) => {
    setCoordinates({ lat:latitude, lng: longitude });

  });
},[]);

  useEffect(()=>{
    const filteredPlaces= places.filter((place)=>place.rating>rating);
    setFilteredPlaces(filteredPlaces);
    console.log(filteredplaces)
  },[rating])

   useEffect(()=>{
    if (bounds){
   //console.log(coordinates,bounds)
   setIsLoading(true);
   console.log(type);
   getPlacesData(type,bounds)
   .then((data) => {
    setPlaces(data.filter((place) => place.name && place.num_reviews > 0));
    setFilteredPlaces([]);
    setRating('');
    setIsLoading(false);
  });
}
}, [bounds, type]);
  return (
    <>
    <CssBaseline/>
   <Header setCoordinates={setCoordinates}/>
   <Grid container spacing={3} style={{width:'100%'}}>
     <Grid item xs={12} md={4}>
      <List 
      places={filteredplaces.length ? filteredplaces : places} 
      childClicked={childClicked} 
      isLoading={isLoading}
      type={type}
      setType={setType}
      rating={rating}
      setRating={setRating} />
     </Grid>
     <Grid item xs={12} md={8}>
      <Map setCoordinates={setCoordinates} 
          setBounds={setBounds} 
          coordinates={coordinates} 
        places={filteredplaces.length ? filteredplaces : places} 
        setChildClick={setChildClicked} />
     </Grid>
   </Grid>
    </>
  );
}

export default App;
