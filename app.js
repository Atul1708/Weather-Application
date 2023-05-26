const wrapper = document.querySelector(".wrapper");
const input = document.querySelector("input");
const wIcons = document.querySelector(".weather-info img");
const searchBtn = document.querySelector(".search");
const infoTxt = document.querySelector(".weather-container .info-txt");
const backArrow = document.querySelector(".weather-container i");
let api;


// storing the value of apikey and url of weather api
const fetchAPi = (city) => {
  const apiKey = "b18bdaf5b1abb97ac271d680a7461b59";
  api = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;
  fetchData();
};


// fetching the data here from the api
const fetchData = () => {
  infoTxt.innerText = "Getting weather details....";
  infoTxt.classList.add("pending");
  fetch(api)
    .then((response) => response.json())
    .then((result) => weatherDetails(result));
};

// passing the data we obtain as a result of our api
const weatherDetails = (data) => {
  infoTxt.classList.replace("pending", "error");
  if (data.cod == "404") {
    infoTxt.innerText = `${input.value} is not a valid city name`;
  } else {
    infoTxt.innerText = "";
    // passing the value from the api and storing into the variables
    const cityName = data.name;
    const temp = data.main.temp;
    const { description, id } = data.weather[0];
    const country = data.sys.country;
    const minTemp = data.main.temp_min;
    const maxTemp = data.main.temp_max;

    // checking id condition for changing images
    if (id == 800) {
      wIcons.src = "sunny.png";
    } else if (id >= 200 && id <= 232) {
      wIcons.src = "storm.png";
    } else if (id >= 600 && id <= 622) {
      wIcons.src = "cold.png";
    } else if (id >= 701 && id <= 781) {
      wIcons.src = "haze.png";
    } else if (id >= 801 && id <= 804) {
      wIcons.src = "cloud.png";
    } else if (id >= 300 && id <= 321) {
      wIcons.src = "rain.png";
    }


    // setting the values to show on the page
    wrapper.querySelector(".name").innerText = `${cityName}, ${country}`;
    wrapper.querySelector(".weatherStatusDescription").innerText = description;
    wrapper.querySelector(".temp").innerText = Math.round(temp) + "°C";
    wrapper.querySelector(".minTemp").innerText = minTemp + "°";
    wrapper.querySelector(".maxTemp").innerText =maxTemp + "°";

    infoTxt.classList.remove("pending", "error");
    wrapper.classList.add("active");
    console.log(data);
  }
};


// getting the value of input field
searchBtn.addEventListener("click", () => {
  inputVal = input.value;
  if (input.value == "") {
    setTimeout(() => {
      infoTxt.classList.add("error");
    }, 3000);
    infoTxt.innerHTML = "Please enter name first";
  }
  fetchAPi(inputVal);
});


// back arrow for 
backArrow.addEventListener("click", () => {
  wrapper.classList.remove("active");
  input.value = "";
  infoTxt.innerText = "";
});
