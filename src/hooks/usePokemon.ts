import { useGetPokemonByIdQuery } from "../store/pokemonApiSlice";

export const usePokemon = (id: string) => {
  const { data, error, isLoading } = useGetPokemonByIdQuery(id);
  return { data, error, isLoading };
};
