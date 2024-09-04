import SpaceLayout from '../layouts/SpaceLayout';

import { instantMeiliSearch } from "@meilisearch/instant-meilisearch";

import instantsearch from "instantsearch.js";
import { searchBox, hits, stats, clearRefinements, ratingMenu, rangeSlider, sortBy, refinementList, configure, pagination } from "instantsearch.js/es/widgets";

import { createEffect } from 'solid-js';

import './searchgames.css';

export default function SearchGames() {

    createEffect(() => {
        const { searchClient } = instantMeiliSearch(
            'https://ms-adf78ae33284-106.lon.meilisearch.io',
            'a63da4928426f12639e19d62886f621130f3fa9ff3c7534c5d179f0f51c4f303',
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
                    { value: 'steam-videogames:recommendationCount:desc', label: 'Most Recommended' },
                    { value: 'steam-videogames:recommendationCount:asc', label: 'Least Recommended' }
                ]
            }),
            ratingMenu({
                container: '#rating-menu',
                attribute: 'recommendationCount',
            }),
            rangeSlider({
                container: '#recommendationCount-slider',
                attribute: 'recommendationCount',
            }),
            refinementList({
                container: "#genres-list",
                attribute: "genres",
            }),
            refinementList({
                container: "#categories-list",
                attribute: "categories",
            }),
            refinementList({
                container: "#platforms-list",
                attribute: "platforms",
            }),
            // configure({
            //     hitsPerPage: 6,
            //     snippetEllipsisText: "...",
            //     attributesToSnippet: ["description:50"],
            // }),
            hits({
                container: "#hits",
                templates: {
                    item: `
                    <div>
                        <div class="hit-name">
                        {{#helpers.highlight}}{ "attribute": "name" }{{/helpers.highlight}}
                        </div>
                        <img src="{{image}}" align="left" />
                        <div class="hit-description">
                        {{#helpers.snippet}}{ "attribute": "description" }{{/helpers.snippet}}
                        </div>
                        <div class="hit-info">price: {{price}}</div>
                        <div class="hit-info">release date: {{releaseDate}}</div>
                    </div>
                `,
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
                    <div id="genres-list"></div>
                    <h2>Categories</h2>
                    <div id="categories-list"></div>
                    <h2>Platforms</h2>
                    <div id="platforms-list"></div>
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