import { Breadcrumbs } from "../components/breadcrumb";
import { PositionBox2 } from "../components/dropdown";
import { RatingsBar } from "../components/ratingsbar";
import { CartIcon, DownIcon, FilterIcon, HeartIcon } from "../components/svg";
import SpaceLayout from "../layouts/SpaceLayout";

export function Products() {
   return (

      <SpaceLayout title='Home'>

         <section class="bg-gray-50 py-8 antialiased dark:bg-gray-900 md:py-12">
            <div class="mx-auto max-w-screen-xl px-4 2xl:px-0">

               <div class="mb-4 items-end justify-between space-y-4 sm:flex sm:space-y-0 md:mb-8">

                  <div>
                     {Breadcrumbs()}
                     <h2 class="mt-3 text-xl font-semibold text-gray-900 dark:text-white sm:text-2xl">Electronics</h2>
                  </div>

                  <PositionBox2 name={<p>{FilterIcon()}{<span>Filter</span>}{DownIcon()}</p>} align={{ x: 0, y: 1 }}>
                     <div id="dropdownSort1" class="z-50 w-40 divide-y divide-gray-100 rounded-lg bg-white shadow dark:bg-gray-700" data-popper-placement="bottom">
                        <ul class="p-2 text-left text-sm font-medium text-gray-500 dark:text-gray-400" aria-labelledby="sortDropdownButton">
                           <li>
                              <a href="#" class="group inline-flex w-full items-center rounded-md px-3 py-2 text-sm text-gray-500 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-600 dark:hover:text-white"> The most popular </a>
                           </li>
                           <li>
                              <a href="#" class="group inline-flex w-full items-center rounded-md px-3 py-2 text-sm text-gray-500 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-600 dark:hover:text-white"> Newest </a>
                           </li>
                           <li>
                              <a href="#" class="group inline-flex w-full items-center rounded-md px-3 py-2 text-sm text-gray-500 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-600 dark:hover:text-white"> Increasing price </a>
                           </li>
                           <li>
                              <a href="#" class="group inline-flex w-full items-center rounded-md px-3 py-2 text-sm text-gray-500 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-600 dark:hover:text-white"> Decreasing price </a>
                           </li>
                           <li>
                              <a href="#" class="group inline-flex w-full items-center rounded-md px-3 py-2 text-sm text-gray-500 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-600 dark:hover:text-white"> No. reviews </a>
                           </li>
                           <li>
                              <a href="#" class="group inline-flex w-full items-center rounded-md px-3 py-2 text-sm text-gray-500 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-600 dark:hover:text-white"> Discount % </a>
                           </li>
                        </ul>
                     </div>
                  </PositionBox2>

               </div>

               <div class="mb-4 grid gap-4 sm:grid-cols-2 md:mb-8 lg:grid-cols-3 xl:grid-cols-4">
                  {ProductCard("id", "Apple Watch SE [GPS 40mm], Smartwatch", "$599", 20, 4.7, 384, "https://flowbite.com/docs/images/products/apple-watch.png")}
                  {ProductCard("id", "Apple iMac 27, 1TB HDD, Retina 5K Display, M3 Max", "$1,699", 35, 5.0, 455, "https://flowbite.s3.amazonaws.com/blocks/e-commerce/imac-front.svg")}
                  {ProductCard("id", "Apple iPhone 15 Pro Max, 256GB, Blue Titanium", "$1,199", 15, 4.9, 1233, "https://flowbite.s3.amazonaws.com/blocks/e-commerce/iphone-light.svg")}
                  {ProductCard("id", "iPad Pro 13-Inch (M4): XDR Display, 512GB", "$799", 25, 4.9, 879, "https://flowbite.s3.amazonaws.com/blocks/e-commerce/ipad-light.svg")}
                  {ProductCard("id", "PlayStation®5 Console – 1TB, PRO Controller", "$499", 10, 4.8, 2985, "https://flowbite.s3.amazonaws.com/blocks/e-commerce/ps5-light.svg")}
                  {ProductCard("id", "Microsoft Xbox Series X 1TB Gaming Console", "$499", 10, 4.8, 4285, "https://flowbite.s3.amazonaws.com/blocks/e-commerce/xbox-light.svg")}
                  {ProductCard("id", "Apple MacBook PRO Laptop with M2 chip", "$2,599", 5, 4.9, 1025, "https://flowbite.s3.amazonaws.com/blocks/e-commerce/macbook-pro-light.svg")}
                  {ProductCard("id", "Apple Watch SE [GPS 40mm], Smartwatch", "$699", 20, 4.7, 384, "https://flowbite.s3.amazonaws.com/blocks/e-commerce/apple-watch-light.svg")}
               </div>
            </div>
         </section>

      </SpaceLayout>
   );
}

