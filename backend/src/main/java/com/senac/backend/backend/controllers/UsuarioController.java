package com.senac.backend.backend.controllers;

import com.senac.backend.backend.model.DTO.AlterarStatusRequest;
import com.senac.backend.backend.model.entities.Usuario;
import com.senac.backend.backend.model.repository.UsuarioRepository;
import com.senac.backend.backend.services.UsuarioService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.security.core.Authentication;

import java.util.List;

@RestController
@RequestMapping ("/usuarios")

@Tag(name = "Gestão de Usuários", description = "Serviços para controle dos usuários")
public class UsuarioController {

    @Autowired
    private UsuarioRepository usuarioRepository;

    @Autowired
    private UsuarioService usuarioService;

    @GetMapping
    @Operation(summary = "Listar todos", description = "Retorna a lista completa de usuários cadastrados")
    public ResponseEntity<List<Usuario>> listarTodos(){

        var usuarios = usuarioService.ListarTodos();
        return ResponseEntity.ok(usuarios);
    }

    @GetMapping("/usuariologado")
    @Operation(summary = "Consulta usuario logado", description = "busca usuario da sessão")
    public ResponseEntity<Usuario> buscarUsuarioLogado(Authentication authentication){
        Usuario usuario = (Usuario) authentication.getPrincipal();

        return ResponseEntity.ok(usuarioService.BuscarUsuarioLogado(usuario));
    }

    @GetMapping("/{id}")
    @Operation(summary = "Buscar por ID", description = "Busca os detalhes de um usuário específico através do código identificador")
    public ResponseEntity<Usuario> buscarPorId(@PathVariable Long id){
        return ResponseEntity.ok(usuarioService.BuscarUsuarioPorId(id));

    }

    @PostMapping
    @Operation(summary = "Criar novo usuário", description = "Cadastra um novo usuário no sistema")
    public ResponseEntity<Long> salvar(@RequestBody Usuario usuario){
        return ResponseEntity.ok(usuarioRepository.save(usuario).getId());
    }

    @PutMapping("/{id}")
    @Operation(summary = "Atualizar usuário", description = "Altera os dados de um usuário existente")
    public ResponseEntity<?> alterarUsuario(@PathVariable Long id, @RequestBody Usuario usuario){

        var alterarUsuarioResult = usuarioService.AterarUsuario(id,usuario);
        return alterarUsuarioResult ? ResponseEntity.ok("Atualizado com sucesso!") : ResponseEntity.notFound().build();
    }

    @PutMapping("/{id}/AlterarStatus")
    @Operation(summary = "Alterar Status", description = "Ativa ou inativa um usuário")
    public  ResponseEntity<?> AlterarStatus(@PathVariable Long id, @RequestBody AlterarStatusRequest statusRequest) {
        var usuarioBanco = usuarioRepository.findById(id).orElse(null);
        if (usuarioBanco != null){
            usuarioBanco.setStatus(statusRequest.status());
            usuarioRepository.save(usuarioBanco);
            return ResponseEntity.ok("Atualizado com sucesso!");
        }
        return ResponseEntity.notFound().build();
    }

}