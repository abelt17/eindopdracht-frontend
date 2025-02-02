import React, { useEffect, useState} from "react";
import {useNavigate, useParams} from "react-router";

function FormComponent({ onCreate}) {
    const {id} = useParams();
    const [album, setAlbum] = useState([]);
    const [formData, setFormData] = useState({
        title: '',
        artist: '',
        genre: '',
        releaseDate: '',
        coverImageUrl: '',
        tracklist: [],
    });

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

    useEffect(() => {
        if (album) {
            setFormData({
                title: album.title || '',
                artist: album.artist || '',
                genre: album.genre || '',
                releaseDate: album.releaseDate || '',
                coverImageUrl: album.coverImageUrl || '',
                tracklist: album.tracklist || [],
            });
        }
    }, [album]);

    const navigate = useNavigate();

    useEffect(() => {
        console.log(formData)
    }, [formData]);

    const handleInputChange = (event) => {
        const {name, value} = event.target;
        setFormData({
            ...formData,
            [name]: value,
        })
    };
    const handleTrackChange = (event, index, field) => {
        const updatedTracklist = [...formData.tracklist];
        updatedTracklist[index][field] = event.target.value;
        setFormData((prevData) => ({ ...prevData, tracklist: updatedTracklist }));
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        console.log('formulier verzonden:', formData);

        const newAlbum = await saveAlbum();
        if (newAlbum) {
            onCreate(newAlbum);
        }
    };

    const addTrack = () => {
        setFormData((prevData) => ({
            ...prevData,
            tracklist: [...prevData.tracklist, { title: "", duration: "" }]
        }));
    };

    const removeTrack = (index) => {
        setFormData((prevData) => ({
            ...prevData,
            tracklist: prevData.tracklist.filter((_, i) => i !== index)
        }));
    };

    const saveAlbum = async () => {
        try {
            const response = await fetch(`${import.meta.env.VITE_API_URL}`, {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                const data = await response.json();
                console.log('album opgeslagen:', data);
                navigate(`/MusicAlbums/${data.id}`);
                return data;
            } else {
                console.log('fout bij opslaan:', response.statusText);
                return null;
            }
        } catch (error){
            console.error('error tijdens opslaan:', error);
            return null;
        }
    };

    return (
        <form onSubmit={handleSubmit} method="POST">
            <div>
                <label htmlFor="title">title:</label>
                <input
                    type="text"
                    id="title"
                    name="title"
                    value={formData.title}
                    onChange={handleInputChange}
                />
            </div>
            <div>
                <label htmlFor="title">artist:</label>
                <input
                    type="text"
                    id="artist"
                    name="artist"
                    value={formData.artist}
                    onChange={handleInputChange}
                />
            </div>
            <div>
                <label htmlFor="title">genre:</label>
                <input
                    type="text"
                    id="genre"
                    name="genre"
                    value={formData.genre}
                    onChange={handleInputChange}
                />
            </div>
            <div>
                <label htmlFor="title">releaseDate:</label>
                <input
                    type="text"
                    id="releaseDate"
                    name="releaseDate"
                    value={formData.releaseDate}
                    onChange={handleInputChange}
                />
            </div>
            <div>
                <label htmlFor="title">coverImageUrl:</label>
                <input
                    type="text"
                    id="coverImageUrl"
                    name="coverImageUrl"
                    value={formData.coverImageUrl}
                    onChange={handleInputChange}
                />
            </div>
            <div>
                <label>Tracklist:</label>
                {formData.tracklist.map((track, index) => (
                    <div key={index}>
                        <input
                            type="text"
                            name={`tracklist[${index}].title`}
                            placeholder="Track Title"
                            value={track.title}
                            onChange={(e) => handleTrackChange(e, index, "title")}
                        />
                        <input
                            type="text"
                            name={`tracklist[${index}].duration`}
                            placeholder="Duration"
                            value={track.duration}
                            onChange={(e) => handleTrackChange(e, index, "duration")}
                        />
                        <button type="button" onClick={() => removeTrack(index)}>Remove</button>
                    </div>
                ))}
                <button type="button" onClick={addTrack}>Add Track</button>
            </div>
            <button type="submit">Submit</button>
        </form>
    );
}

export default FormComponent;