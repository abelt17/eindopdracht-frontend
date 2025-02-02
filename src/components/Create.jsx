import FormComponent from "./FormComponent.jsx";
import React, { useEffect, useState} from "react";

export default function Create() {
    const [album, setAlbum] = useState([]);
    useEffect(() => {
        async function fetchAlbum() {
            try {
                const response = await fetch(`${import.meta.env.VITE_API_URL}`, {
                    method: 'GET',
                    headers: {
                        'Accept': 'application/json',
                    }
                });
                const data = await response.json();
                setAlbum(data.items);
                console.log(data.items);
            } catch (error) {
                console.log('fout bij het ophalen van het album:', error);
            }
        }

        console.log(album);
        fetchAlbum();
    }, []);

    const onAlbumCreate = (newAlbum) => {
        setAlbum((prevAlbums) => [...prevAlbums, newAlbum]);
    }

    return (
        <FormComponent onCreate={onAlbumCreate}/>
    )
}