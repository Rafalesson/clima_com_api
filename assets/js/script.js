// Variáveis e seleção de elementos
const chaveApi = "8211a975f4cf8fc343f11cfc15ffdbab";
const apiCountryURL = "https://countryflagsapi.com/svg/";

const cidade = document.querySelector("#city-input");
const botaoPesquisar = document.querySelector("#search-button");

const cidadeAtual = document.querySelector("#city");
const paisAtual = document.querySelector("#country");
const temperaturaAtual = document.querySelector(".temperatura span");
const descricaoAtual = document.querySelector(".descricao__text");
const iconeAtual = document.querySelector(".descricao__icon");
const umidadeAtual = document.querySelector(".detalhe__umidade span");
const ventoAtual = document.querySelector(".detalhe__vento span");
// Fim das variáveis e seleção de elementos

// Funções
const getWeather = async (cidade) => {
    const apiURL = `https://api.openweathermap.org/data/2.5/weather?q=${cidade}&units=metric&appid=${chaveApi}&lang=pt_br`;

    const response = await fetch(apiURL);
    const data = await response.json();

    return data;
};

const showWeather = async (cidade) => {
    const data = await getWeather(cidade);

    cidadeAtual.textContent = data.name;
    paisAtual.textContent = data.sys.country;
    temperaturaAtual.textContent = `${parseInt(data.main.temp)}°C`;
    descricaoAtual.textContent = data.weather[0].description;
    umidadeAtual.textContent = `${parseInt(data.main.humidity)}%`;
    ventoAtual.textContent = `${parseInt(data.wind.speed)}km/h`;

    iconeAtual.setAttribute("src", `https://openweathermap.org/img/wn/${data.weather[0].icon}.png`);

    paisAtual.setAttribute("src", apiCountryURL + data.sys.country);

};
// Fim das funções

// Eventos
botaoPesquisar.addEventListener("click", (event) => {
    event.preventDefault();
    const cidadePesquisada = cidade.value;
    showWeather(cidadePesquisada);
});
// Fim dos eventos



