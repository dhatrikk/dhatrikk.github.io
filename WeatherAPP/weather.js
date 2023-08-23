const container = document.querySelector('.container');
const search = document.querySelector('.search-box button');
const weatherBox = document.querySelector('.weather-box');
const weatherDetails = document.querySelector('.weather-details');
const error404 = document.querySelector('.not-found');

search.addEventListener('click', () => {

    const APIurl = 'https://api.openweathermap.org/data/2.5/weather?units=metric&appid=';
    const APIKey = '77126df6578f72416c6c44eb6b924bfa';
    const city = document.querySelector('.search-box input').value;

    if (city === '')
        return;

    fetch(APIurl + APIKey + "&q=" +city)
        .then(response => response.json())
        .then(json => {

            if (json.cod === '404') {
                container.style.height = '400px';
                weatherBox.style.display = 'none';
                weatherDetails.style.display = 'none';
                error404.style.display = 'block';
                error404.classList.add('fadeIn');
                return;
            }

            error404.style.display = 'none';
            error404.classList.remove('fadeIn');

            const image = document.querySelector('.weather-box img');
            const temperature = document.querySelector('.weather-box .temperature');
            const description = document.querySelector('.weather-box .description');
            const humidity = document.querySelector('.weather-details .humidity span');
            const wind = document.querySelector('.weather-details .wind span');


console.log(json.weather[0].main);

            switch (json.weather[0].main) {
                case 'Clear':
                    image.src = 'https://cdn-icons-png.flaticon.com/512/3222/3222807.png';
                    break;

                case 'Rain':
                    image.src = 'https://icon-library.com/images/rainy-weather-icon/rainy-weather-icon-0.jpg';
                    break;

                case 'Snow':
                    image.src = 'https://static.vecteezy.com/system/resources/previews/007/488/951/original/light-snow-color-icon-winter-snowy-weather-cloud-and-snowflake-weather-forecast-isolated-illustration-vector.jpg';
                    break;

                case 'Cloud':
                    image.src = 'https://cdn-icons-png.flaticon.com/512/2042/2042088.png';
                    break;

                case 'Mist':
                    image.src = 'https://i.pinimg.com/564x/1e/c4/e8/1ec4e83f5d60afc434ac5dc8a9efcdf4.jpg';
                    break;

                case 'Haze':
                    image.src = 'https://cdn-icons-png.flaticon.com/512/1779/1779862.png';
            }

            const changetmp= document.querySelector(".weather-box button");
            changetmp.onclick= function changetemprature(){
                changetmp.innerHTML="change to celcius";
                temperature.innerHTML = parseInt(json.main.temp)*9/5 + 32 + "°F";
                return;
            }

            const changespd= document.querySelector(".wind button");
            changespd.onclick= function changespeed(){
                changespd.innerHTML="change to miles/hr";
                wind.innerHTML = parseInt(json.wind.speed)*0.62 + "mph";
                return;
            }


            temperature.innerHTML = parseInt(json.main.temp) + "°C";
            description.innerHTML = json.weather[0].description;
            humidity.innerHTML = json.main.humidity + "%";
            wind.innerHTML = parseInt(json.wind.speed) + "Kmph";

            weatherBox.style.display = '';
            weatherDetails.style.display = '';
            weatherBox.classList.add('fadeIn');
            weatherDetails.classList.add('fadeIn');
            container.style.height = '590px';

        });


});