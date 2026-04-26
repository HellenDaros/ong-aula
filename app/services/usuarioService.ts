import axios from "axios";

import api from "./api";
import { Usuario } from "../types/usuarios";


export async function buscarListaUsuarios(): Promise<Usuario[]> {
    const dados = await api.get<Usuario[]>('/usuarios')
            if(dados.status==200){
              return dados.data
            }
    return[]
}

export async function alterarStatusUsuario(usuario: Usuario): Promise<void>{
    var novoStatus = {};
          if(usuario.status==="ATIVO"){
            novoStatus = {status: "INATIVO"}
          }else{
            novoStatus = { status: "ATIVO"}
            //novos testes
          }

    const response = await api.put(`/usuarios/${usuario.id}/AlterarStatus`, { status: novoStatus });

         if(response.status !== 200){
         alert("Erro ao atualizar status!")
         }
}