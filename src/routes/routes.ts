// Different Layout
import NotFound from '~/layouts/NotFound';
import Login from '~/pages/Login';
import Register from '~/pages/Register';
import { Counter } from '~/features/counter/Counter';
// Pages
import Home from '~/pages/Home';
import Cashier from '~/pages/Cashier';
import Payment from '~/pages/Payment';
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
        path: '/payment',
        Component: Payment,
    },
    {
        path: '/login',
        Component: Counter,
    },
    {
        path: '*',
        Component: NotFound,
        layout: null,
    },
];

export { publicRoutes, privateRoutes };
