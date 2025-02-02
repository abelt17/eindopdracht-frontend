import React, {useEffect, useState} from "react";
import {useNavigate, useParams} from "react-router";

function FormComponent({onCreate}) {
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
        if (!id) return;
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
        const updatedTracklist = formData.tracklist.map((track, i) =>
            i === index ? { ...track, [field]: event.target.value } : track
        );

        setFormData((prevData) => ({ ...prevData, tracklist: updatedTracklist }));
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        console.log('formulier verzonden:', formData);

        const newAlbum = await saveAlbum(formData);
        if (newAlbum) {
            if (onCreate) {
                onCreate(newAlbum);
            }
        }
    };

    const addTrack = () => {
        setFormData((prevData) => ({
            ...prevData,
            tracklist: [...prevData.tracklist, {title: "", duration: ""}]
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
            const method = id ? 'PUT' : 'POST';
            const url = id
                ? `${import.meta.env.VITE_API_URL}/${id}`
                : `${import.meta.env.VITE_API_URL}`;
            const response = await fetch(url, {
                method: method,
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });
            console.log(JSON.stringify(formData))
            if (response.ok) {
                const data = await response.json();
                console.log('album opgeslagen:', data);
                navigate(`/MusicAlbums/${data.id}`);
                return data;
            } else {
                console.log('fout bij opslaan:', response.statusText);
                return null;
            }
        } catch (error) {
            console.error('error tijdens opslaan:', error);
            return null;
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <form onSubmit={handleSubmit} method="POST" className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
                <div className="mb-4">
                    <label htmlFor="title" className="block text-sm font-medium text-gray-700">Title:</label>
                    <input
                        type="text"
                        id="title"
                        name="title"
                        value={formData.title}
                        onChange={handleInputChange}
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="artist" className="block text-sm font-medium text-gray-700">Artist:</label>
                    <input
                        type="text"
                        id="artist"
                        name="artist"
                        value={formData.artist}
                        onChange={handleInputChange}
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="genre" className="block text-sm font-medium text-gray-700">Genre:</label>
                    <input
                        type="text"
                        id="genre"
                        name="genre"
                        value={formData.genre}
                        onChange={handleInputChange}
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="releaseDate" className="block text-sm font-medium text-gray-700">Release
                        Date:</label>
                    <input
                        type="date"
                        id="releaseDate"
                        name="releaseDate"
                        value={formData.releaseDate}
                        onChange={handleInputChange}
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="coverImageUrl" className="block text-sm font-medium text-gray-700">Cover Image
                        URL:</label>
                    <input
                        type="text"
                        id="coverImageUrl"
                        name="coverImageUrl"
                        value={formData.coverImageUrl}
                        onChange={handleInputChange}
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700">Tracklist:</label>
                    {formData.tracklist.map((track, index) => (
                        <div key={index} className="flex flex-col">
                            <input
                                type="text"
                                name={`tracklist[${index}].title`}
                                placeholder="Track Title"
                                value={track.title}
                                onChange={(e) => handleTrackChange(e, index, "title")}
                                className="flex-1 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                            />
                            <input
                                type="text"
                                name={`tracklist[${index}].duration`}
                                placeholder="Duration"
                                value={track.duration}
                                onChange={(e) => handleTrackChange(e, index, "duration")}
                                className="flex-1 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                            />
                            <button type="button" onClick={() => removeTrack(index)}
                                    className="px-3 py-2 bg-red-500 text-white rounded-md">Remove
                            </button>
                        </div>
                    ))}
                    <button type="button" onClick={addTrack}
                            className="mt-2 px-4 py-2 bg-blue-500 text-white rounded-md">Add Track
                    </button>
                </div>
                <button type="submit"
                        className="w-full px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700">Submit
                </button>
            </form>
        </div>);
}

export default FormComponent;