import axios from "axios";
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
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
    const query = new URLSearchParams(useLocation().search);
    const page = query.get('page') || 1;
    useEffect(() => {
        axios
            .get(`https://swapi.dev/api/people?page=${page}`)
            .then((res) => {
                var results = res.data.results;
                results = results.map((character) => {
                    character.id = getIdFromUrl(character.url);
                    return character;
                });
                setCharacters(results);
                setPaginationLinks(getPaginationLinks(res.data.count, 10));
            })
    }, [])

    return (
        <div>
            <h1>Star Wars Characters</h1>
            <div className="container">
                {characters.map((character) => (
                    <div key={character.name}>
                        <a href={`/character/${character.id}`} target="_blank">
                            <img width="300px" src={`https://starwars-visualguide.com/assets/img/characters/${character.id}.jpg`} alt={character.name} />
                            <br />
                            {character.name}
                            <br />
                            <br />
                        </a>
                    </div>
                ))}
            </div>
            <br />
            <div className="pagination">
                {paginationLinks.map((link) => (
                    <a style={{ margin: "10px" }} key={link} href={`?page=${link + 1}`}>{link + 1}</a>
                ))}
            </div>
        </div >
    )
}

export default Home