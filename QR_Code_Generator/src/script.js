// Get references to the DOM elements
const form = document.getElementById('qrForm');
const urlInput = document.getElementById('urlInput');
const qrCodeResult = document.getElementById('qrCodeResult');
const downloadLink = document.getElementById('downloadLink');

// Function to generate QR code
function generateQRCode(e) {
    e.preventDefault(); // Prevent form submission
    const url = urlInput.value;
    if (!url) {
        alert('Please enter a website link.');
        return;
    }

    // Clear previous QR code
    qrCodeResult.innerHTML = '';

    // Generate QR code
    const qrCode = new QRCode(qrCodeResult, {
        text: url,
        width: 200,
        height: 200,
        colorDark: '#000000',
        colorLight: '#ffffff',
        correctLevel: QRCode.CorrectLevel.H,
    });

    // Create download link
    setTimeout(() => {
        const qrCodeImage = qrCodeResult.querySelector('img');
        if (qrCodeImage) {
            downloadLink.href = qrCodeImage.src;
            downloadLink.download = 'qrcode.png';
            downloadLink.style.display = 'block';
        }
    }, 500);
}

// Event listener for the form submission
form.addEventListener('submit', generateQRCode);