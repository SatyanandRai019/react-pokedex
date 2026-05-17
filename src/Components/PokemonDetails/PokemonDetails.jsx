import axios from "axios";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useState } from "react";
import './PokemonDetails.css'

function PokemonDetails() {
    const {id} = useParams();
    const [pokemon, setPokemon] = useState({});

    async function downloadPokemon() {
        console.log("hiii");
        const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`);
        console.log(response);
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
        </div>
    );
}

export default PokemonDetails;