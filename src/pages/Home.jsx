import axios from "axios";
import { useState, useEffect } from "react";

const getIdFromUrl = (url) => url.substring(url.lastIndexOf('/', url.lastIndexOf('/') - 1) + 1, url.lastIndexOf('/'));

const Home = () => {
    const [characters, setCharacters] = useState([]);
    const [charactersImg, setCharactersImg] = useState([]);
    useEffect(() => {
        axios
            .get(`https://swapi.dev/api/people/`)
            .then((res) => {
                setCharacters(res.data.results);
                console.log(res.data)
            })
    }, [])

    return (
        <div>
            <h1>Star Wars Characters</h1>
            <ul>
                {characters.map((character) => (
                    <li key={character.name}>
                        <a href={`/character/${character.url.split('/')[5]}`}>
                            {character.name}
                        </a>
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default Home