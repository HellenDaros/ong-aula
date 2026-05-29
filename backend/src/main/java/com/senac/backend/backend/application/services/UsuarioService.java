package com.senac.backend.backend.application.services;
import com.senac.backend.backend.application.DTO.*;
import com.senac.backend.backend.domain.entities.Usuario;
import com.senac.backend.backend.domain.repository.UsuarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.stream.Collectors;


@Service
public class UsuarioService {

    @Autowired
    private UsuarioRepository usuarioRepository;

    @Value("${spring.secretkey}")
    private String secret;



    public boolean ValidaUsuarioSenha(LoginRequest loginRequest){
        try {
            return usuarioRepository.existsUsuarioByEmailContainingAndSenha(loginRequest.email(), loginRequest.senha());
        }catch (Exception e){
            throw new RuntimeException(e);
        }

    }

    public List<UsuarioResponse> ListarTodos() {
        try{
            return usuarioRepository.findAll()
                    .stream()
                    .map(UsuarioResponse::new)
                    .collect(Collectors.toList());
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }

    public UsuarioResponse BuscarUsuarioLogado(Authentication authentication) {
        Usuario usuario = (Usuario) authentication.getPrincipal();
        try{
            return  usuarioRepository.findById(usuario.getId())
                    .stream().map(UsuarioResponse::new).findFirst().orElse(null);
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }

    public UsuarioResponse BuscarUsuarioPorId(Long id) {
        try{
            var usuario = usuarioRepository.findById(id).orElse(null);
            return new UsuarioResponse(usuario);
        } catch (Exception e) {
            throw new RuntimeException(e);
        }

    }

    public boolean AterarUsuario(Long id, UsuarioRequest usuario) {

        var usuarioBanco = usuarioRepository.findById(id).orElse(null);

        if (usuarioBanco != null){
            usuarioBanco.setEmail(usuario.email());
            usuarioBanco.setName(usuario.name());
            usuarioBanco.setSenha(usuario.senha());

            usuarioRepository.save(usuarioBanco);

            return true;
        }

        return false;
    }
    public Long SalvarUsuario(UsuarioRequest usuario) {
        try {
            return usuarioRepository.save(new Usuario(usuario)).getId();
        }catch (Exception e){
            throw new RuntimeException(e);
        }

    }
    public Long SalvarUsuarioAdmin(UsuarioAdmRequest usuario) {

        try {
            return usuarioRepository.save(new Usuario(usuario)).getId();
        }catch (Exception e){
            throw new RuntimeException(e);
        }

    }

    public boolean AlterarStatus(Long id, AlterarStatusRequest statusRequest) {

        var usuarioBanco = usuarioRepository.findById(id).orElse(null);

        if (usuarioBanco != null){

            usuarioBanco.setStatus(statusRequest.status());
            usuarioRepository.save(usuarioBanco);

            return true;
        }
        return false;
    }
}

