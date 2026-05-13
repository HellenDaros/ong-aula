import { Animal } from "@/app/types/animal";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import Cookies from "js-cookie";

interface FavoritoState {
  items: Animal[];
}

const favoritosRecover = Cookies.get("favoritos_petrescue");

const initialState: FavoritoState = {
  items: favoritosRecover ? JSON.parse(favoritosRecover) : [],
};

const favoritoSlice = createSlice({
  name: "favoritos",
  initialState,
  reducers: {
    setFavoritos: (state, action: PayloadAction<Animal[]>) => {
      state.items = action.payload;
      Cookies.set("favoritos_petrescue", JSON.stringify(state.items), {
        expires: 30,
      });
    },
    adicionarFavorito: (state, action: PayloadAction<Animal>) => {
      if (!state.items.some((fav) => fav.id === action.payload.id)) {
        state.items.push(action.payload);
        Cookies.set("favoritos_petrescue", JSON.stringify(state.items), {
          expires: 30,
        });
      }
    },
    removerFavorito: (state, action: PayloadAction<number>) => {
      state.items = state.items.filter(
        (animal) => animal.id !== action.payload,
      );
      Cookies.set("favoritos_petrescue", JSON.stringify(state.items), {
        expires: 30,
      });
    },
  },
});

export const { setFavoritos, adicionarFavorito, removerFavorito } =
  favoritoSlice.actions;
export default favoritoSlice.reducer;
