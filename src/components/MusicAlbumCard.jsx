import React from 'react';

const MusicAlbumCard = ({album}) => {
    return (

        <article className="mt-4 bg-gray-800 text-white p-6 rounded-lg shadow-lg flex flex-col w-[450px]">
            <h2 className="text-sky-400 text-lg font-bold">{album.title}</h2>
            <p className="text-gray-200 mt-1">{album.artist}</p>
            <p className="text-gray-300 mt-1">{album.genre}</p>
            <p className="text-gray-400 mt-1">{new Date(album.releaseDate).toLocaleDateString()}</p>

            {album.coverImageUrl && (
                <img
                    src={album.coverImageUrl}
                    alt={album.title}
                    className="mt-4 rounded-lg w-full h-[200px] object-cover"
                />
            )}
        </article>
    );
}
export default MusicAlbumCard;