import { useParams } from "@solidjs/router";

import SpaceLayout from '../layouts/SpaceLayout';

export function OrderDetails() {
   const params = useParams();

   return (
      <SpaceLayout one title={'Order Details ' + params.orderId}>

         <section class="bg-white py-8 antialiased dark:bg-gray-900 md:py-16">
            <div class="mx-auto max-w-screen-xl px-4 2xl:px-0">
               <nav class="mb-4 flex" aria-label="Breadcrumb">
                  <ol class="inline-flex items-center space-x-1 md:space-x-2 rtl:space-x-reverse">
                     <li class="inline-flex items-center">
                        <a href="#" class="inline-flex items-center text-sm font-medium text-gray-700 hover:text-primary-700 dark:text-gray-400 dark:hover:text-white">
                           <svg class="me-2 h-4 w-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                              <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m4 12 8-8 8 8M6 10.5V19a1 1 0 0 0 1 1h3v-3a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v3h3a1 1 0 0 0 1-1v-8.5" />
                           </svg>
                           Home
                        </a>
                     </li>
                     <li>
                        <div class="flex items-center">
                           <svg class="mx-1 h-4 w-4 text-gray-400 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                              <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m9 5 7 7-7 7" />
                           </svg>
                           <a href="#" class="ms-1 text-sm font-medium text-gray-700 hover:text-primary-700 dark:text-gray-400 dark:hover:text-white md:ms-2">My account</a>
                        </div>
                     </li>
                     <li aria-current="page">
                        <div class="flex items-center">
                           <svg class="mx-1 h-4 w-4 text-gray-400 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                              <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m9 5 7 7-7 7" />
                           </svg>
                           <span class="ms-1 text-sm font-medium text-gray-500 dark:text-gray-400 md:ms-2">Service</span>
                        </div>
                     </li>
                  </ol>
               </nav>
               <h2 class="mb-4 text-xl font-semibold text-gray-900 dark:text-white sm:text-2xl md:mb-6">Service reparation form</h2>
               <div class="gap-8 lg:flex">
                  <aside id="sidebar" class="hidden h-full w-80 shrink-0 overflow-y-auto border border-gray-200 bg-white p-3 shadow-sm dark:border-gray-700 dark:bg-gray-800 lg:block lg:rounded-lg">
                     <button id="dropdownUserNameButton" data-dropdown-toggle="dropdownUserName1" type="button" class="dark:hover-bg-gray-700 mb-3 flex w-full items-center justify-between rounded-lg bg-white p-2 hover:bg-gray-100 focus:outline-none focus:ring-4 focus:ring-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700">
                        <span class="sr-only">Open user menu</span>
                        <div class="flex w-full items-center justify-between">
                           <div class="flex items-center">
                              <img src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/avatars/jese-leos.png" class="mr-3 h-8 w-8 rounded-md" alt="Bonnie avatar" />
                              <div class="text-left">
                                 <div class="mb-0.5 font-semibold leading-none text-gray-900 dark:text-white">Jese Leos (Personal)</div>
                                 <div class="text-sm text-gray-500 dark:text-gray-400">jese@flowbite.com</div>
                              </div>
                           </div>
                           <svg class="h-5 w-5 text-gray-900 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                              <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m8 15 4 4 4-4m0-6-4-4-4 4" />
                           </svg>
                        </div>
                     </button>
                     <div id="dropdownUserName1" class="z-10 hidden w-[294px] divide-y divide-gray-100 rounded bg-white shadow dark:divide-gray-600 dark:bg-gray-700" data-popper-placement="bottom">
                        <a href="#" class="flex items-center rounded px-4 py-3 hover:bg-gray-50 dark:hover:bg-gray-600">
                           <img src="https://flowbite.com/docs/images/logo.svg" class="mr-3 h-8 w-8 rounded" alt="Michael avatar" />
                           <div class="text-left">
                              <div class="mb-0.5 font-semibold leading-none text-gray-900 dark:text-white">Flowbite LLC (Company)</div>
                              <div class="text-sm text-gray-500 dark:text-gray-400">company@flowbite.com</div>
                           </div>
                        </a>
                     </div>
                     <div class="mb-4 w-full border-y border-gray-100 py-4 dark:border-gray-700">
                        <ul class="grid grid-cols-3 gap-2">
                           <li>
                              <a href="#" class="group flex flex-col items-center justify-center rounded-xl bg-primary-50 p-2.5 hover:bg-primary-100 dark:bg-primary-900 dark:hover:bg-primary-800">
                                 <span class="mb-1 flex h-8 w-8 items-center justify-center rounded-full bg-primary-100 group-hover:bg-primary-200 dark:bg-primary-800  dark:group-hover:bg-primary-700">
                                    <svg class="h-5 w-5 text-primary-700 dark:text-primary-300" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                                       <path stroke="currentColor" stroke-linecap="square" stroke-linejoin="round" stroke-width="2" d="M10 19H5a1 1 0 0 1-1-1v-1a3 3 0 0 1 3-3h2m10 1a3 3 0 0 1-3 3m3-3a3 3 0 0 0-3-3m3 3h1m-4 3a3 3 0 0 1-3-3m3 3v1m-3-4a3 3 0 0 1 3-3m-3 3h-1m4-3v-1m-2.121 1.879-.707-.707m5.656 5.656-.707-.707m-4.242 0-.707.707m5.656-5.656-.707.707M12 8a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                                    </svg>
                                 </span>
                                 <span class="text-sm font-medium text-primary-700 dark:text-primary-300">Profile</span>
                              </a>
                           </li>
                           <li>
                              <a href="#" class="group flex flex-col items-center justify-center rounded-xl bg-purple-50 p-2.5 hover:bg-purple-100 dark:bg-purple-900 dark:hover:bg-purple-800">
                                 <span class="mb-1 flex h-8 w-8 items-center justify-center rounded-full bg-purple-100 group-hover:bg-purple-200 dark:bg-purple-800  dark:group-hover:bg-purple-700">
                                    <svg class="h-5 w-5 text-purple-600 dark:text-purple-300" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                                       <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 21v-9m3-4H7.5a2.5 2.5 0 1 1 0-5c1.5 0 2.875 1.25 3.875 2.5M14 21v-9m-9 0h14v8a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1v-8ZM4 8h16a1 1 0 0 1 1 1v3H3V9a1 1 0 0 1 1-1Zm12.155-5c-3 0-5.5 5-5.5 5h5.5a2.5 2.5 0 0 0 0-5Z" />
                                    </svg>
                                 </span>
                                 <span class="text-sm font-medium text-purple-600 dark:text-purple-300">Gifts</span>
                              </a>
                           </li>
                           <li>
                              <a href="#" class="group flex flex-col items-center justify-center rounded-xl bg-teal-50 p-2.5 hover:bg-teal-100 dark:bg-teal-900 dark:hover:bg-teal-800">
                                 <span class="mb-1 flex h-8 w-8 items-center justify-center rounded-full bg-teal-100 group-hover:bg-teal-200 dark:bg-teal-800  dark:group-hover:bg-teal-700">
                                    <svg class="h-5 w-5 text-teal-600 dark:text-teal-300" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                                       <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8H5m12 0a1 1 0 0 1 1 1v2.6M17 8l-4-4M5 8a1 1 0 0 0-1 1v10a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-2.6M5 8l4-4 4 4m6 4h-4a2 2 0 1 0 0 4h4a1 1 0 0 0 1-1v-2a1 1 0 0 0-1-1Z" />
                                    </svg>
                                 </span>
                                 <span class="text-sm font-medium text-teal-600 dark:text-teal-300">Wallet</span>
                              </a>
                           </li>
                        </ul>
                     </div>

                     <ul class="space-y-2">
                        <li>
                           <a href="#" class="group flex items-center rounded-lg p-2 text-base font-medium text-gray-900 hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700">
                              <svg class="h-6 w-6 text-gray-400 transition duration-75 group-hover:text-gray-900 dark:text-gray-400 dark:group-hover:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                                 <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7h6l2 4m-8-4v8m0-8V6a1 1 0 0 0-1-1H4a1 1 0 0 0-1 1v9h2m8 0H9m4 0h2m4 0h2v-4m0 0h-5m3.5 5.5a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0Zm-10 0a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0Z" />
                              </svg>
                              <span class="ml-3">My orders</span>
                           </a>
                        </li>
                        <li>
                           <a href="#" class="group flex items-center rounded-lg p-2 text-base font-medium text-gray-900 hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700">
                              <svg class="h-6 w-6 text-gray-400 transition duration-75 group-hover:text-gray-900 dark:text-gray-400 dark:group-hover:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                                 <path stroke="currentColor" stroke-width="2" d="M11.083 5.104c.35-.8 1.485-.8 1.834 0l1.752 4.022a1 1 0 0 0 .84.597l4.463.342c.9.069 1.255 1.2.556 1.771l-3.33 2.723a1 1 0 0 0-.337 1.016l1.03 4.119c.214.858-.71 1.552-1.474 1.106l-3.913-2.281a1 1 0 0 0-1.008 0L7.583 20.8c-.764.446-1.688-.248-1.474-1.106l1.03-4.119A1 1 0 0 0 6.8 14.56l-3.33-2.723c-.698-.571-.342-1.702.557-1.771l4.462-.342a1 1 0 0 0 .84-.597l1.753-4.022Z" />
                              </svg>
                              <span class="ml-3 flex-1 whitespace-nowrap">Reviews</span>
                           </a>
                        </li>
                        <li>
                           <a href="#" class="group flex items-center rounded-lg p-2 text-base font-medium text-gray-900 hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700">
                              <svg class="h-6 w-6 text-gray-400 transition duration-75 group-hover:text-gray-900 dark:text-gray-400 dark:group-hover:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                                 <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m4 12 8-8 8 8M6 10.5V19a1 1 0 0 0 1 1h3v-3a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v3h3a1 1 0 0 0 1-1v-8.5" />
                              </svg>
                              <span class="ml-3 flex-1 whitespace-nowrap">Delivery addresses</span>
                           </a>
                        </li>
                        <li>
                           <a href="#" class="group flex items-center rounded-lg p-2 text-base font-medium text-gray-900 hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700">
                              <svg class="h-6 w-6 text-gray-400 transition duration-75 group-hover:text-gray-900 dark:text-gray-400 dark:group-hover:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                                 <path stroke="currentColor" stroke-width="2" d="M21 12c0 1.2-4.03 6-9 6s-9-4.8-9-6c0-1.2 4.03-6 9-6s9 4.8 9 6Z" />
                                 <path stroke="currentColor" stroke-width="2" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                              </svg>
                              <span class="ml-3 flex-1 whitespace-nowrap">Recently viewed</span>
                           </a>
                        </li>
                        <li>
                           <a href="#" class="group flex items-center rounded-lg p-2 text-base font-medium text-gray-900 hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700">
                              <svg class="h-6 w-6 text-gray-400 transition duration-75 group-hover:text-gray-900 dark:text-gray-400 dark:group-hover:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                                 <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12.01 6.001C6.5 1 1 8 5.782 13.001L12.011 20l6.23-7C23 8 17.5 1 12.01 6.002Z" />
                              </svg>
                              <span class="ml-3 flex-1 whitespace-nowrap">Favourite items</span>
                           </a>
                        </li>
                     </ul>
                     <ul class="mt-5 space-y-2 border-t border-gray-100 pt-5 dark:border-gray-700">
                        <li>
                           <a href="#" class="group flex items-center rounded-lg p-2 text-base font-medium text-gray-900 hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700">
                              <svg class="h-6 w-6 text-gray-400 transition duration-75 group-hover:text-gray-900 dark:text-gray-400 dark:group-hover:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                                 <path
                                    stroke="currentColor"
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    stroke-width="2"
                                    d="M21 13v-2a1 1 0 0 0-1-1h-.757l-.707-1.707.535-.536a1 1 0 0 0 0-1.414l-1.414-1.414a1 1 0 0 0-1.414 0l-.536.535L14 4.757V4a1 1 0 0 0-1-1h-2a1 1 0 0 0-1 1v.757l-1.707.707-.536-.535a1 1 0 0 0-1.414 0L4.929 6.343a1 1 0 0 0 0 1.414l.536.536L4.757 10H4a1 1 0 0 0-1 1v2a1 1 0 0 0 1 1h.757l.707 1.707-.535.536a1 1 0 0 0 0 1.414l1.414 1.414a1 1 0 0 0 1.414 0l.536-.535 1.707.707V20a1 1 0 0 0 1 1h2a1 1 0 0 0 1-1v-.757l1.707-.708.536.536a1 1 0 0 0 1.414 0l1.414-1.414a1 1 0 0 0 0-1.414l-.535-.536.707-1.707H20a1 1 0 0 0 1-1Z"
                                 />
                                 <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z" />
                              </svg>
                              <span class="ml-3 flex-1 whitespace-nowrap">Settings</span>
                           </a>
                        </li>
                        <li>
                           <a href="#" class="group flex items-center rounded-lg p-2 text-base font-medium text-red-600 hover:bg-red-100 dark:text-red-500 dark:hover:bg-gray-700">
                              <svg class="h-6 w-6 flex-shrink-0 text-red-600 transition duration-75 dark:text-red-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                                 <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 12H8m12 0-4 4m4-4-4-4M9 4H7a3 3 0 0 0-3 3v10a3 3 0 0 0 3 3h2" />
                              </svg>
                              <span class="ml-3 flex-1 whitespace-nowrap">Log out</span>
                           </a>
                        </li>
                     </ul>
                  </aside>
                  <form action="#" class="w-full space-y-6 lg:space-y-8">
                     <div class="space-y-6 sm:space-y-8">
                        <ol class="flex flex-col gap-4 rounded-lg border border-gray-200 bg-gray-50 p-4 dark:border-gray-700 dark:bg-gray-800 sm:justify-center md:flex-row md:items-center lg:gap-6">
                           <li class="flex items-center gap-2 md:flex-1 md:flex-col md:gap-1.5 lg:flex-none">
                              <svg class="h-5 w-5 text-primary-700 dark:text-primary-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                                 <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8.5 11.5 11 14l4-4m6 2a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                              </svg>
                              <p class="text-sm font-medium leading-tight text-primary-700 dark:text-primary-500">My products</p>
                           </li>

                           <div class="hidden h-px w-8 shrink-0 bg-gray-200 dark:bg-gray-700 md:block xl:w-16"></div>

                           <li class="flex items-center gap-2 md:flex-1 md:flex-col md:gap-1.5 lg:flex-none">
                              <svg class="h-5 w-5 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                                 <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8.5 11.5 11 14l4-4m6 2a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                              </svg>
                              <p class="text-sm font-medium leading-tight text-gray-500 dark:text-gray-400">Defect reason</p>
                           </li>

                           <div class="hidden h-px w-8 shrink-0 bg-gray-200 dark:bg-gray-700 md:block xl:w-16"></div>

                           <li class="flex items-center gap-2 md:flex-1 md:flex-col md:gap-1.5 lg:flex-none">
                              <svg class="h-5 w-5 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                                 <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8.5 11.5 11 14l4-4m6 2a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                              </svg>
                              <p class="text-sm font-medium leading-tight text-gray-500 dark:text-gray-400">Select date</p>
                           </li>

                           <div class="hidden h-px w-8 shrink-0 bg-gray-200 dark:bg-gray-700 md:block xl:w-16"></div>

                           <li class="flex items-center gap-2 md:flex-1 md:flex-col md:gap-1.5 lg:flex-none">
                              <svg class="h-5 w-5 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                                 <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8.5 11.5 11 14l4-4m6 2a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                              </svg>
                              <p class="text-sm font-medium leading-tight text-gray-500 dark:text-gray-400">Confirmation</p>
                           </li>
                        </ol>
                     </div>

                     <div class="space-y-6">
                        <div class="mb-4 rounded-lg bg-primary-50 p-4 text-sm text-primary-800 dark:bg-gray-800 dark:text-primary-400 sm:text-base" role="alert">
                           <p class="mb-3 font-medium">What you need to know so that the process of sending the product for service goes smoothly:</p>
                           <ol class="mb-3 list-outside list-decimal space-y-2 ps-4">
                              <li>You can send the products sold by eMAG for service by completing the product repair form. To service the products sold by eMAG Marketplace partners, follow the steps shown in the pages dedicated to them.</li>
                              <li>Make sure that the product you want to send for service has an electronic warranty certificate (provided by Depanero), which you can find in the My Warranties section of your customer account and in the email you received when completing the order. Then complete the product repair form below.</li>
                              <li>If in the My Warranties section the product appears with a printed warranty certificate (which came in the box, together with the product), provided by the manufacturer, contact one of the authorized services specified in it to benefit from the repair of the product.</li>
                           </ol>
                           <p>You are already logged in as <span class="font-medium">Bonnie Green</span>. Click <a class="font-medium underline hover:no-underline" href="#">here</a> to use another account.</p>
                        </div>
                        <h3 class="text-xl font-semibold text-gray-900 dark:text-white">1. Select the product you want to repair:</h3>

                        <div class="divide-y divide-gray-200 overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm dark:divide-gray-700 dark:border-gray-700 dark:bg-gray-800">
                           <div class="flex items-center gap-8 p-6 sm:items-start lg:items-center">
                              <div>
                                 <input id="product1" type="checkbox" value="" class="h-4 w-4 rounded border-gray-300 bg-gray-100 text-primary-700 focus:ring-2 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800 dark:focus:ring-primary-600" />
                                 <label for="product1" class="sr-only"> Product 1 </label>
                              </div>

                              <div class="min-w-0 flex-1 gap-14 xl:flex xl:items-center">
                                 <div class="min-w-0 max-w-xl flex-1 gap-6 sm:flex sm:items-center">
                                    <a href="#" class="mb-4 flex aspect-square h-14 w-14 shrink-0 items-center sm:mb-0">
                                       <img class="h-auto max-h-full w-full dark:hidden" src="https://flowbite.s3.amazonaws.com/blocks/e-commerce/imac-front.svg" alt="imac image" />
                                       <img class="hidden h-auto max-h-full w-full dark:block" src="https://flowbite.s3.amazonaws.com/blocks/e-commerce/imac-front-dark.svg" alt="imac image" />
                                    </a>
                                    <a href="#" class="mt-4 font-medium text-gray-900 hover:underline dark:text-white sm:mt-0"> PC system All in One APPLE iMac (2023) mqrq3ro/a, Apple M3, 24" Retina 4.5K, 8GB, SSD 256GB, 10-core GPU</a>
                                 </div>

                                 <div class="mt-4 flex shrink-0 flex-col gap-2 sm:flex-row sm:justify-between md:items-center xl:mt-0 xl:flex-col xl:items-start">
                                    <dl class="flex items-center gap-2.5">
                                       <dt class="text-base font-normal text-gray-500 dark:text-gray-400 xl:w-36">Order Number:</dt>
                                       <dd class="text-base font-normal text-gray-500 dark:text-gray-400">
                                          <a href="#" class="hover:underline">#73742364</a>
                                       </dd>
                                    </dl>

                                    <dl class="flex items-center gap-2.5">
                                       <dt class="text-base font-normal text-gray-500 dark:text-gray-400 xl:w-36">Return Term:</dt>
                                       <dd class="text-base font-normal text-gray-500 dark:text-gray-400">21.07.2023</dd>
                                    </dl>
                                 </div>
                              </div>
                           </div>

                           <div class="flex items-center gap-8 p-6 sm:items-start lg:items-center">
                              <div>
                                 <input id="product2" type="checkbox" value="" class="h-4 w-4 rounded border-gray-300 bg-gray-100 text-primary-700 focus:ring-2 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800 dark:focus:ring-primary-600" />
                                 <label for="product2" class="sr-only"> Product 2 </label>
                              </div>

                              <div class="min-w-0 flex-1 gap-14 xl:flex xl:items-center">
                                 <div class="min-w-0 max-w-xl flex-1 gap-6 sm:flex sm:items-center">
                                    <a href="#" class="mb-4 flex aspect-square h-14 w-14 shrink-0 items-center sm:mb-0">
                                       <img class="h-auto max-h-full w-full dark:hidden" src="https://flowbite.s3.amazonaws.com/blocks/e-commerce/apple-watch-light.svg" alt="imac image" />
                                       <img class="hidden h-auto max-h-full w-full dark:block" src="https://flowbite.s3.amazonaws.com/blocks/e-commerce/apple-watch-dark.svg" alt="imac image" />
                                    </a>
                                    <a href="#" class="mt-4 font-medium text-gray-900 hover:underline dark:text-white sm:mt-0"> Restored Apple Watch Series 8 (GPS) 41mm Midnight Aluminum Case with Midnight Sport Band </a>
                                 </div>

                                 <div class="mt-4 flex shrink-0 flex-col gap-2 sm:flex-row sm:justify-between md:items-center xl:mt-0 xl:flex-col xl:items-start">
                                    <dl class="flex items-center gap-2.5">
                                       <dt class="text-gray-500 dark:text-gray-400 xl:w-36">Order Number:</dt>
                                       <dd class="text-base font-normal text-gray-500 dark:text-gray-400">
                                          <a href="#" class="hover:underline">#45632736</a>
                                       </dd>
                                    </dl>

                                    <dl class="flex items-center gap-2.5">
                                       <dt class="text-gray-500 dark:text-gray-400 xl:w-36">Return Term:</dt>
                                       <dd class="text-base font-normal text-gray-500 dark:text-gray-400">26.07.2023</dd>
                                    </dl>
                                 </div>
                              </div>
                           </div>

                           <div class="flex items-center gap-8 p-6 sm:items-start lg:items-center">
                              <div>
                                 <input checked id="product3" type="checkbox" value="" class="h-4 w-4 rounded border-gray-300 bg-gray-100 text-primary-700 focus:ring-2 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800 dark:focus:ring-primary-600" />
                                 <label for="product3" class="sr-only"> Product 3 </label>
                              </div>

                              <div class="min-w-0 flex-1 gap-14 xl:flex xl:items-center">
                                 <div class="min-w-0 max-w-xl flex-1 gap-6 sm:flex sm:items-center">
                                    <a href="#" class="mb-4 flex aspect-square h-14 w-14 shrink-0 items-center sm:mb-0">
                                       <img class="h-auto max-h-full w-full dark:hidden" src="https://flowbite.s3.amazonaws.com/blocks/e-commerce/ps5-light.svg" alt="imac image" />
                                       <img class="hidden h-auto max-h-full w-full dark:block" src="https://flowbite.s3.amazonaws.com/blocks/e-commerce/ps5-dark.svg" alt="imac image" />
                                    </a>
                                    <a href="#" class="mt-4 font-medium text-gray-900 hover:underline dark:text-white sm:mt-0"> Sony Playstation 5 Digital Edition Console with Extra Blue Controller, and White PULSE 3D Headset </a>
                                 </div>

                                 <div class="mt-4 flex shrink-0 flex-col gap-2 sm:flex-row sm:justify-between md:items-center xl:mt-0 xl:flex-col xl:items-start">
                                    <dl class="flex items-center gap-2.5">
                                       <dt class="text-gray-500 dark:text-gray-400 xl:w-36">Order Number:</dt>
                                       <dd class="text-base font-normal text-gray-500 dark:text-gray-400">
                                          <a href="#" class="hover:underline">#54628495</a>
                                       </dd>
                                    </dl>

                                    <dl class="flex items-center gap-2.5">
                                       <dt class="text-gray-500 dark:text-gray-400 xl:w-36">Return Term:</dt>
                                       <dd class="text-base font-normal text-gray-500 dark:text-gray-400">24.07.2023</dd>
                                    </dl>
                                 </div>
                              </div>
                           </div>

                           <div class="flex items-center gap-8 p-6 sm:items-start lg:items-center">
                              <div>
                                 <input id="product4" type="checkbox" value="" class="h-4 w-4 rounded border-gray-300 bg-gray-100 text-primary-700 focus:ring-2 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800 dark:focus:ring-primary-600" />
                                 <label for="product4" class="sr-only"> Product 4 </label>
                              </div>

                              <div class="min-w-0 flex-1 gap-14 xl:flex xl:items-center">
                                 <div class="min-w-0 max-w-xl flex-1 gap-6 sm:flex sm:items-center">
                                    <a href="#" class="mb-4 flex aspect-square h-14 w-14 shrink-0 items-center sm:mb-0">
                                       <img class="h-auto max-h-full w-full dark:hidden" src="https://flowbite.s3.amazonaws.com/blocks/e-commerce/iphone-light.svg" alt="imac image" />
                                       <img class="hidden h-auto max-h-full w-full dark:block" src="https://flowbite.s3.amazonaws.com/blocks/e-commerce/iphone-dark.svg" alt="imac image" />
                                    </a>
                                    <a href="#" class="mt-4 font-medium text-gray-900 hover:underline dark:text-white sm:mt-0"> APPLE iPhone 15 5G phone, 256GB, Gold </a>
                                 </div>

                                 <div class="mt-4 flex shrink-0 flex-col gap-2 sm:flex-row sm:justify-between md:items-center xl:mt-0 xl:flex-col xl:items-start">
                                    <dl class="flex items-center gap-2.5">
                                       <dt class="text-gray-500 dark:text-gray-400 xl:w-36">Order Number:</dt>
                                       <dd class="text-base font-normal text-gray-500 dark:text-gray-400">
                                          <a href="#" class="hover:underline">#64534294</a>
                                       </dd>
                                    </dl>

                                    <dl class="flex items-center gap-2.5">
                                       <dt class="text-gray-500 dark:text-gray-400 xl:w-36">Return Term:</dt>
                                       <dd class="text-base font-normal text-gray-500 dark:text-gray-400">26.07.2023</dd>
                                    </dl>
                                 </div>
                              </div>
                           </div>

                           <div class="flex items-center gap-8 p-6 sm:items-start lg:items-center">
                              <div>
                                 <input id="product5" type="checkbox" value="" class="h-4 w-4 rounded border-gray-300 bg-gray-100 text-primary-700 focus:ring-2 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800 dark:focus:ring-primary-600" />
                                 <label for="product5" class="sr-only"> Product 5 </label>
                              </div>

                              <div class="min-w-0 flex-1 gap-14 xl:flex xl:items-center">
                                 <div class="min-w-0 max-w-xl flex-1 gap-6 sm:flex sm:items-center">
                                    <a href="#" class="mb-4 flex aspect-square h-14 w-14 shrink-0 items-center sm:mb-0">
                                       <img class="h-auto max-h-full w-full dark:hidden" src="https://flowbite.s3.amazonaws.com/blocks/e-commerce/xbox-light.svg" alt="imac image" />
                                       <img class="hidden h-auto max-h-full w-full dark:block" src="https://flowbite.s3.amazonaws.com/blocks/e-commerce/xbox-dark.svg" alt="imac image" />
                                    </a>
                                    <a href="#" class="mt-4 font-medium text-gray-900 hover:underline dark:text-white sm:mt-0"> Xbox Series X Diablo IV Bundle + Xbox Wireless Controller Carbon Black + Dual Controller Charge Docker </a>
                                 </div>

                                 <div class="mt-4 flex shrink-0 flex-col gap-2 sm:flex-row sm:justify-between md:items-center xl:mt-0 xl:flex-col xl:items-start">
                                    <dl class="flex items-center gap-2.5">
                                       <dt class="text-gray-500 dark:text-gray-400 xl:w-36">Order Number:</dt>
                                       <dd class="text-base font-normal text-gray-500 dark:text-gray-400">
                                          <a href="#" class="hover:underline">#98475625</a>
                                       </dd>
                                    </dl>

                                    <dl class="flex items-center gap-2.5">
                                       <dt class="text-gray-500 dark:text-gray-400 xl:w-36">Return Term:</dt>
                                       <dd class="text-base font-normal text-gray-500 dark:text-gray-400">21.07.2023</dd>
                                    </dl>
                                 </div>
                              </div>
                           </div>
                        </div>

                        <div class="gap-4 sm:flex sm:items-center sm:justify-between">
                           <button type="button" class="w-full rounded-lg  border border-gray-200 bg-white px-5 py-2.5 text-sm font-medium text-gray-900 hover:bg-gray-100 hover:text-primary-700 focus:z-10 focus:outline-none focus:ring-4 focus:ring-gray-100 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white dark:focus:ring-gray-700 sm:w-auto">Cancel</button>
                           <button type="submit" class="mt-4 flex w-full items-center justify-center rounded-lg border border-primary-700 bg-primary-700 px-5 py-2.5 text-sm font-medium text-white hover:border-primary-800 hover:bg-primary-800 focus:outline-none focus:ring-4 focus:ring-primary-300 dark:border-primary-700 dark:bg-primary-600 dark:hover:border-primary-700 dark:hover:bg-primary-700 dark:focus:ring-primary-800  sm:mt-0 sm:w-auto">Next: Return reason</button>
                        </div>
                     </div>
                  </form>
               </div>
            </div>
         </section>

         <section class="bg-white py-8 antialiased dark:bg-gray-900 md:py-16">
            <div class="mx-auto max-w-screen-xl px-4 2xl:px-0">
               <div class="mx-auto max-w-3xl space-y-6 sm:space-y-8">
                  <h2 class="text-xl font-semibold text-gray-900 dark:text-white sm:text-2xl">Status for your refund request</h2>

                  <div class="items-center gap-8 rounded-lg border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-800 sm:flex">
                     <a href="#" class="mb-4 flex aspect-square h-14 w-14 shrink-0 items-center sm:mb-0">
                        <img class="h-auto max-h-full w-full dark:hidden" src="https://flowbite.s3.amazonaws.com/blocks/e-commerce/imac-front.svg" alt="imac image" />
                        <img class="hidden h-auto max-h-full w-full dark:block" src="https://flowbite.s3.amazonaws.com/blocks/e-commerce/imac-front-dark.svg" alt="imac image" />
                     </a>
                     <a href="#" class="min-w-0 flex-1 font-medium text-gray-900 hover:underline dark:text-white">Sony Playstation 5 Digital Edition Console with Extra Blue Controller, White PULSE 3D Headset and Surge Dual Controller Charge Docker</a>
                  </div>

                  <ol class="relative border-s border-gray-200 dark:border-gray-700">
                     <li class="mb-10 ms-6">
                        <span class="absolute -start-2.5 flex h-5 w-5 items-center justify-center rounded-full bg-primary-100 ring-8 ring-white dark:bg-primary-900 dark:ring-gray-900">
                           <svg class="h-3 w-3 text-primary-800 dark:text-primary-300" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                              <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 11.917 9.724 16.5 19 7.5" />
                           </svg>
                        </span>
                        <span class="inline-flex items-center rounded bg-primary-100 px-2.5 py-0.5 text-xs font-medium text-primary-800 dark:bg-primary-900 dark:text-primary-300">
                           <svg class="me-1 h-3 w-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                              <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                           </svg>
                           02 February 2024
                        </span>
                        <h3 class="mb-0.5 mt-2 text-lg font-semibold text-primary-800 dark:text-primary-300">Your request has been registered</h3>
                        <p class="text-base font-normal text-primary-700 dark:text-primary-300">Please pack the product and accessories received in the original packaging. The courier will contact you to pick up the package from the specified address.</p>
                     </li>

                     <li class="mb-10 ms-6">
                        <span class="absolute -start-2.5 flex h-5 w-5 items-center justify-center rounded-full bg-gray-100 ring-8 ring-white dark:bg-gray-800 dark:ring-gray-900">
                           <svg class="h-3 w-3 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                              <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 11.917 9.724 16.5 19 7.5" />
                           </svg>
                        </span>
                        <h3 class="mb-1.5 text-lg font-semibold leading-none text-gray-900 dark:text-white">Pick up product from the address</h3>
                        <p class="text-base font-normal text-gray-500 dark:text-gray-400">Estimated time 2 February 2024 - 5 February 2024.</p>
                     </li>

                     <li class="mb-10 ms-6">
                        <span class="absolute -start-2.5 flex h-5 w-5 items-center justify-center rounded-full bg-gray-100 ring-8 ring-white dark:bg-gray-800 dark:ring-gray-900">
                           <svg class="h-3 w-3 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                              <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 11.917 9.724 16.5 19 7.5" />
                           </svg>
                        </span>
                        <h3 class="mb-1.5 text-lg font-semibold leading-none text-gray-900 dark:text-white">Product check</h3>
                        <p class="text-base font-normal text-gray-500 dark:text-gray-400">We will carefully check the product and inform you as soon as possible if you are eligible for a refund.</p>
                     </li>

                     <li class="ms-6">
                        <span class="absolute -start-2.5 flex h-5 w-5 items-center justify-center rounded-full bg-gray-100 ring-8 ring-white dark:bg-gray-800 dark:ring-gray-900">
                           <svg class="h-3 w-3 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                              <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 11.917 9.724 16.5 19 7.5" />
                           </svg>
                        </span>
                        <h3 class="mb-1.5 text-lg font-semibold leading-none text-gray-900 dark:text-white">Refund the amount</h3>
                        <p class="text-base font-normal text-gray-500 dark:text-gray-400">We will return the amount depending on the option chosen.</p>
                     </li>
                  </ol>

                  <div class="sm:flex items-center sm:space-x-4 space-y-4 sm:space-y-0">
                     <a href="#" title="" class="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-lg border border-gray-200 bg-white px-5 py-2.5 text-sm font-medium text-gray-900 hover:bg-gray-100 hover:text-primary-700 focus:z-10 focus:outline-none focus:ring-4 focus:ring-gray-100 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white dark:focus:ring-gray-700" role="button">
                        <svg class="h-5 w-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                           <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 12h14M5 12l4-4m-4 4 4 4" />
                        </svg>
                        Back to your account
                     </a>
                     <button type="button" class="w-full sm:w-auto flex justify-center items-center rounded-lg bg-red-700 px-5 py-2.5 text-sm font-medium text-white hover:bg-red-800 focus:outline-none focus:ring-4 focus:ring-red-300 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900">
                        <svg class="-ms-2 me-2 h-5 w-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                           <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18 17.94 6M18 18 6.06 6" />
                        </svg>
                        Cancel the refund
                     </button>
                  </div>
               </div>
            </div>
         </section>

         <section class="bg-white py-8 antialiased dark:bg-gray-900 md:py-16">
            <div class="mx-auto max-w-screen-xl px-4 2xl:px-0">
               <h2 class="text-xl font-semibold text-gray-900 dark:text-white sm:text-2xl">Track the delivery of order #957684673</h2>

               <div class="mt-6 sm:mt-8 lg:flex lg:gap-8">
                  <div class="w-full divide-y divide-gray-200 overflow-hidden rounded-lg border border-gray-200 dark:divide-gray-700 dark:border-gray-700 lg:max-w-xl xl:max-w-2xl">
                     <div class="space-y-4 p-6">
                        <div class="flex items-center gap-6">
                           <a href="#" class="h-14 w-14 shrink-0">
                              <img class="h-full w-full dark:hidden" src="https://flowbite.s3.amazonaws.com/blocks/e-commerce/imac-front.svg" alt="imac image" />
                              <img class="hidden h-full w-full dark:block" src="https://flowbite.s3.amazonaws.com/blocks/e-commerce/imac-front-dark.svg" alt="imac image" />
                           </a>

                           <a href="#" class="min-w-0 flex-1 font-medium text-gray-900 hover:underline dark:text-white"> PC system All in One APPLE iMac (2023) mqrq3ro/a, Apple M3, 24" Retina 4.5K, 8GB, SSD 256GB, 10-core GPU, macOS Sonoma, Blue, Keyboard layout INT </a>
                        </div>

                        <div class="flex items-center justify-between gap-4">
                           <p class="text-sm font-normal text-gray-500 dark:text-gray-400"><span class="font-medium text-gray-900 dark:text-white">Product ID:</span> BJ8364850</p>

                           <div class="flex items-center justify-end gap-4">
                              <p class="text-base font-normal text-gray-900 dark:text-white">x1</p>

                              <p class="text-xl font-bold leading-tight text-gray-900 dark:text-white">$1,499</p>
                           </div>
                        </div>
                     </div>

                     <div class="space-y-4 p-6">
                        <div class="flex items-center gap-6">
                           <a href="#" class="h-14 w-14 shrink-0">
                              <img class="h-full w-full dark:hidden" src="https://flowbite.s3.amazonaws.com/blocks/e-commerce/apple-watch-light.svg" alt="phone image" />
                              <img class="hidden h-full w-full dark:block" src="https://flowbite.s3.amazonaws.com/blocks/e-commerce/apple-watch-dark.svg" alt="phone image" />
                           </a>

                           <a href="#" class="min-w-0 flex-1 font-medium text-gray-900 hover:underline dark:text-white"> Restored Apple Watch Series 8 (GPS) 41mm Midnight Aluminum Case with Midnight Sport Band </a>
                        </div>

                        <div class="flex items-center justify-between gap-4">
                           <p class="text-sm font-normal text-gray-500 dark:text-gray-400"><span class="font-medium text-gray-900 dark:text-white">Product ID:</span> BJ8364850</p>

                           <div class="flex items-center justify-end gap-4">
                              <p class="text-base font-normal text-gray-900 dark:text-white">x2</p>

                              <p class="text-xl font-bold leading-tight text-gray-900 dark:text-white">$598</p>
                           </div>
                        </div>
                     </div>

                     <div class="space-y-4 p-6">
                        <div class="flex items-center gap-6">
                           <a href="#" class="h-14 w-14 shrink-0">
                              <img class="h-full w-full dark:hidden" src="https://flowbite.s3.amazonaws.com/blocks/e-commerce/ps5-light.svg" alt="console image" />
                              <img class="hidden h-full w-full dark:block" src="https://flowbite.s3.amazonaws.com/blocks/e-commerce/ps5-dark.svg" alt="console image" />
                           </a>

                           <a href="#" class="min-w-0 flex-1 font-medium text-gray-900 hover:underline dark:text-white"> Sony Playstation 5 Digital Edition Console with Extra Blue Controller, White PULSE 3D Headset and Surge Dual Controller </a>
                        </div>

                        <div class="flex items-center justify-between gap-4">
                           <p class="text-sm font-normal text-gray-500 dark:text-gray-400"><span class="font-medium text-gray-900 dark:text-white">Product ID:</span> BJ8364850</p>

                           <div class="flex items-center justify-end gap-4">
                              <p class="text-base font-normal text-gray-900 dark:text-white">x1</p>

                              <p class="text-xl font-bold leading-tight text-gray-900 dark:text-white">$799</p>
                           </div>
                        </div>
                     </div>

                     <div class="space-y-4 p-6">
                        <div class="flex items-center gap-6">
                           <a href="#" class="h-14 w-14 shrink-0">
                              <img class="h-full w-full dark:hidden" src="https://flowbite.s3.amazonaws.com/blocks/e-commerce/xbox-light.svg" alt="xbox image" />
                              <img class="hidden h-full w-full dark:block" src="https://flowbite.s3.amazonaws.com/blocks/e-commerce/xbox-dark.svg" alt="xbox image" />
                           </a>

                           <a href="#" class="min-w-0 flex-1 font-medium text-gray-900 hover:underline dark:text-white"> Xbox Series X Diablo IV Bundle + 2 Xbox Wireless Controller Carbon Black + Controller Charger </a>
                        </div>

                        <div class="flex items-center justify-between gap-4">
                           <p class="text-sm font-normal text-gray-500 dark:text-gray-400"><span class="font-medium text-gray-900 dark:text-white">Product ID:</span> BJ8364850</p>

                           <div class="flex items-center justify-end gap-4">
                              <p class="text-base font-normal text-gray-900 dark:text-white">x1</p>

                              <p class="text-xl font-bold leading-tight text-gray-900 dark:text-white">$699</p>
                           </div>
                        </div>
                     </div>

                     <div class="space-y-4 p-6">
                        <div class="flex items-center gap-6">
                           <a href="#" class="h-14 w-14 shrink-0">
                              <img class="h-full w-full dark:hidden" src="https://flowbite.s3.amazonaws.com/blocks/e-commerce/iphone-light.svg" alt="phone image" />
                              <img class="hidden h-full w-full dark:block" src="https://flowbite.s3.amazonaws.com/blocks/e-commerce/iphone-dark.svg" alt="phone image" />
                           </a>

                           <a href="#" class="min-w-0 flex-1 font-medium text-gray-900 hover:underline dark:text-white"> APPLE iPhone 15 5G phone, 256GB, Gold </a>
                        </div>

                        <div class="flex items-center justify-between gap-4">
                           <p class="text-sm font-normal text-gray-500 dark:text-gray-400"><span class="font-medium text-gray-900 dark:text-white">Product ID:</span> BJ8364850</p>

                           <div class="flex items-center justify-end gap-4">
                              <p class="text-base font-normal text-gray-900 dark:text-white">x3</p>

                              <p class="text-xl font-bold leading-tight text-gray-900 dark:text-white">$2,997</p>
                           </div>
                        </div>
                     </div>

                     <div class="space-y-4 bg-gray-50 p-6 dark:bg-gray-800">
                        <div class="space-y-2">
                           <dl class="flex items-center justify-between gap-4">
                              <dt class="font-normal text-gray-500 dark:text-gray-400">Original price</dt>
                              <dd class="font-medium text-gray-900 dark:text-white">$6,592.00</dd>
                           </dl>

                           <dl class="flex items-center justify-between gap-4">
                              <dt class="font-normal text-gray-500 dark:text-gray-400">Savings</dt>
                              <dd class="text-base font-medium text-green-500">-$299.00</dd>
                           </dl>

                           <dl class="flex items-center justify-between gap-4">
                              <dt class="font-normal text-gray-500 dark:text-gray-400">Store Pickup</dt>
                              <dd class="font-medium text-gray-900 dark:text-white">$99</dd>
                           </dl>

                           <dl class="flex items-center justify-between gap-4">
                              <dt class="font-normal text-gray-500 dark:text-gray-400">Tax</dt>
                              <dd class="font-medium text-gray-900 dark:text-white">$799</dd>
                           </dl>
                        </div>

                        <dl class="flex items-center justify-between gap-4 border-t border-gray-200 pt-2 dark:border-gray-700">
                           <dt class="text-lg font-bold text-gray-900 dark:text-white">Total</dt>
                           <dd class="text-lg font-bold text-gray-900 dark:text-white">$7,191.00</dd>
                        </dl>
                     </div>
                  </div>

                  <div class="mt-6 grow sm:mt-8 lg:mt-0">
                     <div class="space-y-6 rounded-lg border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-800">
                        <h3 class="text-xl font-semibold text-gray-900 dark:text-white">Order history</h3>

                        <ol class="relative ms-3 border-s border-gray-200 dark:border-gray-700">
                           <li class="mb-10 ms-6">
                              <span class="absolute -start-3 flex h-6 w-6 items-center justify-center rounded-full bg-gray-100 ring-8 ring-white dark:bg-gray-700 dark:ring-gray-800">
                                 <svg class="h-4 w-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m4 12 8-8 8 8M6 10.5V19a1 1 0 0 0 1 1h3v-3a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v3h3a1 1 0 0 0 1-1v-8.5" />
                                 </svg>
                              </span>
                              <h4 class="mb-0.5 text-base font-semibold text-gray-900 dark:text-white">Estimated delivery in 24 Nov 2023</h4>
                              <p class="text-sm font-normal text-gray-500 dark:text-gray-400">Products delivered</p>
                           </li>

                           <li class="mb-10 ms-6">
                              <span class="absolute -start-3 flex h-6 w-6 items-center justify-center rounded-full bg-gray-100 ring-8 ring-white dark:bg-gray-700 dark:ring-gray-800">
                                 <svg class="h-4 w-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7h6l2 4m-8-4v8m0-8V6a1 1 0 0 0-1-1H4a1 1 0 0 0-1 1v9h2m8 0H9m4 0h2m4 0h2v-4m0 0h-5m3.5 5.5a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0Zm-10 0a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0Z" />
                                 </svg>
                              </span>
                              <h4 class="mb-0.5 text-base font-semibold text-gray-900 dark:text-white">Today</h4>
                              <p class="text-sm font-normal text-gray-500 dark:text-gray-400">Products being delivered</p>
                           </li>

                           <li class="mb-10 ms-6 text-primary-700 dark:text-primary-500">
                              <span class="absolute -start-3 flex h-6 w-6 items-center justify-center rounded-full bg-primary-100 ring-8 ring-white dark:bg-primary-900 dark:ring-gray-800">
                                 <svg class="h-4 w-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 11.917 9.724 16.5 19 7.5" />
                                 </svg>
                              </span>
                              <h4 class="mb-0.5 font-semibold">23 Nov 2023, 15:15</h4>
                              <p class="text-sm">Products in the courier's warehouse</p>
                           </li>

                           <li class="mb-10 ms-6 text-primary-700 dark:text-primary-500">
                              <span class="absolute -start-3 flex h-6 w-6 items-center justify-center rounded-full bg-primary-100 ring-8 ring-white dark:bg-primary-900 dark:ring-gray-800">
                                 <svg class="h-4 w-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 11.917 9.724 16.5 19 7.5" />
                                 </svg>
                              </span>
                              <h4 class="mb-0.5 text-base font-semibold">22 Nov 2023, 12:27</h4>
                              <p class="text-sm">Products delivered to the courier - DHL Express</p>
                           </li>

                           <li class="mb-10 ms-6 text-primary-700 dark:text-primary-500">
                              <span class="absolute -start-3 flex h-6 w-6 items-center justify-center rounded-full bg-primary-100 ring-8 ring-white dark:bg-primary-900 dark:ring-gray-800">
                                 <svg class="h-4 w-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 11.917 9.724 16.5 19 7.5" />
                                 </svg>
                              </span>
                              <h4 class="mb-0.5 font-semibold">19 Nov 2023, 10:47</h4>
                              <p class="text-sm">Payment accepted - VISA Credit Card</p>
                           </li>

                           <li class="ms-6 text-primary-700 dark:text-primary-500">
                              <span class="absolute -start-3 flex h-6 w-6 items-center justify-center rounded-full bg-primary-100 ring-8 ring-white dark:bg-primary-900 dark:ring-gray-800">
                                 <svg class="h-4 w-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 11.917 9.724 16.5 19 7.5" />
                                 </svg>
                              </span>
                              <div>
                                 <h4 class="mb-0.5 font-semibold">19 Nov 2023, 10:45</h4>
                                 <a href="#" class="text-sm font-medium hover:underline">Order placed - Receipt #647563</a>
                              </div>
                           </li>
                        </ol>

                        <div class="gap-4 sm:flex sm:items-center">
                           <button type="button" class="w-full rounded-lg  border border-gray-200 bg-white px-5  py-2.5 text-sm font-medium text-gray-900 hover:bg-gray-100 hover:text-primary-700 focus:z-10 focus:outline-none focus:ring-4 focus:ring-gray-100 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white dark:focus:ring-gray-700">Cancel the order</button>

                           <a href="#" class="mt-4 flex w-full items-center justify-center rounded-lg bg-primary-700  px-5 py-2.5 text-sm font-medium text-white hover:bg-primary-800 focus:outline-none focus:ring-4 focus:ring-primary-300  dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800 sm:mt-0">Order details</a>
                        </div>
                     </div>
                  </div>
               </div>
            </div>
         </section>

         <section class="bg-white py-8 antialiased dark:bg-gray-900 md:py-16">
            <div class="mx-auto max-w-screen-xl px-4 2xl:px-0">
               <h2 class="text-xl font-semibold text-gray-900 dark:text-white sm:text-2xl">Shopping Cart</h2>

               <div class="mt-6 sm:mt-8 md:gap-6 lg:flex lg:items-start xl:gap-8">
                  <div class="mx-auto w-full flex-none lg:max-w-2xl xl:max-w-4xl">
                     <div class="space-y-6">
                        <div class="rounded-lg border border-gray-200 bg-white p-4 shadow-sm dark:border-gray-700 dark:bg-gray-800 md:p-6">
                           <div class="space-y-4 md:flex md:items-center md:justify-between md:gap-6 md:space-y-0">
                              <a href="#" class="shrink-0 md:order-1">
                                 <img class="h-20 w-20 dark:hidden" src="https://flowbite.s3.amazonaws.com/blocks/e-commerce/imac-front.svg" alt="imac image" />
                                 <img class="hidden h-20 w-20 dark:block" src="https://flowbite.s3.amazonaws.com/blocks/e-commerce/imac-front-dark.svg" alt="imac image" />
                              </a>

                              <label for="counter-input" class="sr-only">Choose quantity:</label>
                              <div class="flex items-center justify-between md:order-3 md:justify-end">
                                 <div class="flex items-center">
                                    <button type="button" id="decrement-button" data-input-counter-decrement="counter-input" class="inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-md border border-gray-300 bg-gray-100 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-100 dark:border-gray-600 dark:bg-gray-700 dark:hover:bg-gray-600 dark:focus:ring-gray-700">
                                       <svg class="h-2.5 w-2.5 text-gray-900 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 2">
                                          <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 1h16" />
                                       </svg>
                                    </button>
                                    <input type="text" id="counter-input" data-input-counter class="w-10 shrink-0 border-0 bg-transparent text-center text-sm font-medium text-gray-900 focus:outline-none focus:ring-0 dark:text-white" placeholder="" value="2" required />
                                    <button type="button" id="increment-button" data-input-counter-increment="counter-input" class="inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-md border border-gray-300 bg-gray-100 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-100 dark:border-gray-600 dark:bg-gray-700 dark:hover:bg-gray-600 dark:focus:ring-gray-700">
                                       <svg class="h-2.5 w-2.5 text-gray-900 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 18">
                                          <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 1v16M1 9h16" />
                                       </svg>
                                    </button>
                                 </div>
                                 <div class="text-end md:order-4 md:w-32">
                                    <p class="text-base font-bold text-gray-900 dark:text-white">$1,499</p>
                                 </div>
                              </div>

                              <div class="w-full min-w-0 flex-1 space-y-4 md:order-2 md:max-w-md">
                                 <a href="#" class="text-base font-medium text-gray-900 hover:underline dark:text-white">PC system All in One APPLE iMac (2023) mqrq3ro/a, Apple M3, 24" Retina 4.5K, 8GB, SSD 256GB, 10-core GPU, Keyboard layout INT</a>

                                 <div class="flex items-center gap-4">
                                    <button type="button" class="inline-flex items-center text-sm font-medium text-gray-500 hover:text-gray-900 hover:underline dark:text-gray-400 dark:hover:text-white">
                                       <svg class="me-1.5 h-5 w-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                                          <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12.01 6.001C6.5 1 1 8 5.782 13.001L12.011 20l6.23-7C23 8 17.5 1 12.01 6.002Z" />
                                       </svg>
                                       Add to Favorites
                                    </button>

                                    <button type="button" class="inline-flex items-center text-sm font-medium text-red-600 hover:underline dark:text-red-500">
                                       <svg class="me-1.5 h-5 w-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                                          <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18 17.94 6M18 18 6.06 6" />
                                       </svg>
                                       Remove
                                    </button>
                                 </div>
                              </div>
                           </div>
                        </div>
                        <div class="rounded-lg border border-gray-200 bg-white p-4 shadow-sm dark:border-gray-700 dark:bg-gray-800 md:p-6">
                           <div class="space-y-4 md:flex md:items-center md:justify-between md:gap-6 md:space-y-0">
                              <a href="#" class="shrink-0 md:order-1">
                                 <img class="h-20 w-20 dark:hidden" src="https://flowbite.s3.amazonaws.com/blocks/e-commerce/apple-watch-light.svg" alt="imac image" />
                                 <img class="hidden h-20 w-20 dark:block" src="https://flowbite.s3.amazonaws.com/blocks/e-commerce/apple-watch-dark.svg" alt="imac image" />
                              </a>

                              <label for="counter-input" class="sr-only">Choose quantity:</label>
                              <div class="flex items-center justify-between md:order-3 md:justify-end">
                                 <div class="flex items-center">
                                    <button type="button" id="decrement-button-2" data-input-counter-decrement="counter-input-2" class="inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-md border border-gray-300 bg-gray-100 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-100 dark:border-gray-600 dark:bg-gray-700 dark:hover:bg-gray-600 dark:focus:ring-gray-700">
                                       <svg class="h-2.5 w-2.5 text-gray-900 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 2">
                                          <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 1h16" />
                                       </svg>
                                    </button>
                                    <input type="text" id="counter-input-2" data-input-counter class="w-10 shrink-0 border-0 bg-transparent text-center text-sm font-medium text-gray-900 focus:outline-none focus:ring-0 dark:text-white" placeholder="" value="1" required />
                                    <button type="button" id="increment-button-2" data-input-counter-increment="counter-input-2" class="inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-md border border-gray-300 bg-gray-100 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-100 dark:border-gray-600 dark:bg-gray-700 dark:hover:bg-gray-600 dark:focus:ring-gray-700">
                                       <svg class="h-2.5 w-2.5 text-gray-900 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 18">
                                          <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 1v16M1 9h16" />
                                       </svg>
                                    </button>
                                 </div>
                                 <div class="text-end md:order-4 md:w-32">
                                    <p class="text-base font-bold text-gray-900 dark:text-white">$598</p>
                                 </div>
                              </div>

                              <div class="w-full min-w-0 flex-1 space-y-4 md:order-2 md:max-w-md">
                                 <a href="#" class="text-base font-medium text-gray-900 hover:underline dark:text-white">Restored Apple Watch Series 8 (GPS) 41mm Midnight Aluminum Case with Midnight Sport Band</a>

                                 <div class="flex items-center gap-4">
                                    <button type="button" class="inline-flex items-center text-sm font-medium text-gray-500 hover:text-gray-900 hover:underline dark:text-gray-400 dark:hover:text-white">
                                       <svg class="me-1.5 h-5 w-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                                          <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12.01 6.001C6.5 1 1 8 5.782 13.001L12.011 20l6.23-7C23 8 17.5 1 12.01 6.002Z" />
                                       </svg>
                                       Add to Favorites
                                    </button>

                                    <button type="button" class="inline-flex items-center text-sm font-medium text-red-600 hover:underline dark:text-red-500">
                                       <svg class="me-1.5 h-5 w-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                                          <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18 17.94 6M18 18 6.06 6" />
                                       </svg>
                                       Remove
                                    </button>
                                 </div>
                              </div>
                           </div>
                        </div>
                        <div class="rounded-lg border border-gray-200 bg-white p-4 shadow-sm dark:border-gray-700 dark:bg-gray-800 md:p-6">
                           <div class="space-y-4 md:flex md:items-center md:justify-between md:gap-6 md:space-y-0">
                              <a href="#" class="shrink-0 md:order-1">
                                 <img class="h-20 w-20 dark:hidden" src="https://flowbite.s3.amazonaws.com/blocks/e-commerce/macbook-pro-light.svg" alt="imac image" />
                                 <img class="hidden h-20 w-20 dark:block" src="https://flowbite.s3.amazonaws.com/blocks/e-commerce/macbook-pro-dark.svg" alt="imac image" />
                              </a>

                              <label for="counter-input" class="sr-only">Choose quantity:</label>
                              <div class="flex items-center justify-between md:order-3 md:justify-end">
                                 <div class="flex items-center">
                                    <button type="button" id="decrement-button-3" data-input-counter-decrement="counter-input-3" class="inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-md border border-gray-300 bg-gray-100 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-100 dark:border-gray-600 dark:bg-gray-700 dark:hover:bg-gray-600 dark:focus:ring-gray-700">
                                       <svg class="h-2.5 w-2.5 text-gray-900 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 2">
                                          <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 1h16" />
                                       </svg>
                                    </button>
                                    <input type="text" id="counter-input-3" data-input-counter class="w-10 shrink-0 border-0 bg-transparent text-center text-sm font-medium text-gray-900 focus:outline-none focus:ring-0 dark:text-white" placeholder="" value="1" required />
                                    <button type="button" id="increment-button-3" data-input-counter-increment="counter-input-3" class="inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-md border border-gray-300 bg-gray-100 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-100 dark:border-gray-600 dark:bg-gray-700 dark:hover:bg-gray-600 dark:focus:ring-gray-700">
                                       <svg class="h-2.5 w-2.5 text-gray-900 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 18">
                                          <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 1v16M1 9h16" />
                                       </svg>
                                    </button>
                                 </div>
                                 <div class="text-end md:order-4 md:w-32">
                                    <p class="text-base font-bold text-gray-900 dark:text-white">$1,799</p>
                                 </div>
                              </div>

                              <div class="w-full min-w-0 flex-1 space-y-4 md:order-2 md:max-w-md">
                                 <a href="#" class="text-base font-medium text-gray-900 hover:underline dark:text-white">Apple - MacBook Pro 16" Laptop, M3 Pro chip, 36GB Memory, 18-core GPU, 512GB SSD, Space Black</a>

                                 <div class="flex items-center gap-4">
                                    <button type="button" class="inline-flex items-center text-sm font-medium text-gray-500 hover:text-gray-900 hover:underline dark:text-gray-400 dark:hover:text-white">
                                       <svg class="me-1.5 h-5 w-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                                          <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12.01 6.001C6.5 1 1 8 5.782 13.001L12.011 20l6.23-7C23 8 17.5 1 12.01 6.002Z" />
                                       </svg>
                                       Add to Favorites
                                    </button>

                                    <button type="button" class="inline-flex items-center text-sm font-medium text-red-600 hover:underline dark:text-red-500">
                                       <svg class="me-1.5 h-5 w-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                                          <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18 17.94 6M18 18 6.06 6" />
                                       </svg>
                                       Remove
                                    </button>
                                 </div>
                              </div>
                           </div>
                        </div>
                        <div class="rounded-lg border border-gray-200 bg-white p-4 shadow-sm dark:border-gray-700 dark:bg-gray-800 md:p-6">
                           <div class="space-y-4 md:flex md:items-center md:justify-between md:gap-6 md:space-y-0">
                              <a href="#" class="shrink-0 md:order-1">
                                 <img class="h-20 w-20 dark:hidden" src="https://flowbite.s3.amazonaws.com/blocks/e-commerce/ipad-light.svg" alt="imac image" />
                                 <img class="hidden h-20 w-20 dark:block" src="https://flowbite.s3.amazonaws.com/blocks/e-commerce/ipad-dark.svg" alt="imac image" />
                              </a>

                              <label for="counter-input" class="sr-only">Choose quantity:</label>
                              <div class="flex items-center justify-between md:order-3 md:justify-end">
                                 <div class="flex items-center">
                                    <button type="button" id="decrement-button-4" data-input-counter-decrement="counter-input-4" class="inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-md border border-gray-300 bg-gray-100 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-100 dark:border-gray-600 dark:bg-gray-700 dark:hover:bg-gray-600 dark:focus:ring-gray-700">
                                       <svg class="h-2.5 w-2.5 text-gray-900 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 2">
                                          <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 1h16" />
                                       </svg>
                                    </button>
                                    <input type="text" id="counter-input-4" data-input-counter class="w-10 shrink-0 border-0 bg-transparent text-center text-sm font-medium text-gray-900 focus:outline-none focus:ring-0 dark:text-white" placeholder="" value="1" required />
                                    <button type="button" id="increment-button-4" data-input-counter-increment="counter-input-4" class="inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-md border border-gray-300 bg-gray-100 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-100 dark:border-gray-600 dark:bg-gray-700 dark:hover:bg-gray-600 dark:focus:ring-gray-700">
                                       <svg class="h-2.5 w-2.5 text-gray-900 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 18">
                                          <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 1v16M1 9h16" />
                                       </svg>
                                    </button>
                                 </div>
                                 <div class="text-end md:order-4 md:w-32">
                                    <p class="text-base font-bold text-gray-900 dark:text-white">$699</p>
                                 </div>
                              </div>

                              <div class="w-full min-w-0 flex-1 space-y-4 md:order-2 md:max-w-md">
                                 <a href="#" class="text-base font-medium text-gray-900 hover:underline dark:text-white">Tablet APPLE iPad Pro 12.9" 6th Gen, 128GB, Wi-Fi, Gold</a>

                                 <div class="flex items-center gap-4">
                                    <button type="button" class="inline-flex items-center text-sm font-medium text-gray-500 hover:text-gray-900 hover:underline dark:text-gray-400 dark:hover:text-white">
                                       <svg class="me-1.5 h-5 w-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                                          <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12.01 6.001C6.5 1 1 8 5.782 13.001L12.011 20l6.23-7C23 8 17.5 1 12.01 6.002Z" />
                                       </svg>
                                       Add to Favorites
                                    </button>

                                    <button type="button" class="inline-flex items-center text-sm font-medium text-red-600 hover:underline dark:text-red-500">
                                       <svg class="me-1.5 h-5 w-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                                          <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18 17.94 6M18 18 6.06 6" />
                                       </svg>
                                       Remove
                                    </button>
                                 </div>
                              </div>
                           </div>
                        </div>
                        <div class="rounded-lg border border-gray-200 bg-white p-4 shadow-sm dark:border-gray-700 dark:bg-gray-800 md:p-6">
                           <div class="space-y-4 md:flex md:items-center md:justify-between md:gap-6 md:space-y-0">
                              <a href="#" class="w-20 shrink-0 md:order-1">
                                 <img class="h-20 w-20 dark:hidden" src="https://flowbite.s3.amazonaws.com/blocks/e-commerce/iphone-light.svg" alt="imac image" />
                                 <img class="hidden h-20 w-20 dark:block" src="https://flowbite.s3.amazonaws.com/blocks/e-commerce/iphone-dark.svg" alt="imac image" />
                              </a>

                              <label for="counter-input" class="sr-only">Choose quantity:</label>
                              <div class="flex items-center justify-between md:order-3 md:justify-end">
                                 <div class="flex items-center">
                                    <button type="button" id="decrement-button-5" data-input-counter-decrement="counter-input-5" class="inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-md border border-gray-300 bg-gray-100 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-100 dark:border-gray-600 dark:bg-gray-700 dark:hover:bg-gray-600 dark:focus:ring-gray-700">
                                       <svg class="h-2.5 w-2.5 text-gray-900 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 2">
                                          <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 1h16" />
                                       </svg>
                                    </button>
                                    <input type="text" id="counter-input-5" data-input-counter class="w-10 shrink-0 border-0 bg-transparent text-center text-sm font-medium text-gray-900 focus:outline-none focus:ring-0 dark:text-white" placeholder="" value="3" required />
                                    <button type="button" id="increment-button-5" data-input-counter-increment="counter-input-5" class="inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-md border border-gray-300 bg-gray-100 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-100 dark:border-gray-600 dark:bg-gray-700 dark:hover:bg-gray-600 dark:focus:ring-gray-700">
                                       <svg class="h-2.5 w-2.5 text-gray-900 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 18">
                                          <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 1v16M1 9h16" />
                                       </svg>
                                    </button>
                                 </div>
                                 <div class="text-end md:order-4 md:w-32">
                                    <p class="text-base font-bold text-gray-900 dark:text-white">$2,997</p>
                                 </div>
                              </div>

                              <div class="w-full min-w-0 flex-1 space-y-4 md:order-2 md:max-w-md">
                                 <a href="#" class="text-base font-medium text-gray-900 hover:underline dark:text-white">APPLE iPhone 15 5G phone, 256GB, Gold</a>

                                 <div class="flex items-center gap-4">
                                    <button type="button" class="inline-flex items-center text-sm font-medium text-gray-500 hover:text-gray-900 hover:underline dark:text-gray-400 dark:hover:text-white">
                                       <svg class="me-1.5 h-5 w-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                                          <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12.01 6.001C6.5 1 1 8 5.782 13.001L12.011 20l6.23-7C23 8 17.5 1 12.01 6.002Z" />
                                       </svg>
                                       Add to Favorites
                                    </button>

                                    <button type="button" class="inline-flex items-center text-sm font-medium text-red-600 hover:underline dark:text-red-500">
                                       <svg class="me-1.5 h-5 w-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                                          <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18 17.94 6M18 18 6.06 6" />
                                       </svg>
                                       Remove
                                    </button>
                                 </div>
                              </div>
                           </div>
                        </div>
                     </div>
                     <div class="hidden xl:mt-8 xl:block">
                        <h3 class="text-2xl font-semibold text-gray-900 dark:text-white">People also bought</h3>
                        <div class="mt-6 grid grid-cols-3 gap-4 sm:mt-8">
                           <div class="space-y-6 overflow-hidden rounded-lg border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-800">
                              <a href="#" class="overflow-hidden rounded">
                                 <img class="mx-auto h-44 w-44 dark:hidden" src="https://flowbite.s3.amazonaws.com/blocks/e-commerce/imac-front.svg" alt="imac image" />
                                 <img class="mx-auto hidden h-44 w-44 dark:block" src="https://flowbite.s3.amazonaws.com/blocks/e-commerce/imac-front-dark.svg" alt="imac image" />
                              </a>
                              <div>
                                 <a href="#" class="text-lg font-semibold leading-tight text-gray-900 hover:underline dark:text-white">iMac 27”</a>
                                 <p class="mt-2 text-base font-normal text-gray-500 dark:text-gray-400">This generation has some improvements, including a longer continuous battery life.</p>
                              </div>
                              <div>
                                 <p class="text-lg font-bold text-gray-900 dark:text-white">
                                    <span class="line-through"> $399,99 </span>
                                 </p>
                                 <p class="text-lg font-bold leading-tight text-red-600 dark:text-red-500">$299</p>
                              </div>
                              <div class="mt-6 flex items-center gap-2.5">
                                 <button data-tooltip-target="favourites-tooltip-1" type="button" class="inline-flex items-center justify-center gap-2 rounded-lg border border-gray-200 bg-white p-2.5 text-sm font-medium text-gray-900 hover:bg-gray-100 hover:text-primary-700 focus:z-10 focus:outline-none focus:ring-4 focus:ring-gray-100 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white dark:focus:ring-gray-700">
                                    <svg class="h-5 w-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                       <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6C6.5 1 1 8 5.8 13l6.2 7 6.2-7C23 8 17.5 1 12 6Z"></path>
                                    </svg>
                                 </button>
                                 <div id="favourites-tooltip-1" role="tooltip" class="tooltip invisible absolute z-10 inline-block rounded-lg bg-gray-900 px-3 py-2 text-sm font-medium text-white opacity-0 shadow-sm transition-opacity duration-300 dark:bg-gray-700">
                                    Add to favourites
                                    <div class="tooltip-arrow" data-popper-arrow></div>
                                 </div>
                                 <button type="button" class="inline-flex w-full items-center justify-center rounded-lg bg-primary-700 px-5 py-2.5 text-sm font-medium  text-white hover:bg-primary-800 focus:outline-none focus:ring-4 focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">
                                    <svg class="-ms-2 me-2 h-5 w-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                                       <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 4h1.5L9 16m0 0h8m-8 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm8 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm-8.5-3h9.25L19 7h-1M8 7h-.688M13 5v4m-2-2h4" />
                                    </svg>
                                    Add to cart
                                 </button>
                              </div>
                           </div>
                           <div class="space-y-6 overflow-hidden rounded-lg border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-800">
                              <a href="#" class="overflow-hidden rounded">
                                 <img class="mx-auto h-44 w-44 dark:hidden" src="https://flowbite.s3.amazonaws.com/blocks/e-commerce/ps5-light.svg" alt="imac image" />
                                 <img class="mx-auto hidden h-44 w-44 dark:block" src="https://flowbite.s3.amazonaws.com/blocks/e-commerce/ps5-dark.svg" alt="imac image" />
                              </a>
                              <div>
                                 <a href="#" class="text-lg font-semibold leading-tight text-gray-900 hover:underline dark:text-white">Playstation 5</a>
                                 <p class="mt-2 text-base font-normal text-gray-500 dark:text-gray-400">This generation has some improvements, including a longer continuous battery life.</p>
                              </div>
                              <div>
                                 <p class="text-lg font-bold text-gray-900 dark:text-white">
                                    <span class="line-through"> $799,99 </span>
                                 </p>
                                 <p class="text-lg font-bold leading-tight text-red-600 dark:text-red-500">$499</p>
                              </div>
                              <div class="mt-6 flex items-center gap-2.5">
                                 <button data-tooltip-target="favourites-tooltip-2" type="button" class="inline-flex items-center justify-center gap-2 rounded-lg border border-gray-200 bg-white p-2.5 text-sm font-medium text-gray-900 hover:bg-gray-100 hover:text-primary-700 focus:z-10 focus:outline-none focus:ring-4 focus:ring-gray-100 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white dark:focus:ring-gray-700">
                                    <svg class="h-5 w-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                       <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6C6.5 1 1 8 5.8 13l6.2 7 6.2-7C23 8 17.5 1 12 6Z"></path>
                                    </svg>
                                 </button>
                                 <div id="favourites-tooltip-2" role="tooltip" class="tooltip invisible absolute z-10 inline-block rounded-lg bg-gray-900 px-3 py-2 text-sm font-medium text-white opacity-0 shadow-sm transition-opacity duration-300 dark:bg-gray-700">
                                    Add to favourites
                                    <div class="tooltip-arrow" data-popper-arrow></div>
                                 </div>
                                 <button type="button" class="inline-flex w-full items-center justify-center rounded-lg bg-primary-700 px-5 py-2.5 text-sm font-medium  text-white hover:bg-primary-800 focus:outline-none focus:ring-4 focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">
                                    <svg class="-ms-2 me-2 h-5 w-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                                       <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 4h1.5L9 16m0 0h8m-8 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm8 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm-8.5-3h9.25L19 7h-1M8 7h-.688M13 5v4m-2-2h4" />
                                    </svg>
                                    Add to cart
                                 </button>
                              </div>
                           </div>
                           <div class="space-y-6 overflow-hidden rounded-lg border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-800">
                              <a href="#" class="overflow-hidden rounded">
                                 <img class="mx-auto h-44 w-44 dark:hidden" src="https://flowbite.s3.amazonaws.com/blocks/e-commerce/apple-watch-light.svg" alt="imac image" />
                                 <img class="mx-auto hidden h-44 w-44 dark:block" src="https://flowbite.s3.amazonaws.com/blocks/e-commerce/apple-watch-dark.svg" alt="imac image" />
                              </a>
                              <div>
                                 <a href="#" class="text-lg font-semibold leading-tight text-gray-900 hover:underline dark:text-white">Apple Watch Series 8</a>
                                 <p class="mt-2 text-base font-normal text-gray-500 dark:text-gray-400">This generation has some improvements, including a longer continuous battery life.</p>
                              </div>
                              <div>
                                 <p class="text-lg font-bold text-gray-900 dark:text-white">
                                    <span class="line-through"> $1799,99 </span>
                                 </p>
                                 <p class="text-lg font-bold leading-tight text-red-600 dark:text-red-500">$1199</p>
                              </div>
                              <div class="mt-6 flex items-center gap-2.5">
                                 <button data-tooltip-target="favourites-tooltip-3" type="button" class="inline-flex items-center justify-center gap-2 rounded-lg border border-gray-200 bg-white p-2.5 text-sm font-medium text-gray-900 hover:bg-gray-100 hover:text-primary-700 focus:z-10 focus:outline-none focus:ring-4 focus:ring-gray-100 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white dark:focus:ring-gray-700">
                                    <svg class="h-5 w-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                       <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6C6.5 1 1 8 5.8 13l6.2 7 6.2-7C23 8 17.5 1 12 6Z"></path>
                                    </svg>
                                 </button>
                                 <div id="favourites-tooltip-3" role="tooltip" class="tooltip invisible absolute z-10 inline-block rounded-lg bg-gray-900 px-3 py-2 text-sm font-medium text-white opacity-0 shadow-sm transition-opacity duration-300 dark:bg-gray-700">
                                    Add to favourites
                                    <div class="tooltip-arrow" data-popper-arrow></div>
                                 </div>

                                 <button type="button" class="inline-flex w-full items-center justify-center rounded-lg bg-primary-700 px-5 py-2.5 text-sm font-medium  text-white hover:bg-primary-800 focus:outline-none focus:ring-4 focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">
                                    <svg class="-ms-2 me-2 h-5 w-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                                       <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 4h1.5L9 16m0 0h8m-8 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm8 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm-8.5-3h9.25L19 7h-1M8 7h-.688M13 5v4m-2-2h4" />
                                    </svg>
                                    Add to cart
                                 </button>
                              </div>
                           </div>
                        </div>
                     </div>
                  </div>

                  <div class="mx-auto mt-6 max-w-4xl flex-1 space-y-6 lg:mt-0 lg:w-full">
                     <div class="space-y-4 rounded-lg border border-gray-200 bg-white p-4 shadow-sm dark:border-gray-700 dark:bg-gray-800 sm:p-6">
                        <p class="text-xl font-semibold text-gray-900 dark:text-white">Order summary</p>

                        <div class="space-y-4">
                           <div class="space-y-2">
                              <dl class="flex items-center justify-between gap-4">
                                 <dt class="text-base font-normal text-gray-500 dark:text-gray-400">Original price</dt>
                                 <dd class="text-base font-medium text-gray-900 dark:text-white">$7,592.00</dd>
                              </dl>

                              <dl class="flex items-center justify-between gap-4">
                                 <dt class="text-base font-normal text-gray-500 dark:text-gray-400">Savings</dt>
                                 <dd class="text-base font-medium text-green-600">-$299.00</dd>
                              </dl>

                              <dl class="flex items-center justify-between gap-4">
                                 <dt class="text-base font-normal text-gray-500 dark:text-gray-400">Store Pickup</dt>
                                 <dd class="text-base font-medium text-gray-900 dark:text-white">$99</dd>
                              </dl>

                              <dl class="flex items-center justify-between gap-4">
                                 <dt class="text-base font-normal text-gray-500 dark:text-gray-400">Tax</dt>
                                 <dd class="text-base font-medium text-gray-900 dark:text-white">$799</dd>
                              </dl>
                           </div>

                           <dl class="flex items-center justify-between gap-4 border-t border-gray-200 pt-2 dark:border-gray-700">
                              <dt class="text-base font-bold text-gray-900 dark:text-white">Total</dt>
                              <dd class="text-base font-bold text-gray-900 dark:text-white">$8,191.00</dd>
                           </dl>
                        </div>

                        <a href="#" class="flex w-full items-center justify-center rounded-lg bg-primary-700 px-5 py-2.5 text-sm font-medium text-white hover:bg-primary-800 focus:outline-none focus:ring-4 focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Proceed to Checkout</a>

                        <div class="flex items-center justify-center gap-2">
                           <span class="text-sm font-normal text-gray-500 dark:text-gray-400"> or </span>
                           <a href="#" title="" class="inline-flex items-center gap-2 text-sm font-medium text-primary-700 underline hover:no-underline dark:text-primary-500">
                              Continue Shopping
                              <svg class="h-5 w-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                 <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 12H5m14 0-4 4m4-4-4-4" />
                              </svg>
                           </a>
                        </div>
                     </div>

                     <div class="space-y-4 rounded-lg border border-gray-200 bg-white p-4 shadow-sm dark:border-gray-700 dark:bg-gray-800 sm:p-6">
                        <form class="space-y-4">
                           <div>
                              <label for="voucher" class="mb-2 block text-sm font-medium text-gray-900 dark:text-white"> Do you have a voucher or gift card? </label>
                              <input type="text" id="voucher" class="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-primary-500 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400 dark:focus:border-primary-500 dark:focus:ring-primary-500" placeholder="" required />
                           </div>
                           <button type="submit" class="flex w-full items-center justify-center rounded-lg bg-primary-700 px-5 py-2.5 text-sm font-medium text-white hover:bg-primary-800 focus:outline-none focus:ring-4 focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Apply Code</button>
                        </form>
                     </div>
                  </div>
               </div>
            </div>
         </section>


         <section class="bg-white py-8 antialiased dark:bg-gray-900 md:py-16">
            <div class="mx-auto max-w-screen-lg px-4 2xl:px-0">
               <div class="lg:flex lg:items-center lg:justify-between lg:gap-4">
                  <h2 class="shrink-0 text-xl font-semibold text-gray-900 dark:text-white sm:text-2xl">Questions (147)</h2>

                  <form class="mt-4 w-full gap-4 sm:flex sm:items-center sm:justify-end lg:mt-0">
                     <label for="simple-search" class="sr-only">Search</label>
                     <div class="relative w-full flex-1 lg:max-w-sm">
                        <div class="pointer-events-none absolute inset-y-0 start-0 flex items-center ps-3">
                           <svg class="h-4 w-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                              <path stroke="currentColor" stroke-linecap="round" stroke-width="2" d="m21 21-3.5-3.5M17 10a7 7 0 1 1-14 0 7 7 0 0 1 14 0Z" />
                           </svg>
                        </div>
                        <input type="text" id="simple-search" class="block w-full rounded-lg border border-gray-300 bg-gray-50 px-4 py-2.5 ps-9 text-sm text-gray-900 focus:border-primary-500 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400 dark:focus:border-primary-500 dark:focus:ring-primary-500" placeholder="Search Questions & Answers" required />
                     </div>

                     <button type="button" data-modal-target="question-modal" data-modal-toggle="question-modal" class="mt-4 w-full shrink-0 rounded-lg bg-primary-700 px-5 py-2.5 text-sm font-medium text-white hover:bg-primary-800 focus:outline-none focus:ring-4 focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800 sm:mt-0 sm:w-auto">Ask a question</button>
                  </form>
               </div>

               <div class="mt-6 flow-root">
                  <div class="-my-6 divide-y divide-gray-200 dark:divide-gray-800">
                     <div class="space-y-4 py-6 md:py-8">
                        <div class="grid gap-4">
                           <div>
                              <span class="inline-block rounded bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-800 dark:bg-green-900 dark:text-green-300 md:mb-0"> 3 answers </span>
                           </div>

                           <a href="#" class="text-xl font-semibold text-gray-900 hover:underline dark:text-white">“The specs say this model has 2 USB ports. The one I received has none. Are they hidden somewhere?”</a>
                        </div>
                        <p class="text-base font-normal text-gray-500 dark:text-gray-400">It’s a USB-C port it’s a smaller port. Not the regular size USB port. See the picture below. It fits the newer Apple chargers.</p>
                        <p class="text-sm font-medium text-gray-500 dark:text-gray-400">
                           Answered 1 day ago by
                           <a href="#" class="text-gray-900 hover:underline dark:text-white">Bonnie Green</a>
                        </p>
                     </div>

                     <div class="space-y-4 py-6 md:py-8">
                        <div class="grid gap-4">
                           <div>
                              <span class="inline-block rounded bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-800 dark:bg-green-900 dark:text-green-300 md:mb-0"> 1 answer </span>
                           </div>

                           <a href="#" class="text-xl font-semibold text-gray-900 hover:underline dark:text-white">“Is this just the monitor?”</a>
                        </div>
                        <p class="text-base font-normal text-gray-500 dark:text-gray-400">It's an all-in-one (AIO). Which means everything in one structure. So it's not just a monitor it uses Apple's operating System, macOS and it has storage, CPU, GPU etc.</p>
                        <p class="text-sm font-medium text-gray-500 dark:text-gray-400">
                           Answered 1 day ago by
                           <a href="#" class="text-gray-900 hover:underline dark:text-white">Jese Leos</a>
                        </p>
                     </div>

                     <div class="space-y-4 py-6 md:py-8">
                        <div class="grid gap-4">
                           <div>
                              <span class="inline-block rounded bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-800 dark:bg-green-900 dark:text-green-300 md:mb-0"> 7 answers </span>
                           </div>
                           <a href="#" class="text-xl font-semibold text-gray-900 hover:underline dark:text-white">“For an inexpert 85-year-old general user with a ten-year old iMac (OSX Yosemite version 10.10.5), is this latest model 24" iMac with Retina 4.5K display Apple M1 8GB memory - 256GB SSD a decent upgrade?”</a>
                        </div>
                        <p class="text-base font-normal text-gray-500 dark:text-gray-400">It's basically the same system as your older machine, but bigger, lighter and faster. There is no disc drive and it has fewer ports.</p>
                        <p class="text-sm font-medium text-gray-500 dark:text-gray-400">
                           Answered 2 days ago by
                           <a href="#" class="text-gray-900 hover:underline dark:text-white">Bonnie Green</a>
                        </p>
                     </div>

                     <div class="space-y-4 py-6 md:py-8">
                        <div class="grid gap-4">
                           <div>
                              <span class="inline-block rounded bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-800 dark:bg-green-900 dark:text-green-300 md:mb-0"> 32 answers </span>
                           </div>

                           <a href="#" class="text-xl font-semibold text-gray-900 hover:underline dark:text-white">“I just brought home the Imac24". It saysthe mouse and Keyboard are wireless. Where do I install the power for them?”</a>
                        </div>
                        <p class="text-base font-normal text-gray-500 dark:text-gray-400">You can charge the mouse and keyboard with a lightning charger. Once charged, they last months before having to charge again.</p>
                        <p class="text-sm font-medium text-gray-500 dark:text-gray-400">
                           Answered 2 days ago by
                           <a href="#" class="text-gray-900 hover:underline dark:text-white">Roberta Casas</a>
                        </p>
                     </div>

                     <div class="space-y-4 py-6 md:py-8">
                        <div class="grid gap-4">
                           <div>
                              <span class="inline-block rounded bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-800 dark:bg-green-900 dark:text-green-300 md:mb-0"> 4 answers </span>
                           </div>

                           <a href="#" class="text-xl font-semibold text-gray-900 hover:underline dark:text-white">“Does this include the keyboard and mouse?”</a>
                        </div>
                        <p class="text-base font-normal text-gray-500 dark:text-gray-400">Yes it does, color matched to the Mac. And the keyboard has Touch ID.</p>
                        <p class="text-sm font-medium text-gray-500 dark:text-gray-400">
                           Answered 1 week ago by
                           <a href="#" class="text-gray-900 hover:underline dark:text-white">Joseph McFallen</a>
                        </p>
                     </div>
                  </div>
               </div>

               <div class="mt-6 flex items-center justify-center lg:justify-start">
                  <button type="button" class="w-full rounded-lg border border-gray-200 bg-white px-5 py-2.5 text-sm font-medium text-gray-900 hover:bg-gray-100 hover:text-primary-700 focus:z-10 focus:outline-none focus:ring-4 focus:ring-gray-100 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white dark:focus:ring-gray-700 sm:w-auto">View more questions</button>
               </div>
            </div>
         </section>


         <section class="bg-white py-8 antialiased dark:bg-gray-900 md:py-16">
            <form action="#" class="mx-auto max-w-screen-xl px-4 2xl:px-0">
               <div class="mx-auto max-w-3xl">
                  <h2 class="text-xl font-semibold text-gray-900 dark:text-white sm:text-2xl">Order summary</h2>

                  <div class="mt-6 space-y-4 border-b border-t border-gray-200 py-8 dark:border-gray-700 sm:mt-8">
                     <h4 class="text-lg font-semibold text-gray-900 dark:text-white">Billing & Delivery information</h4>

                     <dl>
                        <dt class="text-base font-medium text-gray-900 dark:text-white">Individual</dt>
                        <dd class="mt-1 text-base font-normal text-gray-500 dark:text-gray-400">Bonnie Green - +1 234 567 890, San Francisco, California, United States, 3454, Scott Street</dd>
                     </dl>

                     <button type="button" data-modal-target="billingInformationModal" data-modal-toggle="billingInformationModal" class="text-base font-medium text-primary-700 hover:underline dark:text-primary-500">Edit</button>
                  </div>

                  <div class="mt-6 sm:mt-8">
                     <div class="relative overflow-x-auto border-b border-gray-200 dark:border-gray-800">
                        <table class="w-full text-left font-medium text-gray-900 dark:text-white md:table-fixed">
                           <tbody class="divide-y divide-gray-200 dark:divide-gray-800">
                              <tr>
                                 <td class="whitespace-nowrap py-4 md:w-[384px]">
                                    <div class="flex items-center gap-4">
                                       <a href="#" class="flex items-center aspect-square w-10 h-10 shrink-0">
                                          <img class="h-auto w-full max-h-full dark:hidden" src="https://flowbite.s3.amazonaws.com/blocks/e-commerce/imac-front.svg" alt="imac image" />
                                          <img class="hidden h-auto w-full max-h-full dark:block" src="https://flowbite.s3.amazonaws.com/blocks/e-commerce/imac-front-dark.svg" alt="imac image" />
                                       </a>
                                       <a href="#" class="hover:underline">Apple iMac 27”</a>
                                    </div>
                                 </td>

                                 <td class="p-4 text-base font-normal text-gray-900 dark:text-white">x1</td>

                                 <td class="p-4 text-right text-base font-bold text-gray-900 dark:text-white">$1,499</td>
                              </tr>

                              <tr>
                                 <td class="whitespace-nowrap py-4 md:w-[384px]">
                                    <div class="flex items-center gap-4">
                                       <a href="#" class="flex items-center aspect-square w-10 h-10 shrink-0">
                                          <img class="h-auto w-full max-h-full dark:hidden" src="https://flowbite.s3.amazonaws.com/blocks/e-commerce/iphone-light.svg" alt="imac image" />
                                          <img class="hidden h-auto w-full max-h-full dark:block" src="https://flowbite.s3.amazonaws.com/blocks/e-commerce/iphone-dark.svg" alt="imac image" />
                                       </a>
                                       <a href="#" class="hover:underline">Apple iPhone 14</a>
                                    </div>
                                 </td>

                                 <td class="p-4 text-base font-normal text-gray-900 dark:text-white">x2</td>

                                 <td class="p-4 text-right text-base font-bold text-gray-900 dark:text-white">$1,998</td>
                              </tr>
                           </tbody>
                        </table>
                     </div>

                     <div class="mt-4 space-y-6">
                        <h4 class="text-xl font-semibold text-gray-900 dark:text-white">Order summary</h4>

                        <div class="space-y-4">
                           <div class="space-y-2">
                              <dl class="flex items-center justify-between gap-4">
                                 <dt class="text-gray-500 dark:text-gray-400">Original price</dt>
                                 <dd class="text-base font-medium text-gray-900 dark:text-white">$6,592.00</dd>
                              </dl>

                              <dl class="flex items-center justify-between gap-4">
                                 <dt class="text-gray-500 dark:text-gray-400">Savings</dt>
                                 <dd class="text-base font-medium text-green-500">-$299.00</dd>
                              </dl>

                              <dl class="flex items-center justify-between gap-4">
                                 <dt class="text-gray-500 dark:text-gray-400">Store Pickup</dt>
                                 <dd class="text-base font-medium text-gray-900 dark:text-white">$99</dd>
                              </dl>

                              <dl class="flex items-center justify-between gap-4">
                                 <dt class="text-gray-500 dark:text-gray-400">Tax</dt>
                                 <dd class="text-base font-medium text-gray-900 dark:text-white">$799</dd>
                              </dl>
                           </div>

                           <dl class="flex items-center justify-between gap-4 border-t border-gray-200 pt-2 dark:border-gray-700">
                              <dt class="text-lg font-bold text-gray-900 dark:text-white">Total</dt>
                              <dd class="text-lg font-bold text-gray-900 dark:text-white">$7,191.00</dd>
                           </dl>
                        </div>

                        <div class="flex items-start sm:items-center">
                           <input id="terms-checkbox-2" type="checkbox" value="" class="h-4 w-4 rounded border-gray-300 bg-gray-100 text-primary-600 focus:ring-2 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800 dark:focus:ring-primary-600" />
                           <label for="terms-checkbox-2" class="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"> I agree with the <a href="#" title="" class="text-primary-700 underline hover:no-underline dark:text-primary-500">Terms and Conditions</a> of use of the Flowbite marketplace </label>
                        </div>

                        <div class="gap-4 sm:flex sm:items-center">
                           <button type="button" class="w-full rounded-lg  border border-gray-200 bg-white px-5  py-2.5 text-sm font-medium text-gray-900 hover:bg-gray-100 hover:text-primary-700 focus:z-10 focus:outline-none focus:ring-4 focus:ring-gray-100 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white dark:focus:ring-gray-700">Return to Shopping</button>

                           <button type="submit" class="mt-4 flex w-full items-center justify-center rounded-lg bg-primary-700  px-5 py-2.5 text-sm font-medium text-white hover:bg-primary-800 focus:outline-none focus:ring-4 focus:ring-primary-300  dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800 sm:mt-0">Send the order</button>
                        </div>
                     </div>
                  </div>
               </div>
            </form>
         </section>


         <div class="py-14 px-4 md:px-6 2xl:px-20 2xl:container 2xl:mx-auto">

            <div class="flex justify-start item-start space-y-2 flex-col">
               <h1
                  class="text-3xl dark:text-white lg:text-4xl font-semibold leading-7 lg:leading-9 text-gray-800"
               >
                  Order #13432
               </h1>
               <p
                  class="text-base dark:text-gray-300 font-medium leading-6 text-gray-600"
               >
                  21st Mart 2021 at 10:34 PM
               </p>
            </div>
            <div
               class="mt-10 flex flex-col xl:flex-row jusitfy-center items-stretch w-full xl:space-x-8 space-y-4 md:space-y-6 xl:space-y-0"
            >
               <div
                  class="flex flex-col justify-start items-start w-full space-y-4 md:space-y-6 xl:space-y-8"
               >
                  <div
                     class="flex flex-col justify-start items-start dark:bg-gray-800 bg-gray-50 px-4 py-4 md:py-6 md:p-6 xl:p-8 w-full"
                  >
                     <p
                        class="text-lg md:text-xl dark:text-white font-semibold leading-6 xl:leading-5 text-gray-800"
                     >
                        Customer’s Cart
                     </p>
                     <div
                        class="mt-4 md:mt-6 flex flex-col md:flex-row justify-start items-start md:items-center md:space-x-6 xl:space-x-8 w-full"
                     >
                        <div class="pb-4 md:pb-8 w-full md:w-40">
                           <img
                              class="w-full hidden md:block"
                              src="https://i.ibb.co/84qQR4p/Rectangle-10.png"
                              alt="dress"
                           />
                           <img
                              class="w-full md:hidden"
                              src="https://i.ibb.co/L039qbN/Rectangle-10.png"
                              alt="dress"
                           />
                        </div>
                        <div
                           class="border-b border-gray-200 md:flex-row flex-col flex justify-between items-start w-full pb-8 space-y-4 md:space-y-0"
                        >
                           <div
                              class="w-full flex flex-col justify-start items-start space-y-8"
                           >
                              <h3
                                 class="text-xl dark:text-white xl:text-2xl font-semibold leading-6 text-gray-800"
                              >
                                 Premium Quaility Dress
                              </h3>
                              <div
                                 class="flex justify-start items-start flex-col space-y-2"
                              >
                                 <p
                                    class="text-sm dark:text-white leading-none text-gray-800"
                                 >
                                    <span
                                       class="dark:text-gray-400 text-gray-300"
                                    >Style:
                                    </span> Italic Minimal Design
                                 </p>
                                 <p
                                    class="text-sm dark:text-white leading-none text-gray-800"
                                 >
                                    <span
                                       class="dark:text-gray-400 text-gray-300"
                                    >Size:
                                    </span> Small
                                 </p>
                                 <p
                                    class="text-sm dark:text-white leading-none text-gray-800"
                                 >
                                    <span
                                       class="dark:text-gray-400 text-gray-300"
                                    >Color:
                                    </span> Light Blue
                                 </p>
                              </div>
                           </div>
                           <div
                              class="flex justify-between space-x-8 items-start w-full"
                           >
                              <p
                                 class="text-base dark:text-white xl:text-lg leading-6"
                              >
                                 $36.00 <span
                                    class="text-red-300 line-through"
                                 >
                                    $45.00</span
                                 >
                              </p>
                              <p
                                 class="text-base dark:text-white xl:text-lg leading-6 text-gray-800"
                              >
                                 01
                              </p>
                              <p
                                 class="text-base dark:text-white xl:text-lg font-semibold leading-6 text-gray-800"
                              >
                                 $36.00
                              </p>
                           </div>
                        </div>
                     </div>
                     <div
                        class="mt-6 md:mt-0 flex justify-start flex-col md:flex-row items-start md:items-center space-y-4 md:space-x-6 xl:space-x-8 w-full"
                     >
                        <div class="w-full md:w-40">
                           <img
                              class="w-full hidden md:block"
                              src="https://i.ibb.co/s6snNx0/Rectangle-17.png"
                              alt="dress"
                           />
                           <img
                              class="w-full md:hidden"
                              src="https://i.ibb.co/BwYWJbJ/Rectangle-10.png"
                              alt="dress"
                           />
                        </div>
                        <div
                           class="flex justify-between items-start w-full flex-col md:flex-row space-y-4 md:space-y-0"
                        >
                           <div
                              class="w-full flex flex-col justify-start items-start space-y-8"
                           >
                              <h3
                                 class="text-xl dark:text-white xl:text-2xl font-semibold leading-6 text-gray-800"
                              >
                                 High Quaility Italic Dress
                              </h3>
                              <div
                                 class="flex justify-start items-start flex-col space-y-2"
                              >
                                 <p
                                    class="text-sm dark:text-white leading-none text-gray-800"
                                 >
                                    <span
                                       class="dark:text-gray-400 text-gray-300"
                                    >Style:
                                    </span> Italic Minimal Design
                                 </p>
                                 <p
                                    class="text-sm dark:text-white leading-none text-gray-800"
                                 >
                                    <span
                                       class="dark:text-gray-400 text-gray-300"
                                    >Size:
                                    </span> Small
                                 </p>
                                 <p
                                    class="text-sm dark:text-white leading-none text-gray-800"
                                 >
                                    <span
                                       class="dark:text-gray-400 text-gray-300"
                                    >Color:
                                    </span> Light Blue
                                 </p>
                              </div>
                           </div>
                           <div
                              class="flex justify-between space-x-8 items-start w-full"
                           >
                              <p
                                 class="text-base dark:text-white xl:text-lg leading-6"
                              >
                                 $20.00 <span
                                    class="text-red-300 line-through"
                                 >
                                    $30.00</span
                                 >
                              </p>
                              <p
                                 class="text-base dark:text-white xl:text-lg leading-6 text-gray-800"
                              >
                                 01
                              </p>
                              <p
                                 class="text-base dark:text-white xl:text-lg font-semibold leading-6 text-gray-800"
                              >
                                 $20.00
                              </p>
                           </div>
                        </div>
                     </div>
                  </div>
                  <div
                     class="flex justify-center md:flex-row flex-col items-stretch w-full space-y-4 md:space-y-0 md:space-x-6 xl:space-x-8"
                  >
                     <div
                        class="flex flex-col px-4 py-6 md:p-6 xl:p-8 w-full bg-gray-50 dark:bg-gray-800 space-y-6"
                     >
                        <h3
                           class="text-xl dark:text-white font-semibold leading-5 text-gray-800"
                        >
                           Summary
                        </h3>
                        <div
                           class="flex justify-center items-center w-full space-y-4 flex-col border-gray-200 border-b pb-4"
                        >
                           <div class="flex justify-between w-full">
                              <p
                                 class="text-base dark:text-white leading-4 text-gray-800"
                              >
                                 Subtotal
                              </p>
                              <p
                                 class="text-base dark:text-gray-300 leading-4 text-gray-600"
                              >
                                 $56.00
                              </p>
                           </div>
                           <div
                              class="flex justify-between items-center w-full"
                           >
                              <p
                                 class="text-base dark:text-white leading-4 text-gray-800"
                              >
                                 Discount <span
                                    class="bg-gray-200 p-1 text-xs font-medium dark:bg-white dark:text-gray-800 leading-3 text-gray-800"
                                 >STUDENT</span
                                 >
                              </p>
                              <p
                                 class="text-base dark:text-gray-300 leading-4 text-gray-600"
                              >
                                 -$28.00 (50%)
                              </p>
                           </div>
                           <div
                              class="flex justify-between items-center w-full"
                           >
                              <p
                                 class="text-base dark:text-white leading-4 text-gray-800"
                              >
                                 Shipping
                              </p>
                              <p
                                 class="text-base dark:text-gray-300 leading-4 text-gray-600"
                              >
                                 $8.00
                              </p>
                           </div>
                        </div>
                        <div class="flex justify-between items-center w-full">
                           <p
                              class="text-base dark:text-white font-semibold leading-4 text-gray-800"
                           >
                              Total
                           </p>
                           <p
                              class="text-base dark:text-gray-300 font-semibold leading-4 text-gray-600"
                           >
                              $36.00
                           </p>
                        </div>
                     </div>
                     <div
                        class="flex flex-col justify-center px-4 py-6 md:p-6 xl:p-8 w-full bg-gray-50 dark:bg-gray-800 space-y-6"
                     >
                        <h3
                           class="text-xl dark:text-white font-semibold leading-5 text-gray-800"
                        >
                           Shipping
                        </h3>
                        <div class="flex justify-between items-start w-full">
                           <div
                              class="flex justify-center items-center space-x-4"
                           >
                              <div class="w-8 h-8">
                                 <img
                                    class="w-full h-full"
                                    alt="logo"
                                    src="https://i.ibb.co/L8KSdNQ/image-3.png"
                                 />
                              </div>
                              <div
                                 class="flex flex-col justify-start items-center"
                              >
                                 <p
                                    class="text-lg leading-6 dark:text-white font-semibold text-gray-800"
                                 >
                                    DPD Delivery<br /><span
                                       class="font-normal"
                                    >Delivery with 24 Hours</span
                                    >
                                 </p>
                              </div>
                           </div>
                           <p
                              class="text-lg font-semibold leading-6 dark:text-white text-gray-800"
                           >
                              $8.00
                           </p>
                        </div>
                        <div class="w-full flex justify-center items-center">
                           <button
                              class="hover:bg-black dark:bg-white dark:text-gray-800 dark:hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-800 py-5 w-96 md:w-full bg-gray-800 text-base font-medium leading-4 text-white"
                           >View Carrier Details</button
                           >
                        </div>
                     </div>
                  </div>
               </div>
               <div
                  class="bg-gray-50 dark:bg-gray-800 w-full xl:w-96 flex justify-between items-center md:items-start px-4 py-6 md:p-6 xl:p-8 flex-col"
               >
                  <h3
                     class="text-xl dark:text-white font-semibold leading-5 text-gray-800"
                  >
                     Customer
                  </h3>
                  <div
                     class="flex flex-col md:flex-row xl:flex-col justify-start items-stretch h-full w-full md:space-x-6 lg:space-x-8 xl:space-x-0"
                  >
                     <div
                        class="flex flex-col justify-start items-start flex-shrink-0"
                     >
                        <div
                           class="flex justify-center w-full md:justify-start items-center space-x-4 py-8 border-b border-gray-200"
                        >
                           <img
                              src="https://i.ibb.co/5TSg7f6/Rectangle-18.png"
                              alt="avatar"
                           />
                           <div
                              class="flex justify-start items-start flex-col space-y-2"
                           >
                              <p
                                 class="text-base dark:text-white font-semibold leading-4 text-left text-gray-800"
                              >
                                 David Kent
                              </p>
                              <p
                                 class="text-sm dark:text-gray-300 leading-5 text-gray-600"
                              >
                                 10 Previous Orders
                              </p>
                           </div>
                        </div>

                        <div
                           class="flex justify-center text-gray-800 dark:text-white md:justify-start items-center space-x-4 py-4 border-b border-gray-200 w-full"
                        >
                           <svg
                              width="24"
                              height="24"
                              viewBox="0 0 24 24"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                           >
                              <path
                                 d="M19 5H5C3.89543 5 3 5.89543 3 7V17C3 18.1046 3.89543 19 5 19H19C20.1046 19 21 18.1046 21 17V7C21 5.89543 20.1046 5 19 5Z"
                                 stroke="currentColor"
                                 stroke-linecap="round"
                                 stroke-linejoin="round"></path>
                              <path
                                 d="M3 7L12 13L21 7"
                                 stroke="currentColor"
                                 stroke-linecap="round"
                                 stroke-linejoin="round"></path>
                           </svg>
                           <p class="cursor-pointer text-sm leading-5">
                              david89@gmail.com
                           </p>
                        </div>
                     </div>
                     <div
                        class="flex justify-between xl:h-full items-stretch w-full flex-col mt-6 md:mt-0"
                     >
                        <div
                           class="flex justify-center md:justify-start xl:flex-col flex-col md:space-x-6 lg:space-x-8 xl:space-x-0 space-y-4 xl:space-y-12 md:space-y-0 md:flex-row items-center md:items-start"
                        >
                           <div
                              class="flex justify-center md:justify-start items-center md:items-start flex-col space-y-4 xl:mt-8"
                           >
                              <p
                                 class="text-base dark:text-white font-semibold leading-4 text-center md:text-left text-gray-800"
                              >
                                 Shipping Address
                              </p>
                              <p
                                 class="w-48 lg:w-full dark:text-gray-300 xl:w-48 text-center md:text-left text-sm leading-5 text-gray-600"
                              >
                                 180 North King Street, Northhampton MA 1060
                              </p>
                           </div>
                           <div
                              class="flex justify-center md:justify-start items-center md:items-start flex-col space-y-4"
                           >
                              <p
                                 class="text-base dark:text-white font-semibold leading-4 text-center md:text-left text-gray-800"
                              >
                                 Billing Address
                              </p>
                              <p
                                 class="w-48 lg:w-full dark:text-gray-300 xl:w-48 text-center md:text-left text-sm leading-5 text-gray-600"
                              >
                                 180 North King Street, Northhampton MA 1060
                              </p>
                           </div>
                        </div>
                        <div
                           class="flex w-full justify-center items-center md:justify-start md:items-start"
                        >
                           <button
                              class="mt-6 md:mt-0 dark:border-white dark:hover:bg-gray-900 dark:bg-transparent dark:text-white py-5 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-800 border border-gray-800 font-medium w-96 2xl:w-full text-base leading-4 text-gray-800"
                           >Edit Details</button
                           >
                        </div>
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </SpaceLayout>
   );
}

