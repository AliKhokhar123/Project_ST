import { items } from "../../../data/data.js";
import { getCurrentArtist, setEditItemId } from "../../globals.js";
const myHeader = document.getElementById("header");

function handleSendToAuctionClick(item) {
  console.log(`Item ${item.title} sent to auction`);
}

function handleToggle(item) {
  const index = items.findIndex((dataItem) => dataItem.id === item.id);
  if (index !== -1) {
    items[index].isPublished = !items[index].isPublished;
  }
  renderData();
}

function handleRemoveClick(item) {
  // Show a confirmation dialog
  const isConfirmed = window.confirm(
    "Are you sure you want to remove this item?"
  );

  // Check if the user confirmed
  if (isConfirmed) {
    console.log(`Item ${item.title} removed`);
    const index = data.findIndex((dataItem) => dataItem.id === item.id);

    if (index !== -1) {
      data.splice(index, 1);
    }
    renderData();
  }
}

function handleEditClick(item) {
  window.location.href = `#artistAddNewItemPage?editItemId=${item.id}`;
}

function renderData() {
  const contentContainer = document.getElementById("content-container");
  const currentArtist = getCurrentArtist();

  const filteredData = items.filter((item) => item.artist === currentArtist);
  const currentArtistName = document.querySelectorAll(".currentArtist");

  currentArtistName.forEach((item) => {
    item.innerHTML = currentArtist;
  });

  console.log(filteredData[0]);

  contentContainer.innerHTML = "";
  filteredData.forEach((item) => {
    const html = `
            <div class="container-fluid p-0 m-0 card-bg">
                <div class="pic">
                    <img src="./img/card-img.png" alt="" class="card_img">
                </div>
                <div class="title-box d-flex justify-content-between">
                    <div class="title">
                        <p class="title-text">${item.title}</p>
                        <p class="date">${item.dateCreated}</p>
                    </div>
                    <div class="price">
                        <button class="price-btn">${item.price}</button>
                    </div>
                </div>
                <div class="description">
                    <p>${item.description}</p>
                </div>
                <div class="buttons">
                    <button id="sendToAuctionBtn_${
                      item.id
                    }" class="card-btn">Send to Auction</button>
                    <button id="toggleBtn_${item.id}" class="card-btn1">${
      item.isPublished ? "Unpublish" : "Publish"
    }</button>
                    <button id="removeBtn_${
                      item.id
                    }" class="card-btn2">Remove</button>
                    <button id="editBtn_${
                      item.id
                    }" class="card-btn3">Edit</button>
                </div>
            </div>
        `;

    contentContainer.innerHTML += html;
    $(document).ready(function () {
      $(`#sendToAuctionBtn_${item.id}`).click(() =>
        handleSendToAuctionClick(item)
      );
      $(`#toggleBtn_${item.id}`).click(() => handleToggle(item));
      $(`#removeBtn_${item.id}`).click(() => handleRemoveClick(item));
      $(`#editBtn_${item.id}`).click(() => handleEditClick(item));
    });
  });
}

export function initArtistItems() {
  console.log("Artist Items init");
  myHeader.textContent = "This is header for Artist Items";

  $(document).ready(function () {
    $(".add-item-box").on("click", function () {
      window.location.href = "index.html#artistAddNewItemPage";
    });
  });
  renderData();

  // $(document).ready(function () {
  //   $("#menuIcon2").on("click", function() {
  //     console.log("ON CLICKED !!");
  //     $("#dropdownMenu2").slideToggle();
  //   });
  // });
}
