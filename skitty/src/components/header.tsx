import { ListTile, MaterialButton, ThemeToggle } from 'solgaleo';
import { Header, HeaderLinks, TransitionModal } from 'solgaleo/nav';
import { ToggleOptions } from 'solgaleo/input';
import { CartIcon, CrossIconFilled, DownIcon } from 'solgaleo/svg';

import { RevokeReq } from "../connect/auth";
import { useConnect } from '../connect/connect';
import { useNavigate } from '@solidjs/router';

export function AtlanticHeader() {
    const connect = useConnect();
    const navigate = useNavigate();

    let navi = (href: string) => {
        // Forces navigation even if the URL is similar
        navigate(href, { replace: false });
    }

    return <Header
        links={<>
            <HeaderLinks fn={navi} href="/products?Atlantic%3Arating%3Adesc%5BhierarchicalMenu%5D%5Bcategory.lvl0%5D%5B0%5D=games" title="Games" />
            <HeaderLinks fn={navi} href="/products" title="Best Sellers" />
            <HeaderLinks fn={navi} href="/products?Atlantic%3Arating%3Adesc%5BhierarchicalMenu%5D%5Bcategory.lvl0%5D%5B0%5D=electronics" title="Electronics" />
        </>}

        rightChildren={
            <>
                <ThemeToggle />

                <CartModal />

                <TransitionModal transition={connect.user != null}>
                    <HeaderLinks href="/profile" title="Profile" fn={navi} />
                    <HeaderLinks href="/dashboard" title="Dashboard" fn={navi} />
                    <HeaderLinks href="/settings" title="Settings" fn={navi} />
                    <HeaderLinks href="" title="Sign out" fn={(href: string) => {
                        RevokeReq(connect, -1)

                        navi(href)
                    }} />
                </TransitionModal>
            </>
        }>

    </Header>
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