export function OrderModal() {
   return (
      <div id="billingInformationModal" tabindex="-1" aria-hidden="true" class="fixed left-0 right-0 top-0 z-50 h-[calc(100%-1rem)] max-h-auto w-full max-h-full items-center justify-center overflow-y-auto overflow-x-hidden antialiased md:inset-0">
         <div class="relative max-h-auto w-full max-h-full max-w-lg p-4">
            <div class="relative rounded-lg bg-white shadow dark:bg-gray-800">
               <div class="flex items-center justify-between rounded-t border-b border-gray-200 p-4 dark:border-gray-700 md:p-5">
                  <h3 class="text-lg font-semibold text-gray-900 dark:text-white">Billing Information</h3>
                  <button type="button" class="ms-auto inline-flex h-8 w-8 items-center justify-center rounded-lg bg-transparent text-sm text-gray-400 hover:bg-gray-200 hover:text-gray-900 dark:hover:bg-gray-600 dark:hover:text-white" data-modal-toggle="billingInformationModal">
                     <svg class="h-3 w-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                     </svg>
                     <span class="sr-only">Close modal</span>
                  </button>
               </div>
               <form class="p-4 md:p-5">
                  <div class="grid grid-cols-1 gap-4 sm:grid-cols-2 mb-5">
                     <div class="flex items-center gap-4 sm:col-span-2">
                        <div class="flex items-center">
                           <input id="company_address_billing_modal" data-collapse-toggle="company-info-container-modal" aria-expanded="false" type="checkbox" value="" name="address-type-modal" class="h-4 w-4 rounded border-gray-300 bg-gray-100 text-primary-600 focus:ring-2 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800 dark:focus:ring-primary-600" />
                           <label for="company_address_billing_modal" class="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"> Order as a company </label>
                        </div>
                     </div>

                     <div class="grid grid-cols-2 gap-4 sm:col-span-2" id="company-info-container-modal">
                        <div>
                           <label for="company_name" class="mb-2 block text-sm font-medium text-gray-900 dark:text-white"> Company name </label>
                           <input type="text" id="company_name" class="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-primary-500 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400 dark:focus:border-primary-500 dark:focus:ring-primary-500" placeholder="Flowbite LLC" />
                        </div>

                        <div>
                           <label for="vat_number" class="mb-2 block text-sm font-medium text-gray-900 dark:text-white"> VAT number </label>
                           <input type="text" id="vat_number" class="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-primary-500 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400 dark:focus:border-primary-500 dark:focus:ring-primary-500" placeholder="DE42313253" />
                        </div>
                     </div>

                     <div class="sm:col-span-2">
                        <div class="mb-2 flex items-center gap-1">
                           <label for="saved-address-modal" class="block text-sm font-medium text-gray-900 dark:text-white"> Saved Address </label>
                           <svg data-tooltip-target="saved-address-modal-desc-2" data-tooltip-trigger="hover" class="h-4 w-4 text-gray-400 hover:text-gray-900 dark:text-gray-500 dark:hover:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                              <path fill-rule="evenodd" d="M2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10S2 17.523 2 12Zm9.408-5.5a1 1 0 1 0 0 2h.01a1 1 0 1 0 0-2h-.01ZM10 10a1 1 0 1 0 0 2h1v3h-1a1 1 0 1 0 0 2h4a1 1 0 1 0 0-2h-1v-4a1 1 0 0 0-1-1h-2Z" clip-rule="evenodd" />
                           </svg>
                        </div>
                        <select id="saved-address-modal" class="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-primary-500 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400 dark:focus:border-primary-500 dark:focus:ring-primary-500">
                           <option selected>Choose one of your saved address</option>
                           <option value="address-1">San Francisco, California, United States, 3454, Scott Street</option>
                           <option value="address-2">New York, United States, Broadway 10012</option>
                        </select>
                        <div id="saved-address-modal-desc-2" role="tooltip" class="tooltip invisible absolute z-10 inline-block rounded-lg bg-gray-900 px-3 py-2 text-sm font-medium text-white opacity-0 shadow-sm transition-opacity duration-300 dark:bg-gray-700">
                           Choose one of your saved addresses
                           <div class="tooltip-arrow" data-popper-arrow></div>
                        </div>
                     </div>

                     <div>
                        <label for="first_name_billing_modal" class="mb-2 block text-sm font-medium text-gray-900 dark:text-white"> First Name* </label>
                        <input type="text" id="first_name_billing_modal" class="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-primary-500 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400 dark:focus:border-primary-500 dark:focus:ring-primary-500" placeholder="Enter your first name" required />
                     </div>

                     <div>
                        <label for="last_name_billing_modal" class="mb-2 block text-sm font-medium text-gray-900 dark:text-white"> Last Name* </label>
                        <input type="text" id="last_name_billing_modal" class="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-primary-500 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400 dark:focus:border-primary-500 dark:focus:ring-primary-500" placeholder="Enter your last name" required />
                     </div>

                     <div class="sm:col-span-2">
                        <label for="phone-input_billing_modal" class="mb-2 block text-sm font-medium text-gray-900 dark:text-white"> Phone Number* </label>
                        <div class="flex items-center">
                           <button id="dropdown_phone_input__button_billing_modal" data-dropdown-toggle="dropdown_phone_input_billing_modal" class="z-10 inline-flex shrink-0 items-center rounded-s-lg border border-gray-300 bg-gray-100 px-4 py-2.5 text-center text-sm font-medium text-gray-900 hover:bg-gray-200 focus:outline-none focus:ring-4 focus:ring-gray-100 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-700" type="button">
                              <svg fill="none" aria-hidden="true" class="me-2 h-4 w-4" viewBox="0 0 20 15">
                                 <rect width="19.6" height="14" y=".5" fill="#fff" rx="2" />
                                 <mask id="a" style="mask-type:luminance" width="20" height="15" x="0" y="0" maskUnits="userSpaceOnUse">
                                    <rect width="19.6" height="14" y=".5" fill="#fff" rx="2" />
                                 </mask>
                                 <g mask="url(#a)">
                                    <path fill="#D02F44" fill-rule="evenodd" d="M19.6.5H0v.933h19.6V.5zm0 1.867H0V3.3h19.6v-.933zM0 4.233h19.6v.934H0v-.934zM19.6 6.1H0v.933h19.6V6.1zM0 7.967h19.6V8.9H0v-.933zm19.6 1.866H0v.934h19.6v-.934zM0 11.7h19.6v.933H0V11.7zm19.6 1.867H0v.933h19.6v-.933z" clip-rule="evenodd" />
                                    <path fill="#46467F" d="M0 .5h8.4v6.533H0z" />
                                    <g filter="url(#filter0_d_343_121520)">
                                       <path
                                          fill="url(#paint0_linear_343_121520)"
                                          fill-rule="evenodd"
                                          d="M1.867 1.9a.467.467 0 11-.934 0 .467.467 0 01.934 0zm1.866 0a.467.467 0 11-.933 0 .467.467 0 01.933 0zm1.4.467a.467.467 0 100-.934.467.467 0 000 .934zM7.467 1.9a.467.467 0 11-.934 0 .467.467 0 01.934 0zM2.333 3.3a.467.467 0 100-.933.467.467 0 000 .933zm2.334-.467a.467.467 0 11-.934 0 .467.467 0 01.934 0zm1.4.467a.467.467 0 100-.933.467.467 0 000 .933zm1.4.467a.467.467 0 11-.934 0 .467.467 0 01.934 0zm-2.334.466a.467.467 0 100-.933.467.467 0 000 .933zm-1.4-.466a.467.467 0 11-.933 0 .467.467 0 01.933 0zM1.4 4.233a.467.467 0 100-.933.467.467 0 000 .933zm1.4.467a.467.467 0 11-.933 0 .467.467 0 01.933 0zm1.4.467a.467.467 0 100-.934.467.467 0 000 .934zM6.533 4.7a.467.467 0 11-.933 0 .467.467 0 01.933 0zM7 6.1a.467.467 0 100-.933.467.467 0 000 .933zm-1.4-.467a.467.467 0 11-.933 0 .467.467 0 01.933 0zM3.267 6.1a.467.467 0 100-.933.467.467 0 000 .933zm-1.4-.467a.467.467 0 11-.934 0 .467.467 0 01.934 0z"
                                          clip-rule="evenodd"
                                       />
                                    </g>
                                 </g>
                                 <defs>
                                    <linearGradient id="paint0_linear_343_121520" x1=".933" x2=".933" y1="1.433" y2="6.1" gradientUnits="userSpaceOnUse">
                                       <stop stop-color="#fff" />
                                       <stop offset="1" stop-color="#F0F0F0" />
                                    </linearGradient>
                                    <filter id="filter0_d_343_121520" width="6.533" height="5.667" x=".933" y="1.433" color-interpolation-filters="sRGB" filterUnits="userSpaceOnUse">
                                       <feFlood flood-opacity="0" result="BackgroundImageFix" />
                                       <feColorMatrix in="SourceAlpha" result="hardAlpha" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" />
                                       <feOffset dy="1" />
                                       <feColorMatrix values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.06 0" />
                                       <feBlend in2="BackgroundImageFix" result="effect1_dropShadow_343_121520" />
                                       <feBlend in="SourceGraphic" in2="effect1_dropShadow_343_121520" result="shape" />
                                    </filter>
                                 </defs>
                              </svg>
                              +1
                              <svg class="-me-0.5 ms-2 h-4 w-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                                 <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 9-7 7-7-7" />
                              </svg>
                           </button>
                           <div id="dropdown_phone_input_billing_modal" class="z-10 hidden w-56 divide-y divide-gray-100 rounded-lg bg-white shadow dark:bg-gray-700">
                              <ul class="p-2 text-sm font-medium text-gray-700 dark:text-gray-200" aria-labelledby="dropdown_phone_input__button_billing_modal">
                                 <li>
                                    <button type="button" class="inline-flex w-full rounded-md px-3 py-2 text-sm text-gray-500 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-600 dark:hover:text-white" role="menuitem">
                                       <span class="inline-flex items-center">
                                          <svg fill="none" aria-hidden="true" class="me-2 h-4 w-4" viewBox="0 0 20 15">
                                             <rect width="19.6" height="14" y=".5" fill="#fff" rx="2" />
                                             <mask id="a" style="mask-type:luminance" width="20" height="15" x="0" y="0" maskUnits="userSpaceOnUse">
                                                <rect width="19.6" height="14" y=".5" fill="#fff" rx="2" />
                                             </mask>
                                             <g mask="url(#a)">
                                                <path fill="#D02F44" fill-rule="evenodd" d="M19.6.5H0v.933h19.6V.5zm0 1.867H0V3.3h19.6v-.933zM0 4.233h19.6v.934H0v-.934zM19.6 6.1H0v.933h19.6V6.1zM0 7.967h19.6V8.9H0v-.933zm19.6 1.866H0v.934h19.6v-.934zM0 11.7h19.6v.933H0V11.7zm19.6 1.867H0v.933h19.6v-.933z" clip-rule="evenodd" />
                                                <path fill="#46467F" d="M0 .5h8.4v6.533H0z" />
                                                <g filter="url(#filter0_d_343_121520)">
                                                   <path
                                                      fill="url(#paint0_linear_343_121520)"
                                                      fill-rule="evenodd"
                                                      d="M1.867 1.9a.467.467 0 11-.934 0 .467.467 0 01.934 0zm1.866 0a.467.467 0 11-.933 0 .467.467 0 01.933 0zm1.4.467a.467.467 0 100-.934.467.467 0 000 .934zM7.467 1.9a.467.467 0 11-.934 0 .467.467 0 01.934 0zM2.333 3.3a.467.467 0 100-.933.467.467 0 000 .933zm2.334-.467a.467.467 0 11-.934 0 .467.467 0 01.934 0zm1.4.467a.467.467 0 100-.933.467.467 0 000 .933zm1.4.467a.467.467 0 11-.934 0 .467.467 0 01.934 0zm-2.334.466a.467.467 0 100-.933.467.467 0 000 .933zm-1.4-.466a.467.467 0 11-.933 0 .467.467 0 01.933 0zM1.4 4.233a.467.467 0 100-.933.467.467 0 000 .933zm1.4.467a.467.467 0 11-.933 0 .467.467 0 01.933 0zm1.4.467a.467.467 0 100-.934.467.467 0 000 .934zM6.533 4.7a.467.467 0 11-.933 0 .467.467 0 01.933 0zM7 6.1a.467.467 0 100-.933.467.467 0 000 .933zm-1.4-.467a.467.467 0 11-.933 0 .467.467 0 01.933 0zM3.267 6.1a.467.467 0 100-.933.467.467 0 000 .933zm-1.4-.467a.467.467 0 11-.934 0 .467.467 0 01.934 0z"
                                                      clip-rule="evenodd"
                                                   />
                                                </g>
                                             </g>
                                             <defs>
                                                <linearGradient id="paint0_linear_343_121520" x1=".933" x2=".933" y1="1.433" y2="6.1" gradientUnits="userSpaceOnUse">
                                                   <stop stop-color="#fff" />
                                                   <stop offset="1" stop-color="#F0F0F0" />
                                                </linearGradient>
                                                <filter id="filter0_d_343_121520" width="6.533" height="5.667" x=".933" y="1.433" color-interpolation-filters="sRGB" filterUnits="userSpaceOnUse">
                                                   <feFlood flood-opacity="0" result="BackgroundImageFix" />
                                                   <feColorMatrix in="SourceAlpha" result="hardAlpha" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" />
                                                   <feOffset dy="1" />
                                                   <feColorMatrix values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.06 0" />
                                                   <feBlend in2="BackgroundImageFix" result="effect1_dropShadow_343_121520" />
                                                   <feBlend in="SourceGraphic" in2="effect1_dropShadow_343_121520" result="shape" />
                                                </filter>
                                             </defs>
                                          </svg>
                                          United States (+1)
                                       </span>
                                    </button>
                                 </li>
                                 <li>
                                    <button type="button" class="inline-flex w-full rounded-md px-3 py-2 text-sm text-gray-500 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-600 dark:hover:text-white" role="menuitem">
                                       <span class="inline-flex items-center">
                                          <svg class="me-2 h-4 w-4" fill="none" viewBox="0 0 20 15">
                                             <rect width="19.6" height="14" y=".5" fill="#fff" rx="2" />
                                             <mask id="a" style="mask-type:luminance" width="20" height="15" x="0" y="0" maskUnits="userSpaceOnUse">
                                                <rect width="19.6" height="14" y=".5" fill="#fff" rx="2" />
                                             </mask>
                                             <g mask="url(#a)">
                                                <path fill="#0A17A7" d="M0 .5h19.6v14H0z" />
                                                <path fill="#fff" fill-rule="evenodd" d="M-.898-.842L7.467 4.8V-.433h4.667V4.8l8.364-5.642L21.542.706l-6.614 4.46H19.6v4.667h-4.672l6.614 4.46-1.044 1.549-8.365-5.642v5.233H7.467V10.2l-8.365 5.642-1.043-1.548 6.613-4.46H0V5.166h4.672L-1.941.706-.898-.842z" clip-rule="evenodd" />
                                                <path stroke="#DB1F35" stroke-linecap="round" stroke-width=".667" d="M13.067 4.933L21.933-.9M14.009 10.088l7.947 5.357M5.604 4.917L-2.686-.67M6.503 10.024l-9.189 6.093" />
                                                <path fill="#E6273E" fill-rule="evenodd" d="M0 8.9h8.4v5.6h2.8V8.9h8.4V6.1h-8.4V.5H8.4v5.6H0v2.8z" clip-rule="evenodd" />
                                             </g>
                                          </svg>
                                          United Kingdom (+44)
                                       </span>
                                    </button>
                                 </li>
                                 <li>
                                    <button type="button" class="inline-flex w-full rounded-md px-3 py-2 text-sm text-gray-500 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-600 dark:hover:text-white" role="menuitem">
                                       <span class="inline-flex items-center">
                                          <svg class="me-2 h-4 w-4" fill="none" viewBox="0 0 20 15" xmlns="http://www.w3.org/2000/svg">
                                             <rect width="19.6" height="14" y=".5" fill="#fff" rx="2" />
                                             <mask id="a" style="mask-type:luminance" width="20" height="15" x="0" y="0" maskUnits="userSpaceOnUse">
                                                <rect width="19.6" height="14" y=".5" fill="#fff" rx="2" />
                                             </mask>
                                             <g mask="url(#a)">
                                                <path fill="#0A17A7" d="M0 .5h19.6v14H0z" />
                                                <path fill="#fff" stroke="#fff" stroke-width=".667" d="M0 .167h-.901l.684.586 3.15 2.7v.609L-.194 6.295l-.14.1v1.24l.51-.319L3.83 5.033h.73L7.7 7.276a.488.488 0 00.601-.767L5.467 4.08v-.608l2.987-2.134a.667.667 0 00.28-.543V-.1l-.51.318L4.57 2.5h-.73L.66.229.572.167H0z" />
                                                <path fill="url(#paint0_linear_374_135177)" fill-rule="evenodd" d="M0 2.833V4.7h3.267v2.133c0 .369.298.667.666.667h.534a.667.667 0 00.666-.667V4.7H8.2a.667.667 0 00.667-.667V3.5a.667.667 0 00-.667-.667H5.133V.5H3.267v2.333H0z" clip-rule="evenodd" />
                                                <path fill="url(#paint1_linear_374_135177)" fill-rule="evenodd" d="M0 3.3h3.733V.5h.934v2.8H8.4v.933H4.667v2.8h-.934v-2.8H0V3.3z" clip-rule="evenodd" />
                                                <path
                                                   fill="#fff"
                                                   fill-rule="evenodd"
                                                   d="M4.2 11.933l-.823.433.157-.916-.666-.65.92-.133.412-.834.411.834.92.134-.665.649.157.916-.823-.433zm9.8.7l-.66.194.194-.66-.194-.66.66.193.66-.193-.193.66.193.66-.66-.194zm0-8.866l-.66.193.194-.66-.194-.66.66.193.66-.193-.193.66.193.66-.66-.193zm2.8 2.8l-.66.193.193-.66-.193-.66.66.193.66-.193-.193.66.193.66-.66-.193zm-5.6.933l-.66.193.193-.66-.193-.66.66.194.66-.194-.193.66.193.66-.66-.193zm4.2 1.167l-.33.096.096-.33-.096-.33.33.097.33-.097-.097.33.097.33-.33-.096z"
                                                   clip-rule="evenodd"
                                                />
                                             </g>
                                             <defs>
                                                <linearGradient id="paint0_linear_374_135177" x1="0" x2="0" y1=".5" y2="7.5" gradientUnits="userSpaceOnUse">
                                                   <stop stop-color="#fff" />
                                                   <stop offset="1" stop-color="#F0F0F0" />
                                                </linearGradient>
                                                <linearGradient id="paint1_linear_374_135177" x1="0" x2="0" y1=".5" y2="7.033" gradientUnits="userSpaceOnUse">
                                                   <stop stop-color="#FF2E3B" />
                                                   <stop offset="1" stop-color="#FC0D1B" />
                                                </linearGradient>
                                             </defs>
                                          </svg>
                                          Australia (+61)
                                       </span>
                                    </button>
                                 </li>
                                 <li>
                                    <button type="button" class="inline-flex w-full rounded-md px-3 py-2 text-sm text-gray-500 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-600 dark:hover:text-white" role="menuitem">
                                       <span class="inline-flex items-center">
                                          <svg class="me-2 h-4 w-4" fill="none" viewBox="0 0 20 15">
                                             <rect width="19.6" height="14" y=".5" fill="#fff" rx="2" />
                                             <mask id="a" style="mask-type:luminance" width="20" height="15" x="0" y="0" maskUnits="userSpaceOnUse">
                                                <rect width="19.6" height="14" y=".5" fill="#fff" rx="2" />
                                             </mask>
                                             <g mask="url(#a)">
                                                <path fill="#262626" fill-rule="evenodd" d="M0 5.167h19.6V.5H0v4.667z" clip-rule="evenodd" />
                                                <g filter="url(#filter0_d_374_135180)">
                                                   <path fill="#F01515" fill-rule="evenodd" d="M0 9.833h19.6V5.167H0v4.666z" clip-rule="evenodd" />
                                                </g>
                                                <g filter="url(#filter1_d_374_135180)">
                                                   <path fill="#FFD521" fill-rule="evenodd" d="M0 14.5h19.6V9.833H0V14.5z" clip-rule="evenodd" />
                                                </g>
                                             </g>
                                             <defs>
                                                <filter id="filter0_d_374_135180" width="19.6" height="4.667" x="0" y="5.167" color-interpolation-filters="sRGB" filterUnits="userSpaceOnUse">
                                                   <feFlood flood-opacity="0" result="BackgroundImageFix" />
                                                   <feColorMatrix in="SourceAlpha" result="hardAlpha" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" />
                                                   <feOffset />
                                                   <feColorMatrix values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.06 0" />
                                                   <feBlend in2="BackgroundImageFix" result="effect1_dropShadow_374_135180" />
                                                   <feBlend in="SourceGraphic" in2="effect1_dropShadow_374_135180" result="shape" />
                                                </filter>
                                                <filter id="filter1_d_374_135180" width="19.6" height="4.667" x="0" y="9.833" color-interpolation-filters="sRGB" filterUnits="userSpaceOnUse">
                                                   <feFlood flood-opacity="0" result="BackgroundImageFix" />
                                                   <feColorMatrix in="SourceAlpha" result="hardAlpha" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" />
                                                   <feOffset />
                                                   <feColorMatrix values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.06 0" />
                                                   <feBlend in2="BackgroundImageFix" result="effect1_dropShadow_374_135180" />
                                                   <feBlend in="SourceGraphic" in2="effect1_dropShadow_374_135180" result="shape" />
                                                </filter>
                                             </defs>
                                          </svg>
                                          Germany (+49)
                                       </span>
                                    </button>
                                 </li>
                                 <li>
                                    <button type="button" class="inline-flex w-full rounded-md px-3 py-2 text-sm text-gray-500 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-600 dark:hover:text-white" role="menuitem">
                                       <span class="inline-flex items-center">
                                          <svg class="me-2 h-4 w-4" fill="none" viewBox="0 0 20 15">
                                             <rect width="19.1" height="13.5" x=".25" y=".75" fill="#fff" stroke="#F5F5F5" stroke-width=".5" rx="1.75" />
                                             <mask id="a" style="mask-type:luminance" width="20" height="15" x="0" y="0" maskUnits="userSpaceOnUse">
                                                <rect width="19.1" height="13.5" x=".25" y=".75" fill="#fff" stroke="#fff" stroke-width=".5" rx="1.75" />
                                             </mask>
                                             <g mask="url(#a)">
                                                <path fill="#F44653" d="M13.067.5H19.6v14h-6.533z" />
                                                <path fill="#1035BB" fill-rule="evenodd" d="M0 14.5h6.533V.5H0v14z" clip-rule="evenodd" />
                                             </g>
                                          </svg>
                                          France (+33)
                                       </span>
                                    </button>
                                 </li>
                                 <li>
                                    <button type="button" class="inline-flex w-full rounded-md px-3 py-2 text-sm text-gray-500 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-600 dark:hover:text-white" role="menuitem">
                                       <span class="inline-flex items-center">
                                          <svg class="me-2 h-4 w-4" fill="none" viewBox="0 0 20 15">
                                             <rect width="19.6" height="14" y=".5" fill="#fff" rx="2" />
                                             <mask id="a" style="mask-type:luminance" width="20" height="15" x="0" y="0" maskUnits="userSpaceOnUse">
                                                <rect width="19.6" height="14" y=".5" fill="#fff" rx="2" />
                                             </mask>
                                             <g mask="url(#a)">
                                                <path fill="#262626" fill-rule="evenodd" d="M0 5.167h19.6V.5H0v4.667z" clip-rule="evenodd" />
                                                <g filter="url(#filter0_d_374_135180)">
                                                   <path fill="#F01515" fill-rule="evenodd" d="M0 9.833h19.6V5.167H0v4.666z" clip-rule="evenodd" />
                                                </g>
                                                <g filter="url(#filter1_d_374_135180)">
                                                   <path fill="#FFD521" fill-rule="evenodd" d="M0 14.5h19.6V9.833H0V14.5z" clip-rule="evenodd" />
                                                </g>
                                             </g>
                                             <defs>
                                                <filter id="filter0_d_374_135180" width="19.6" height="4.667" x="0" y="5.167" color-interpolation-filters="sRGB" filterUnits="userSpaceOnUse">
                                                   <feFlood flood-opacity="0" result="BackgroundImageFix" />
                                                   <feColorMatrix in="SourceAlpha" result="hardAlpha" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" />
                                                   <feOffset />
                                                   <feColorMatrix values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.06 0" />
                                                   <feBlend in2="BackgroundImageFix" result="effect1_dropShadow_374_135180" />
                                                   <feBlend in="SourceGraphic" in2="effect1_dropShadow_374_135180" result="shape" />
                                                </filter>
                                                <filter id="filter1_d_374_135180" width="19.6" height="4.667" x="0" y="9.833" color-interpolation-filters="sRGB" filterUnits="userSpaceOnUse">
                                                   <feFlood flood-opacity="0" result="BackgroundImageFix" />
                                                   <feColorMatrix in="SourceAlpha" result="hardAlpha" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" />
                                                   <feOffset />
                                                   <feColorMatrix values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.06 0" />
                                                   <feBlend in2="BackgroundImageFix" result="effect1_dropShadow_374_135180" />
                                                   <feBlend in="SourceGraphic" in2="effect1_dropShadow_374_135180" result="shape" />
                                                </filter>
                                             </defs>
                                          </svg>
                                          Germany (+49)
                                       </span>
                                    </button>
                                 </li>
                              </ul>
                           </div>
                           <div class="relative w-full">
                              <input type="text" id="phone-input" class="z-20 block w-full rounded-e-lg border border-s-0 border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-primary-500 focus:ring-primary-500 dark:border-gray-600 dark:border-s-gray-700  dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400 dark:focus:border-primary-500" pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}" placeholder="123-456-7890" required />
                           </div>
                        </div>
                     </div>

                     <div>
                        <div class="mb-2 flex items-center gap-2">
                           <label for="select_country_input_billing_modal" class="block text-sm font-medium text-gray-900 dark:text-white"> Country* </label>
                        </div>
                        <select id="select_country_input_billing_modal" class="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-primary-500 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400 dark:focus:border-primary-500 dark:focus:ring-primary-500">
                           <option selected>United States</option>
                           <option value="AS">Australia</option>
                           <option value="FR">France</option>
                           <option value="ES">Spain</option>
                           <option value="UK">United Kingdom</option>
                        </select>
                     </div>

                     <div>
                        <div class="mb-2 flex items-center gap-2">
                           <label for="select_city_input_billing_modal" class="block text-sm font-medium text-gray-900 dark:text-white"> City* </label>
                        </div>
                        <select id="select_city_input_billing_modal" class="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-primary-500 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400 dark:focus:border-primary-500 dark:focus:ring-primary-500">
                           <option selected>San Francisco</option>
                           <option value="NY">New York</option>
                           <option value="LA">Los Angeles</option>
                           <option value="CH">Chicago</option>
                           <option value="HU">Houston</option>
                        </select>
                     </div>

                     <div class="sm:col-span-2">
                        <label for="address_billing_modal" class="mb-2 block text-sm font-medium text-gray-900 dark:text-white"> Shipping Address* </label>
                        <textarea id="address_billing_modal" rows="4" class="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-primary-500 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400 dark:focus:border-primary-500 dark:focus:ring-primary-500" placeholder="Enter here your address"></textarea>
                     </div>

                  </div>
                  <div class="border-t border-gray-200 pt-4 dark:border-gray-700 md:pt-5">
                     <button type="submit" class="me-2 inline-flex items-center rounded-lg bg-primary-700 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-primary-800 focus:outline-none focus:ring-4 focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Save information</button>
                     <button type="button" data-modal-toggle="billingInformationModal" class="me-2 rounded-lg border border-gray-200 bg-white px-5 py-2.5 text-sm font-medium text-gray-900 hover:bg-gray-100 hover:text-primary-700 focus:z-10 focus:outline-none focus:ring-4 focus:ring-gray-100 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white dark:focus:ring-gray-700">Cancel</button>
                  </div>
               </form>
            </div>
         </div>
      </div>
   );
}

