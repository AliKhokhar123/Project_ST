const myHeader = document.getElementById("header");

import { items } from "../../../data/data.js";

const imageContainer = document.getElementById("img_container");
const imageContainer2 = document.getElementById("img_container2");

export function initVisitorHomePage() {
  console.log("Visitor home page init");
  myHeader.textContent = "This is header for Visitor Home Page";

  const publishedItems = items.filter((item) => item.isPublished);

  imageContainer.innerHTML = "";

  // Iterate through each published item and render its image
  publishedItems.forEach((item) => {
    const imageElement = document.createElement("img");
    imageElement.src = item.image;
    imageElement.alt = item.title; // Set alt attribute for accessibility
    imageContainer.appendChild(imageElement);
  });

  const publishedItems2 = items.filter((item) => item.isPublished);

  imageContainer2.innerHTML = "";

  // Iterate through each published item and render its image
  publishedItems2.forEach((item) => {
    const imageElement = document.createElement("img");
    imageElement.src = item.image;
    imageElement.alt = item.title; // Set alt attribute for accessibility
    imageContainer2.appendChild(imageElement);
  });

  const scrollers = document.querySelectorAll(".scroller");

  // If a user hasn't opted in for recuded motion, then we add the animation
  if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    addAnimation();
  }

  function addAnimation() {
    scrollers.forEach((scroller) => {
      // add data-animated="true" to every `.scroller` on the page
      scroller.setAttribute("data-animated", true);

      // Make an array from the elements within `.scroller-inner`
      const scrollerInner = scroller.querySelector(".scroller__inner");
      const scrollerContent = Array.from(scrollerInner.children);

      // For each item in the array, clone it
      // add aria-hidden to it
      // add it into the `.scroller-inner`
      scrollerContent.forEach((item) => {
        const duplicatedItem = item.cloneNode(true);
        duplicatedItem.setAttribute("aria-hidden", true);
        scrollerInner.appendChild(duplicatedItem);
      });
    });
  }
}
