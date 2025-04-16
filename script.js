document.getElementById('personalForm').addEventListener('submit', function(event) {
    event.preventDefault();

    let password = document.getElementById('password').value;
    let confirmPassword = document.getElementById('confirmPassword').value;
    let passwordMessage = document.getElementById('passwordMessage');

    if (password !== confirmPassword) {
        passwordMessage.innerText = "❌ Passwords do not match!";
        passwordMessage.style.color = "red";
        return;
    } else {
        passwordMessage.innerText = "";
    }

    document.getElementById('captchaSection').classList.remove('hidden');
});

// CAPTCHA Checkbox
document.getElementById('robotCheckbox').addEventListener('change', function() {
    if (this.checked) {
        setTimeout(() => {
            document.getElementById('captchaBox').classList.remove('hidden');
            generateCaptcha(); // Ensure CAPTCHA generates correctly
        }, 1000);
    } else {
        document.getElementById('captchaBox').classList.add('hidden');
    }
});

// Generate CAPTCHA
let captchaText = '';

function generateCaptcha() {
    let canvas = document.getElementById('captchaCanvas');
    let ctx = canvas.getContext('2d');

    canvas.width = 200;
    canvas.height = 60;
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    let chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    captchaText = '';

    for (let i = 0; i < 6; i++) {
        captchaText += chars.charAt(Math.floor(Math.random() * chars.length));
    }

    // Background color
    ctx.fillStyle = "#f8f9fa";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Draw noise lines
    for (let i = 0; i < 5; i++) {
        ctx.strokeStyle = "rgba(0,0,0,0.2)";
        ctx.beginPath();
        ctx.moveTo(Math.random() * canvas.width, Math.random() * canvas.height);
        ctx.lineTo(Math.random() * canvas.width, Math.random() * canvas.height);
        ctx.stroke();
    }

    // Draw CAPTCHA characters
    ctx.font = "30px Arial";
    ctx.fillStyle = "#000";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";

    for (let i = 0; i < captchaText.length; i++) {
        let x = 30 + i * 30;
        let y = 35 + Math.random() * 10;

        ctx.save();
        ctx.translate(x, y);
        let angle = Math.random() * 0.4 - 0.2;
        ctx.rotate(angle);
        ctx.fillText(captchaText[i], 0, 0);
        ctx.restore();
    }
}

// Generate CAPTCHA on page load
generateCaptcha();

document.getElementById('refreshCaptcha').addEventListener('click', function() {
    generateCaptcha();
});
document.getElementById('verifyCaptcha').addEventListener('click', function() {
    let userInput = document.getElementById('captchaInput').value.trim();
    let name = document.getElementById('name').value.trim(); // Example input
    let email = document.getElementById('email').value.trim(); // Example input

    if (!name || !email) {
        document.getElementById('message').innerHTML = "❗ Please fill all required fields.";
        document.getElementById('message').style.color = "orange";
        return;
    }

    if (userInput === captchaText) {
        // Redirect to welcome page
        window.location.href = "wel.html";
    } else {
        document.getElementById('message').innerHTML = "❌ Incorrect CAPTCHA. Try Again!";
        document.getElementById('message').style.color = "red";
        generateCaptcha();
    }
});


// Play CAPTCHA Audio
document.getElementById('playCaptcha').addEventListener('click', function() {
    let speech = new SpeechSynthesisUtterance();
    speech.text = captchaText.split('').join(' ');
    speech.rate = 0.8;
    speech.pitch = 1;
    speech.volume = 1;
    speechSynthesis.speak(speech);
});
