const futureDates = [];
const dates = () => {
    const months = [
        "Jan", "Feb", "Mar", "Apr", "May", "June",
        "July", "Aug", "Sep", "Oct", "Nov", "Dec"
    ];


    for (let i = 1; i <= 5; i++) {
        const futureDate = new Date();
        futureDate.setDate(futureDate.getDate() + i); 

        const day = futureDate.getUTCDate(); 
        const month = months[futureDate.getUTCMonth()]; 
        const year = futureDate.getUTCFullYear(); 

        const tempDay = document.getElementById(`tomorrow-${i === 6 ? '' : i}`);
        if (tempDay) {
            tempDay.innerHTML = `${month} ${day}, ${year}`;
        }

        
        futureDates.push(futureDate);
    }

    return futureDates; 
}

document.addEventListener("DOMContentLoaded", () => {
    dates();
   
});



const getClosestForecast = (forecastList, targetDate) => {
    const targetTime = targetDate.getTime();
    return forecastList.reduce((closest, current) => {
        const forecastTime = new Date(current.dt_txt).getTime();
        return Math.abs(forecastTime - targetTime) < Math.abs(new Date(closest.dt_txt).getTime() - targetTime)
            ? current
            : closest;
    });
};

const updateForecast = (cityName, forecastData, futureDates) => {
    const forecastList = forecastData.list;

    futureDates.forEach((date, index) => {
        const closestForecast = getClosestForecast(forecastList, date);
        

        const temperature = closestForecast && closestForecast.main && closestForecast.main.temp
            ? (closestForecast.main.temp - 273.15).toFixed(2)
            : null;

        const dayElement = document.getElementById(`day-${index + 1}`);
        const tempImgElement = dayElement.querySelector(`#tempImg${index + 1}`);
        
        if (closestForecast) {
            tempImgElement.innerHTML = `<img src="http://openweathermap.org/img/wn/${closestForecast.weather[0].icon}.png" />`;
            const temp = dayElement.querySelector(`#temp-${index + 1}`);
            if (temp) {
                temp.innerHTML = temperature ? `${temperature}°C` : ''; 
            }
            const content = document.querySelector(`#content-${index + 1}`);
            if (content) {
                content.innerHTML = closestForecast.weather[0].description;
                }
            else{
                content.innerHtML = "";
            }
            const humidity = document.getElementById(`humidity-${index + 1}`);
            humidity.innerHTML =  closestForecast.main && closestForecast.main.humidity ? `Humidity: ${closestForecast.main.humidity}` : '';

        }
    });
};



const getForecast = async () => {
    try {
        const cityName = document.getElementById('searchBarInput').value;
        const forecastDataFetch = await fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&appid=3bc9c63d2feebb388ed88bd0bd4496af`, {
            headers: {
                Accept: 'application/json'
            }
        });

        if (!forecastDataFetch.ok) {
            throw new Error(`HTTP error! status: ${forecastDataFetch.status}`);
        }

        const forecastData = await forecastDataFetch.json();
        console.log(forecastData);
        if (futureDates.length > 0) {
            updateForecast(cityName, forecastData, futureDates);
        } else {
            console.log("No future dates available");
        }
    } catch (error) {
        console.log(error);
    }
}