function ProductCard(id: string, name: string, price: string, discount: number, ratings: number, reviews: number, imgSrc: string) {
   return <div id={id} class="rounded-lg border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-800">
      <div class="h-56 w-full">
         <a href={"/product/" + id}>
            <img class="mx-auto h-full" src={imgSrc} alt="" />
         </a>
      </div>
      <div class="pt-6">
         <div class="mb-4 flex items-center justify-between gap-4">
            <span class="me-2 rounded bg-primary-100 px-2.5 py-0.5 text-xs font-medium text-primary-800 dark:bg-primary-900 dark:text-primary-300"> Up to {discount}% off </span>

            <div class="flex items-center justify-end gap-1">
               <button type="button" data-tooltip-target="tooltip-add-to-favorites" class="rounded-lg p-2 text-gray-500 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
                  <span class="sr-only"> Add to Favorites </span>
                  {HeartIcon()}
               </button>
               <div id="tooltip-add-to-favorites" role="tooltip" class="tooltip invisible absolute z-10 inline-block rounded-lg bg-gray-900 px-3 py-2 text-sm font-medium text-white opacity-0 shadow-sm transition-opacity duration-300 dark:bg-gray-700" data-popper-placement="top">
                  Add to favorites
                  <div class="tooltip-arrow" data-popper-arrow=""></div>
               </div>
            </div>
         </div>

         <a href={"/product/" + id} class="text-lg font-semibold leading-tight text-gray-900 hover:underline dark:text-white">{name}</a>

         {RatingsBar(ratings, reviews)}

         <ul class="mt-2 flex items-center gap-4">
            <li class="flex items-center gap-2">
               <svg class="h-4 w-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7h6l2 4m-8-4v8m0-8V6a1 1 0 0 0-1-1H4a1 1 0 0 0-1 1v9h2m8 0H9m4 0h2m4 0h2v-4m0 0h-5m3.5 5.5a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0Zm-10 0a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0Z" />
               </svg>
               <p class="text-sm font-medium text-gray-500 dark:text-gray-400">Fast Delivery</p>
            </li>

            <li class="flex items-center gap-2">
               <svg class="h-4 w-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <path stroke="currentColor" stroke-linecap="round" stroke-width="2" d="M8 7V6c0-.6.4-1 1-1h11c.6 0 1 .4 1 1v7c0 .6-.4 1-1 1h-1M3 18v-7c0-.6.4-1 1-1h11c.6 0 1 .4 1 1v7c0 .6-.4 1-1 1H4a1 1 0 0 1-1-1Zm8-3.5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Z" />
               </svg>
               <p class="text-sm font-medium text-gray-500 dark:text-gray-400">Best Price</p>
            </li>
         </ul>

         <div class="mt-4 flex items-center justify-between gap-4">
            <p class="text-2xl font-extrabold leading-tight text-gray-900 dark:text-white">{price}</p>

            <button type="button" class="inline-flex items-center rounded-lg bg-primary-700 px-5 py-2.5 text-sm font-medium text-white hover:bg-primary-800 focus:outline-none focus:ring-4  focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">
               {CartIcon()}
               Add to cart
            </button>
         </div>
      </div>
   </div>;
}
