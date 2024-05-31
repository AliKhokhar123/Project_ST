import { items } from "../../../data/data.js";
import { getCurrentArtist } from "../../globals.js";
import { formatDate, generateDateLabels } from "../../utils/dates.js";

const myHeader = document.getElementById("header");

export function initArtistHomePage() {
  myHeader.textContent = "This is header for Artist Home Page";

  const currentArtist = getCurrentArtist();
  console.log("initArtistHomePage", currentArtist);
  $("#currentArtist").html(currentArtist);

  const currentArtistName = document.querySelectorAll(".currentArtist");

  currentArtistName.forEach((item) => {
    item.innerHTML = currentArtist;
  });

  // Filter items for the current artist
  const artistItems = items.filter((item) => item.artist === currentArtist);

  // Calculate total items sold by the specific artist
  const totalItemsSold = artistItems.length;
  console.log("total item" + totalItemsSold);

  // Calculate total income from items sold by the specific artist
  const totalIncomeAsInteger = artistItems.reduce(
    (sum, item) => sum + item.priceSold,
    0
  );
  const totalIncome = Math.floor(totalIncomeAsInteger);

  console.log(totalIncome);

  // Display total items and total income if the elements are present
  const totalItemsElement = document.getElementById("totalItems");
  const totalIncomeElement = document.getElementById("totalIncome");

  if (totalItemsElement && totalIncomeElement) {
    totalItemsElement.textContent = `${totalItemsSold}/35`;
    totalIncomeElement.textContent = `$${totalIncome}`;
  }

  // Filter live auction items for the current artist
  const liveAuctionItems = artistItems.filter((item) => item.isAuctioning);

  console.log("Live Auction Items:", liveAuctionItems);

  // Dynamically update the live auction information
  const liveAuctionInfoContainer = document.getElementById("liveAuctionInfo");

  if (liveAuctionItems.length > 0) {
    const liveAuctionInfoHTML = `
      <h5>Live Auctioning Item</h5>
      <h1>$${liveAuctionItems[0].price}</h1>
      <p>current bid</p>
    `;

    liveAuctionInfoContainer.innerHTML = liveAuctionInfoHTML;
  } else {
    // If no live auction items, display 0
    liveAuctionInfoContainer.innerHTML = `
      <h5>Live Auctioning Item</h5>
      <h1>$0</h1>
      <p>current bid</p>
    `;
  }

  const ctx = document.getElementById("myChart");

  const chart7Days = document.getElementById("chart7Days");
  const chart14Days = document.getElementById("chart14Days");
  const chart30Days = document.getElementById("chart30Days");
  chart14Days.classList.add("red-button");

  let myChart = new Chart(ctx, {
    type: "bar",
    data: {
      labels: [],
      datasets: [
        {
          label: "Amount Sold",
          data: [],
          backgroundColor: ["#A16A5E"],
          borderWidth: 1,
          maxBarThickness: 10,
        },
      ],
    },
    options: {
      responsive: true,
      indexAxis: "y",
      scales: {
        y: {
          beginAtZero: true,
          grid: {
            display: false,
          },
        },
        x: {
          grid: {
            display: false,
          },
        },
      },
    },
  });

  function returnDays(daysAgo = 7) {
    const labels = [];
    const currentDate = new Date();
    for (let i = daysAgo; i > 0; i--) {
      const date = new Date(currentDate);
      date.setDate(currentDate.getDate() - i);
      labels.push(formatDate(date));
    }
    return labels;
  }

  function reloadChart(period = 7) {
    const labels = returnDays(period);

    let chartData = labels.map((label) => {
      let sum = 0;
      liveAuctionItems.forEach((item) => {
        if (label === formatDate(item.dateSold)) {
          sum += item.priceSold;
        }
      });
      return sum;
    });

    // Create a new dataset for the bar chart
    const newDataset = {
      label: "Amount Sold",
      data: chartData,
      backgroundColor: chartData.map(() => "#A16A5E"), // Set bar colors
      borderWidth: 1,
      maxBarThickness: 10,
    };

    // Clear existing datasets
    myChart.data.datasets = [];

    // Add the new dataset to the chart
    myChart.data.datasets.push(newDataset);

    // Update labels
    myChart.data.labels = labels; // Update y-axis data

    // Update the chart
    myChart.update();
  }

  $("#chart7Days").click(function () {
    chart7Days.classList.add("red-button");
    chart14Days.classList.remove("red-button");
    chart30Days.classList.remove("red-button");
    reloadChart(7);
  });

  $("#chart14Days").click(function () {
    chart14Days.classList.add("red-button");
    chart30Days.classList.remove("red-button");
    chart7Days.classList.remove("red-button");
    reloadChart(14);
  });

  $("#chart30Days").click(function () {
    chart30Days.classList.add("red-button");
    chart14Days.classList.remove("red-button");
    chart7Days.classList.remove("red-button");
    reloadChart(30);
  });

  reloadChart(14); // Call reloadChart after myChart is initialized
}
