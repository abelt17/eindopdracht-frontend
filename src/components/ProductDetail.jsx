import React, {useState, useEffect} from 'react';
import MusicAlbumCard from './MusicAlbumCard.jsx';
import {Link, Outlet, useNavigate, useParams} from 'react-router';

function MusicAlbumDetail() {

    const {id} = useParams();
    const [album, setAlbum] = useState([]);
    const navigate = useNavigate();
    useEffect(() => {
        async function fetchData() {
            const albums = await fetch('http://145.24.223.235:8000/musicAlbums/' + id, {
                method: 'GET',
                headers: {
                    Accept: 'application/json',
                },
            });
            const data = await albums.json();
            setAlbum(data); // Update state
        }

        fetchData(); // Invoke the function
    }, [id]); // Empty dependency array ensures it runs only on the first render

    const deleteClick = async () => {
        const albums = await fetch('http://145.24.223.235:8000/musicAlbums/' + id, {
            method: 'DELETE',
            headers: {
                Accept: 'application/json',
            },
        });
        navigate('/');
    }

    return (
        <li className="flex-1 min-w-[calc(25%-1rem)] max-w-[calc(25%-1rem)] box-border" key={album.id}>
            <MusicAlbumCard album={album}/>
            <button onClick={deleteClick}>delete</button>
        </li>
    );
}

export default MusicAlbumDetail;
