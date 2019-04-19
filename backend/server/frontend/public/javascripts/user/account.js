var changeName = false;
var changeEmail = false;
var changePassword = false;
var oldEmail = undefined;

document.addEventListener("DOMContentLoaded", function () {
    var name = document.getElementById("name");
    var email = document.getElementById("email");
    email.value = getCookie("accEmail");
    name.value = getCookie("accName");
    oldEmail = getCookie("accEmail");
    document.getElementById('changePass').addEventListener('click', activateChangePass);
    document.getElementById('editName').addEventListener('click', editName);
    document.getElementById('editEmail').addEventListener('click', editEmail);
    document.getElementById('submitBtn').addEventListener('click', updateAccount);
});

function activateChangePass() {
    changePassword = true;
    document.getElementById('changePass').hidden = true;
    document.getElementById('changePassDiv').hidden = false;
}

function editName() {
    changeName = true;
    document.getElementById('editName').hidden = true;
    document.getElementById('name').disabled = false;
}

function editEmail() {
    changeEmail = true;
    document.getElementById('editEmail').hidden = true;
    document.getElementById('email').disabled = false;
}

function updateAccount() {
    var ready = true;
    var errorResponse = "";
    var name = undefined;
    var newEmail = undefined;
    var newPassword = undefined;
    var confirmNewPassword = undefined;
    var serverResponse = document.getElementById('serverResponse');
    var currentPassword = document.getElementById('currentPassword').value;
    var checkCurrentPassword = passwordErrorCheck(currentPassword);
    if (currentPassword == "") {
        ready = false;
        serverResponse.innerHTML = "<span class='red-response'>Current password field is required.</span>"
    } else {
        if (checkCurrentPassword.length > 0) {
            errorResponse += checkCurrentPassword;
            ready = false;
        } else {
            if (changeName == true) {
                name = document.getElementById('name').value;
            }
            if (changeEmail == true) {
                newEmail = document.getElementById('email').value;
                if (emailErrorCheck(newEmail).length > 0) {
                    errorResponse += " Invalid email.";
                    ready = false;
                }
            }
            if (changePassword == true) {
                newPassword = document.getElementById('password').value;
                confirmNewPassword = document.getElementById('confirmPassword').value;
                if (newPassword != confirmNewPassword) {
                    ready = false;
                } else {
                    var newPasswordCheck = newPasswordErrorCheck(newPassword);
                    if (newPasswordCheck.length > 0) {
                        errorResponse += ""
                        ready = false;
                    }
                }
            }
        }
    }
    if (ready == true) {
        serverResponse.innerHTML = "";
        var xhr = new XMLHttpRequest();
        xhr.addEventListener('load', updateAccountResponse);
        xhr.responseType = 'json';
        xhr.open('PUT', '/api/user/update');
        xhr.setRequestHeader('Content-type', 'application/json');
        xhr.send(
            JSON.stringify({
                email: oldEmail,
                currentPassword: currentPassword,
                newEmail: newEmail,
                newPassword: newPassword,
                confirmNewPassword: confirmNewPassword,
                name: name
            })
        );
    } else {
        serverResponse.innerHTML = "<span class='red-response'>" + errorResponse + "</span>"
    }

}

function updateAccountResponse() {
    if (this.status === 200) {
        window.location.href = "/user/account.html";
        //window.localStorage.setItem("qr4gloginAuthTokenDesktop", this.response.loginAuthTokenDesktop);
    } else {
        document.getElementById('serverResponse').innerHTML = "<span class='red-response'>" + this.response.message + "</span>";
    }
}

function newPasswordErrorCheck(password) {
    let pwdLowerReg = /[a-z]+/;
    let pwdUpperReg = /[A-Z]+/;
    let pwdNumReg = /.*\d.*/;

    let outputString = '';

    if (password.length < 6 || password.length > 20) {
        outputString += ' New password must be longer than 6 characters and less than 20 characters. ';
    }

    if (!pwdLowerReg.test(password)) {
        outputString += ' New password must contain at least one lowercase character. ';
    }

    if (!pwdUpperReg.test(password)) {
        outputString += ' New password must contain at least one uppercase character. ';
    }

    if (!pwdNumReg.test(password)) {
        outputString += ' New password must contain at least one digit. ';
    }

    return outputString;
}

function passwordErrorCheck(password) {
    let pwdLowerReg = /[a-z]+/;
    let pwdUpperReg = /[A-Z]+/;
    let pwdNumReg = /.*\d.*/;

    let outputString = '';

    if (password.length < 6 || password.length > 20) {
        outputString += ' Incorrect current password. ';
    }

    if (!pwdLowerReg.test(password)) {
        if (!(outputString.indexOf('Incorrect current password') > 0)) {
            outputString += ' Incorrect current password. ';
        }
    }

    if (!pwdUpperReg.test(password)) {
        if (!(outputString.indexOf('Incorrect current password') > 0)) {
            outputString += ' Incorrect current password. ';
        }
    }

    if (!pwdNumReg.test(password)) {
        if (!(outputString.indexOf('Incorrect current password') > 0)) {
            outputString += ' Incorrect current password. ';
        }
    }

    return outputString;
}

function emailErrorCheck(email) {
    let emailReg = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,5}$/;

    let outputString = '';


    if (!emailReg.test(email)) {
        outputString += ' Invalid email. ';
    }

    return outputString;
}

function getCookie(cname) {
    var name = cname + "=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}