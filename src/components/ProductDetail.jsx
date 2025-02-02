import React, {useState, useEffect} from 'react';
import MusicAlbumCard from './MusicAlbumCard.jsx';
import {Link, useNavigate, useParams} from 'react-router';


function MusicAlbumDetail() {

    const {id} = useParams();
    const [album, setAlbum] = useState([]);
    const navigate = useNavigate();
    useEffect(() => {
        async function fetchData() {
            const albums = await fetch(`${import.meta.env.VITE_API_URL}/${id}`, {

                method: 'GET',
                headers: {
                    Accept: 'application/json',
                },
            });
            const data = await albums.json();
            setAlbum(data);
        }

        fetchData();
    }, [id]);

    const deleteClick = async () => {
        const deletedAlbum = await fetch(`${import.meta.env.VITE_API_URL}/${id}`, {
            method: 'DELETE',
            headers: {
                Accept: 'application/json',
            },
        });
        if (deletedAlbum.ok){
            navigate('/');
        }
    }

    return (
        <li className="flex-1 min-w-[calc(25%-1rem)] max-w-[calc(25%-1rem)] box-border" key={album.id}>
            <MusicAlbumCard album={album}/>
            <button onClick={deleteClick}>delete</button>
            <Link
                to={`/edit/${album.id}`}
                className="mt-3 inline-block bg-sky-500 text-white px-4 py-2 rounded-md shadow-md
               hover:bg-sky-600 transition duration-200"
            >
                edit {album.title}
            </Link>

        </li>
    );
}

export default MusicAlbumDetail;