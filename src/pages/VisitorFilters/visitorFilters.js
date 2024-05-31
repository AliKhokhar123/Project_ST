import { itemTypes } from "../../../data/data.js";
import {
  initVisitorListing,
  renderCard,
} from "../VisitorListing/visitorListing.js";

const myHeader = document.getElementById("header");
const inputByItemTitle = document.getElementById("byItemTitle");
export const selectByArtist = document.getElementById("byArtist");
const inputByPriceMin = document.getElementById("byPriceMin");
const inputByPriceMax = document.getElementById("byPriceMax");
export const selectByType = document.getElementById("byType");

const submitImage = document.getElementById("tick");
const container = document.getElementById("vistorListingCardContainer");

function getTypes() {
  selectByType.innerHTML = "";
  itemTypes.forEach((element) => {
    selectByType.innerHTML += `<button class="drop_btn1" value="${element}">${element}</button>`;
  });

  $(document).on("click", ".drop_btn1", function () {
    var artist = this;
    $("#choose1").html(artist.value);
    $(".choose-btn1").css("width", "100px");
    $(".choose-icon1").css("display", "none");
    $(".dropdown-content1").hide();
  });
}
/////////////////////////////////////////////////////////////////////

export async function getArtist() {
  try {
    const res = await fetch("https://jsonplaceholder.typicode.com/users");
    const users = await res.json();

    const userList = (users ?? []).map((user) => user.name);

    userList.forEach((user) => {
      selectByArtist.innerHTML += `<button class="drop_btn" value="${user}">${user}</button>`;
    });

    // Use event delegation to handle click events for all buttons
    $(document).on("click", ".drop_btn", function () {
      var artist = this;
      $("#choose").html(artist.value);
      $(".choose-btn").css("width", "150px");
      $(".choose-icon").css("display", "none");
      $(".dropdown-content").hide();
    });

    selectByArtist.addEventListener("change", (e) => {
      // Uncomment the line below if setCurrentArtist is defined
      setCurrentArtist(e.currentTarget.value);
    });
  } catch (error) {
    console.log(error);
  }
}

// Function to reset filter values
function resetFilterValues() {
  inputByItemTitle.value = "";

  inputByPriceMin.value = "";
  inputByPriceMax.value = "";
  selectByType.innerText = "Choose";
  const choose = document.getElementById("choose");
  if (choose.innerText !== "Choose") {
    choose.innerText = "Choose";
    $(".choose-icon").css("display", "block").css("margin-top", "0px");
    $("#byartist").on("click", function () {
      console.log("Button clicked");
      var dropdownContent = $(".dropdown-content");
      dropdownContent.toggle(); // Toggles the display property
    });
  }
  const choose1 = document.getElementById("choose1");
  if (choose1.innerText !== "Choose") {
    choose1.innerText = "Choose";
    $(".choose-icon1").css("display", "block").css("margin-top", "0px");
    $("#byartist1").on("click", function () {
      console.log("Button clicked");
      var dropdownContent = $(".dropdown-content1");
      dropdownContent.toggle(); // Toggles the display property
    });
  }
}

/////////////////////////////////////////////////////////////////////
export function initVisitorFilters() {
  resetFilterValues();
  myHeader.textContent = "This is header for Visitor Filters";
  $(document).ready(function () {
    $("#byartist").on("click", function () {
      var dropdownContent = $(".dropdown-content");
      dropdownContent.toggle(); // Toggles the display property
    });
  });

  $(document).ready(function () {
    $("#byartist1").on("click", function () {
      var dropdownContent = $(".dropdown-content1");
      dropdownContent.toggle(); // Toggles the display property
    });
  });
  console.log("Visitor Filters init");

  myHeader.textContent = "This is header for Visitor Filters";
  getArtist();
  getTypes();

  myHeader.textContent = "This is header for visitor filters";

  //////////////////////////////////////////////////////////////////////////

  ////////////////////////////////////////////////////////////////////
}

const onSubmitHandler = () => {
  initVisitorListing();
  function renderCard(item, idx) {
    const isDark = idx % 2 ? "dark" : "light";
    container.innerHTML += `<div class="card card-bg-${isDark} mb-3">
                                  <img src="${item.image}" class="card-img-top" alt="${item.title}">
                                  <div class="card-body">
                                  <h5 class="card-title">${item.title}</h5>
                                  <h5 class="card-title">${item.artist}</h5>
                                  <p class="card-text">${item.description}</p>
                                  <a href="#" class="btn btn-primary">${item.price}</a>
                                  </div>
                              </div>`;
  }
  location.hash = "#visitorListing";
  // document.getElementById("byItemTitle").value = "";
  // // document.getElementById("byArtist").value = "";
  // document.getElementById("byPriceMin").value = "";
  // document.getElementById("byPriceMax").value = "";
  // // document.getElementById("byType").value = "";
};

submitImage.addEventListener("click", onSubmitHandler);
// window.addEventListener("load", onSubmitHandler);
