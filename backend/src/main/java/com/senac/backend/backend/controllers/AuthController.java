package com.senac.backend.backend.controllers;

import com.senac.backend.backend.model.DTO.LoginResponse;
import com.senac.backend.backend.model.repository.UsuarioRepository;
import com.senac.backend.backend.model.DTO.LoginRequest;
import com.senac.backend.backend.services.TokenService;
import com.senac.backend.backend.services.UsuarioService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;



@RestController
@RequestMapping("/auth")
@Tag(description = "Serviço responsável por controlar a autenticação de usuários e sessão", name = "Serviço de autenticação")
public class AuthController {

    @Autowired private TokenService tokenService;

    @Autowired
    private UsuarioRepository usuarioRepository;

    @Autowired
    private UsuarioService usuarioService;

    @PostMapping("/login")
    @Operation(description = "Valida senha(regra de negócio)", summary = "Login")
    public ResponseEntity<?> login(@RequestBody LoginRequest loginRequest){

        if(usuarioService.ValidaUsuarioSenha(loginRequest)){
        //if (loginRequest.email().equals("hellen.daros@alunos.sc.senac.br") && loginRequest.senha().equals("1234")){

            var token = tokenService.gerarToken(loginRequest.email());

            return ResponseEntity.ok(new LoginResponse(token));
        }

        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();

    }

}