// liveauction.js
import { items } from "../../../data/data.js";
import { setCurrentBid } from "../../globals.js";

console.log(items[0].isAuctioning);
const myHeader = document.getElementById("header");

export function initLiveAuction() {
  console.log("Live Auction init");
  myHeader.textContent = "This is the header for Live Auction";

  // Filter items with isAuctioning: true
  const auctionItems = items.filter((item) => item.isAuctioning);

  const liveAuctionContainer = document.getElementById("liveAuction");
  liveAuctionContainer.innerHTML = ""; // Clear previous content

  auctionItems.forEach((item, i) => {
    liveAuctionContainer.innerHTML += `
      <div class="container-fluid p-0 m-0 card-bg">
          <div class="pic">
              <img src="${item.image}" alt="" class="card_img">
          </div>
          <div class="title-box d-flex justify-content-between">
              <div class="title">
                  <p class="title-text">${item.artist}</p>
              </div>
              <div class="price">
                  <button class="price-btn">$${item.price}</button>
              </div>
          </div>
          <div class="description">
              <p class="item-title">${item.title}</p>
              <p>${item.description}</p>
          </div>

          <div class="latest_bid">
              <p id="latest_bid_p">Latest Bid : &nbsp;</p>
              <p id="bid${i + 1}" class="bid">No Bid Placed</p>
          </div>

          <div id="bidding">
              <input type="text" id="biddingInput${
                i + 1
              }" class="biddingInput"/>
              <button id="bidBtn${i + 1}" class="bid_btn">Bid</button>
          </div>
          <br>
          <ul id="biddingHistory${i + 1}" class="bidding_history">
              <!-- Bidding history will be dynamically updated here -->
          </ul>
      </div>
    `;

    const bidBtn = document.getElementById(`bidBtn${i + 1}`);
    const bidInput = document.getElementById(`biddingInput${i + 1}`);
    const biddingHistory = document.getElementById(`biddingHistory${i + 1}`);
    const latestBid = document.getElementById(`bid${i + 1}`);

    bidBtn.addEventListener("click", function () {
      // reset Timer to 2:00
      setCurrentBid(bidInput.value);
      latestBid.innerHTML = bidInput.value;

      const myBidFormData = new FormData();
      myBidFormData.set("amount", bidInput.value);

      biddingHistory.innerHTML += `<li class="mine">${bidInput.value}</li>`;

      fetch("https://projects.brainster.tech/bidding/api", {
        method: "POST",
        body: myBidFormData,
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data);

          const isBidding = data.isBidding;

          if (isBidding) {
            biddingHistory.innerHTML += `<li class="bidder" style="margin-left: 200px">${data.bidAmount}</li>`;
            bidInput.value = data.bidAmount + 50;
          } else {
            // wait until the timer is done, and complete auction
            // reset variables
            // update auctioning item
            // priceSold: highestBid, dateSold: new Date(), isAuctioning: false
          }
        });
    });
  });
}
