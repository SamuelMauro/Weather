const key = 'ctOHKKsnqcFHsPlEQ2nU7d2ZwUVeJoMz';

//Obtenção das informações do Tempo
const getWeather = async (id) => {
  const base = 'http://dataservice.accuweather.com/currentconditions/v1/';
  const query = `${id}?apikey=${key}&language=pt-br`;
  const response = await fetch(base + query);
  const data = await response.json();
   
  return data[0];
};

// Obtenção das informações da cidade
const getCity = async (city) =>{    

   const base = 'http://dataservice.accuweather.com/locations/v1/cities/search';
   const query = `?apikey=${key}&q=${city}`;
   const response = await fetch ( base + query);
   const data = await response.json();

   return data[0];
};
