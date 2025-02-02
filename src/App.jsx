import {createBrowserRouter, RouterProvider} from 'react-router';
import Layout from './components/Layout.jsx';
import ProductComponent from "./components/Collection.jsx";
import Create from "./components/Create.jsx";
import MusicAlbumDetail from "./components/ProductDetail.jsx";
import Edit from "./components/Edit.jsx";


const router = createBrowserRouter([
    {
        element: <Layout/>,
        children: [
            {
                path: '/',
                element: <ProductComponent/>,
            },
            {
                path: '/create',
                element: <Create/>,
            },
            {
                path: '/musicAlbums/:id',
                element: <MusicAlbumDetail/>,
            },
            {
                path: '/edit/:id',
                element: <Edit/>
            }
        ]
    }
]);
function App() {
    return <RouterProvider router={router}/>;
}

export default App;