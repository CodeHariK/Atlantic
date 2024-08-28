import { type JSX } from 'solid-js';
import { MetaProvider, Title } from "@solidjs/meta";

import { Header } from '../components/header';
import Footer from '../components/footer';

type SpaceLayoutProps = {
    title: string;
    one?: boolean;
    two?: boolean;
    children: JSX.Element;
};

const SpaceLayout = (props: SpaceLayoutProps) => (
    <MetaProvider>
        <Title>{props.title}</Title>

        <main
            class={`${props.one ? "h-full" : ""} ${props.two ? "h-screen" : ""} flex flex-col`}
        >
            <Header />
            <section
                class={`w-full ${props.two ? "h-full overflow-y-scroll" : ""}`}
            >
                {props.children}
            </section>
            <Footer />
        </main>

    </MetaProvider>
);

export default SpaceLayout
