function generateApiUrl() {
  return `http://api.coindesk.com/v1/bpi/historical/close.json`;
}

function getData() {
  axios
    .get(generateApiUrl())
    .then((response) => {
      console.log("The response from API: ", response);
      printTheChart(response.data);
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
          label: "Stock Chart",
          backgroundColor: "rgb(255, 99, 132)",
          borderColor: "rgb(255, 99, 132)",
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
    }
  });
}

// function loadIBM() {
//   symbolName = "IBM";
//   getData();
// }

getData();
