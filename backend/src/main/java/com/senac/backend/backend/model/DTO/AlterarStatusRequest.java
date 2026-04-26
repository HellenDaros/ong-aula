package com.senac.backend.backend.model.DTO;

import com.senac.backend.backend.model.enuns.EnumStatusUsuario;

public record AlterarStatusRequest(EnumStatusUsuario status) {
}
