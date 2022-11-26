// Different Layout
import NotFound from '~/layouts/NotFound';
import Login from '~/pages/Login';
import Register from '~/pages/Register';
// Pages
import Home from '~/pages/Home';
import Cashier from '~/pages/Cashier';
import Table from '~/pages/Table';
interface Routes {
    path: string;
    Component: React.ComponentType;
    layout?: null | any;
}

const privateRoutes: Routes[] = [
    {
        path: '/',
        Component: Register,
    },
];

const publicRoutes: Routes[] = [
    {
        path: '/',
        Component: Home,
    },
    {
        path: '/cashier',
        Component: Cashier,
    },
    {
        path: '/table',
        Component: Table,
    },
    {
        path: '/login',
        Component: Login,
    },
    {
        path: '*',
        Component: NotFound,
        layout: null,
    },
];

export { publicRoutes, privateRoutes };
