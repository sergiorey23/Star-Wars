import axios from "axios";
import { useState, useEffect } from "react";
import './Home.css';

const getIdFromUrl = (url) => url.substring(url.lastIndexOf('/', url.lastIndexOf('/') - 1) + 1, url.lastIndexOf('/'));

const Home = () => {
    const [characters, setCharacters] = useState([]);

    useEffect(() => {
        axios
            .get(`https://swapi.dev/api/people/`)
            .then((res) => {
                var results = res.data.results;
                results = results.map((character) => {
                    character.id = getIdFromUrl(character.url);
                    return character;
                });
                setCharacters(results);
                console.log(res.data)
            })
    }, [])

    return (
        <div>
            <h1>Star Wars Characters</h1>
            <div className="container">
                {characters.map((character) => (
                    <div key={character.name}>
                        <a href={`/character/${character.url.split('/')[5]}`}>
                            {character.name}
                        </a>
                        <br />
                        <img width="300px" src={`https://starwars-visualguide.com/assets/img/characters/${character.id}.jpg`} alt={character.name} />
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Home