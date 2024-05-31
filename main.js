import { initArtistAddNewItemPage } from "./src/pages/ArtistAddNewItem/artistAddNewItem.js";
import { initArtistCaptureImagePopup } from "./src/pages/ArtistCaptureImagePopup/artistCaptureImagePopup.js";
import { initArtistHomePage } from "./src/pages/ArtistHomePage/artistHomePage.js";
import { initArtistItems } from "./src/pages/ArtistItems/artistItems.js";
import { initArtistMenu } from "./src/pages/ArtistMenu/artistMenu.js";
import { initLandingPage } from "./src/pages/LandingPage/landingPage.js";
import { initLiveAuction } from "./src/pages/LiveAuction/liveAuction.js";
import { initVisitorFilters } from "./src/pages/VisitorFilters/visitorFilters.js";
import { initVisitorHomePage } from "./src/pages/VisitorHomePage/visitorHomePage.js";
import { initVisitorListing } from "./src/pages/VisitorListing/visitorListing.js";

// router

// router
function handleRouter() {
  const fullHash = location.hash === "" ? "#landingPage" : location.hash;
  const hash = fullHash.includes("?") ? fullHash.split("?")[0] : fullHash;

  const allPages = document.querySelectorAll(".page");
  allPages.forEach((page) => {
    page.style.display = "none";
  });
  document.querySelector(hash).style.display = "block";
  if (hash === "#landingPage") {
    initLandingPage();
  } else if (hash === "#visitorHomePage") {
    initVisitorHomePage();
  } else if (hash === "#visitorListing") {
    initVisitorListing();
  } else if (hash === "#visitorFilters") {
    initVisitorFilters();
  } else if (hash === "#artistHomePage") {
    initArtistHomePage();
  } else if (hash === "#artistMenu") {
    initArtistMenu();
  } else if (hash === "#artistItems") {
    initArtistItems();
  } else if (hash === "#artistAddNewItemPage") {
    initArtistAddNewItemPage();
  } else if (hash === "#artistCaptureImagePopup") {
    initArtistCaptureImagePopup();
  } else if (hash === "#liveAuction") {
    initLiveAuction();
  } else {
    console.log("Ne postoi stranica za " + hash);
  }
}

window.addEventListener("hashchange", handleRouter);
window.addEventListener("load", handleRouter);

$(document).ready(function () {
  $("#tick").on("click", function () {
    window.location.href = "index.html#visitorListing";
  });
});
$(document).ready(function () {
  $("#filter-btn").on("click", function () {
    window.location.href = "index.html#visitorFilters";
  });
});
