// Variáveis e seleção de elementos
const chaveApi = "8211a975f4cf8fc343f11cfc15ffdbab";
const apiCountryURL = "https://countryflagsapi.com/svg/";
const apiUnsplash = "https://source.unsplash.com/1600x900/?";

const cidade = document.querySelector("#city-input");
const botaoPesquisar = document.querySelector("#search-button");

const cidadeAtual = document.querySelector("#city");
const paisAtual = document.querySelector("#country");
const temperaturaAtual = document.querySelector(".temperatura span");
const descricaoAtual = document.querySelector(".descricao__text");
const iconeAtual = document.querySelector(".descricao__icon");
const umidadeAtual = document.querySelector(".detalhe__umidade span");
const ventoAtual = document.querySelector(".detalhe__vento span");

const weatherContainer = document.querySelector("#container__wether");

const errorMessageContainer = document.querySelector("#error-message");
const loader = document.querySelector("#loader");

const suggestionContainer = document.querySelector("#suggestions");
const suggestionButtons = document.querySelectorAll("#suggestions button");
// Fim das variáveis e seleção de elementos

// Loader
const toggleLoader = () => {
  loader.classList.toggle("hide");
};
// Fim do loader

// Tratamento de erro
const showErrorMessage = () => {
  const errorMessage = document.querySelector("#error-message p");
  errorMessage.innerHTML = `<p>Você digitou <span class='errorReturn'>${cidade.value}</span>. Essa cidade não existe. Tente novamente.</p>`;
  errorMessageContainer.classList.remove("hide");
};

const hideInformation = () => {
  errorMessageContainer.classList.add("hide");
  weatherContainer.classList.add("hide");
};
// Fim do tratamento de erro

// Funções
const getWeather = async (cidade) => {
  toggleLoader();

  const apiURL = `https://api.openweathermap.org/data/2.5/weather?q=${cidade}&units=metric&appid=${chaveApi}&lang=pt_br`;

  const response = await fetch(apiURL);
  const data = await response.json();

  toggleLoader();

  return data;
};

const showWeather = async (cidade) => {
  hideInformation();

  const data = await getWeather(cidade);

  if (data.cod === "404") {
    showErrorMessage();
    return;
  }

  cidadeAtual.textContent = data.name;
  paisAtual.textContent = data.sys.country;
  temperaturaAtual.textContent = `${parseInt(data.main.temp)}°C`;
  descricaoAtual.textContent = data.weather[0].description;
  umidadeAtual.textContent = `${parseInt(data.main.humidity)}%`;
  ventoAtual.textContent = `${parseInt(data.wind.speed)}km/h`;

  iconeAtual.setAttribute(
    "src",
    `https://openweathermap.org/img/wn/${data.weather[0].icon}.png`
  );

    paisAtual.setAttribute("src", apiCountryURL + data.sys.country);
    
  // Change bg image
  document.body.style.backgroundImage = `url("${apiUnsplash + cidade}")`;

  weatherContainer.classList.remove("hide");
};
// Fim das funções

// Eventos
botaoPesquisar.addEventListener("click", (event) => {
  event.preventDefault();
  const cidadePesquisada = cidade.value;
  showWeather(cidadePesquisada);
});

cidade.addEventListener("keyup", (event) => {
  if (event.key === "Enter") {
    event.preventDefault();
    const cidadePesquisada = cidade.value;
    showWeather(cidadePesquisada);
  }
});
// Fim dos eventos