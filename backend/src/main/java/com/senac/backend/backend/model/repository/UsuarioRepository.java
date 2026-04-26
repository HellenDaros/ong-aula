package com.senac.backend.backend.model.repository;

import com.senac.backend.backend.model.entities.Usuario;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UsuarioRepository extends JpaRepository<Usuario, Long> {


    boolean existsUsuarioByEmailContainingAndSenha(String email, String senha);
}