export function QuestionModal() {
   return (

      <div id="question-modal" tabindex="-1" aria-hidden="true" class="fixed left-0 right-0 top-0 z-50 h-[calc(100%-1rem)] max-h-full w-full items-center justify-center overflow-y-auto overflow-x-hidden antialiased md:inset-0">
         <div class="relative max-h-full w-full max-w-xl p-4">
            <div class="relative rounded-lg bg-white shadow dark:bg-gray-800">
               <div class="flex items-center justify-between rounded-t border-b border-gray-200 p-4 dark:border-gray-700 md:p-5">
                  <h3 class="text-lg font-semibold text-gray-900 dark:text-white">Ask a question</h3>
                  <button type="button" class="ms-auto inline-flex h-8 w-8 items-center justify-center rounded-lg bg-transparent text-sm text-gray-400 hover:bg-gray-200 hover:text-gray-900 dark:hover:bg-gray-600 dark:hover:text-white" data-modal-toggle="question-modal">
                     <svg class="h-3 w-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                     </svg>
                     <span class="sr-only">Close modal</span>
                  </button>
               </div>
               <form class="p-4 md:p-5">
                  <div class="mb-4 grid grid-cols-2 gap-4">
                     <div class="col-span-2">
                        <label for="question" class="mb-2 block text-sm font-medium text-gray-900 dark:text-white">Your question <span class="text-gray-500 dark:text-gray-400">(150-1000 characters)</span></label>
                        <textarea id="question" rows="6" class="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-primary-500 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400 dark:focus:border-primary-500 dark:focus:ring-primary-500" required></textarea>
                     </div>
                     <div class="col-span-2 grid gap-4 md:grid-cols-2">
                        <div>
                           <label for="question-type" class="mb-2 flex items-center text-sm font-medium text-gray-900 dark:text-white">
                              <span class="me-1">Question type</span>
                              <button type="button" data-tooltip-target="tooltip-dark" data-tooltip-style="dark" class="ml-1">
                                 <svg aria-hidden="true" class="h-4 w-4 cursor-pointer text-gray-400 hover:text-gray-900 dark:text-gray-500 dark:hover:text-white" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z" clip-rule="evenodd"></path></svg>
                                 <span class="sr-only">Details</span>
                              </button>
                              <div id="tooltip-dark" role="tooltip" class="tooltip invisible absolute z-10 inline-block max-w-sm rounded-lg bg-gray-900 px-3 py-2 text-xs font-normal text-white opacity-0 shadow-sm dark:bg-gray-700">
                                 Choose your question type to get a faster answer.
                                 <div class="tooltip-arrow" data-popper-arrow></div>
                              </div>
                           </label>
                           <select id="question-type" class="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500">
                              <option value="technical">Technical Question</option>
                              <option value="shipment">Shipment Question</option>
                              <option value="payment">Payment Issue</option>
                              <option value="other">Other</option>
                           </select>
                        </div>
                        <div>
                           <label for="priority-type" class="mb-2 block text-sm font-medium text-gray-900 dark:text-white">Priority</label>
                           <select id="priority-type" class="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500">
                              <option value="very-high">Very High</option>
                              <option value="high">High</option>
                              <option value="medium">Medium</option>
                              <option value="low">Low</option>
                           </select>
                        </div>
                     </div>
                     <div class="col-span-2">
                        <p class="mb-2 block text-sm font-medium text-gray-900 dark:text-white">Upload files <span class="text-gray-500 dark:text-gray-400">(Optional)</span></p>
                        <div class="flex w-full items-center justify-center">
                           <label for="dropzone-file" class="dark:hover:bg-bray-800 flex h-48 w-full cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-300 bg-gray-50 hover:bg-gray-100 dark:border-gray-600 dark:bg-gray-700 dark:hover:border-gray-500 dark:hover:bg-gray-600">
                              <div class="flex flex-col items-center justify-center pb-6 pt-5">
                                 <svg class="mb-4 h-8 w-8 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2" />
                                 </svg>
                                 <p class="mb-2 text-sm text-gray-500 dark:text-gray-400"><span class="font-semibold">Click to upload</span> or drag and drop</p>
                                 <p class="text-xs text-gray-500 dark:text-gray-400">SVG, PNG, JPG or GIF (MAX. 800x400px)</p>
                              </div>
                              <input id="dropzone-file" type="file" class="hidden" />
                           </label>
                        </div>
                     </div>

                     <div class="col-span-2">
                        <div class="flex items-center">
                           <input id="link-checkbox" type="checkbox" value="" class="h-4 w-4 rounded border-gray-300 bg-gray-100 text-primary-600 focus:ring-2 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800 dark:focus:ring-primary-600" />
                           <label for="link-checkbox" class="ms-2 text-sm font-medium text-gray-500 dark:text-gray-400">I have read and agree with the <a href="#" class="text-primary-600 hover:underline dark:text-primary-500">terms and conditions</a>.</label>
                        </div>
                     </div>
                  </div>
                  <div class="border-t border-gray-200 pt-4 dark:border-gray-700 md:pt-5">
                     <button type="submit" class="me-2 inline-flex items-center rounded-lg bg-primary-700 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-primary-800 focus:outline-none focus:ring-4 focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Submit question</button>
                     <button type="button" data-modal-toggle="question-modal" class="me-2 rounded-lg border border-gray-200 bg-white px-5 py-2.5 text-sm font-medium text-gray-900 hover:bg-gray-100 hover:text-primary-700 focus:z-10 focus:outline-none focus:ring-4 focus:ring-gray-100 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white dark:focus:ring-gray-700">Cancel</button>
                  </div>
               </form>
            </div>
         </div>
      </div>
   );
}