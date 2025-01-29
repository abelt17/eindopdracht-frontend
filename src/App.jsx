import {createBrowserRouter, RouterProvider} from 'react-router';
import Layout from './components/Layout.jsx';
import ProductComponent from "./components/Collection.jsx";
import Create from "./components/Create.jsx";
import ProductDetail from "./components/ProductDetail.jsx";

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
                path: '/products/:id',
                element: <ProductDetail/>,
            },
        ]
    }
]);
function App() {
    return <RouterProvider router={router}/>;
}

export default App;