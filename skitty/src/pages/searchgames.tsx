import SpaceLayout from '../layouts/SpaceLayout';

import { instantMeiliSearch } from "@meilisearch/instant-meilisearch";

import instantsearch from "instantsearch.js";
import { searchBox, hits, stats, relatedProducts, clearRefinements, rangeSlider, sortBy, refinementList, pagination } from "instantsearch.js/es/widgets";

import { createEffect } from 'solid-js';

import '../css/searchgames.css';

export default function SearchGames() {

    createEffect(() => {
        const { searchClient } = instantMeiliSearch(
            "http://localhost:7700",
            "aSampleMasterKey",
            {
                finitePagination: true,
            }
        )

        const search = instantsearch({
            indexName: 'steam-videogames',
            routing: true,
            searchClient,
        })

        search.addWidgets([
            searchBox({
                container: "#searchbox",
                placeholder: "Multiplayer",
            }),
            stats({
                container: '#stats',
            }),
            clearRefinements({
                container: "#clear-refinements",
            }),
            sortBy({
                container: '#sort-by',
                items: [
                    { value: 'steam-videogames', label: 'Relevant' },
                    { value: 'steam-videogames:sale:desc', label: 'Most Recommended' },
                    { value: 'steam-videogames:sale:asc', label: 'Least Recommended' }
                ]
            }),
            rangeSlider({
                container: '#recommendationCount-slider',
                attribute: 'sale',
            }),
            refinementList({
                container: "#genres-list",
                attribute: "gen",
            }),
            refinementList({
                container: "#categories-list",
                attribute: "cat",
            }),
            hits({
                container: "#hits",
                transformItems(items) {
                    return items.map(item => ({
                        ...item,
                        name: item.name.toUpperCase(),
                    }));
                },
                templates: {
                    empty(results, { html }) {
                        return html`No results for <q>${results.query}</q>`;
                    },
                    banner({ banner }, { html }) {
                        return html`<img src="${banner?.image.urls[0].url}" />`;
                    },
                    item(hit: any, { html, components }: any) {
                        let imgmov = 0;

                        let id = "box" + hit.id
                        let total = (hit.img.length + hit.mov.length)

                        // Use JSX template or ensure HTML template supports map rendering
                        return html`
                            <article class="flex flex-col h-full overflow-hidden justify-between items-start">

                                <div class="rounded-lg h-48 content-center w-full object-contain overflow-hidden bg-black" id=${id}>
                                    <img src="${hit.img[imgmov]}" alt="Image" />
                                </div>

                                <div class="flex gap-4 w-full justify-center">
                                    <button onclick=${() => {
                                imgmov = (imgmov - 1) % total;
                                if (imgmov < 0) { imgmov += total }
                                if (imgmov >= hit.img.length) {
                                    document.getElementById(id)!.innerHTML = `<video controls="" autoplay="" name="media"><source type="video/mp4" src="${hit.mov[imgmov - hit.img.length]}"></video>`;
                                } else {
                                    document.getElementById(id)!.innerHTML = `<img src="${hit.img[imgmov]}" />`;
                                }
                            }}>
                                        prev
                                    </button>
                                    <button onclick=${() => {
                                imgmov = (imgmov + 1) % total;
                                if (imgmov >= hit.img.length) {
                                    document.getElementById(id)!.innerHTML = `<video class="h-full" controls="" autoplay="" name="media"><source type="video/mp4" src="${hit.mov[imgmov - hit.img.length]}"></video>`;
                                } else {
                                    document.getElementById(id)!.innerHTML = `<img src="${hit.img[imgmov]}" />`;
                                }
                            }}>
                                        next
                                    </button>
                                </div>
                                    
                                    <a id=${hit.id} href=${"/product/" + hit.id}>
                                        <h2 class="dark:text-blue-200 text-lg text-clip line-clamp-4 ">
                                            ${hit.__position}:
                                            ${components.Highlight({ attribute: 'name', hit })}
                                        </h2>
                                        <p class="dark:text-blue-300 text-clip line-clamp-4">${components.Snippet({ attribute: 'info', highlightedTagName: 'mark', hit })}</p>
                                    </a>
                                    <p class="dark:text-blue-200">Date: ${(new Date(Number(hit.date) * 1000)).toLocaleDateString()}</p>
                                    <p class="dark:text-blue-200">Developer: ${hit.dev}</p>
                                    <ul>
                                        ${hit.gen.map((gen: string) => html`<button onclick=${() => {
                                search.helper?.toggleFacetRefinement('gen', gen).search();
                            }} class="bg-gray-100 p-1 m-1 rounded-lg">${gen}</button>`)}
                                    </ul>
                                    <ul>
                                        ${hit.cat.map((cat: string) => html`<button onclick=${() => {
                                search.helper?.toggleFacetRefinement('cat', cat).search();
                            }} class="bg-gray-100 p-1 m-1 rounded-lg">${cat}</button>`)}
                                </ul>
                            </article>
                        `;
                    },
                },
            }),
            relatedProducts({
                container: '#relatedProducts',
                objectIDs: ['0191c061-b5d3-72ca-99ec-3137e788fee6'],
                templates: {
                    item(recommendation, { html }) {
                        return html`
                            <h2>${recommendation.name}</h2>
                            <p>${recommendation.description}</p>
                        `;
                    },
                },
            }),
            pagination({
                container: "#pagination",
            }),
        ]);

        search.start();

    })

    return (
        <SpaceLayout two title='Home'>

            <div class="ais-InstantSearch">
                <h1>MeiliSearch + InstantSearch.js</h1>
                <h2>Search in Steam video games 🎮</h2>
                <p>
                    This is not the official Steam dataset but only for demo purpose. Enjoy
                    searching with MeiliSearch!
                </p>

                <div class="left-panel">
                    <div id="clear-refinements"></div>

                    <div id="sort-by"></div>
                    <div id="recommendationCount-slider"></div>
                    <div id="rating-menu"></div>

                    <h2>Genres</h2>
                    <div id="configure"></div>
                    <div id="genres-list"></div>
                    <h2>Categories</h2>
                    <div id="categories-list"></div>
                </div>

                <div class="right-panel">
                    <div id="searchbox" class="ais-SearchBox"></div>
                    <div id="stats"></div>
                    <div id="hits"></div>
                    <div id="pagination"></div>
                    <div id="relatedProducts"></div>
                </div>
            </div>

        </SpaceLayout>
    );
}
