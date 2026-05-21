import axios from "axios";
import { useState, useEffect } from "react";

function usePokemonList(url, type) {
    const [pokemonListState, setPokemonListState] = useState({
        pokemonList: [],
        isLoading: true,
        pokedexUrl: url,
        nextUrl: '',
        prevUrl: ''
    });

    async function downloadPokemons() {

        setPokemonListState({ ...pokemonListState, isLoading: true });

        const response = await axios.get(pokemonListState.pokedexUrl);

        const pokemonResults = response.data.pokemon;

        if (type) {

            setPokemonListState({
                ...pokemonListState,
                pokemonList: response.data.pokemon.slice(0,5),
                isLoading: false
            });
        }
        else {

            // downloading details of all pokemons
            const pokemonResultPromise = pokemonResults.map(
                (pokemon) => axios.get(pokemon.url)
            );

            const pokemonData = await axios.all(
                pokemonResultPromise
            );

            const pokeListResult = pokemonData.map((pokeData) => {

                const pokemon = pokeData.data;

                return {
                    id: pokemon.id,

                    name: pokemon.name,

                    image:
                        pokemon.sprites.other.dream_world.front_default
                            ? pokemon.sprites.other.dream_world.front_default
                            : pokemon.sprites.front_shiny,

                    types: pokemon.types
                };
            });
            console.log(pokeListResult);
            setPokemonListState({ ...pokemonListState, pokemonList: pokeListResult, isLoading: false, nextUrl: response.data.next, prevUrl: response.data.previous });
        }
    }

    useEffect(() => {
        downloadPokemons();
    }, [pokemonListState.pokedexUrl]);

    return [pokemonListState, setPokemonListState]
}

export default usePokemonList;