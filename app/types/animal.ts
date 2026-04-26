export class Animal {
  constructor(
    public id: number | null,
    public nameAnimal: string,
    public especie: string,
    public raca: string,
    public urlFoto: string,
    public statusAnimal: string,
  ) {}
}

export interface AnimalContextType {
  favoritos: Animal[];
  adicionarFavorito: (animal: Animal) => void;
  removerFavorito: (id: number) => void;
  isFavorito: (id: number) => boolean;
}

export interface AnimalFormProps {
  animalExistente?: Animal;
}