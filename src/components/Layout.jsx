import {Link, Outlet} from 'react-router';

function Layout() {
    return (
        <div>
            <header className="bg-gray-900 text-white py-4 shadow-md">
                <nav className="container mx-auto flex justify-center gap-6">
                    <Link
                        to="/"
                        className="px-4 py-2 rounded-md bg-gray-800 hover:bg-gray-700 transition duration-200 text-white"
                    >
                        Home
                    </Link>
                    <Link
                        to="/create"
                        className="px-4 py-2 rounded-md bg-sky-600 hover:bg-sky-500 transition duration-200 text-white"
                    >
                        Add Album
                    </Link>
                </nav>
            </header>
            <main>
                <Outlet/>
            </main>
        </div>
    );
}

export default Layout;