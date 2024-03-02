const generateQRCode = () => {
  const inputText = document.getElementById("qr-code-text").value;
  const img = document.getElementById("qr-code-img");
  const generatingText = document.getElementById("generating-text");
  const downloadIcon = document.querySelector(".download-icon");

  if (!inputText) {
    alert("Please enter text to generate the QR Code.");
    return;
  }

  generatingText.textContent = " Generating QR Code."; // Initial text

  let dots = "";
  let dotsCount = 0;
  const dotsInterval = setInterval(() => {
    dotsCount = (dotsCount + 1) % 7; // Cycle through 6 dots
    dots = ".".repeat(dotsCount);
    generatingText.textContent = ` Generating QR Code${dots}`;
  }, 100); // Update dots every 100 milliseconds (adjust as needed)

  const apiURL = `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${inputText}`;

  fetch(apiURL)
    .then(response => response.blob())
    .then(blob => {
      const url = URL.createObjectURL(blob);
      img.src = url;
      generatingText.textContent = "Generator v2.0"; // Reset text after generation
      clearInterval(dotsInterval); // Stop the dots animation

      downloadIcon.addEventListener("click", () => {
        const link = document.createElement("a");
        link.href = url;
        link.download = "qr-code.png"; // Adjust filename as needed
        link.click();
      });
    })
    .catch(error => console.error("Error:", error));
};

document.getElementById("qrg").addEventListener("click", generateQRCode);
