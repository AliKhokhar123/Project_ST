import {
  setCurrentArtist,
  getCurrentArtist,
  removeCurrentArtist,
} from "../../globals.js";

export let currentArtist = "Voislav";

const myHeader = document.querySelector("header");
const artistsSelect = document.querySelector("#artists");

export async function getUsers() {
  try {
    console.log("Lets start again");
    const res = await fetch("https://jsonplaceholder.typicode.com/users");
    const users = await res.json();

    const userList = (users ?? []).map((user) => user.name);

    userList.forEach((user) => {
      artistsSelect.innerHTML += `<button class="drop_btn2" value="${user}">${user}</button>`;
    });

    $(document).on("click", ".drop_btn2", function () {
      var artist = this;
      $(".choose-text").html(artist.value);
      $(".choose-button").css("width", "130px");
      $(".arrow-icon").css("display", "none");
      $(".dropdown-content5").hide();
      setCurrentArtist(artist.value);
      window.location.href = "index.html#artistHomePage";
    });

    artistsSelect.addEventListener("change", (e) => {
      setCurrentArtist(e.currentTarget.value);

      location.hash = "#artistsHomePage";
    });
  } catch (error) {
    console.log(error);
  }
}

export function initLandingPage() {
  console.log("Landing page init");

  myHeader.textContent = "This is header for landing page";
  // programatically redirect

  // setTimeout(() => {
  //     location.hash = 'visitorHomePage'
  // }, 2000)

  $(document).ready(function () {
    $("#landing-drop")
      .off("click")
      .on("click", function () {
        console.log("Till here");
        var dropdownContent = $(".dropdown-content5");
        var currentDisplay = dropdownContent.css("display");
        console.log("Current display property:", currentDisplay);
        dropdownContent.toggle(); // Toggles the display property
      });
  });

  $(document).ready(function () {
    $(".main-box1").mouseenter(function () {
      $(".vec1").addClass("active");
    });

    $(".main-box1").mouseleave(function () {
      $(".vec1").removeClass("active");
    });
  });

  $(document).ready(function () {
    $(".main-box2").mouseenter(function () {
      $(".main-box3").css("cursor", "pointer");
      $(".vec2").addClass("active");
    });

    $(".main-box2").mouseleave(function () {
      $(".vec2").removeClass("active");
    });
  });

  const currentArtist = getCurrentArtist();
  if (currentArtist) {
    removeCurrentArtist();
    $(".choose-text").html("Choose");
    $(".choose-button").css("width", "130px");
    $(".arrow-icon").css("display", "block");
    $(".choose-button").on("click", function () {
      $(".dropdown-content5").toggle();
    });
  }

  getUsers();

  $(document).on("click", ".main-box2", function () {
    window.location.href = "#visitorHomePage";
  });
}
