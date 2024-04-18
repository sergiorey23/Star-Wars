import axios from "axios";
import { useState, useEffect } from "react";
import { useParams } from 'react-router-dom';
//import { useNavigate } from 'react-router-dom';

const Character = () => {
    const { id } = useParams();
    const [character, setCharacter] = useState({});
    const [films, setFilms] = useState([]);
    const [species, setSpecies] = useState([]);
    const [homeworld, setHomeworld] = useState({});
    /*     const navigate = useNavigate();
    
        const pulsado = (page) => {
            navigate(`/character/${parseInt(id) + page}`);
        } */
    useEffect(() => {
        axios
            .get(`https://swapi.dev/api/people/${id}`)
            .then((res) => {
                var result = res.data;
                setCharacter(result);
                result.films = result.films.map((film) => {
                    return axios.get(film).then((res) => res.data.title);
                });
                Promise.all(result.films).then((films) => setFilms(films));
                result.species = result.species.map((species) => {
                    return axios.get(species).then((res) => res.data.name);
                });
                Promise.all(result.species).then((species) => setSpecies(species));
                axios.get(result.homeworld).then((res) => setHomeworld(res.data));
            })
    }, [])

    return (
        <div>
            <h1>{character.name}</h1>
            <p>Height: {character.height}</p>
            <p>Mass: {character.mass}</p>
            <p>Hair Color: {character.hair_color}</p>
            <p>Gender: {character.gender}</p>
            <p>Birth Year: {character.birth_year}</p>
            <p>Eye Color: {character.eye_color}</p>
            <h3>Homeworld:</h3>
            <ul>
                <li>Name: {homeworld.name}</li>
                <li>Population: {homeworld.population}</li>
                <li>Climate: {homeworld.climate}</li>
                <li>Terrain: {homeworld.terrain}</li>
            </ul>
            <h2>Films</h2>
            <ul>
                {films && films.map((film) => (
                    <li key={film}>
                        {film}
                    </li>
                ))}
            </ul>
            <h2>Species</h2>
            <ul>
                {species && species.map((species) => (
                    <li key={species}>
                        {species}
                    </li>
                ))}
            </ul>
            <img src={`https://starwars-visualguide.com/assets/img/characters/${id}.jpg`} alt={id} />
            {/* <br />
            <div>{
                parseInt(id) > 1 &&
                <button onClick={pulsado(-1)}>Back</button>
            }
                <button onClick={pulsado(+1)}>Next</button>
            </div> */}
        </div>
    )
}

export default Character