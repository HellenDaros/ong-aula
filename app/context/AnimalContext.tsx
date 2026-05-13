// "use client";
// import {
//   createContext,
//   ReactNode,
//   useContext,
//   useEffect,
//   useState,
// } from "react";
// import Cookies from "js-cookie";
// import axios from "axios";
// import { Animal, AnimalContextType } from "../types/animal";
// import { buscarListaAnimais } from "../services/animalService";

// const AnimalContext = createContext<AnimalContextType | undefined>(undefined);

// export function AnimalProvider({ children }: { children: ReactNode }) {
//   const [favoritos, setFavoritos] = useState<Animal[]>([]);

//   // useEffect(() => {

//   //     const favoritosRecover = Cookies.get('favoritos_petrescue');
//   //     if (favoritosRecover) {
//   //         try {
//   //             setFavoritos(JSON.parse(favoritosRecover));
//   //         } catch (e) {
//   //             console.error("Erro ao recuperar favoritos:", e);
//   //         }
//   //     }
//   // }, [])

//   useEffect(() => {
//     const sincronizarFavoritos = async () => {
//       const token = Cookies.get("token_petrescue");
//       const favoritosRecover = Cookies.get("favoritos_petrescue");
//       if (!favoritosRecover) return;

//       if (!token) {
//         setFavoritos(JSON.parse(favoritosRecover));
//         return;
//       }

//       try {
//         const favsLocais: Animal[] = JSON.parse(favoritosRecover);

//         const animaisServidor = await buscarListaAnimais();
//         // const response = await axios.get<Animal[]>(
//         //   "http://localhost:8080/animais",
//         // );
//         // const animaisServidor = response.data;
//         if (animaisServidor.length === 0) return;

//         const favsAtualizados = favsLocais.map((favLocal) => {
//           const animalNoServidor = animaisServidor.find(
//             (s) => s.id === favLocal.id,
//           );
//           return animalNoServidor ? animalNoServidor : favLocal;
//         });

//         setFavoritos(favsAtualizados);
//       } catch (e) {
//         console.error("Erro ao sincronizar:", e);
//         setFavoritos(JSON.parse(favoritosRecover));
//       }
//     };

//     sincronizarFavoritos();

//     const intervalo = setInterval(() => {
//       const token = Cookies.get("token_petrescue");
//       if (token) sincronizarFavoritos();
//     }, 30000);
//     return () => clearInterval(intervalo);
//   }, []);

//   useEffect(() => {
//     Cookies.set("favoritos_petrescue", JSON.stringify(favoritos), {
//       expires: 30,
//     });
//   }, [favoritos]);

//   const adicionarFavorito = (animal: Animal) => {
//     setFavoritos((prev) => {
//       if (prev.some((fav) => fav.id === animal.id)) return prev;
//       return [...prev, animal];
//     });
//   };

//   const removerFavorito = (id: number) => {
//     setFavoritos((prev) => prev.filter((animal) => animal.id !== id));
//   };

//   const isFavorito = (id: number) => {
//     return favoritos.some((animal) => animal.id === id);
//   };

//   return (
//     <AnimalContext.Provider
//       value={{ favoritos, adicionarFavorito, removerFavorito, isFavorito }}
//     >
//       {children}
//     </AnimalContext.Provider>
//   );
// }

// export const useAnimal = () => {
//   const context = useContext(AnimalContext);
//   if (!context)
//     throw new Error("useAnimal deve ser usado dentro do AnimalProvider");
//   return context;
// };
