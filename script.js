
const input = document.querySelector('.search')
const btn = document.querySelector('.btn-location')
const icon = document.querySelector('.weather-icon')
const weather = document.querySelector('.weather')
const degrees = document.querySelector('.degrees')
const city = document.querySelector('.city')

const key = '28a46ed081fa271f6e1f3b7415825368'

// http://api.openweathermap.org/geo/1.0/direct?q=London&limit=5&appid={API key}

btn.addEventListener('click', getLocation)
window.addEventListener('keypress', (e) => {
    if (e.key === "Enter" && input.value !== "") {
        axios.get(`http://api.openweathermap.org/geo/1.0/direct?q=${input.value}&limit=5&appid=${key}`)
        .then(res => {
            const lat = res.data[0].lat
            const lon = res.data[0].lon

            const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${key}`

            getData(url)
        })
        .catch(error => alert(error))
    }
})

function getLocation() {
    weather.textContent = "Chargement ..."
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition, showError)
    } else {
        alert("La geolocalisation n'est pas supportée")
    }
}

function showPosition(position) {
    const lat = position.coords.latitude
    const lon = position.coords.longitude

    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${key}`

    getData(url)
}

function showError(error) {
    switch(error.code) {
      case error.PERMISSION_DENIED:
        alert("User denied the request for Geolocation.")
        break;
      case error.POSITION_UNAVAILABLE:
        alert("Location information is unavailable.")
        break;
      case error.TIMEOUT:
        alert("The request to get user location timed out.")
        break;
      case error.UNKNOWN_ERROR:
        alert("An unknown error occurred.")
        break;
    }
}

async function getData(url) {
    try {
        const response = await axios.get(url)
        
        city.textContent = response.data.name + ", " + response.data.sys.country
        degrees.textContent = Math.floor(response.data.main.temp) + " °C"
        weather.textContent = response.data.weather[0].main + ", " + response.data.weather[0].description
        const iconCode = response.data.weather[0].icon
        icon.src = `https://openweathermap.org/img/wn/${iconCode}@2x.png`

    } catch (e) {
        console.log(e)
    }
}

