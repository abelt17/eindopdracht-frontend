import React from 'react';

const MusicAlbumCard = ({album}) => {
    return (
        <article className="mt-2 bg-black text-white p-4 rounded-md shadow-md flex flex-wrap w-[400px]">
            <li className="text-sky-500 dark:text-sky-400 text-lg font-bold list-none w-full">
                {album.title}
            </li>
            <h3 className="text-xl font-semibold mt-2 w-full">{album.title}</h3>
            <p className="text-gray-300 mt-1 w-full">{album.artist}</p>
            <p className="text-gray-300 mt-1 w-full">{album.genre}</p>
            <p className="text-gray-300 mt-1 w-full">{album.releaseDate}</p>
            {album.coverImageUrl && (
                <img
                    src={album.coverImageUrl}
                    alt={album.title}
                    className="mt-3 rounded-md w-full h-[100px] object-cover"
                />
            )}
        </article>
    );
}
export default MusicAlbumCard;