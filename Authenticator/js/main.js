﻿"use strict";

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



}
