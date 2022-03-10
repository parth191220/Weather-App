
const iconElement = document.querySelector('.weather-icon');
const tempElement = document.querySelector('.temprature-value');
const descElement = document.querySelector('.temprature-description');
const locationElement = document.querySelector('.location p');
const notificationElement = document.querySelector('.notification');


//App data
const weather = {};
weather.temperature = {
    unit : 'celsius'
};

const KELVIN = 273;
const key = 'defa770df1e6efa9c2a0316b6a6adcbc';

if('geolocation' in navigator)
{
    navigator.geolocation.getCurrentPosition(setPosition,showError);
}
else{
    var block = 'block';
    notificationElement.style.display = block;
    notificationElement.innerHTML = `<p> Browser dosen't support </p>`;
}
// let latitude;
// let longitude;
//Set user position
function setPosition(position)
{
    let longitude = position.coords.longitude;
    let latitude = position.coords.latitude;

    getWeather(latitude,longitude);
}

//Error Handling
function showError(error)
{
    notificationElement.style.display = 'block';
    notificationElement.innerHTML = `<p> ${error.message} </p>`
}

//GET WEATHER API 
function getWeather(latitude,longitude)
{
    let api = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${key}`
    fetch(api).then(function(response)
    {
        let data = response.json();
        return data;
    })
    .then(function(data)
    {
        weather.temperature.value = Math.floor(data.main.temp - KELVIN);
        weather.description = data.weather[0].description;
        weather.iconId = data.weather[0].icon;
        weather.city =data.name;
        weather.country = data.sys.country;
    })
    .then(function()
    {
        displayWeather();
    });

}

// Display weather to UI
function displayWeather()
{
    iconElement.innerHTML= `<img class="resize" src = "sunny.png"/>`;
    tempElement.innerHTML =`<p>${weather.temperature.value}°<span>C</span></p>`;
    descElement.innerHTML = `<p>${weather.description}</p>`;
    locationElement.innerHTML= `<p>${weather.city},${weather.country}</p>`;
}