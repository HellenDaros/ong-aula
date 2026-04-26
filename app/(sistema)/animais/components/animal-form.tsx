"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import Link from "next/link";
import { Animal, AnimalFormProps } from "@/app/types/animal";
import { salvarAnimal } from "@/app/services/animalService";

export default function AnimalForm({ animalExistente }: AnimalFormProps) {
  const router = useRouter();

  const [animal, setAnimal] = useState<Animal>(
    animalExistente || new Animal(null, "", "", "", "", "DISPONIVEL"),
  );

  const isEdicao = !!animalExistente;

  const handleChange = (campo: keyof Animal, valor: string) => {
    setAnimal((prev) => {
      const novoAnimal = { ...prev, [campo]: valor };

      return new Animal(
        prev.id,
        campo === "nameAnimal" ? valor : prev.nameAnimal,
        campo === "especie" ? valor : prev.especie,
        campo === "raca" ? valor : prev.raca,
        campo === "urlFoto" ? valor : prev.urlFoto,
        campo === "statusAnimal" ? valor : prev.statusAnimal,
      );
    });
  };

  // const handleSalvar = async () => {
  //   try {
  //     let dadosResult;
  //     if (isEdicao) {
  //       dadosResult = await axios.put(
  //         `http://localhost:8080/animais/${animal.id}`,
  //         animal,
  //       );
  //     } else {
  //       dadosResult = await axios.post("http://localhost:8080/animais", animal);
  //     }

  //     if (dadosResult.status === 200 || dadosResult.status === 201) {
  //       alert("Animal salvo com sucesso!");
  //       router.push("/animais");
  //     }
  //   } catch (error) {
  //     console.error(error);
  //     alert("Erro ao salvar os dados do animal.");
  //   }
  // };

  const handleSalvar = async () => {

        const sucesso = await salvarAnimal(animal, !!animalExistente);
        
        if (sucesso) {
            alert("Sucesso!");
            router.push("/animais");
        } else {
            alert("Erro ao salvar dados.");
        }
    };

  return (
    <div className="flex-1 flex items-center justify-center p-6">
      <div className="w-full max-w-lg bg-white rounded-[2.5rem] shadow-xl shadow-stone-200/50 border border-stone-100 overflow-hidden">
        <div className="bg-stone-50/50 px-10 py-8 border-b border-stone-100">
          <h2 className="text-2xl font-black text-[#008080] tracking-tight">
            {animalExistente ? "Editar Pet" : "Novo Protegido"}
          </h2>
          <p className="text-slate-500 text-sm font-medium">
            Preencha as informações do animal.
          </p>
        </div>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSalvar();
          }}
          className="p-10 space-y-6"
        >
          {/* Campo: Nome */}
          <div className="space-y-2">
            <label className="text-[11px] font-black uppercase tracking-widest text-slate-400 ml-1">
              Nome do Pet
            </label>
            <input
              type="text"
              required
              onChange={(e) => handleChange("nameAnimal", e.target.value)}
              value={animal.nameAnimal}
              placeholder="Ex: Bolinha"
              className="w-full bg-stone-50 border-2 border-stone-50 focus:border-teal-500 focus:bg-white outline-none px-5 py-4 rounded-2xl text-slate-700 font-bold transition-all placeholder:text-stone-300"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-[11px] font-black uppercase tracking-widest text-slate-400 ml-1">
                Espécie
              </label>
              <select
                value={animal.especie}
                onChange={(e) => handleChange("especie", e.target.value)}
                className="w-full bg-slate-50 border-2 border-transparent focus:border-[#9BF6FF] focus:bg-white outline-none px-5 py-4 rounded-2xl text-slate-700 font-bold transition-all"
              >
                <option value="">Selecione...</option>
                <option value="CACHORRO">Cachorro</option>
                <option value="GATO">Gato</option>
                <option value="PASSARO">Pássaro</option>
                <option value="HAMISTER">Hamister</option>
                <option value="OUTROS">Outros</option>
              </select>
            </div>

            <div className="space-y-2">
              <label className="text-[11px] font-black uppercase tracking-widest text-slate-400 ml-1">
                Raça
              </label>
              <input
                type="text"
                required
                onChange={(e) => handleChange("raca", e.target.value)}
                value={animal.raca}
                placeholder="Vira-lata, Poodle..."
                className="w-full bg-stone-50 border-2 border-stone-50 focus:border-teal-500 focus:bg-white outline-none px-5 py-4 rounded-2xl text-slate-700 font-bold transition-all"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-[11px] font-black uppercase tracking-widest text-slate-400 ml-1">
              URL da Foto
            </label>
            <input
              type="text"
              required
              onChange={(e) => handleChange("urlFoto", e.target.value)}
              value={animal.urlFoto}
              placeholder="http://..."
              className="w-full bg-stone-50 border-2 border-stone-50 focus:border-teal-500 focus:bg-white outline-none px-5 py-4 rounded-2xl text-slate-700 font-bold transition-all"
            />
          </div>

          <div className="flex items-center gap-4 pt-4">
            <Link
              href="/animais"
              className="flex-1 text-center py-4 rounded-2xl font-black text-slate-400 hover:text-slate-600 hover:bg-stone-50 transition-all"
            >
              Cancelar
            </Link>

            <button
              type="submit"
              className="flex-1 bg-[#008080] hover:bg-teal-700 text-white py-4 rounded-2xl font-black transition-all shadow-lg shadow-teal-100 active:scale-95"
            >
              Salvar Pet
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
