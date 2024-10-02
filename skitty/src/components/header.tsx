import { JSXElement } from "solid-js";
import { useConnect } from "../connect/connect";
import { MaterialButton, OutlinedButton } from "./button";
import { PositionBox2, ToggleOptions } from "./dropdown";
import { ListTile } from "./heading";
import { CartIcon, CrossIconFilled, DownIcon, UserIcon } from "./svg";
import ThemeToggle from "./theme_toggle";
import { useNavigate } from "@solidjs/router";
import { RevokeReq } from "../connect/auth";

export const Header = () => (
    <header>
        <nav class="bg-white dark:bg-gray-900 antialiased">
            <div class="max-w-screen-xl px-4 mx-auto 2xl:px-0 py-0">
                <div class="flex items-center justify-between">

                    <div class="flex items-center space-x-8">
                        <a href="/" title="" class="">
                            <div class="flex items-center space-x-2">
                                <img class="block w-auto h-12" src="https://cdn-icons-png.flaticon.com/128/12244/12244295.png" alt="" />
                                {/* <H4>Atlantic</H4> */}
                            </div>
                        </a>

                        <ul class="hidden lg:flex items-center justify-start gap-2 md:gap-2 py-3 sm:justify-center">
                            <HeaderLinks href="/products?Atlantic%3Arating%3Adesc%5BhierarchicalMenu%5D%5Bcategory.lvl0%5D%5B0%5D=games" title="Games" />
                            <HeaderLinks href="/products" title="Best Sellers" />
                            <HeaderLinks href="/products?Atlantic%3Arating%3Adesc%5BhierarchicalMenu%5D%5Bcategory.lvl0%5D%5B0%5D=electronics" title="Electronics" />
                        </ul>
                    </div>

                    <div class="flex items-center lg:space-x-2">

                        <ThemeToggle />

                        <CartModal />

                        <AccountModal />

                    </div>
                </div>

            </div>
        </nav >

    </header >
);

export const AccountModal = () => {

    const connect = useConnect();

    return (
        <TransitionWidget showFirstWidget={connect.user != null}
            one={
                <PositionBox2 name={<p>{UserIcon()}{<span>Account</span>}{DownIcon()}</p>} align={{ x: 0, y: 1 }}>
                    <div class="z-50 m-2 my-4 text-base list-none bg-white divide-y divide-gray-100 rounded-lg shadow dark:bg-gray-700 dark:divide-gray-600" id="user-dropdown">
                        <div class="px-4 py-3">
                            <span class="block text-sm text-gray-900 dark:text-white">Bonnie Green</span>
                            <span class="block text-sm  text-gray-500 truncate dark:text-gray-400">name@flowbite.com</span>
                        </div>
                        <ul class="py-2" aria-labelledby="user-menu-button">
                            <HeaderLinks href="/profile" title="Profile" />
                            <HeaderLinks href="/dashboard" title="Dashboard" />
                            <HeaderLinks href="/settings" title="Settings" />
                            <HeaderLinks href="" title="Sign out" fn={() => { RevokeReq(connect, -1) }} />
                        </ul>
                    </div>
                </PositionBox2>
            }
            two={<OutlinedButton><a href="/login">Log In</a></OutlinedButton>}>

        </TransitionWidget>
    );
}

export const HeaderLinks = (props: { href: string, title: string, fn?: () => void }) => {
    const navigate = useNavigate();

    const handleLinkClick = (event: MouseEvent) => {
        event.preventDefault();
        console.log(props.href)
        if (props.fn) props.fn();
        navigate(props.href, { replace: false }); // Forces navigation even if the URL is similar
        setTimeout(() => {
            location.reload()
        }, 10)
    };

    return <li>
        <a onClick={handleLinkClick} href={props.href} title={props.title} class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">
            {props.title}
        </a>
    </li>;
}

export function CartModal() {

    const connect = useConnect();
    const navigate = useNavigate();


    return (
        <ToggleOptions show={connect.cartbox?.loading == true && connect.cartbox?.cart != null} name={<p>{CartIcon()}{<span>My Cart</span>}{DownIcon()}</p>}>

            <div class="min-w-[300px] z-10 mx-auto space-y-4 overflow-hidden rounded-lg bg-white p-4 antialiased shadow-lg dark:bg-gray-800">

                {
                    connect.cartbox?.cart == null
                        ?
                        <>Cart is empty</>
                        :
                        <>
                            {connect.cartbox?.cart.items.map((c) => (
                                <ListTile
                                    end={<CrossIconFilled />}
                                    title={c.name}
                                    subtitle={"Qty:" + c.quantity}
                                />
                            ))}

                            <MaterialButton onClick={() => { navigate("/cart", { replace: false }); }} class="w-full items-center justify-center">Proceed to Checkout</MaterialButton>

                            {connect.cartbox?.loading == true ? "Loading" : ""}
                        </>
                }

            </div>

        </ToggleOptions>
    );
}

const TransitionWidget = (props: { showFirstWidget: boolean, one: JSXElement, two: JSXElement }) => {
    return (
        <div class="relative">
            <div
                class={`transition-opacity duration-[10sec] ease-in-out ${props.showFirstWidget ? 'opacity-100' : 'opacity-0 hidden'
                    }`}
            >
                {props.one}
                {/* <div class="bg-blue-500 text-white p-4 rounded">
                    <h2 class="text-lg">Widget One</h2>
                </div> */}
            </div>

            <div
                class={`transition-opacity duration-[10sec] ease-in-out ${props.showFirstWidget ? 'opacity-0 hidden' : 'opacity-100'
                    }`}
            >
                {props.two}
                {/* <div class="bg-green-500 text-white p-4 rounded">
                    <h2 class="text-lg">Widget Two</h2>
                </div> */}
            </div>
        </div>
    );
};
