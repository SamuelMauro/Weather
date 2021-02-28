const card = document.querySelector('.card');
const details = document.querySelector('.details');
const city = document.querySelector('#inputCity');
const options = document.querySelector('#options');
const enviar = document.querySelector('#enviar');
const weatherForm = document.querySelector('#dt');

const searchCity = async searchText => {
    //Leitura de dados Json
    const res = await fetch('../json/Cidades.json');
    const cities = await res.json();

    //Obter informações do texto do input          
    let results = cities.filter(state => {
        const regex = new RegExp(`^${searchText}`, 'gi');
        return state.Nome.match(regex);
    });

    if (searchText.length === 0) {
        matches = [];
        options.innerHTML = '';
    }
    //estruturação da interface das opções
    outputHtml(results);
};


//Mostrar resultados
const outputHtml = matches => {     //Matches é o vetor

    if (matches.length > 0) {
        options.innerHTML = "";

        const html = matches.map(
            match =>
                `<option>${match.Nome} (${match.Estado})</option>`
        )
        options.innerHTML = `<datalist id="dt"><select>${html}</select></datalist>`;
    }
}

city.addEventListener('input', () => searchCity(city.value));
enviar.addEventListener('click', () => buscar(city.value));

//Atualização das cidades
const updateCity = async (city) => {
    const cityState = await getCity(city);
    const weather = await getWeather(cityState.Key);
    return {
        cityState: cityState,
        weather: weather
    };
};

//Atualização da interface
const updateUI = (data) => {
    //Desestruturação
    const { cityState, weather } = data;
    const weatherPage = document.querySelector('.weather');
    const time = document.querySelector('#img-time');
    const icon = document.querySelector('#icon-weather');
    console.log(weather)
    details.innerHTML = `
        <div id="card-results"> 
          <h5 class="my-3">${cityState.EnglishName}</h5>
          <div class="my-3">${weather.WeatherText}</div>
          <div class="display-3 my-3">
            <span>${weather.Temperature.Metric.Value}</span>
            <span>&deg;C</span>     
          </div>    
        </div>
 `;
    let timeSrc = null;
    if (weather.IsDayTime) {
        timeSrc = './img/day.svg';
    } else {
        timeSrc = './img/night.svg';
    }
    time.setAttribute('src', timeSrc);
    // Atualização do ícone
    const iconSrc = `img/icons/${weather.WeatherIcon}.svg`;
    icon.setAttribute('src', iconSrc);
    //Apresentação do card do tempo
    if (weatherPage.classList.contains('hidden')) {
        weatherPage.classList.remove('hidden')
    }
    //Escdonder os resultados
    options.classList.add('hidden');
}

const buscar = async (city) => {
    res = city.split("(");
    let cid = res[0];
    updateCity(cid)
        .then(data => updateUI(data))
        .catch(err => alert('não foi possível localizar a cidade'));
};