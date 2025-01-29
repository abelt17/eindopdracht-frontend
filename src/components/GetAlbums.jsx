export async function GetAlbums() {
    try {
        const response = await fetch('http://145.24.223.235:8000/musicAlbums/', {
            method: 'GET',
            headers: {
                Accept: 'application/json',
            },
        });
        const data = await response.json();
        return data.items;
    } catch (error) {
        console.error('Error fetching albums:', error);
        return [];
    }
}
