let currentArtist = localStorage.getItem("currentArtist") ?? "";
let currentBid = localStorage.getItem("currentBid") ?? "";

export function getCurrentArtist() {
  return localStorage.getItem("currentArtist") ?? currentArtist;
}

export function setCurrentArtist(artist) {
  currentArtist = artist;
  localStorage.setItem("currentArtist", currentArtist);
}

export function removeCurrentArtist() {
  localStorage.removeItem("currentArtist");
}

export function setCurrentBid(bid) {
  currentBid = bid;
  localStorage.setItem("currentBid", currentBid);
}

export function getCurrentBid() {
  return localStorage.getItem("currentBid") ?? currentBid;
}

export function setEditItemId(itemId) {
  localStorage.setItem("editItemId", itemId);
}

export function getQueryParam(name) {
  const fullUrl = window.location.href;
  const urlParams = new URLSearchParams(fullUrl.split("?")[1]);
  return urlParams.get(name);
}

export function setCaptureImage(data) {
  localStorage.setItem("capturedImage", data);
}

export function getCapturedImage() {
  return localStorage.getItem("capturedImage");
}

export function removeCapturedImage() {
  localStorage.removeItem("capturedImage");
}
