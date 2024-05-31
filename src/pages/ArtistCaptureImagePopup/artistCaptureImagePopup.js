const myHeader = document.getElementById("header");
export function initArtistCaptureImagePopup() {
  console.log("Artist Capture Image Popup Page init");
  myHeader.textContent = "This is header for Artist Capture Image Popup";
  const liveStreamVideo = document.querySelector("#liveStream");
  const captureStreamCanvas = document.querySelector("#captureCanvas");
  const capturedImageImg = document.querySelector("#capturedImage");

  const captureImageBtn = document.querySelector(".captureImageBtn1");

  // navigor MDN
  navigator.mediaDevices
    .getUserMedia({
      video: {
        facingMode: {
          ideal: "environment",
        },
      },
    })
    .then((stream) => {
      liveStreamVideo.srcObject = stream;
    })
    .catch((err) => {
      console.log(err);
    });

  liveStreamVideo.addEventListener("canplay", function () {
    captureStreamCanvas.width = liveStreamVideo.videoWidth;
    captureStreamCanvas.height = liveStreamVideo.videoHeight;
  });

  captureImageBtn.addEventListener("click", function () {
    const ctx = captureStreamCanvas.getContext("2d");
    ctx.drawImage(liveStreamVideo, 0, 0);

    const imgUrl = captureStreamCanvas.toDataURL("image/png");
    console.log(imgUrl);
    // capturedImageImg.src = imgUrl;
    localStorage.setItem("capturedImage", imgUrl);

    window.location.href = "#artistAddNewItemPage";
  });
}
