import axios from "axios";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useState } from "react";
import './PokemonDetails.css'
import usePokemonList from "../hooks/usePokemonList";

function PokemonDetails() {
    const {id} = useParams();
    const [pokemon, setPokemon] = useState({});

    async function downloadPokemon() {
        const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`);

        setPokemon({
            name: response.data.name,
            image:
                response.data.sprites.other.dream_world.front_default
                ? response.data.sprites.other.dream_world.front_default
                : response.data.sprites.front_shiny,
            weight: response.data.weight,
            height: response.data.height,
            types: response.data.types.map((t) => t.type.name)
        })
    }
    const [pokemonListState, setPokemonListState] = usePokemonList('https://pokeapi.co/api/v2/type/Fire', true);

    useEffect(() => {
        downloadPokemon();
    }, []);
    
    return (
        <div className="pokemon-details-wrapper"> 
            <div className="pokemon-details-image"><img src= {pokemon.image} /> </div>
            <div className="pokemon-details-name"> name: {pokemon.name} </div>
            <div className="pokemon-details-weight"> weight: {pokemon.weight} </div>
            <div className="pokemon-details-height"> height: {pokemon.height} </div>
            <div className="pokemon-details-types"> {pokemon.types && pokemon.types.map((t) => <div key = {t}> {t} </div>)}
            </div>
            <div>More Fire Type Pokemon!!!
                <ul>
                    {pokemonListState.pokemonList && pokemonListState.pokemonList.map((p) => (<li key={p.pokemon.url}> {p.pokemon.name} </li>))}
                </ul>
            </div>
        </div>
    );
}

export default PokemonDetails;