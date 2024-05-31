import { items } from "../../../data/data.js";
const myHeader = document.querySelector("header");
const container = document.getElementById("main_card");

const inputByItemTitle = document.getElementById("byItemTitle");
export const selectByArtist = document.getElementById("choose");
const inputByPriceMin = document.getElementById("byPriceMin");
const inputByPriceMax = document.getElementById("byPriceMax");
export const selectByType = document.getElementById("choose1");

export function initVisitorListing() {
  console.log("Visitor listing init");

  myHeader.textContent = "This is header for viditot listing";

  const publishedItems = items.filter((item) => item.isPublished);
  // const title = "";
  // const artist = "Leanne Graham";
  // const minPrice = 100;
  // const maxPrice = 1000;
  // const type = "";

  const title = inputByItemTitle.value;
  const artist = selectByArtist.innerText;
  const minPrice = +inputByPriceMin.value;
  const maxPrice = +inputByPriceMax.value;
  const type = selectByType.innerText;

  console.log("Title:", title);
  console.log("Artist:", artist);
  console.log("Min Price:", minPrice);
  console.log("Max Price:", maxPrice);
  console.log("Type:", type);

  ////////// Prv nacin na filtriranje
  // if (
  //   artist !== "Choose" ||
  //   title !== "" ||
  //   type !== "Choose" ||
  //   minPrice > 0 ||
  //   maxPrice > 0
  // ) {
  //   const filtered = publishedItems.filter(
  //     (item) =>
  //       (title ? item.title.includes(title) : false) ||
  //       (artist ? item.artist === artist : false) ||
  //       (minPrice ? item.price >= minPrice : false) ||
  //       (maxPrice ? item.price <= maxPrice : false) ||
  //       (type ? item.type === type : false)
  //   );

  //   container.innerHTML = "";
  //   filtered.forEach(renderCard);
  //   console.log("hello");
  // } else {
  //   container.innerHTML = "";
  //   publishedItems.forEach(renderCard);
  // }
  const filteredItems = publishedItems.filter((item) => {
    const titleMatch = title
      ? item.title.toLowerCase().includes(title.toLowerCase())
      : true;
    const artistMatch = artist !== "Choose" ? item.artist === artist : true;
    const minPriceMatch = minPrice ? item.price >= minPrice : true;
    const maxPriceMatch = maxPrice ? item.price <= maxPrice : true;
    const typeMatch = type !== "Choose" ? item.type === type : true;

    return (
      titleMatch && artistMatch && minPriceMatch && maxPriceMatch && typeMatch
    );
  });
  container.innerHTML = "";
  filteredItems.forEach(renderCard);
}

export function renderCard(item, idx) {
  const isDark = idx % 2 ? "dark" : "light";

  container.innerHTML += `<div class="container-fluid p-0 m-0 mt-4 card-bg" id="CardRender">
  <div class="pic">
      <img src="${item.image}" alt="${item.title}" class="card_img">
    </div>
    <div class="title-box d-flex justify-content-between">
      <div class="title">
          <p class="title-text">${item.artist}</p>
      </div>
      <div class="price">
          <button class="price-btn">${item.price}</button>
      </div>
    </div>
    <div class="description">
      <p class="item-title">${item.title}</p>
      <p>${item.description}</p>
    </div> 
</div>`;
}
