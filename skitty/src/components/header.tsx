import { CssUI, ListTile, PositionBox, ThemeToggle } from 'solgaleo/ui';
import { Header } from 'solgaleo/nav';
import { TransitionWidget } from 'solgaleo/fancy';
import { IconCart, IconCross, IconDown, IconUser } from 'solgaleo/svg';

import { RevokeReq } from "../connect/auth";
import { useConnect } from '../connect/connect';
import { A, useNavigate } from '@solidjs/router';

export function AtlanticHeader() {

    return <Header
        // iconSrc='https://cdn-icons-png.flaticon.com/128/12244/12244295.png'
        links={<>
            <A href="/products?Atlantic%3Arating%3Adesc%5BhierarchicalMenu%5D%5Bcategory.lvl0%5D%5B0%5D=games" title="Games" >Games</A>
            <A href="/products" title="Best Sellers" >Best Sellers</A>
            <A href="/products?Atlantic%3Arating%3Adesc%5BhierarchicalMenu%5D%5Bcategory.lvl0%5D%5B0%5D=electronics" title="Electronics" >Electronics</A>
        </>}

        right={
            <>
                <ThemeToggle />

                <CartModal />

                <AccountModal />
            </>
        }>

    </Header>
}

export function CartModal() {

    const connect = useConnect();
    const navigate = useNavigate();

    return (
        <PositionBox
            visible={connect.cartbox?.loading == true && connect.cartbox?.cart != null}
            name={<p>
                {<IconCart />}
                {<span>My Cart</span>}
                {<IconDown />}</p>}>

            <div class="secbg min-w-[300px] z-10 mx-auto space-y-4 overflow-hidden rounded-lg p-4 antialiased shadow-lg">

                {
                    connect.cartbox?.cart == null
                        ?
                        <>Cart is empty</>
                        :
                        <>
                            {connect.cartbox?.cart.items.map((c) => (
                                <ListTile
                                    end={<IconCross />}
                                    title={c.name}
                                    subtitle={"Qty:" + c.quantity}
                                />
                            ))}

                            <button onClick={() => { navigate("/cart", { replace: false }); }} class={"w-full items-center justify-center " + CssUI.MaterialButton}>Proceed to Checkout</button>

                            {connect.cartbox?.loading == true ? "Loading" : ""}
                        </>
                }

            </div>

        </PositionBox>
    );
}

export const AccountModal = () => {

    const connect = useConnect();

    return (
        <TransitionWidget showFirstWidget={connect.user != null}
            one={
                <PositionBox name={<p>{<IconUser />}{<span>Account</span>}{<IconDown />}</p>} align={{ x: 0, y: 1 }}>
                    <div class="z-50 m-2 my-4 text-base list-none bg-white divide-y divide-gray-100 rounded-lg shadow dark:bg-gray-700 dark:divide-gray-600" id="user-dropdown">
                        <div class="px-4 py-3">
                            <span class="block text-sm text-gray-900 dark:text-white">Bonnie Green</span>
                            <span class="block text-sm  text-gray-500 truncate dark:text-gray-400">name@flowbite.com</span>
                        </div>
                        <ul class="py-2" aria-labelledby="user-menu-button">
                            <A href="/profile" title="Profile" />
                            <A href="/dashboard" title="Dashboard" />
                            <A href="/settings" title="Settings" />
                            <A href="" title="Sign out" onClick={() => {
                                RevokeReq(connect, -1)
                            }} />
                        </ul>
                    </div>
                </PositionBox>
            }
            two={<button class={CssUI.OutlinedButton}><a href="/login">Log In</a></button>}>

        </TransitionWidget>
    );
}