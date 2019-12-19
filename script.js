window.addEventListener('load', () => {
    const temperatureDescription = document.querySelector('.temperature-description');
    const temperatureDegree = document.querySelector('.temperature-degree');
    const locationTimezone = document.querySelector('.location-timezone');
    const temperatureSection = document.querySelector('.degree-section');
    const temperatureSpan = document.querySelector('.temperature span');

    navigator.geolocation.getCurrentPosition(successCallback, errorCallback);

    function successCallback(location) {
        const long = location.coords.longitude;
        const lat = location.coords.latitude;
        const proxy = 'https://cors-anywhere.herokuapp.com/';
        const api = `${proxy}https://api.darksky.net/forecast/3c425dcd14afa78f7c0b5864dd181271/${lat},${long}`;
        fetch(api)
            .then(response => {
                return response.json();
            })
            .then(data => {
                console.log(data);
                const {
                    temperature,
                    summary,
                    icon
                } = data.currently;
                //set DOM Elements from API
                const celsius = Math.floor((temperature - 32) * (5 / 9));
                const timezone = data.timezone.slice(7,13);
                temperatureDegree.textContent = celsius
                temperatureDescription.textContent = summary;
                locationTimezone.textContent = timezone;
                
                //Set Icon
                setIcons(icon, document.querySelector('.icon'));
                //Change Temperature to Celsius/Farenheit
                temperatureSection.addEventListener('click', () => {
                    if (temperatureSpan.textContent === "F") {
                        temperatureSpan.textContent = "°C";
                        temperatureDegree.textContent= celsius;
                    } else {
                        temperatureSpan.textContent = "F";
                        temperatureDegree.textContent=temperature;
                    }
                })
            })
    }

    function errorCallback(error) {
        if (error.code == error.PERMISSION_DENIED) {
            alert("Please enable location services.");
        }
    }

    function setIcons(icon, iconID) {
        const skycons = new Skycons({
            color: "white"
        });
        const currentIcon = icon.replace(/-/g, "_").toUpperCase();
        skycons.play();
        return skycons.set(iconID, Skycons[currentIcon]);
    }
});
