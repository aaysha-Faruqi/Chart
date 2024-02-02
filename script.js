// script.js

const real = document.querySelector("#myChart");
const labels = [];
const data = {
  labels: labels,
  datasets: [
    {
      label: "Cryptocurrency Price",
      data: [],
      fill: false,
      borderColor: "rgb(75, 190, 110)",
      tension: 0.1,
    },
  ],
};

const config = {
  type: "line",
  data: data,
};
let chart = new Chart(real, config);

async function fetchData() {
  try {
    const symbol = 'LTCBTC';
    const response = await $.ajax({
      method: 'GET',
      url: 'https://api.api-ninjas.com/v1/cryptoprice?symbol=' + symbol,
      headers: { 'X-Api-Key': 'un46fd5jbDkUeRL942kPBgzkYnHOBCd3CQbyoCtn' },
      contentType: 'application/json'
    });
    const timestamp = new Date(response.timestamp * 1000);
    const price = parseFloat(response.price);
    updateChart(timestamp, price);
  } catch (error) {
    console.error('Error fetching data:', error);
  }
}

function updateChart(timestamp, price) {
  const label = timestamp.toLocaleTimeString();
  chart.data.labels.push(label);
  chart.data.datasets[0].data.push(price);
  chart.update();
}

fetchData();
setInterval(fetchData, 5000); // Fetch data every 5 seconds
