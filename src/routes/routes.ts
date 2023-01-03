// Different Layout
import NotFound from '~/layouts/NotFound';
import Login from '~/pages/Login';
import Register from '~/pages/Register';
import AdminLayout from '~/layouts/AdminLayout';
// Pages
import Home from '~/pages/Home';
import Order from '~/pages/Order';
import Table from '~/pages/Table';
import Dashboard from '~/pages/Dashboard';
import Product from '~/pages/Product';
import Coupon from '~/pages/Coupon';
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
        path: '/order',
        Component: Order,
    },
    {
        path: '/table',
        Component: Table,
    },
    {
        path: '/dashboard',
        Component: Dashboard,
        layout: AdminLayout,
    },
    {
        path: '/product',
        Component: Product,
        layout: AdminLayout,
    },
    {
        path: '/coupon',
        Component: Coupon,
        layout: AdminLayout,
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
