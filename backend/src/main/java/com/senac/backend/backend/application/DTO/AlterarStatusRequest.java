package com.senac.backend.backend.application.DTO;

import com.senac.backend.backend.domain.enuns.EnumStatusUsuario;

public record AlterarStatusRequest(EnumStatusUsuario status) {
}
