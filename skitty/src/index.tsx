import { render } from 'solid-js/web'
import { Router, type RouteDefinition } from "@solidjs/router";
import { lazy, createSignal } from 'solid-js';

import { ConnectProvider } from './components/connect';

import './app.css'

import Login from './pages/login';
import Profile from './pages/profile';
import Docs from './pages/docs';
import { OrderDetails, OrderModal, QuestionModal } from './pages/orderdetails';
import Test from './pages/test';
import Home from './pages/home';
import SearchProducts from './pages/searchproducts';
import { ReviewsModal, Reviews } from './pages/reviews';
import SearchDrawer from './components/searchdrawer';
import Payment from './pages/payment';
import { Checkout } from './pages/checkout';
import { ProductModal, Products } from './pages/products';

export const routes: RouteDefinition[] = [
    {
        path: '/',
        component: Home,
    },
    {
        path: '/form',
        component: lazy(() => import('./pages/form')),
    },
    {
        path: '/login',
        component: Login,
    },
    {
        path: '/profile',
        component: Profile,
    },
    {
        path: '/docs',
        component: Docs,
    },
    {
        path: '/test',
        component: Test,
    },
    {
        path: '/search',
        component: SearchProducts,
    },
    {
        path: '/searchdrawer',
        component: SearchDrawer,
    },
    {
        path: '/payment',
        component: Payment,
    },
    {
        path: '/checkout',
        component: Checkout,
    },
    {
        path: '/reviews',
        component: Reviews,
    },
    {
        path: '/reviewsmodal',
        component: ReviewsModal,
    },
    {
        path: '/search/:productId',
        component: SearchProducts,
    },
    {
        path: '/product/:productId',
        component: Products,
    },
    {
        path: '/productmodal',
        component: ProductModal,
    },
    {
        path: '/order/:orderId',
        component: OrderDetails,
    },
    {
        path: '/ordermodal',
        component: OrderModal,
    },
    {
        path: '/questionmodal',
        component: QuestionModal,
    },
    {
        path: '**',
        component: lazy(() => import('./pages/404')),
    },
    {
        path: '/routes',
        component: RouteList,
    }
];


function RouteList() {
    const [iframeSrc, setIframeSrc] = createSignal('/login');

    return (
        <div class="w-full flex flex-row h-screen">
            <span class="p-4">
                {
                    routes.map((e) => (
                        <>
                            <p
                                class="underline"
                                onclick={() => setIframeSrc(e.path)}
                            >
                                {e.path}
                            </p>
                        </>
                    ))
                }
                <p class='text-red-400'>{iframeSrc()}</p>
            </span>
            <iframe src={iframeSrc()} class="w-full" />
        </div>
    );
}
render(
    () =>
        <ConnectProvider>
            <Router>{routes}</Router>
        </ConnectProvider>
    , document.body!
)
