import axios from "axios";


const options={
    params: {
    bl_latitude: '11.847676',
    tr_latitude: '12.838442',
    bl_longitude: '109.095887',
    tr_longitude: '109.149359',
  },
  headers: {
    'x-rapidapi-host': 'travel-advisor.p.rapidapi.com',
    'x-rapidapi-key': '6e7b09d721msh03993745b877be7p15dc43jsn6e1b8d737b61'
  }
}

export const getPlacesData = async(type,bounds)=>{
    try{
      console.log(type)
        const {data: {data}} = await axios.get(`https://travel-advisor.p.rapidapi.com/${type}/list-in-boundary`,{ params: {
            bl_latitude: bounds.sw.lat,
            tr_latitude: bounds.ne.lat,
            bl_longitude: bounds.sw.lng,
            tr_longitude: bounds.ne.lng,
          },
          headers: {
            'x-rapidapi-host': 'travel-advisor.p.rapidapi.com',
            'x-rapidapi-key': '6e7b09d721msh03993745b877be7p15dc43jsn6e1b8d737b61'
          }  
        });
        
        return data;
    }
    catch(error){
        console.log(error)

    }
}