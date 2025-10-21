function validateform() {
    var username = document.forms["Formfill"]["username"].value;
    var email = document.forms["Formfill"]["email"].value;
    var password = document.forms["Formfill"]["password"].value;
    var cpassword = document.forms["Formfill"]["cpassword"].value;

    if (username == "") {
        alert("Username must be filled out");
        return false;
    }

    if (email == "") {
        alert("Email must be filled out");
        return false;
    }

    if (password == "") {
        alert("Password must be filled out");
        return false;
    }

    if (cpassword == "") {
        alert("Confirm Password must be filled out");
        return false;
    }

    if (password != cpassword) {
        alert("Passwords do not match");
        return false;
    }

    // Additional validation checks can be added here (e.g., email format, password strength)

    return true; // Form is valid
}
