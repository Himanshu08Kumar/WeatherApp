document.querySelector('#btn').addEventListener('click',fetchWeather);

async function fetchWeather(){
    const city = document.querySelector('#cityName').value;
    const apiKey =`4bd8fc8670ca9ed5654a77b09ff0fb66`;
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`
    
    try{
        const response =await fetch(url);
        if(!response.ok){
            throw new Error('Response Network Was not ok'+response.statusText);
        }
        const data = await response.json();
        let c = `${(data.main.temp - 272.15).toFixed(0)}°C`
        document.querySelector('#temprature').textContent = c;
        const iconCode = data.weather[0].icon;
        const icon =`http://openweathermap.org/img/wn/${iconCode}@2x.png`
        const iconEle = document.querySelector('#icc');
        iconEle.src = icon;
        iconEle.width = 150;
        iconEle.heigth = 150; 
        const rise = document.querySelector('#rise')
        const sunriseTimeStamp = data.sys.sunrise;
        rise.textContent =`Sunrise : ${convertTimeStamp(sunriseTimeStamp)}` ;
        const set = document.querySelector('#set');
        const sunsetTimeStamp = data.sys.sunset;
        set.textContent = `Sunset : ${convertTimeStamp(sunsetTimeStamp)}`
        document.querySelector('#weatherDesc').textContent = data.weather[0].main;
        document.querySelector('#name').textContent = data.name;
       
        

    }catch(e){

     }
     document.querySelector('#cityName').value="";
    }
    function convertTimeStamp(timestamp){
        const date = new Date(timestamp * 1000);
    const hours = date.getHours();
    const minutes = "0" + date.getMinutes();
    const seconds = "0" + date.getSeconds();
    return `${hours}:${minutes.substr(-2)}:${seconds.substr(-2)}`;
    }