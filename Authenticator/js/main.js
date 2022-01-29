"use strict";

let tokensList;
let labelInput;
let secretInput;
window.onload = () => {

    let totp = new OTPAuth.TOTP({
	    issuer: 'ACME',
	    label: 'AzureDiamond',
	    algorithm: 'SHA1',
	    digits: 6,
	    period: 30,
	    secret: 'NB2W45DFOIZA'
    });

    let token = totp.generate();

    Windows.Storage.ApplicationData.current.localSettings.values['AzureDiamond'] = 'NB2W45DFOIZA';

    document.getElementById('import').addEventListener('click', importTokens);
    document.getElementById('export').addEventListener('click', exportTokens);
    document.getElementById('add').addEventListener('click', addToken);

    tokensList = document.getElementById('tokens');
    labelInput = document.getElementById('label');
    secretInput = document.getElementById('secret');

    updateTokensList();
    setInterval(updateTokens, 30000);
}

let totps = [];
function updateTokensList() {
    const setting = Windows.Storage.ApplicationData.current.localSettings.values.first();
    while (setting.hasCurrent) {
        const label = setting.current.key;
        const secret = setting.current.value;

        totps.push(new OTPAuth.TOTP({
	        label: label,
	        algorithm: 'SHA1',
	        digits: 6,
	        period: 30,
	        secret: secret
        }));

        const div = document.createElement('div');
        div.id = label;
        div.innerHTML = label;
        tokensList.appendChild(div);

        setting.moveNext();
    }

    updateTokens();
}

function updateTokens() {
    totps.forEach(totp => {
        const token = totp.generate();
        const div = document.getElementById(totp.label);
        div.innerHTML = totp.label + '<span style="float:right;">' + token + '</span>';
    })
}

function importTokens() {

}

function exportTokens() {

}

function addToken() {
    Windows.Storage.ApplicationData.current.localSettings.values[labelInput.value] = secretInput.value;

}