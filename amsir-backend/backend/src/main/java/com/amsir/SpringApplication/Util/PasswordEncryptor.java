package com.amsir.SpringApplication.Util;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import javax.crypto.BadPaddingException;
import javax.crypto.Cipher;
import javax.crypto.IllegalBlockSizeException;
import javax.crypto.NoSuchPaddingException;
import javax.crypto.spec.IvParameterSpec;
import javax.crypto.spec.SecretKeySpec;
import java.io.UnsupportedEncodingException;
import java.nio.charset.StandardCharsets;
import java.security.InvalidAlgorithmParameterException;
import java.security.InvalidKeyException;
import java.security.NoSuchAlgorithmException;
import java.util.Base64;

@Component
public class PasswordEncryptor {

    @Value("${crypto.encryption.value}")
    private String encryptionKey;
    @Value("${crypto.bytes.value}")
    private String bytesString;
    public String encryptPassword(final String passwordText) throws NoSuchPaddingException, NoSuchAlgorithmException, InvalidAlgorithmParameterException, InvalidKeyException, IllegalBlockSizeException, BadPaddingException, UnsupportedEncodingException {
        // create resources for AES encryption (secret + salt)
        SecretKeySpec secretKeySpec = new SecretKeySpec(encryptionKey.getBytes(StandardCharsets.UTF_8), "AES");
        IvParameterSpec iv = new IvParameterSpec(bytesString.getBytes(StandardCharsets.UTF_8));
        Cipher cipher = Cipher.getInstance("AES/CBC/PKCS5PADDING");
        cipher.init(Cipher.ENCRYPT_MODE, secretKeySpec, iv);
        // create encryption for password's bytes
        byte[] encrypted = cipher.doFinal(passwordText.getBytes());
        // encode in BASE 64
        return Base64.getEncoder().encodeToString(encrypted);
    }
}
