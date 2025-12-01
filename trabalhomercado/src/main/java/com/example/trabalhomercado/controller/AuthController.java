package com.example.trabalhomercado.controller;

import java.util.HashMap;
import java.util.Map;
import java.util.UUID;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.trabalhomercado.dto.LoginDto;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = {"http://localhost:5173", "http://localhost:3000"})
public class AuthController {

    // NOTE: Implementação simples; em produção usar serviço de autenticação real
    @PostMapping("/login")
    public ResponseEntity<?> login(@Valid @RequestBody LoginDto login) {
        // Credenciais de exemplo
        String validEmail = "cliente@exemplo.com";
        String validSenha = "12345";

        if (validEmail.equals(login.getEmail()) && validSenha.equals(login.getSenha())) {
            Map<String, String> body = new HashMap<>();
            body.put("message", "Login realizado com sucesso");
            body.put("token", UUID.randomUUID().toString());
            return ResponseEntity.ok(body);
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Credenciais inválidas");
        }
    }
}
