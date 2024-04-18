import axios from "axios";
import { useState, useEffect } from "react";
import './Home.css';

const getIdFromUrl = (url) => url.substring(url.lastIndexOf('/', url.lastIndexOf('/') - 1) + 1, url.lastIndexOf('/'));

export const getPaginationLinks = (elementsAmount, elementsPerPage) => {
    const pagesAmount = elementsAmount / elementsPerPage;
    const linksData = []
    for (let i = 0; i < pagesAmount; i++) {
        linksData.push(i);
    }
    return linksData;
};

const Home = () => {
    const [characters, setCharacters] = useState([]);
    const [paginationLinks, setPaginationLinks] = useState([]);
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
                setPaginationLinks(getPaginationLinks(res.data.count, res.data.results.length));
            })
    }, [])

    return (
        <div>
            <h1>Star Wars Characters</h1>
            <div className="container">
                {characters.map((character) => (
                    <div key={character.name}>
                        <a href={`/character/${character.id}`} target="_blank">
                            {character.name}
                            <br />
                            <img width="300px" src={`https://starwars-visualguide.com/assets/img/characters/${character.id}.jpg`} alt={character.name} />
                        </a>
                    </div>
                ))}
            </div>
            <br />
            <div className="pagination">
                {paginationLinks.map((page) => (
                    <a key={page} href={`/page/${page}`}>{page + 1}</a>
                ))}
            </div>
        </div>
    )
}

export default Home