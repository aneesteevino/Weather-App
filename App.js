const month = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
const Tday = document.getElementById('Tday');
const nameElement = document.getElementById('name');
const tempElement = document.getElementById('temp');
const key = '9266eb711803a1bf968be2b51370f537';

function current_date() {
    let date = new Date();
    let monthIndex = date.getMonth();
    let today_date = date.getDate();
    if (today_date < 10) {
        today_date = '0' + today_date;
    }
    Tday.innerHTML = `Today ${today_date} ${month[monthIndex]}`;
}

current_date();

const getWeatherData = async () => {
    let lat = '25.39242';
    let lon = '68.37366';

    try {
        let response = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${key}`);
        if (!response.ok) {
            throw new Error('Network response was not ok ' + response.statusText);
        }
        let data = await response.json();
        
        // Convert temperature from Kelvin to Celsius
        let tempCelsius = (data.main.temp - 273.15).toFixed(1);

        // const cardElement = document.createElement('div');
        cardElement.className = 'card';
        cardElement.innerHTML = `
            <h1 id="temp">${tempCelsius}°C</h1>
            <p>${data.weather[0].description}</p>
        `;

        document.body.appendChild(cardElement);

        console.log(data);
    } catch (error) {
        console.error('There has been a problem with your fetch operation:', error);
    }
}

getWeatherData();
