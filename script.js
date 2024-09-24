// Variabless

const form = document.getElementById("weatherForm");
const myCity = document.getElementById("cityName");
const day = document.getElementById("day");
const todaysDate = document.getElementById("todayDate");
const address = document.getElementById("address");
const temperature = document.getElementById("temperature");
const weatherType = document.getElementById("weather-type");
const pressures = document.getElementById("pressure");
const humidity = document.getElementById("humidity");
const windSpeed = document.getElementById("wind-speed");

let date = new Date();

var todayDate = "";

// find date from api 
function findDate(apiDt) {
  const dt = new Date(apiDt * 1000); 
  const formattedDate = dt.toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  const dayOfWeek = dt.toLocaleDateString("en-GB", { weekday: "long" });

  return {
    dayOfWeek: dayOfWeek,
    formattedDate: formattedDate,
  }
}


form.addEventListener("submit", function (e) {
  e.preventDefault();

  let city = cityName.value;
  console.log("city : ", city);
  const apiID = `3522491eab16a74c112320c5c754f812`;
  // API URL
  let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiID}`;
  try{

    fetch(url)
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      if(data.cod === '404'){
        alert("City not found")
        return;
      }
      console.log("data : ", data);
      const dates = data.dt;
      todayDate =   findDate(dates)
      console.log("Today's Date : ", todayDate.formattedDate);
      // date and day change 
      todaysDate.innerText = todayDate.formattedDate;
      day.innerText = todayDate.dayOfWeek
      
      // location
      address.innerText = data.name
      
      // icons 
      
      // temperature 
      temperature.innerText = Math.floor(data.main.temp);
      
      // weather type
      weatherType.innerText =  data.weather[0].main
      
      
      // percipitation % 
      pressures.innerText = data.main.pressure
      
      // Humidity 
      humidity.innerText = `${data.main.humidity} %`
      
      // wind speed
      windSpeed.innerText = `${data.wind.speed} km/h`      

    });
    
    }catch(err){
        alert("api fetch error");
        return;
    }
});
