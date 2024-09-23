import { MaterialButton } from "./button";
import { PositionBox2, ToggleOptions } from "./dropdown";
import { ListTile } from "./heading";
import { CartIcon, CrossIconFilled, DownIcon, UserIcon } from "./svg";
import ThemeToggle from "./theme_toggle";

export const Header = () => (
    <header>
        <nav class="bg-white dark:bg-gray-900 antialiased">
            <div class="max-w-screen-xl px-4 mx-auto 2xl:px-0 py-4">
                <div class="flex items-center justify-between">

                    <div class="flex items-center space-x-8">
                        <a href="/" title="" class="">
                            <div class="flex items-center space-x-2">
                                <img class="block w-auto h-12" src="https://cdn-icons-png.flaticon.com/128/12244/12244295.png" alt="" />
                                {/* <H4>Atlantic</H4> */}
                            </div>
                        </a>

                        <ul class="hidden lg:flex items-center justify-start gap-6 md:gap-8 py-3 sm:justify-center">
                            {HeaderLinks("/", "Home")}
                            {HeaderLinks("/", "Best Sellers")}
                            {HeaderLinks("/", "Gift Ideas")}
                            {HeaderLinks("/", "Today's Deals")}
                            {HeaderLinks("/", "Home")}
                        </ul>
                    </div>

                    <div class="flex items-center lg:space-x-2">

                        <ThemeToggle />

                        <ToggleOptions name={<p>{CartIcon()}{<span>My Cart</span>}{DownIcon()}</p>}>
                            {cartModal()}
                        </ToggleOptions>

                        <ToggleOptions name={<p>{UserIcon()}{<span>Account</span>}{DownIcon()}</p>}>
                            {cartModal()}
                        </ToggleOptions>

                        <PositionBox2 name="Hello" align={{ x: 0, y: 1 }}>
                            {cartModal()}
                        </PositionBox2>

                    </div>
                </div>

            </div>
        </nav >

    </header>
);

function HeaderLinks(href: string, title: string) {
    return <li>
        <a href={href} title={title} class="flex text-sm font-medium text-gray-900 hover:text-primary-700 dark:text-white dark:hover:text-primary-500">
            {title}
        </a>
    </li>;
}

export function cartModal() {
    return (
        <div id="myCartDropdown1" class="min-w-[250px] z-10 mx-auto max-w-sm space-y-4 overflow-hidden rounded-lg bg-white p-4 antialiased shadow-lg dark:bg-gray-800">

            <ListTile end={<span>{<span>Qty: 1</span>} {CrossIconFilled()}</span>} title="title" subtitle="subtitle" ></ListTile>

            <MaterialButton class="w-full items-center justify-center">Proceed to Checkout</MaterialButton>
        </div>
    );
}