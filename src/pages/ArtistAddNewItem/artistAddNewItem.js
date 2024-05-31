// addnewitem.js
import { items } from "../../../data/data.js";
import {
  getCurrentArtist,
  getQueryParam,
  getCapturedImage,
  removeCapturedImage,
} from "../../globals.js";

// Function to save items to localStorage
function saveItemsToLocalStorage(updatedItems) {
  localStorage.setItem("storedItems", JSON.stringify(updatedItems));
}

const myHeader = document.getElementById("header");

function resetAndRedirect() {
  // Reset the form fields
  document.getElementById("add_title").value = "";
  document.getElementById("add_description").value = "";
  document.getElementById("add_type").value = "";
  document.getElementById("add_price").value = "";
  document.getElementById("add_img_url").value = "";
  document.getElementById("isPublishedCheckbox").checked = false;

  removeCapturedImage();

  window.location.href = "#artistItems";
}

export function initArtistAddNewItemPage() {
  console.log("Artist Add New Item Page init");

  const currentArtist = getCurrentArtist();

  const editItemId = getQueryParam("editItemId");
  const imageUrl = getQueryParam("image");
  console.log(editItemId, "edit item");
  const camImage = document.getElementById("cam");
  const capturedImage = getCapturedImage();
  if (capturedImage) {
    console.log(capturedImage, "Captured image");

    camImage.src = capturedImage;
  } else {
    camImage.src = "./img/camera.png";
  }

  if (editItemId) {
    const editItem = items.find((item) => item.id === Number(editItemId));
    console.log(editItem, "edit item");
    // EDIT FUNCTIONALITY
    document.getElementById("add_title").value = editItem.title;
    document.getElementById("add_description").value = editItem.description;
    document.getElementById("add_type").value = editItem.type;
    document.getElementById("add_price").value = editItem.price;
    document.getElementById("add_img_url").value = editItem.image;
    document.getElementById("isPublishedCheckbox").checked =
      editItem.isPublished;
  }

  myHeader.textContent = "This is header for Artist Add New Item Page";

  // $(document).ready(function () {
  //   $("#menuIcon3").click(function () {
  //     console.log("ON CLICKED !!");
  //     $("#dropdownMenu3").slideToggle();
  //   });
  // });

  $(document).ready(function () {
    $(".snap-box").on("click", function () {
      window.location.href = "index.html#artistCaptureImagePopup";
    });
  });

  const add_new_item_btn = document.getElementById("add_new_item_btn");

  const cancel_button = document.getElementById("item2");

  cancel_button.addEventListener("click", function () {
    resetAndRedirect();
  });

  add_new_item_btn.addEventListener("click", function () {
    // Capture Input Values
    const title = document.getElementById("add_title").value;
    const description = document.getElementById("add_description").value;
    const type = document.getElementById("add_type").value;
    const price = document.getElementById("add_price").value;
    const img = document.getElementById("add_img_url").value;
    const isPublishedCheckbox = document.getElementById("isPublishedCheckbox");

    const itemToEdit = items.find((item) => item.id === parseInt(editItemId));

    if (itemToEdit) {
      // Update item values based on your form fields
      itemToEdit.title = title;
      itemToEdit.description = description;
      itemToEdit.type = type;
      itemToEdit.price = price;
      itemToEdit.image = img;
      itemToEdit.isPublished = isPublishedCheckbox.checked;

      return resetAndRedirect();
    }

    // Get the current date and time
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth() + 1;
    const day = currentDate.getDate();
    const hours = currentDate.getHours();
    const minutes = currentDate.getMinutes();
    const seconds = currentDate.getSeconds();
    const miliseconds = currentDate.getMilliseconds();

    // Format the date and time
    const formattedDateTime = `${year}-${month < 10 ? "0" + month : month}-${
      day < 10 ? "0" + day : day
    } ${hours}:${minutes}:${seconds}:${miliseconds}`;

    // Create a new item object
    const new_item = {
      id: items.length + 1,
      title: title,
      description: description,
      type: type,
      image: img,
      price: price,
      artist: currentArtist,
      dateCreated: formattedDateTime,
      isPublished: isPublishedCheckbox.checked,
      isAuctioning: false,
      dateSold: null,
      priceSold: null,
    };
    console.log(new_item, "NEW ITEM");
    // Push the new item into the items array
    items.push(new_item);

    // // Save the updated items to localStorage
    // saveItemsToLocalStorage(items);

    // Log the updated items array
    console.log("Updated Items Array:", items);
    setItems([]);
    resetAndRedirect();
  });
}
