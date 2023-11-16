package com.amsir.SpringApplication.Util;

import lombok.extern.slf4j.Slf4j;
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
import java.util.Arrays;
import java.util.Base64;

@Slf4j
@Component
public class PasswordEncryptor {

    @Value("${crypto.encryption.value}")
    private String encryptionKey;
    @Value("${crypto.bytes.value}")
    private String bytesString;
    public String encryptPassword(final String passwordText) throws NoSuchPaddingException, NoSuchAlgorithmException, InvalidKeyException, IllegalBlockSizeException, BadPaddingException, UnsupportedEncodingException {
        // create resources for AES encryption (secret + salt)
        SecretKeySpec secretKeySpec = new SecretKeySpec(encryptionKey.getBytes(StandardCharsets.UTF_8), "AES");
        Cipher cipher = Cipher.getInstance("AES");
        cipher.init(Cipher.ENCRYPT_MODE, secretKeySpec);
        byte[] encrypted = cipher.doFinal(passwordText.getBytes());
        log.info("Password encryptor attempted an encryption from -> " + passwordText + " to -> " + Arrays.toString(encrypted));
        // Base64 encoded
        String base64String = Base64.getEncoder().encodeToString(encrypted);
        log.info("Base 64 encoding -> " + base64String);
        log.info("To be used in JS -> " + Base64.getEncoder().encodeToString(encryptionKey.getBytes()));
        return base64String;
    }
}
