import React, {useState, useEffect} from 'react';
import MusicAlbumCard from './MusicAlbumCard.jsx';
import { GetAlbums } from "./GetAlbums.jsx";
import {Link, Outlet, useNavigate} from 'react-router';

function ProductComponent() {
    const [album, setAlbum] = useState([]);

    useEffect(() => {
        async function fetchData() {
            const Albums = await GetAlbums(); // Call the reusable function
            setAlbum(Albums); // Update state
        }

        fetchData(); // Invoke the function
    }, []); // Empty dependency array ensures it runs only on the first render

    return (

        <ul className="flex flex-wrap gap-4 p-0 m-0 list-none">
            {album ? album.map((album) => (
                <li className="flex-1 min-w-[calc(25%-1rem)] max-w-[calc(25%-1rem)] box-border" key={album.id}>
                    <MusicAlbumCard album={album} />
                    <Link to={`/musicAlbums/${album.id}`}>{album.title} details</Link>
                </li>
            )) : (
                <p>Product laden...</p>
            )}
        </ul>

    );
}

export default ProductComponent;
