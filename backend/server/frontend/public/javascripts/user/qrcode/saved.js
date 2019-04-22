/*
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See LICENSE in the project root for license information.
 *
 *  @author Benjamin Wodhams
 *
 */

var myQRCodesArray = undefined;
document.addEventListener("DOMContentLoaded", function () {
    getMyQRCodes();
    getMySavedQRCodes();
});

function getMyQRCodes() {
    var xhr = new XMLHttpRequest();
    xhr.addEventListener('load', getMyQRCodesResponse);
    xhr.responseType = 'json';
    xhr.open('GET', '/api/user/getQRCodes');
    xhr.setRequestHeader('Content-type', 'application/json');
    xhr.setRequestHeader('authorization', localStorage.getItem('qr4gloginAuthTokenDesktop'));
    xhr.send();
}

function getMyQRCodesResponse() {
    var myQRCodesDiv = document.getElementById('myQRCodes');
    var loadingMyQRDiv = document.getElementById('myQRLoadingImg');
    loadingMyQRDiv.style.display = "none";
    if (this.status === 200) {
        myQRCodesArray = this.response.qrcodes;
        if (myQRCodesArray.length == 0) {
            myQRCodesDiv.innerHTML = "<span class='red-response'>You currently have no QR codes.</span>";
        }
        for (var i = 0; i < this.response.qrcodes.length; i++) {
            var qrItem = document.createElement('div');
            qrItem.className = "qrItem";
            qrItem.id = i;
            qrItem.innerHTML = '<img src="' + this.response.qrcodes[i].qrCodeData + '" alt="QR Code" width="100%"><br><span>' + this.response.qrcodes[i].qrCodeName + '</span>';
            myQRCodesDiv.appendChild(qrItem);
        }
        myQRCodesDiv.innerHTML += '<div style="clear: both;"></div>';
        for (var i = 0; i < this.response.qrcodes.length; i++) {
            document.getElementById(i).addEventListener('click', function () {
                enlargeQR(this.id);
            });
        }
    } else {
        myQRCodesDiv.innerHTML = "<span class='red-response'>" + this.response.message + "</span>";
    }
}

function enlargeQR(index) {
    var enlargedQRDiv = document.getElementById('enlargedQR');
    var enlargedQRData = myQRCodesArray[index].qrCodeData;
    var enlargedQRName = myQRCodesArray[index].qrCodeName;
    var enlargedQRAmount = myQRCodesArray[index].qrCodeDefaultAmount;
    var enlargedQRType = myQRCodesArray[index].qrCodeType;
    var myQRCodesDiv = document.getElementById('myQRCodes');
    myQRCodesDiv.style.display = "none";
    enlargedQRDiv.innerHTML = '<img src="' + enlargedQRData + '" alt="QR Code" width="100%"><br><span>Name : ' + enlargedQRName + '</span><br><span>Default amount : $' + enlargedQRAmount + '</span><br><span>Type : ' + enlargedQRType + '</span><br><br><span id="printEnlarged" style="color:blue; font-size:16px">print</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span id="deleteEnlarged" class="red-response" style="font-size: 16px">delete</span><br><br><span id="closeEnlarged" onClick="closeEnlargedQR()">close</span>';
    enlargedQRDiv.style.display = "";
    document.getElementById('deleteEnlarged').addEventListener('click', function () {
        deleteMyQR(this.id);
    });
}

function closeEnlargedQR() {
    var enlargedQR = document.getElementById('enlargedQR');
    var myQRCodesDiv = document.getElementById('myQRCodes');
    enlargedQR.style.display = "none";
    myQRCodesDiv.style.display = "";

}

function deleteMyQR(index) {
    var xhr = new XMLHttpRequest();
    xhr.addEventListener('load', deleteMyQRResponse);
    xhr.responseType = 'json';
    xhr.open('POST', '/api/user/deleteQRCode');
    xhr.setRequestHeader('Content-type', 'application/json');
    xhr.send(
        JSON.stringify({
            loginAuthToken: localStorage.getItem('qr4gloginAuthTokenDesktop'),
            deleteID: index
        })
    );
}

function deleteMyQRResponse() {
    console.log("status code = " + this.status);
    console.log("message = " + this.response.message);
}

function getMySavedQRCodes() {
    var xhr = new XMLHttpRequest();
    xhr.addEventListener('load', getMySavedQRCodesResponse);
    xhr.responseType = 'json';
    xhr.open('GET', '/api/user/getSavedQRCodes');
    xhr.setRequestHeader('Content-type', 'application/json');
    xhr.setRequestHeader('authorization', localStorage.getItem('qr4gloginAuthTokenDesktop'));
    xhr.send();
}

function getMySavedQRCodesResponse() {

}