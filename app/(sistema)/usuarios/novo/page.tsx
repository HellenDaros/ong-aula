import { Usuario } from "@/app/context/AuthContext"
import Link from "next/link"
import UsuarioForm from "../components/UsuarioForm"

export default function cadastrarUsuario(){
    return(
       <div>
        <div>
            <Link href="/usuarios">Voltar</Link>
        </div>
        <UsuarioForm/>
       </div>
    )
}