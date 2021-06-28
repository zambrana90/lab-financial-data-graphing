let from = "2021-05-28";
let to = "2021-06-27";
let currency = "USD";

function generateApiUrl() {
  return `https://api.coindesk.com/v1/bpi/historical/close.json?start=${from}&end=${to}&currency=${currency}`;
}

function getData() {
  axios
    .get(generateApiUrl())
    .then((response) => {
      console.log("The response from API: ", response);
      printTheChart(response.data);
      const values = Object.values(response.data.bpi);
      const max = document.querySelector(".Max");
      max.textContent = Math.max(...values).toFixed(2);
      const min = document.querySelector(".Min");
      min.textContent = Math.min(...values).toFixed(2);
      return values;
    })
    .catch((err) => console.log("Error while getting the data: ", err));
}

function printTheChart(stockData) {
  const dailyData = stockData["bpi"];

  const stockDates = Object.keys(dailyData);
  const stockPrices = stockDates.map((date) => dailyData[date]);

  const ctx = document.getElementById("my-chart").getContext("2d");
  const chart = new Chart(ctx, {
    type: "line",
    data: {
      labels: stockDates,
      datasets: [
        {
          label: "Bitcoin Price Index",
          backgroundColor: "grey",
          borderColor: "grey",
          data: stockPrices,
        },
      ],
    },
    options: {
      plugins: {
        legend: {
          display: true,
          labels: {
            color: "rgb(255, 99, 132)",
          },
        },
      },
    },
  });
}

function loadData() {
  from = document.querySelector(".From input").value;
  console.log(from);
  to = document.querySelector(".To input").value;
  console.log(to);

  getData();
}

function currencyData() {
  currency = document.querySelector(".Currency").value;
  console.log(currency);

  getData();
}

getData();

document.getElementsByName("From")[0].addEventListener("change", loadData);
document.getElementsByName("To")[0].addEventListener("change", loadData);

document
  .getElementsByName("currency")[0]
  .addEventListener("change", currencyData);
