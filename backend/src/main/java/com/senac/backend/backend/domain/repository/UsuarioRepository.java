package com.senac.backend.backend.domain.repository;

import com.senac.backend.backend.domain.entities.Usuario;
import com.senac.backend.backend.domain.enuns.EnumStatusUsuario;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface UsuarioRepository extends JpaRepository<Usuario, Long> {


    boolean existsUsuarioByEmailContainingAndSenha(String email, String senha);

    List<Usuario> findAllByStatus(EnumStatusUsuario statusUsuario);
}
