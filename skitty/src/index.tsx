import { render } from "solid-js/web";
import { Router, type RouteDefinition } from "@solidjs/router";
import { lazy, createSignal } from "solid-js";

import { ConnectProvider } from "./connect/connect";

import "./css/app.css";

import Login from "./pages/login";
import Profile from "./pages/profile";
import Docs from "./pages/docs";
import Test from "./pages/test";
import Home from "./pages/home";
import SearchProducts from "./pages/searchproducts";
import { Checkout } from "./pages/checkout";
import { Products } from "./pages/products";
import Register from "./pages/register";
import SearchGames from "./pages/searchgames";
import { MyOrders } from "./pages/myorders";
import { Account } from "./pages/account";
import { UploadProduct } from "./pages/uploadproduct";
import { Cart } from "./pages/cart";
import { OrderDetails } from "./pages/orderdetails";
import { ProductPage } from "./pages/product";

export const routes: RouteDefinition[] = [
	{
		path: "/",
		component: Home,
	},
	{
		path: "/login",
		component: Login,
	},
	{
		path: "/register",
		component: Register,
	},
	{
		path: "/profile",
		component: Profile,
	},
	{
		path: "/docs",
		component: Docs,
	},
	{
		path: "/test",
		component: Test,
	},
	{
		path: "/search",
		component: SearchProducts,
	},
	{
		path: "/checkout",
		component: Checkout,
	},
	{
		path: "/searchgames",
		component: Products,
	},
	{
		path: "/products",
		component: SearchGames,
	},
	{
		path: "/product/:productId",
		component: ProductPage,
	},
	{
		path: "/cart",
		component: Cart,
	},
	{
		path: "/myorders",
		component: MyOrders,
	},
	{
		path: "/orderdetails",
		component: OrderDetails,
	},
	{
		path: "/uploadproduct",
		component: UploadProduct,
	},
	{
		path: "/account",
		component: Account,
	},
	{
		path: "**",
		component: lazy(() => import("./pages/404")),
	},
	{
		path: "/routes",
		component: RouteList,
	},
];

function RouteList() {
	const [iframeSrc, setIframeSrc] = createSignal("/test");

	return (
		<div class="w-full flex flex-row h-screen">
			<span class="p-4">
				{routes.map((e) => (
					<>
						<p class="underline" onclick={() => setIframeSrc(e.path)}>
							{e.path}
						</p>
					</>
				))}
				<p class="text-red-400">{iframeSrc()}</p>
			</span>
			<iframe src={iframeSrc()} class="w-full" />
		</div>
	);
}
render(
	() => (
		<ConnectProvider>
			<Router>{routes}</Router>
		</ConnectProvider>
	),
	document.body!,
);
