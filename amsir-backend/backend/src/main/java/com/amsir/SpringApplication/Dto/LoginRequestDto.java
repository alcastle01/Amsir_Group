package com.amsir.SpringApplication.Dto;

import lombok.Data;

@Data
public class LoginRequestDto {
    public String usernameOrEmail;
    public String password;
}
