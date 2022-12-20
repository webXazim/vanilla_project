// let params = new URLSearchParams({
//     access_key: 'a733b15261912dc49df816a176d89e47',
//     query: 'bangladesh',
//     units: 'f'
// });

// fetch(`http://api.weatherstack.com/current?${params}`)
//     .then(res => res.json()).then(console.log);




function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition);
    } else {
        console.log('location not found')
    }
}
const access_key = '5826b1b9372df3253f7fccde7c8f4412'

function showPosition(position) {
    fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${access_key}`)
        .then(res => res.json()).then(out => {

            const convert = (kelvin) => {
                return {
                    celcius: kelvin - 273,
                    fahrenheit: ((kelvin - 273) * 9 / 5) + 32,
                }
            }
            const temp = `Temparature: ${convert(out.main.temp).celcius} Celcius or ${convert(out.main.temp).fahrenheit} Fahrenheit`
            const feels = `Feels like ${convert(out.main.feels_like).celcius} Celcius or ${convert(out.main.feels_like).fahrenheit} Fahrenheit`
            const country = `Country: ${out.name}`
            const windSpeed = `Wind Speed: ${out.wind.speed}`
            console.log(`${temp}\n${feels}\n${country}\n${windSpeed}`)
            console.log(out)

            // Changing time format
            const format = (unix_timestamp) => {
                const date = new Date(unix_timestamp * 1000);
                return {
                    date,
                    time: date.toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', second: 'numeric', hour12: true })
                }
            }



            // getting date
            const date = new Date()
            const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
            const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

            document.querySelector('.d-t').innerHTML = `${days[date.getDay()]}, ${months[date.getMonth()]}, ${date.getDate()}, ${date.getFullYear()}`




            // Working with DOM
            document.querySelector('.temp').innerHTML = `${Math.floor(convert(out.main.temp).celcius)}&#176;`
            document.querySelector('.w-condition').innerHTML = `${out.weather[0].description}`
            document.querySelector('.location').innerHTML = `${out.name}`
            document.querySelector('.h-l-temp').innerHTML = `${Math.floor(convert(out.main.temp_max).celcius)}&#176;/${Math.floor(convert(out.main.temp_min).celcius)}&#176; Feels like ${Math.floor(convert(out.main.feels_like).celcius)}&#176;`

            document.querySelector('.w-speed').innerHTML = `${Math.floor((out.wind.speed) * 3.6)} K/H`
            document.querySelector('.w-deg').innerHTML = `${out.wind.deg}&#176;`
            document.querySelector('.w-gust').innerHTML = `${Math.floor((out.wind.gust) * 3.6)} K/H`

            document.querySelector('.sunset-time').innerHTML = `${format(out.sys.sunset).time}`
            document.querySelector('.sunrise-time').innerHTML = `${format(out.sys.sunrise).time}`



            // icon changing based on weather id
            const dayIcons = ['01d.png', '02d.png', '03d.png', '04d.png', '09d.png', '10d.png', '11d.png', '13d.png', '50d.png']

            const nightIcons = ['01n.png', '02n.png', '03n.png', '04n.png', '09n.png', '10n.png', '11n.png', '13n.png', '50n.png']


            // do something based on day/night
            const time = new Date();
            const currentTime = time.toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', second: 'numeric', hour12: false })

            const sunsetTime = format(out.sys.sunset).date.toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', second: 'numeric', hour12: false })

            const sunriseTime = format(out.sys.sunrise).date.toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', second: 'numeric', hour12: false })

            if (currentTime >= sunsetTime || currentTime <= sunriseTime) {
                console.log('now night you should not go out')
            } else {
                console.log('now day time you can go out')
            }


            const icon = () => {
                switch (out.weather[0].id) {
                    case 800:
                        document.querySelector('.icon').innerHTML = `<img src="http://openweathermap.org/img/wn/01d@2x.png" alt="weather icon"/>`
                        break;

                }
            }


            icon()






        })

}

getLocation()


