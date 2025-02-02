import FormComponent from "./FormComponent.jsx";
import React, { useEffect, useState} from "react";
import {Link, useParams} from "react-router";

export default function Edit() {
    const {id} = useParams();
    const [album, setAlbum] = useState(null);
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
    const onAlbumEdit = async (updatedAlbum) => {
        try {
            const response = await fetch(`${import.meta.env.VITE_API_URL}/${id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(updatedAlbum),
            });
            if (!response.ok) {
                throw new Error("Error updating album");
            }
        } catch (error) {
            console.error("Error updating album:", error);
        }
    };

    return (
        <FormComponent onCreate={onAlbumEdit} album={album}/>
    )
}