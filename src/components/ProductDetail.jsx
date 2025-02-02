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
        <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-4">
            <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-2xl">
                <MusicAlbumCard album={album} />
                <div className="mt-4">
                    <h2 className="text-xl font-semibold mb-4 text-gray-700">Tracklist</h2>
                    <ul className="space-y-2">
                        {album.tracklist?.map((track) => (
                            <li key={track._id} className="flex justify-between items-center p-2 bg-gray-50 rounded-md">
                                <span className="text-gray-700">{track.title}</span>
                                <span className="text-gray-500">{track.duration}</span>
                            </li>
                        ))}
                    </ul>
                </div>
                <div className="mt-6 flex space-x-4">
                    <button
                        onClick={deleteClick}
                        className="bg-red-500 text-white px-4 py-2 rounded-md shadow-md hover:bg-red-600 transition duration-200"
                    >
                        Delete
                    </button>
                    <Link
                        to={`/edit/${album.id}`}
                        className="bg-sky-500 text-white px-4 py-2 rounded-md shadow-md hover:bg-sky-600 transition duration-200"
                    >
                        Edit {album.title}
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default MusicAlbumDetail;