const api_key = '3bc9c63d2feebb388ed88bd0bd4496af';
const date = document.getElementById('date');
const city=document.getElementById('city');
const temp =document.getElementById('temp');
const tempImg = document.getElementById('tempImg');
const description = document.getElementById('description');
const humidity = document.getElementById('humidity');
const tempMax = document.getElementById('tempMax');
const tempMin = document.getElementById('tempMin');

const months = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
];

let dateObj = new Date();
let month = months[dateObj.getUTCMonth()];
let day = dateObj.getUTCDate();
let year = dateObj.getUTCFullYear();

date.innerHTML = `${month} ${day} ${year}`;

const app = document.getElementById('app');
const getWeather = async () =>{
    try{
        const cityName = document.getElementById('searchBarInput').value;
        const weatherDataFetch = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=3bc9c63d2feebb388ed88bd0bd4496af
`, {
            headers: {
                Accept: 'application/json'
            }
        });
        const weatherData = await weatherDataFetch.json();
        console.log(weatherData);
        city.innerHTML = `${weatherData.name}`;
        description.innerHTML = `${weatherData.weather[0].main}`;
        tempImg.innerHTML = `<img src="http://openweathermap.org/img/wn/${weatherData.weather[0].icon}.png" />`
        const tempinCelcius = (weatherData.main.temp - 273.15).toFixed(2);
        temp.innerHTML = `${tempinCelcius}°C`
        const tempMaxinCelcius = (weatherData.main.temp_max - 273.15).toFixed(2); 
        tempMax.innerHTML = `${tempMaxinCelcius}°C`;
        const tempMininCelcius = (weatherData.main.temp_min - 273.15).toFixed(2); 
        tempMin.innerHTML =  `${tempMininCelcius}°C`;
        humidity.innerHTML = `Humidity: ${weatherData.main.humidity}`;
        
    }
    catch(error){
        console.log(error);
    }
}
const input  = document.getElementById('searchBarInput');
const forecast =  document.getElementById('forecast');

input.addEventListener('keypress', (event) =>{
    if(event.key === 'Enter'){
        getWeather();
        getForecast();
        input. value = "";
        forecast.style.display = 'flex';
    }
    else{
        forecast.style.display = 'none';
    }
});


