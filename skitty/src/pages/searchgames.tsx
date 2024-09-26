import SpaceLayout from '../layouts/SpaceLayout';

import { instantMeiliSearch } from "@meilisearch/instant-meilisearch";

import instantsearch from "instantsearch.js";
import { hierarchicalMenu, searchBox, hits, stats, clearRefinements, rangeSlider, sortBy, refinementList, pagination, ratingMenu } from "instantsearch.js/es/widgets";

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
            indexName: 'Games',
            routing: true,
            searchClient,
            future: {
                preserveSharedStateOnUnmount: true,
            },
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
            hierarchicalMenu({
                container: '#hierarchical-menu',
                attributes: [
                    'category.lvl0',
                    'category.lvl1',
                ],
            }),
            sortBy({
                container: '#sort-by',
                items: [
                    { value: 'Games', label: 'Relevant' },
                    { value: 'Games:rating:desc', label: 'Most Recommended' },
                    { value: 'Games:rating:asc', label: 'Least Recommended' }
                ]
            }),
            rangeSlider({
                container: '#price-slider',
                attribute: 'price',
            }),
            ratingMenu({
                container: '#rating-menu',
                attribute: 'rating',
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
                        title: item.title.toUpperCase(),
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
                        let total = (hit.img.length + hit.mov?.length)

                        // Use JSX template or ensure HTML template supports map rendering
                        return html`
                            <article class="flex flex-col h-full overflow-hidden justify-between items-start">

                                <div class="rounded-lg h-48 justify-center content-center w-full object-contain overflow-hidden" id=${id}>

                                ${typeof hit.img === 'string'
                                ? html`<img src="${hit.img}" alt="Image" />`
                                : html`<img src="${hit.img[imgmov]}" alt="Image" />`}
                                </div>

                                ${(typeof hit.img === 'string' || ((hit.img.length + hit.mov?.length == 1))) ? html`` : html`
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
                                ` }
                                    
                                    <a id=${hit.id} href=${(() => {
                                if (hit.src) {
                                    return "https://amazon.in" + hit.src
                                }
                                return "/product/" + hit.id
                            })()}>
                                        <h2 class="dark:text-blue-200 text-lg text-clip line-clamp-4 ">
                                            ${hit.__position}:
                                            ${components.Highlight({ attribute: 'title', hit })}
                                        </h2>
                                        <p class="dark:text-blue-300 text-clip line-clamp-4">${components.Snippet({ attribute: 'info', highlightedTagName: 'mark', hit })}</p>
                                    </a>
                                    ${hit.date ? html`<p class="dark:text-blue-200">Date: ${(new Date(Number(hit.date) * 1000)).toLocaleDateString()}</p>` : html``}
                                    <p class="dark:text-blue-200">Developer: ${hit.dev ?? hit.brand}</p>
                                    <p class="dark:text-blue-200">Price: ${hit.price}</p>
                                    <ul>
                                        ${hit.gen?.map((gen: string) => html`<button onclick=${() => {
                                search.helper?.toggleFacetRefinement('gen', gen).search();
                            }} class="bg-gray-100 p-1 m-1 rounded-lg">${gen}</button>`)}
                                    </ul>
                                    <ul>
                                        ${hit.cat?.map((cat: string) => html`<button onclick=${() => {
                                search.helper?.toggleFacetRefinement('cat', cat).search();
                            }} class="bg-gray-100 p-1 m-1 rounded-lg">${cat}</button>`)}
                                </ul>
                            </article>
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
                <div class="left-panel">

                    <h3 class='mb-2'>Categories</h3>
                    <div class='mb-4' id="hierarchical-menu"></div>

                    <div class='mb-4' id="sort-by"></div>

                    <div id="clear-refinements"></div>

                    <h3>Price</h3>
                    <div class='mb-4' id="price-slider"></div>

                    <h3>Ratings</h3>
                    <div class='mb-4' id="rating-menu"></div>

                    <h2 class='my-2'>Genres</h2>
                    <div id="configure"></div>
                    <div id="genres-list"></div>
                    <h2 class='my-2'>Categories</h2>
                    <div id="categories-list"></div>
                </div>

                <div class="right-panel">
                    <div id="searchbox" class="ais-SearchBox"></div>
                    <div id="stats"></div>
                    <div id="hits"></div>
                    <div id="pagination"></div>
                </div>
            </div>

        </SpaceLayout>
    );
}
