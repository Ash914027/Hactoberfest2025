const linkInput = document.querySelector("#link");
let output = document.querySelector(".code");
const api_base =
  "https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=";

async function GenerateQr() {
  const url = api_base + encodeURIComponent(linkInput.value);

  output.innerHTML = `<img id="qr-image" src="${url}" alt="QR Code">`;
}

async function ShareQr() {
  const qrImg = document.querySelector("#qr-image");
  if (!qrImg) return alert("Generate a QR code first!");

  try {
    const response = await fetch(qrImg.src);
    const blob = await response.blob();
    const file = new File([blob], "qr-code.png", { type: blob.type });

    if (navigator.canShare && navigator.canShare({ files: [file] })) {
      await navigator.share({
        files: [file],
        title: "QR Code",
        text: "Here is your QR Code!",
      });
    } else {
      alert("Sharing not supported on this browser/device.");
    }
  } catch (err) {
    console.error("Sharing failed:", err);
    alert("An error occurred while sharing the QR code.");
  }
}
