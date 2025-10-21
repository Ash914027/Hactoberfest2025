function validateForm() {
    // Clear previous errors
    document.getElementById('email_error').style.display = 'none';
    document.getElementById('pass_error').style.display = 'none';
    
    let email = document.querySelector('input[name="email"]').value;
    let password = document.querySelector('input[name="password"]').value;
    let isValid = true;

    // Email validation
    if (!email) {
        document.getElementById('email_error').style.display = 'block';
        isValid = false;
    }

    // Password validation
    if (!password) {
        document.getElementById('pass_error').style.display = 'block';
        isValid = false;
    }

    // Prevent form submission if validation fails
    return isValid;
}
