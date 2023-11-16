import CryptoJS from 'crypto-js';

const secretKey = "VGhpc0lzQVNlY3JldEtleTEyMzQ1Njc4";

function encrypt(value: string) {
	if (value != null && value.length > 0) {

		const encrypted = CryptoJS.AES.encrypt(
			value, 
			CryptoJS.enc.Base64.parse(secretKey),
			{
				mode: CryptoJS.mode.ECB
			}
		);

		alert(`encrypted from -> ${value} to -> ${encrypted}`);

		return encrypted;
	}
}

// todo: function decrypt(value: String) -> unencryptedValue: String

export { encrypt }